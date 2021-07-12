from django.contrib.auth.models import User
from shops import serializers
import requests, jwt
from django.http import response
from django.shortcuts import get_object_or_404, render
from django.contrib.auth import get_user_model
from rest_framework import viewsets
import shops
from .serializers import AccountGuestSerializer, UserSerializer
from .models import AccountGuest
from shops import models
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http      import JsonResponse
from django.views     import View
from project.settings import SECRET_KEY
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = AccountGuestSerializer
    def get_queryset(self):
        queryset = AccountGuest.objects.all()
        return queryset


@api_view(['POST'])
def signup(request):
    error = UserSerializer.validate(get_user_model(), data=request.data)
    if error['password'] or error['username'] or error['email']:
        return Response(error, status=400)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = UserSerializer.create(get_user_model(), request.data)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class KakaoLogInView(View):
    def get(self, request):
            access_token    = request.headers.get('Authorization')
            profile_request = requests.get(
                "https://kapi.kakao.com/v2/user/me", headers={"Authorization":f"Bearer {access_token}"},
            )
            profile_json  = profile_request.json()
            kakao_number  = profile_json["id"]

            if AccountGuest.objects.filter(kakao_number=kakao_number).exists():
                guest = AccountGuest.objects.get(kakao_number=kakao_number)
                token = jwt.encode({"guest_id":guest.id}, SECRET_KEY, ALGORITHM='HS256')
                return JsonResponse({"token": token},status=200)

            else:
                result={'kakao_number':kakao_number}
                return JsonResponse(result,status=400)


class GoogleLoginView(View):
    def get(self,request):
        access_token    = request.headers.get("Authorization")
        url      = 'https://oauth2.googleapis.com/tokeninfo?id_token='
        response = requests.get(url+access_token)
        user     = response.json()
        if AccountGuest.objects.filter(google_number = user['sub']).exists(): 
            guest           = AccountGuest.objects.get(google_number=user['sub']) 
            encoded_jwt         = jwt.encode({'guest_id': guest.id},SECRET_KEY, ALGORITHM='HS256')
            return JsonResponse({ 
                'access_token'  : encoded_jwt.decode('UTF-8')}, status=200)     

        else: 
            return JsonResponse({"message":"USER_DOES_NOT_EXIST"},status=400)
          
          
@api_view(['POST'])
def dislikeshop(request):
    data = request.data
    user = get_object_or_404(get_user_model(),pk=request.user)
    shop = get_object_or_404(models.Shop,pk=data['shop_id'])
    
    if shop not in user.dislike_shop.all():
        user.dislike_shop.add(shop)
        return Response({'message':'dislike shop added'})
    else :
        user.dislike_shop.remove(shop)
        return Response({'message':'dislike shop deleted'})

@api_view(['GET','POST'])
def review_create(request):
    if request.method == 'GET':
        reviews = models.Review.objects.all()
        serializer = serializers.ReviewSerializer(reviews, many=True)

        return Response(serializer.data)

    else:
        serializer = serializers.ReviewSerializer(data = request.data)
        shop = models.Shop.objects.get(id=request.data['shop_id'])
        user = User.objects.get(id=request.user)
        shop.review_count += 1
        user.review_count += 1
        shop.save()
        user.save()
        models.Review.objects.create(**serializer.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({'message':'Reivew Created'})

@api_view(['PUT','DELETE'])
def review_command(request,review_id):
    review = get_object_or_404(models.Review, pk=review_id)
    shop = models.Shop.objects.get(id=review.shop_id)
    
    if request.method == 'PUT':    
        serializer = serializers.ReviewSerializer(data=request.data, instance=review)

        if serializer.is_valid(raise_exception=True):
            serializer.save()

        return Response({'message':'Review Updated'})
        
    else:
        user = User.objects.get(id=request.user)
        shop.review_count -= 1
        user.review_count -= 1
        shop.save()
        user.save()
        review.delete()

        return Response({'message':'Review Deleted'})

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
