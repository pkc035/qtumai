import json, requests, jwt, hashlib, hmac, base64, time
from random           import randint

from django.db           import transaction
from django.http         import JsonResponse
from django.views        import View
from django.db.models    import Q
from django.shortcuts    import get_object_or_404
from django.contrib.auth import get_user_model
from requests import api

from rest_framework                  import status
from rest_framework.views            import APIView
from rest_framework.response         import Response
from rest_framework.viewsets         import ModelViewSet, ReadOnlyModelViewSet
from rest_framework.decorators       import api_view, action
from rest_framework_simplejwt        import authentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework_simplejwt.views  import TokenObtainPairView
from rest_framework.permissions      import AllowAny, IsAuthenticated


from project.settings.local import SMS_SECRET_KEY, SMS_ACCESS_KEY, SERVICE_ID
from shops.models           import Shop, LikeShopAccounts, Menu
from .models                import AccountGuest, FunData, MyLikeList, Authentication, MyLikeListShop, Preference, LivingArea, KakaoGuest, GoogleGuest, NaverGuest
from .serializers           import (
    FunDataSerializer, MyLikeListSerializer, MyLikeListShopSerializer, 
    CheckUsernameSerializer, LivingAreaUpdateSerializer, AccountGuestUpdateSerializer,
    LivingAreaSreialzer, SimpleAccountGuestSerializer, PreferenceSerializer, SearchLocationSerializer
    )


class TestAPIView(APIView) :
    permission_classes = (AllowAny, )

    def post(self, request): 
        KakaoGuest.objects.create(kakao_number="1212"),
        GoogleGuest.objects.create(google_number="3434")
        return JsonResponse({'message': 'Proceed_with_the_signup'}, status=200)


