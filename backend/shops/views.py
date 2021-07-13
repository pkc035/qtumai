from rest_framework.viewsets   import ModelViewSet
from rest_framework.response   import Response
from rest_framework.decorators import api_view

from django.db           import transaction
from django.shortcuts    import get_object_or_404
from django.contrib.auth import get_user_model

from accounts.models   import AccountGuest
from shops.models      import Shop, Review
from shops.serializers import ShopDetailSerializer, ReviewSerializer

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
