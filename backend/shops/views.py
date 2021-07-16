from random   import seed, sample
from datetime import date

from django.db                 import transaction
from django.db.models          import Q, When, Value, Case
from django.shortcuts          import get_object_or_404

from rest_framework.viewsets   import ModelViewSet
from rest_framework.decorators import action, api_view
from rest_framework.response   import Response

from .models                   import Shop, Category, Review, ReportShop, Menu, ReportReview
from accounts.models           import AccountGuest
from .serializers              import (
    AccountSearchSerializer, ShopListSerializer,ShopDetailSerializer,
    ReviewSerializer, LocationSearchSerializer, ReportShopSerializer,
    ReportReviewSerializer, MenuSerializer
)

class ShopListViewSet(ModelViewSet):
    def list(self,request):
        # 모델링 수정 후 변경
        # latitude  = request.account.searchedLocation.all().first().latitude
        # longitude = request.account.searchedLocation.all().first().longtitude

        # latitude  = request.account.searchedLocation.all().order_by('-searched_time').first().latitude
        # longitude = request.account.searchedLocation.all().order_by('-searched_time').first().longtitude

        latitude = 125
        longitude = 241

        range_condition = Case(
            When(
                Q(latitude__range  = (latitude-0.05, latitude+0.05))&
                Q(longitude__range = (longitude-0.075, longitude+0.075)),
                then=Value(2)),
            When(
                Q(latitude__range  = (latitude-0.1, latitude+0.1))&
                Q(longitude__range = (longitude-0.15, longitude+0.15)),
                then=Value(1)),
            default=Value(0)
        )
        shops       = Shop.objects.annotate(range_condition=range_condition).exclude(range_condition=0)
        result_list = []

        if request.query_params.get('all') == 'True':
            shops_all   = shops.order_by(
                '-range_condition','-kakao_score'
            )
            serializer  = ShopListSerializer(shops_all,many=True)
            result_list = serializer.data

        if request.query_params.get('top') == 'True':
            shops_top  = shops.prefetch_related('themekeyword_set').order_by(
                '-range_condition','-kakao_score'
            )[:10]
            serializer = ShopListSerializer(shops_top,many=True)
            result     = {
                'title' : '오늘의 추천',
                'list' : serializer.data
            }
            result_list.append(result)

        if request.query_params.get('category') == 'True':
            today = int(str(date.today()).replace('-',''))
            seed(today)
            categories = sample(range(1,Category.objects.all().count()+1),3)

            for category_id in categories:
                category            = Category.objects.get(id=category_id)                    
                shops_category      = shops.filter(category=category).order_by(
                    '-range_condition','-kakao_score'
                )[:10]
                serializer_category = ShopListSerializer(shops_category, many=True)
                result              = {
                    'title' : '오늘의 '+category.category_name,
                    'list': serializer_category.data
                }
                result_list.append(result)

        return Response(result_list)

class ShopDetailViewSet(ModelViewSet):
    serializer_class = ShopDetailSerializer
    def get_queryset(self):
        queryset = Shop.objects.filter(id=self.kwargs['id'])
        return queryset

@transaction.atomic
@api_view(['GET','POST'])
def review_create(request):
    if request.method == 'GET':
        reviews    = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)

        return Response(serializer.data)

    else:
        shop = Shop.objects.get(id=request.data['shop_id'])
        user = AccountGuest.objects.get(id=request.user)
        serializer = ReviewSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(shop=shop,guest=user)
            shop.review_count += 1
            user.written_review_count += 1
            shop.save()
            user.save()

            return Response({'message':'Review Created'})
        return Response({'message':'Review Created Fail'})

@transaction.atomic
@api_view(['PUT','DELETE'])
def review_command(request,review_id):
    review = get_object_or_404(Review, pk=review_id, guest_id=request.user)
    shop = Shop.objects.get(id=review.shop_id)
    
    if request.method == 'PUT':    
        serializer = ReviewSerializer(data=request.data, instance=review)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({'message':'Review Updated'})
        
    else:
        user = AccountGuest.objects.get(id=request.user)
        shop.review_count -= 1
        user.written_review_count -= 1
        shop.save()
        user.save()
        review.delete()

        return Response({'message':'Review Deleted'})

@api_view(['GET','POST'])
def report_shop(request):
    if request.method == 'GET':
        serializer = ReportShopSerializer(ReportShop.objects.all(), many=True)

        return Response(serializer.data)

    else:
        shop = Shop.objects.get(id=request.data['shop_id'])
        user = AccountGuest.objects.get(id=request.user)
        serializer = ReportShopSerializer(data=request.data)
        
        if not user.guestReport.filter(shop=shop, guest=user):
            if serializer.is_valid(raise_exception=True):
                serializer.save(shop=shop, guest=user)
        
                return Response({'message':'Report Shop Created'})
                
        return Response({'message':'Report Shop Existed'})

@api_view(['DELETE'])
def report_shop_command(request, shop_id):
    report = ReportShop.objects.filter(Q(shop_id=shop_id) | Q(guest_id=request.user))
    report.delete()

    return Response({'message':'Report Shop Deleted'})

class ReportReviewViewSet(ModelViewSet):
    serializer_class = ReportReviewSerializer
    def list(self, request):
        reports = ReportReview.objects.all()

        return Response(reports)
    
    def create(self,request):
        review = Review.objects.get(id=request.data['review_id'])
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            # serializer.save(reivew=review, guest_id=request.user)
            serializer.save(review=review, guest_id=1)

            return Response({'message':'Report Review Created'})

        return Response({'message':'Report Review Created Fail'})

@api_view(['DELETE'])
def report_review_command(request, report_review_id):
        report = ReportReview.objects.filter(Q(id=report_review_id) | Q(guest_id=request.user))
        report.delete()

        return Response({'message':'Report Shop Deleted'})

class MenuViewSet(ModelViewSet):
    serializer_class = MenuSerializer
    def get_queryset(self):
        menu = Menu.objects.order_by('?').first()

        return menu
class SearchAccountViewSet(ModelViewSet):
    serializer_class = AccountSearchSerializer

    def get_queryset(self):
        keyword  = self.request.query_params.get('keyword')
        queryset = AccountGuest.objects.filter(
            username__contains=keyword
            ).order_by('username')
        return queryset

    @action(detail=False, methods=['get'])
    def recent(self,request):
        request.account = AccountGuest.objects.get(id=1)
        queryset  = request.account.searched_people.through.objects.all().order_by('-searched_time')[:5]
        serializer = AccountSearchSerializer(queryset,many=True)
        return Response(serializer.data)

    def create(self,request):
        with transaction.atomic():
            for row in request.data:
                serializer     = AccountSearchSerializer(data=row)                
                if serializer.is_valid(raise_exception=True):
                    serializer.update_or_create(
                        validated_data=row,
                        account=request.account
                    )
        return Response({"message":"Success"})

class SearchLocationViewSet(ModelViewSet):
    @action(detail=False, methods=['get'])
    def recent(self,request):
        queryset  = request.account.searchedLocation.all().order_by('-searched_time')[:5]
        serializer = LocationSearchSerializer(queryset,many=True)
        return Response(serializer.data)

    def create(self,request):
        with transaction.atomic():
            serializer = LocationSearchSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.update_or_create(
                    validated_data=request.data,
                    account=request.account
                )

        return Response({"message":"Success"})
