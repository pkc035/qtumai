from PIL import Image

from django.db.models           import Q
from django.shortcuts           import get_object_or_404
from django.core.files.storage  import FileSystemStorage

from rest_framework.decorators import action, api_view
from rest_framework.viewsets   import ModelViewSet
from rest_framework.response   import Response

from project.settings.base import MEDIA_ROOT
from shops.models          import Coupon
from accounts.models       import AccountGuest
from notice.serializers    import BusinessFormSerializer, CouponManageSerializer
from .models               import BusinessForm, FAQForm, Notice, ProposeBusinessForm, ProposeGoodShop
from .serializers          import (
    BusinessFormSerializer, CouponManageSerializer, NoticeSerializer, ProposeBusinessSerializer, ProposeGoodShopSerializer, FAQFormSerializer
)

@api_view(['GET','POST','PUT','DELETE'])
def business_create(request):
    if request.method == 'GET':
        serializer = BusinessFormSerializer(BusinessForm.objects.all(), many=True)

        return Response(serializer.data)
    
    elif request.method == 'POST':
        data       = request.POST.copy()
        user       = AccountGuest.objects.get(id=1)
        fs         = FileSystemStorage(location=MEDIA_ROOT+'/business')
        file_count = 0

        for file in request.FILES.values():
            file_count += 1

            if fs.exists(file.name):
                FileSystemStorage.delete(fs, file.name)
            
            fs.save(file.name, file)
            image = Image.open(fs.path(file.name))
            image.thumbnail(size=(1600,2560))
            image.save(fs.path(file.name), optimize=True)
            data['img_url_'+ str(file_count)] = fs.path(file.name)

        serializer = BusinessFormSerializer(data=data)
        
        if not user.guestBusiness.filter(guest=user):
            if serializer.is_valid(raise_exception=True):
                serializer.save(guest=user)

                return Response({'message':'BusinessForm Created'})
            
        return Response({'message':'BusinessForm Exised'})

    elif request.method == 'PUT':
        business = BusinessForm.objects.get(guest_id=request.user)
        serializer = BusinessFormSerializer(data=request.data, instance=business)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response({'message':'BusinessForm Updated'})
        
        return Response({'message':'BusinessForm Update Fail'})

    else:
        business = BusinessForm.objects.get(guest_id=request.user)
        business.delete()

        return Response({'message':'BusinessForm Deleted'})

class CouponManageViewSet(ModelViewSet):
    serializer_class = CouponManageSerializer

    def list(self, request):
        queryset   = Coupon.objects.filter(
            shop__accountMyShop__username=request.account.username,
            status=True
        )
        serializer = CouponManageSerializer(queryset, many=True)

        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception =True):
            serializer.save(account=request.account)

        return Response (serializer.data, status=201)

    @action(detail=False, methods=['PATCH'])
    def status(self, request):
        new_coupon = get_object_or_404(Coupon, id=request.data['coupon_id'])
        serializer = CouponManageSerializer(new_coupon, data=request.data)

        if serializer.is_valid(raise_exception =True):
            old_coupon = (
                Coupon.objects
                .filter(
                    shop__accountMyShop__username=request.account.username,
                    status=True
                ).exclude(id=request.data['coupon_id'])
            )
            serializer.save(
                old_coupon=old_coupon
            )

        return Response(serializer.data)

class ProposeGoodShopViewSet(ModelViewSet):
    queryset = ProposeGoodShop.objects.all()
    serializer_class = ProposeGoodShopSerializer

class ProposeBusinessViewSet(ModelViewSet):
    queryset = ProposeBusinessForm.objects.all()
    serializer_class = ProposeBusinessSerializer

class NoticeViewSet(ModelViewSet):
    serializer_class = NoticeSerializer

    def get_queryset(self):
        is_public = self.request.query_params.get('is_pulic')
        condition = Q()
        
        if is_public != None:
            condition &= Q(public = is_public)

        queryset = Notice.objects.filter(condition)

        return queryset

class FAQFormViewSet(ModelViewSet):
    queryset = FAQForm.objects.all()
    serializer_class = FAQFormSerializer