class CheckUsernameAPIView(APIView):
    permission_classes = (AllowAny, )
    def post(self, request):
        error = CheckUsernameSerializer.validate(AccountGuest, data=request.data)
        if error['username'] :
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        serializer = CheckUsernameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.check(
                validated_data=request.data
            )
            return Response({'username':'success'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NaverLogInView(TokenObtainPairView):
    permission_classes = (AllowAny, )

    def get(self, request):
        access_token    = request.headers.get('Authorization')
        profile_request = requests.get(
            "https://openapi.naver.com/v1/nid/me", 
            headers = {"Authorization":f"Bearer {access_token}"}
        )
        profile_json = profile_request.json()
        naver_number = profile_json["response"]["id"]
        
        if AccountGuest.objects.filter(naver_id=naver_number).exists():
            user = AccountGuest.objects.get(naver_number=naver_number)
            data = {'username' : user.username}
            return Response(self.get_serializer().validate(data),status=status.HTTP_200_OK)

        else:
            NaverGuest.objects.update_or_create(
                naver_number = naver_number,
                defaults     = {
                    'naver_number': naver_number,
                }
            )
            saved_guest = NaverGuest.objects.get(naver_number=naver_number)
            return JsonResponse({"naver_number": saved_guest.id}, status=400)


class KakaoLogInView(TokenObtainPairView):
    permission_classes = (AllowAny, )

    def get(self, request):
        access_token    = request.headers.get('Authorization')
        profile_request = requests.get(
            "https://kapi.kakao.com/v2/user/me",
            headers = {"Authorization":f"Bearer {access_token}"}
        )
        profile_json = profile_request.json()
        kakao_number = profile_json["id"]

        if AccountGuest.objects.filter(kakao_number=kakao_number).exists():
            user = AccountGuest.objects.get(kakao_number=kakao_number)
            data = {'username' : user.username}
            return Response(self.get_serializer().validate(data),status=status.HTTP_200_OK)

        else:
            KakaoGuest.objects.update_or_create(
                kakao_number = kakao_number,
                defaults     = {
                    'kakao_number': kakao_number,
                }
            )
            saved_guest = KakaoGuest.objects.get(kakao_number=kakao_number)
            return JsonResponse({"kakao_number": saved_guest.id}, status=400)


class GoogleLoginView(TokenObtainPairView):
    permission_classes = (AllowAny, )

    def get(self,request):
        access_token  = request.headers.get("Authorization")
        url           = 'https://oauth2.googleapis.com/tokeninfo?id_token='
        response      = requests.get(url+access_token)
        google_user   = response.json()
        google_number = google_user['sub']

        if AccountGuest.objects.filter(google_number=google_number).exists(): 
            user = AccountGuest.objects.get(google_number=google_number)
            data = {'username' : user.username}
            return Response(self.get_serializer().validate(data),status=status.HTTP_200_OK)

        else: 
            GoogleGuest.objects.update_or_create(
                google_number = google_number,
                defaults     = {
                    'google_number': google_number,
                }
            )
            saved_guest = GoogleGuest.objects.get(google_number=google_number)
            return JsonResponse({"google_number": saved_guest.id}, status=400)


class SmsSendView(View):

    def send_sms(self, phone_number, auth_number):
        SMS_URL    = f'https://sens.apigw.ntruss.com/sms/v2/services/{SERVICE_ID}/messages'
        timestamp  = str(int(time.time()*1000))
        secret_key = bytes(SMS_SECRET_KEY, 'utf-8')
        access_key = SMS_ACCESS_KEY
        method = 'POST'
        uri    = f'/sms/v2/services/{SERVICE_ID}/messages'
        message    = method + ' ' + uri + '\n' + timestamp + '\n' + access_key
        message    = bytes(message, 'utf-8')
        signingKey = base64.b64encode(
        hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
        
        # 요청 헤더
        headers    = {
            'Content-Type'             : 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp'    : timestamp,
            'x-ncp-iam-access-key'     : access_key,
            'x-ncp-apigw-signature-v2' : signingKey,
        }

        # 요청 바디
        body       = {
            'type'        : 'SMS',
            'contentType' : 'COMM',
            'countryCode' : '82',
            'from'        : f'01093500384',
            'content'     : f'인증번호 [{auth_number}]를 입력해주세요.',
            'messages'    : [
                {
                'to' : phone_number
                }
            ]
        }
        encoded_data = json.dumps(body)
        requests.post(SMS_URL, headers=headers, data=encoded_data)
    
    #인증번호 요청 api 호출
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
            return JsonResponse({'message':'success'}, status=200)

        except KeyError:
            return JsonResponse({'message': 'Invalide key'}, status=400)
            
        except json.JSONDecodeError as e :
            return JsonResponse({'message': f'Json_ERROR:{e}'}, status=400)


class SMSSignupVerificationView(TokenObtainPairView):#sign_up
    
    def post(self, request):
        data = json.loads(request.body)
        try:
            verification    = Authentication.objects.get(phone_number=data['phone_number'])
            verification_id = verification.id

            if Authentication.objects.filter(phone_number = data['phone_number']).exists():
                if verification.auth_number == data['auth_number']:
                    return JsonResponse({"phone_number":verification_id}, status=200)
                else:
                    return JsonResponse({'message': 'check_auth_number'}, status=400)

        except Authentication.DoesNotExist:
            return JsonResponse({'message': 'proceed_with_the_certification'}, status=400)


class SMSLoginVerificationView(TokenObtainPairView):#login

    def post(self, request):
        data = json.loads(request.body)
        try:
            verification    = Authentication.objects.get(phone_number=data['phone_number'])
            if AccountGuest.objects.filter(phone_number = data['phone_number']).exists():
                if verification.auth_number == data['auth_number']:
                    username = AccountGuest.objects.get(phone_number=data['phone_number'])
                    data = {'username' : username.username}
                    return Response(self.get_serializer().validate(data),status=status.HTTP_200_OK)
                else:
                    return JsonResponse({'message': 'wrong_auth_number'}, status=400)
            else :
                return JsonResponse({'message': 'Proceed_with_the_signup'}, status=400)

        except Authentication.DoesNotExist:
            return JsonResponse({'message': 'phone_number_does_not_exist.'}, status=400)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def dislikeshop(request):
    data = request.data
    user = get_object_or_404(get_user_model(), pk=request.user)
    shop = get_object_or_404(Shop, pk=data['shop_id'])
    
    if shop not in user.dislike_shop.all():
        user.dislike_shop.add(shop)
        return Response({'message': 'dislike shop added'})

    else:
        user.dislike_shop.remove(shop)
        return Response({'message':'dislike shop deleted'})


class MyLikeListViewSet(ModelViewSet):
    serializer_class = MyLikeListSerializer

    def get_queryset(request):
        # mylikelists = MyLikeList.objects.filter(account_guest_id=request.user)
        mylikelists = MyLikeList.objects.filter(account_guest_id=1)
        return mylikelists

    # def list(self, request):
    #     # mylikelists = MyLikeList.objects.filter(account_guest_id=request.user)
    #     mylikelists = MyLikeList.objects.filter(account_guest_id=1)
    #     serializer  = self.get_serializer(mylikelists, many=True) 
    
    #     return Response(serializer.data)

    def create(self, request):
        # user       = get_object_or_404(AccountGuest, pk=request.user)
        user       = get_object_or_404(AccountGuest, pk=1)
        serializer = self.get_serializer(data=request.data)        
        
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
    
    @transaction.atomic
    @action(detail=True, methods=['DELETE'])
    def list_delete(self, request, pk):
        mylikelist = get_object_or_404(MyLikeList, pk=pk)
        likeshop   = LikeShopAccounts.objects.filter(
            Q(guest_id=1)|Q(shop_id=mylikelist.mylikelistshop_set.all().first().shop_id)
        ) 
        mylikelist.mylikelistshop_set.all().delete()
        likeshop.delete()
        mylikelist.delete()

        return Response({'message':'MyLikeList Deleted'}) 


class MyLikeListShopViewSet(ModelViewSet):
    serializer_class = MyLikeListShopSerializer

    #mylist 1개 선택
    # @transaction.atomic
    # def create(self, request):
    #     mylist = get_object_or_404(MyLikeList, pk=request.data['mylist_id'])
    #     shop   = get_object_or_404(Shop, pk=request.data['shop_id'])
    #     user   = get_object_or_404(get_user_model(),pk=1)
        
    #     serializer = self.get_serializer(data = request.data)
        
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save(my_like_list=mylist, shop=shop)
    #         LikeShopAccounts.objects.create(shop=shop, guest=user)
    #         shop.like_count += 1
    #         shop.save()

    #         return Response({'message':'MylikeShop Created'})    

    #     return Response({'message':'MylikeShop Created Fail'})

    #Mylist 여러개
    @transaction.atomic
    def create(self, request):
        user    = get_object_or_404(get_user_model(),pk=1)
        shop    = get_object_or_404(Shop, pk=request.data['shop_id'])
        mylists = request.data['mylist_id']
        
        for mylist_id in mylists:
            request.data['mylist_id'] = mylist_id
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid(raise_exception=True):
                serializer.save(my_like_list_id=mylist_id, shop=shop)
                LikeShopAccounts.objects.create(shop=shop, guest=user)

        shop.like_count += 1
        shop.save()
        return Response({'message':'MylikeShop Created'})    

    @transaction.atomic
    @action(detail=True, methods=['DELETE'])
    def like_shop_delete(self, request, pk):
        shop           = get_object_or_404(Shop, pk=request.data['shop_id'])
        user           = get_object_or_404(get_user_model(), pk=1) 
        likeshop       = get_object_or_404(LikeShopAccounts, shop=shop, guest=user)
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
    user = get_object_or_404(get_user_model(), pk=request.user)
    shop = get_object_or_404(Shop, pk=data['shop_id'])
    
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
        user       = get_object_or_404(get_user_model(), pk=1) 
        menu       = get_object_or_404(Menu, pk=request.data['menu_id'])
        fundata    = FunData.objects.filter(Q(account_guest=user)|Q(menu=menu))
        
        if not fundata.exists():
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(menu=menu, account_guest=user)
                serializer.instance.account_guest.fun_data_count += 1
                serializer.instance.account_guest.save()
                return Response({'message':'Fun Created'})
            return Response({'message':'Fun Create Fail'})

        else:
            serializer = self.get_serializer(data=request.data, instance=fundata.first())
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({'message':'Fun Updated'})
            return Response({'message':'Fun Update Fail'})    

class CreatePreferenceAPIView(TokenObtainPairView):
    permission_classes = (AllowAny, )

    def post(self, request):
        norm_data, area_data, pref_data = request.data['normal_data'], request.data['area_data'], request.data['pref_data']
        area_serializer = LivingAreaSreialzer(data=area_data)
        norm_serializer = SimpleAccountGuestSerializer(data=norm_data)
        pref_serializer = PreferenceSerializer(data=pref_data)
        try:
            if area_serializer.is_valid():
                area_serializer.update(
                    area_name = area_data['area_name'],
                )
                print('area ok================s=======')

            if norm_serializer.is_valid():
                living_area_id = LivingArea.objects.get(area_name=area_data['area_name']).id
                norm_serializer.create(
                    validated_data = norm_data,
                    living_area_id = living_area_id
                )
                print('norm ok=======================')

            if pref_serializer.is_valid():
                print('valid_: ', pref_data)
                account_guest_id = AccountGuest.objects.get(username=request.data['normal_data']['username']).id
                pref_serializer.create(
                    validated_data   = pref_data,
                    account_guest_id = account_guest_id
                )
                print('pref ok=======================')

                user = AccountGuest.objects.get(username=request.data['normal_data']['username'])
                data = {'username' : user.username}
                return Response(self.get_serializer().validate(data),status=status.HTTP_201_CREATED)
            return Response(pref_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Authentication.DoesNotExist:
            return Response({'message':'query_does_not_exist'},status=status.HTTP_400_BAD_REQUEST)


class AccountGuestUpdateViewSet(ModelViewSet):
    def list(self, request):
        preference = get_object_or_404(Preference,account_guest=request.account)
        serializer_account    = AccountGuestUpdateSerializer(request.account, many=False)
        serializer_preference = PreferenceSerializer(preference, many=False)
        serializer_livingarea = LivingAreaUpdateSerializer(request.account.living_area, many=False)

        result = {
            'account'    : serializer_account.data,
            'preference' : serializer_preference.data,
            'livingarea' : serializer_livingarea.data
        }
        return Response(result)
    
    def partial_update(self, request):
        preference    = get_object_or_404(Preference,account_guest=request.account)

        if request.data.get('is_account_updated') ==  'True':
            serializer = AccountGuestUpdateSerializer(request.account, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

        if request.data.get('is_preference_updated') == 'True':            
            serializer = PreferenceSerializer(preference, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

        if request.data.get('is_living_area_updated') == 'True':
            serializer = LivingAreaUpdateSerializer(request.account.living_area, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save(account=request.account)        

        return Response({'message' : 'SUCCESS'})

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetLocationViewSet(ReadOnlyModelViewSet):
    permission_classes = (AllowAny, )

    def list(self, request):
        keyword = request.query_params.get('keyword')
        area = LivingArea.objects.filter(area_name__contains=keyword)
        serializer = SearchLocationSerializer(area, many=True)
        return Response(serializer.data)