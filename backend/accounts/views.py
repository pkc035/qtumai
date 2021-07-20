from random import randint
import hashlib
import hmac
import base64
import time
from django.contrib.auth.models import User
import json, requests, jwt
from django.http import JsonResponse
from django.views        import View
from django.db           import router, transaction
from django.db.models    import F
from django.http         import response
from django.shortcuts    import get_object_or_404, render
from django.contrib.auth import get_user_model

from .models import AccountGuest, Authentication, LivingArea, Preference
from .serializers     import AccountGuestSerializer, AccountGuestUpdateSerializer, LivingAreaUpdateSerializer, PreferenceUpdateSerializer
from shops            import models
from project.settings import SECRET_KEY
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.views      import APIView
from rest_framework            import viewsets
from rest_framework.decorators import api_view
from rest_framework.response   import Response
from rest_framework import status
from .serializers import AccountGuestSerializer
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

class SmsSendView(View):

    def send_sms(self, phone_number, auth_number):
        SMS_URL    = 'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:269894851113:load_pick/messages'

        timestamp  = str(int(time.time()*1000))
        secret_key = bytes('GxiBDMOuo9d2uxLJFQET9nv6ri6xXy2SjKeEhUwe', 'utf-8')
        access_key = 'RzM9uKUwbJvqFqCAYvah'
        method = 'POST'
        uri    = '/sms/v2/services/ncp:sms:kr:269894851113:load_pick/messages'
        message    = method + ' ' + uri + '\n' + timestamp + '\n' + access_key
        
        message    = bytes(message, 'utf-8')
        signingKey = base64.b64encode(
        hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
        
        # 요청 헤더
        headers    = {
        'Content-Type'             : 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp'    : timestamp,
        'x-ncp-iam-access-key'     : 'RzM9uKUwbJvqFqCAYvah',
        'x-ncp-apigw-signature-v2' : signingKey,
        }

        # 요청 바디
        body       = {
        'type'        : 'SMS',
        'contentType' : 'COMM',
        'countryCode' : '82',
        'from'        : f'01095953168',
        'content'     : f'인증번호 [{auth_number}]를 입력해주세요.',
        'messages'    : [
            {
            'to' : phone_number
            }
        ]
        }
        encoded_data = json.dumps(body)
        requests.post(SMS_URL, headers=headers, data=encoded_data)

    def post(self, request):
        try:
            data = json.loads(request.body)
            phone_number = data['phone_number']
            auth_number = str(randint(10000, 100000))

            Authentication.objects.update_or_create(
            phone_number = phone_number,
            defaults     = {
                'phone_number': phone_number,
                'auth_number' : auth_number
            }
            )

            self.send_sms(
                phone_number = phone_number,
                auth_number  = auth_number
            )
            return JsonResponse({'message':'success'},status=200)

        except KeyError:
            return JsonResponse({'message' : 'Invalide key'}, status=400)
        except json.JSONDecodeError as e :
            return JsonResponse({'MESSAGE': f'Json_ERROR:{e}'}, status=400)

class SMSVerificationView(View):
    def post(self, request):
        data = json.loads(request.body)

        try:
            verification = Authentication.objects.get(phone_number=data['phone_number'])

            if verification.auth_number == data['auth_number']:
                return JsonResponse({'phone_number':data['phone_number']}, status=200)

            else:
                return JsonResponse({'message': '인증 실패입니다.'}, status=400)

        except Authentication.DoesNotExist:
            return JsonResponse({'message': '해당 휴대폰 번호가 존재하지 않습니다.'}, status=400)
          
@api_view(['POST'])
def dislikeshop(request):
    data = request.data
    user = get_object_or_404(get_user_model(),pk=request.user)
    shop = get_object_or_404(models.Shop,pk=data['shop_id'])
    
    if shop not in user.dislike_shop.all():
        user.dislike_shop.add(shop)
        return Response({'message':'dislike shop added'})
    else:
        user.dislike_shop.remove(shop)
        return Response({'message':'dislike shop deleted'})


@transaction.atomic
@api_view(['POST'])
def likeshop(request):
    data = request.data
    user = get_object_or_404(get_user_model(),pk=request.user)
    shop = get_object_or_404(models.Shop,pk=data['shop_id'])
    
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

@api_view(['PATCH'])
def update_account_guest(request):
    try:
        preference    = Preference.objects.get(account_guest=request.account)

        if request.data.get('is_account_updated') ==  'True':
            serializer = AccountGuestUpdateSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.update(request.account, request.data)

        if request.data.get('is_preference_updated') == 'True':            
            serializer = PreferenceUpdateSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.update(instance=preference, data=request.data)

        if request.data.get('is_living_area_updated') == 'True':
            serializer = LivingAreaUpdateSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.update_or_create(data=request.data, account=request.account)        

        return Response({'message' : 'Success'})
    
    except Preference.DoesNotExist:
        return Response({'message' : 'Preference Does Not Exist'}, status=400)