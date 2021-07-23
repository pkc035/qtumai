from django.db                 import transaction
from django.db.models          import Q, When, Value, Case
from django.db.models.query    import Prefetch
from django.shortcuts          import get_object_or_404
from django.contrib.auth       import get_user_model

from rest_framework.viewsets    import ModelViewSet
from rest_framework.decorators  import action, api_view
from rest_framework.response    import Response
from rest_framework.pagination  import PageNumberPagination

from random                    import seed, sample
from datetime                  import date
from .models                   import Shop, Category, Review, ReportShop, ReportReview, Menu
from accounts.models           import AccountGuest
from .serializers              import (
    ShopRecommendSerializer, ShopListSerializer,ShopDetailSerializer,
    ReviewSerializer, ReportReviewSerializer, ReportShopSerializer,
    LocationSearchSerializer, AccountSearchSerializer, ShopVisitedSerializer,
    MenuSerializer
)

class ShopRecommendViewSet(ModelViewSet):
    def list(self,request):
        type = self.request.query_params.get('type')

        if type == 'search':
            location  = (self.request.account.searchedLocation.all()
                .order_by('-searched_time').first()
            )
            latitude  = location.latitude
            longitude = location.longitude

        elif type == 'here':
            latitude = float(self.request.query_params.get('latitude'))
            longitude = float(self.request.query_params.get('longitude'))

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
        shops = (
            Shop.objects
            .annotate(range_condition=range_condition)
            .exclude(range_condition=0)
            .prefetch_related('shopThemeKeyword', 'coupon_set','shopimage_set')
        )
        result_list = []

        if request.query_params.get('top') == 'True':
            shops_top = shops.order_by('-range_condition','-naver_score')[:10]
            serializer_top = ShopRecommendSerializer(shops_top,many=True)
            
            result = {
                'title' : '오늘의 추천',
                'list' : serializer_top.data
            }
            result_list.append(result)

        if request.query_params.get('category') == 'True':
            today = int(str(date.today()).replace('-',''))
            seed(today)
            categories = sample(range(1,Category.objects.all().count()+1),3)

            for category_id in categories:
                category = Category.objects.get(id=category_id)                    
                shops_category = (
                    shops
                    .filter(category=category)
                    .order_by('-range_condition','-naver_score')
                )[:10]
                serializer_category = ShopRecommendSerializer(shops_category, many=True)
                
                result = {
                    'title' : '오늘의 '+ category.category_name,
                    'list'  : serializer_category.data
                }
                result_list.append(result)

        return Response(result_list)

class ShopDetailViewSet(ModelViewSet):
    serializer_class = ShopDetailSerializer

    def get_queryset(self):
        shop = Shop.objects.filter(id=self.kwargs['id'])
        return shop

@transaction.atomic
@api_view(['GET','POST'])
def review_create(request):
    if request.method == 'GET':
        reviews    = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)

        return Response(serializer.data)

    else:
        shop = Shop.objects.get(id=request.data['shop_id'])
        user = AccountGuest.objects.get(id=1)
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
        user = get_object_or_404(get_user_model(), pk=1)
        serializer = ReportShopSerializer(data=request.data)
        
        if not user.guestReportShop.filter(shop=shop, guest=user):
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

        return [menu]

class AccountSearchViewSet(ModelViewSet):
    serializer_class = AccountSearchSerializer

    def get_queryset(self):
        keyword  = self.request.query_params.get('keyword')
        queryset = (
            AccountGuest.objects
            .filter(username__contains=keyword)
            .order_by('username')
        )
        return queryset

    @action(detail=False, methods=['get'])
    def recent(self,request):
        queryset = (
            AccountGuest.objects
            .filter(searchedPeople=request.account)
            .order_by('-searcedpeople_from__searched_time')
        )
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

class LocationSearchViewSet(ModelViewSet):
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

class ShopListPagination(PageNumberPagination):
    page_size = 6

class ShopListViewSet(ModelViewSet):
    serializer_class = ShopListSerializer
    pagination_class = ShopListPagination

    def get_queryset(self):
        type       = self.request.query_params.get('type')
        zoom       = int(self.request.query_params.get('zoom'))
        dislike_in = self.request.query_params.get('dislike_in')
        score      = self.request.query_params.get('score')

        # range
        if type == 'living':
            location  = self.request.account.livingarea
            latitude  = location.latitude
            longitude = location.longitude

        elif type == 'search':
            location  = (self.request.account.searchedLocation.all()
                .order_by('-searched_time').first()
            )
            latitude  = location.latitude
            longitude = location.longitude

        elif type == 'here':
            latitude = float(self.request.query_params.get('latitude'))
            longitude = float(self.request.query_params.get('longitude'))

        range_condition = (
            Q(latitude__range  = (latitude-0.01*zoom, latitude+0.01*zoom))&
            Q(longitude__range = (longitude-0.015*zoom, longitude+0.015*zoom))
        )

        # dislike
        dislike_condition = Q()

        if dislike_in == 'False':
            dislike_condition = ~Q(dislikeShop=self.request.account)

        # score
        score_condition = Q()

        if score:
            score_condition = Q(naver_score__gte=score)

        shops = (
            Shop.objects
            .filter(range_condition&dislike_condition&score_condition)
            .prefetch_related('shopimage_set')
            .order_by('-naver_score')
        )
        return shops

#menu_name, shop_name / category_name 검색 결과를 나눠서 return할 경우
class ShopSearchViewSet(ModelViewSet):
    def list(self, request):
        keyword  = request.query_params.get('keyword')
        
        queryset_shop_category = (
            Shop.objects
            .filter(
                Q(shop_name__contains=keyword)|
                Q(category__category_name__contains=keyword)
            )
            .prefetch_related('shopimage_set')
            .order_by('-naver_score')
        )
        serializer_shop_category = ShopListSerializer(queryset_shop_category, many=True)

        queryset_menu = (
            Shop.objects
            .filter(menu__menu_name__contains=keyword)
            .prefetch_related('shopimage_set')
            .order_by('-naver_score')
            .distinct()
        )
        serializer_menu = ShopListSerializer(queryset_menu, many=True)
        
        result_list = [
            {'shop,category': serializer_shop_category.data},
            # {'menu': serializer_menu.data}
        ]
        return Response(result_list)

class ShopVisitedViewSet(ModelViewSet):
    serializer_class = ShopVisitedSerializer
    pagination_class = ShopListPagination

    def get_queryset(self):
        queryset = (
            Shop.objects
            .filter(userVisitedStore=self.request.account)
            .prefetch_related(
                'shopimage_set', 'visitedshop_set',
                Prefetch('review_set', queryset=Review.objects.filter(guest=self.request.account))
            )
            .order_by('-visitedshop__visited_time')
        )

        return queryset

# # menu_name,shop_name, category_name 검색 결과를 한 배열에 return 할 경우
# class ShopSearchViewSet(ModelViewSet):
#     serializer_class = ShopListSerializer

#     def get_queryset(self):
#         keyword = self.request.query_params.get('keyword')
#         queryset = (
#             Shop.objects.filter(
#                 Q(shop_name__contains=keyword)|
#                 Q(category__category_name__contains=keyword)|
#                 Q(menu__menu_name__contains=keyword)
#                 )
#             .prefetch_related('shopimage_set')
#             .order_by('-naver_score')
#             .distinct()
#         )
#         return queryset