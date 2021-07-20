import json, requests, jwt, hashlib, hmac, base64, time

from django.http         import JsonResponse
from django.views        import View
from django.db           import transaction
from django.shortcuts    import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models    import Q


from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.views      import APIView
from rest_framework.viewsets   import ModelViewSet
from rest_framework.decorators import api_view, action
from rest_framework.response   import Response
from rest_framework             import status

from project.settings import SECRET_KEY
from random           import randint
from shops.models     import Shop, LikeShopAccounts, Menu
from .models          import AccountGuest, MyLikeList, Authentication, MyLikeListShop
from .serializers     import AccountGuestSerializer, FunDataSerializer, MyLikeListSerializer, MyLikeListShopSerializer

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
        user       = get_object_or_404(AccountGuest, pk=request.data['account_guest_id'])
        serializer = self.get_serializer(data = request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(account_guest=user)

            return Response({'message':'MylikeList Created'})    

        return Response({'message':'MylikeList Created Fail'})
    
    @action(detail=True, methods=['PUT'])
    def list_update(self, request, pk):
        mylikelist = get_object_or_404(MyLikeList, pk=pk)
        serializer = self.get_serializer(data=request.data, instance=mylikelist)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            return Response({'message':'MylikeList Updated'})    

        return Response({'message':'MylikeList Updated Fail'})
    
    @action(detail=True, methods=['DELETE'])
    def list_delete(self, request, pk):
        mylikelist = get_object_or_404(MyLikeList, pk=pk)
        mylikelist.delete()

        return Response({'message':'MyLikeList Deleted'}) 

class MyLikeListShopViewSet(ModelViewSet):
    serializer_class = MyLikeListShopSerializer

    # def retrieve(self, request, pk):
    #     shop   = get_object_or_404(Shop, pk=pk)
    #     user   = get_object_or_404(get_user_model(),pk=1)

    #     if MyLikeListShop.objects.filter(Q(shop=shop)|Q(guest=user)):
    #         return Response({'MyLikeShop_Status': True})
    #     else:
    #         return Response({'MyLikeShop_Status': False})
    
    @transaction.atomic
    def create(self, request):
        mylist = get_object_or_404(MyLikeList, pk=request.data['mylist_id'])
        shop   = get_object_or_404(Shop, pk=request.data['shop_id'])
        user   = get_object_or_404(get_user_model(),pk=1)
        
        serializer = self.get_serializer(data = request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save(my_like_list=mylist, shop=shop)
            LikeShopAccounts.objects.create(shop=shop, guest=user)
            shop.like_count += 1
            shop.save()

            return Response({'message':'MylikeShop Created'})    

        return Response({'message':'MylikeShop Created Fail'})
    
    @transaction.atomic
    @action(detail=True, methods=['DELETE'])
    def like_shop_delete(self, request, pk):
        shop           = get_object_or_404(Shop, pk=request.data['shop_id'])
        user           = get_object_or_404(get_user_model(),pk=1) 
        likeshop       = get_object_or_404(LikeShopAccounts, shop=shop, guest_id=user)
        mylikelistshop = get_object_or_404(MyLikeListShop, pk=pk)
        mylikelistshop.delete()
        likeshop.delete()
        shop.like_count -= 1
        shop.save()

        return Response({'message':'MyLikeListShop Deleted'})

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

class FunDataViewSet(ModelViewSet):
    serializer_class = FunDataSerializer

    def create(self, request):
        # user = get_object_or_404(get_user_model(), pk=request.user)
        user       = get_object_or_404(get_user_model(),pk=1) 
        menu       = get_object_or_404(Menu, pk=request.data['menu_id'])
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(menu=menu)

            print(dir(serializer.instance.account_guest))
            print(serializer.instance.account_guest.add(guest=user))
            
            return Response({'message':'Fun Created'})

        return Response({'message':'Fun Create Fail'})
