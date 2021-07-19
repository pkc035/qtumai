import requests, jwt

from django.http         import JsonResponse
from django.views        import View
from django.db           import transaction
from django.shortcuts    import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.views      import APIView
from rest_framework.viewsets   import ModelViewSet
from rest_framework.decorators import api_view, action
from rest_framework.response   import Response
from rest_framework             import status

from project.settings import SECRET_KEY
from .models          import AccountGuest, MyLikeList
from shops.models     import Shop
from .serializers     import AccountGuestSerializer, MyLikeListSerializer, MyLikeListShopSerializer
from accounts import serializers

class AccountGuestAPIView(APIView):
    def post(self, request):
        serializer = AccountGuestSerializer(data=request.data)

        if serializer.is_valid():
            serializer.create(
                validated_data=request.data,
                living_area=request.data['living_area']
            )
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class NaverLogInView(View):
    def get(self, request):
            ALGORITHM       = 'HS256'
            access_token    = request.headers.get('Authorization')
            profile_request = requests.get(
                "https://openapi.naver.com/v1/nid/me", headers = {"Authorization":f"Bearer {access_token}"},
            )
            profile_json = profile_request.json()
            naver_number = profile_json["response"]["id"]
            
            if AccountGuest.objects.filter(naver_number=naver_number).exists():
                guest       = AccountGuest.objects.get(naver_number=naver_number)
                encoded_jwt = jwt.encode({'guest_id': guest.id},SECRET_KEY, ALGORITHM)
                return JsonResponse({"token": encoded_jwt},status=200)
            else:
                return JsonResponse({"message":"USER_DOES_NOT_EXIST"},status=400)

class KakaoLogInView(View):
    def get(self, request):
            ALGORITHM       = 'HS256'
            access_token    = request.headers.get('Authorization')
            profile_request = requests.get(
                "https://kapi.kakao.com/v2/user/me", headers = {"Authorization":f"Bearer {access_token}"},
            )
            profile_json = profile_request.json()
            kakao_number = profile_json["id"]
            if AccountGuest.objects.filter(kakao_number=kakao_number).exists():
                guest       = AccountGuest.objects.get(kakao_number=kakao_number)
                encoded_jwt = jwt.encode({'guest_id': guest.id},SECRET_KEY, ALGORITHM)
                return JsonResponse({"token": encoded_jwt},status=200)
            else:
                return JsonResponse({"message":"USER_DOES_NOT_EXIST"},status=400)

class GoogleLoginView(View):
    def get(self,request):
        ALGORITHM     = 'HS256'
        access_token  = request.headers.get("Authorization")
        url           = 'https://oauth2.googleapis.com/tokeninfo?id_token='
        response      = requests.get(url+access_token)
        user          = response.json()
        google_number = user['sub']
        if AccountGuest.objects.filter(google_number=google_number).exists(): 
            guest       = AccountGuest.objects.get(google_number=google_number) 
            encoded_jwt = jwt.encode({'guest_id': guest.id},SECRET_KEY, ALGORITHM)
            return JsonResponse({'acess_token' :encoded_jwt },status=200)     
        else: 
            return JsonResponse({"message":"USER_DOES_NOT_EXIST"},status=400)
          
@api_view(['POST'])
def dislikeshop(request):
    data = request.data
    user = get_object_or_404(get_user_model(),pk=request.user)
    shop = get_object_or_404(Shop,pk=data['shop_id'])
    
    if shop not in user.dislike_shop.all():
        user.dislike_shop.add(shop)
        return Response({'message':'dislike shop added'})
    else:
        user.dislike_shop.remove(shop)
        return Response({'message':'dislike shop deleted'})



class MyLikeListViewSet(ModelViewSet):
    serializer_class = MyLikeListSerializer

    def get_queryset(self, request):
        mylikelists = MyLikeList.objects.filter(account_guest_id=request.user)
        return mylikelists
    
    def create(self, request):
        user = get_object_or_404(AccountGuest, pk=request.data['account_guest_id'])
        serializer = self.get_serializer(data = request.data)
        
        if serializer.is_valid():
            serializer.save(account_guest=user)

            return Response({'message':'MylikeList Created'})    

        return Response({'message':'MylikeList Created Fail'})
    
    @action(detail=True, methods=['PUT'])
    def list_update(self, request, pk):
        mylikelist = get_object_or_404(MyLikeList, pk=pk)
        serializer = self.get_serializer(data=request.data, instance=mylikelist)
        
        if serializer.is_valid():
            serializer.save()

            return Response({'message':'MylikeList Updated'})    

        return Response({'message':'MylikeList Updated Fail'})
    
    @action(detail=True, methods=['DELETE'])
    def list_delete(self, request, pk):
        mylikelist = get_object_or_404(MyLikeList, pk=pk)
        mylikelist.delete()

        return Response({'message':'MylikeList Deleted'}) 

