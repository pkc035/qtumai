from random import sample

from accounts.models import AccountGuest
from .models         import ReportReview, ReportShop, Shop, Category, Review
from .serializers    import ReportReviewSerializer, ReportShopSerializer, ShopListSerializer, ShopDetailSerializer, ReviewSerializer

from rest_framework.viewsets   import ModelViewSet
from rest_framework.response   import Response
from rest_framework.decorators import api_view, action

from django.db.models    import Q, Value
from django.db           import transaction
from django.shortcuts    import get_object_or_404
from django.contrib.auth import get_user_model


class ShopListViewSet(ModelViewSet):
    def list(self,request):
        latitude  = float(request.query_params.get('latitude'))
        longitude = float(request.query_params.get('longitude'))
        range_condition = (
            Q(latitude__range = (latitude-0.01, latitude+0.01))&
            Q(longitude__range= (longitude-0.015, longitude+0.015))
        )
        shops       = Shop.objects.filter(range_condition).order_by('-kakao_score')
        result_list = []

        if request.query_params.get('all') == 'True':
            serializer = ShopListSerializer(shops,many=True)
            result     = {'전체' : serializer.data}
            result_list.append(result)
                
        if request.query_params.get('top') == 'True':
            serializer = ShopListSerializer(shops[:10],many=True)
            result     = {'오늘의 추천' : serializer.data}
            result_list.append(result)

        if request.query_params.get('category') == 'True':
            categories = sample(range(1,Category.objects.all().count()+1),3)
            for category_id in categories:
                category            = Category.objects.get(id=category_id)
                shops_category      = shops.filter(category=category)[:10]
                serializer_category = ShopListSerializer(shops_category, many=True)
                result              = {category.category_name + ' 맛집': serializer_category.data}
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
    