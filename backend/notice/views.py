from notice.serializers import BusinessFormSerializer
from .models         import BusinessForm
from accounts.models import AccountGuest

from rest_framework.viewsets   import ModelViewSet
from rest_framework.response   import Response
from rest_framework.decorators import api_view

from django.db           import transaction

@api_view(['GET','POST','PUT','DELETE'])
def business_create(request):
    if request.method == 'GET':
        serializer = BusinessFormSerializer(BusinessForm.objects.all(), many=True)

        return Response(serializer.data)
    
    elif request.method == 'POST':
        user = AccountGuest.objects.get(id=request.user)
        serializer = BusinessFormSerializer(data=request.data)
        
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
        