class MyLikeListShopViewSet(ModelViewSet):
    serializer_class = MyLikeListShopSerializer

    def create(self, request):
        mylist = get_object_or_404(MyLikeList, pk=request.data['mylist_id'])
        shop = get_object_or_404(Shop, pk=request.data['shop_id'])
        
        serializer = self.get_serializer(data = request.data)
        
        if serializer.is_valid():
            serializer.save(shop_name=shop)
            print(dir(serializer.data))
            # shop.myLikeListShop.add(my_like_list=mylist)
            
            return Response({'message':'MylikeShop Created'})    

        return Response({'message':'MylikeShop Created Fail'})

    # @action(detail=True, methods=['DELETE'])
    # def list_shop_delete(self, request, pk):
        


@transaction.atomic
@api_view(['POST'])
def likeshop(request):
    data = request.data
    user = get_object_or_404(get_user_model(),pk=request.user)
    shop = get_object_or_404(Shop,pk=data['shop_id'])
    
    if shop not in user.like_shop.all():
        user.like_shop.add(shop)
        shop.like_count += 1
        shop.save()
        return Response({'message':'like shop added'})
    else:
        user.like_shop.remove(shop)
        shop.like_count -= 1
        shop.save()
        return Response({'message':'like shop deleted'})

'''
# Python
import json, requests, time, random

# Django
from django.views import View
from django.http import JsonResponse
# from .utils import make_signature
# from . import my_settings

# 네이버 SMS 인증
class SmsSendView(View):
    def send_sms(self, phone_number, auth_number):
        timestamp = str(int(time.time() * 1000))  
        headers = {
            'Content-Type': "application/json; charset=UTF-8", # 네이버 참고서 차용
            'x-ncp-apigw-timestamp': timestamp, # 네이버 API 서버와 5분이상 시간차이 발생시 오류
            'x-ncp-iam-access-key': my_settings.ACCESS_KEY_ID,
            'x-ncp-apigw-signature-v2': make_signature(timestamp) # utils.py 이용
        }
        body = {
            "type": "SMS", 
            "contentType": "COMM",
            "from": "01093500384", # 사전에 등록해놓은 발신용 번호 입력, 타 번호 입력시 오류
            "content": f"[인증번호:{auth_number}]", # 메세지를 이쁘게 꾸며보자
            "messages": [{"to": f"{phone_number}"}] # 네이버 양식에 따른 messages.to 입력
        }
        body = json.dumps(body)
        uri = f'https://sens.apigw.ntruss.com/sms/v2/services/{my_settings.ACCESS_KEY_ID}/messages'
        requests.post(uri, headers=headers, data=body)
        
    def post(self, request):
        data = json.loads(request.body)
        try:
            input_mobile_num = data['phone_number']
            auth_num = random.randint(10000, 100000) # 랜덤숫자 생성, 5자리로 계획하였다.
            auth_mobile = Authentication.objects.get(phone_number=input_mobile_num)
            auth_mobile.auth_number = auth_num
            auth_mobile.save()
            self.send_sms(phone_number=data['phone_number'], auth_number=auth_num)
            return JsonResponse({'message': '인증번호 발송완료'}, status=200)
        except Authentication.DoesNotExist: # 인증요청번호 미 존재 시 DB 입력 로직 작성
            Authentication.objects.create(
                phone_number=input_mobile_num,
                auth_number=auth_num,
            ).save()
            self.send_sms(phone_number=input_mobile_num, auth_number=auth_num)
            return JsonResponse({'message': '인증번호 발송 및 DB 입력완료'}, status=200)

# 네이버 SMS 인증번호 검증
class SMSVerificationView(View):
    def post(self, request):
        data = json.loads(request.body)

        try:
            verification = Authentication.objects.get(phone_number=data['phone_number'])

            if verification.auth_number == data['auth_number']:
                return JsonResponse({'message': '인증 완료되었습니다.'}, status=200)

            else:
                return JsonResponse({'message': '인증 실패입니다.'}, status=400)

        except Authentication.DoesNotExist:
            return JsonResponse({'message': '해당 휴대폰 번호가 존재하지 않습니다.'}, status=400)
'''
