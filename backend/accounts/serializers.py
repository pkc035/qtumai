from django.contrib.auth import models
from django.db.models    import Q

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models           import (
    AccountGuest, Authentication, KakaoGuest, GoogleGuest, NaverGuest,
    LivingArea, Preference,FunData, MyLikeList, MyLikeListShop
    )


class SearchLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LivingArea
        fields = ['id', 'area_name']

class LivingAreaSreialzer(serializers.ModelSerializer):

    class Meta:
        model = LivingArea
        fields = [
            'id', 
            'area_name', 
            'people_count'
            ]
    
    def update(self, area_name):
        if LivingArea.objects.filter(area_name=area_name).exists():
            print('area1: ')
            area = LivingArea.objects.get(area_name=area_name)
            print('area2: ', area)
            area.people_count = area.people_count + 1
            area.save()
        else:
            area = LivingArea.objects.create(
                    area_name    = area_name,
                    people_count = 1
                )    
        return area

class CheckUsernameSerializer(serializers.ModelSerializer) :
    class Meta:
        model = AccountGuest
        fields = ['id','username']

    def validate(self, data):
        error     = dict({'username' : []})
        non_alpha = set([s for s in "!@#$%^&*()|-=_+\[]{};':\",./?>< "])
        if AccountGuest.objects.filter(username=data['username']).exists()==True:
            error['username'].append('중복된 닉네임이 있습니다.')
        if not (2 < len(data['username']) < 16):  # username length error: 5 
            error['username'].append('닉네임을 1 ~ 16 글자로 해주세요!')
        for word in data['username']: # non_alph in username: 6
            if word in non_alpha:
                error['username'].append('username에 특수문자를 넣지 말아주세요!')
                break
        return error    

    def check(self, validated_data):
        if AccountGuest.objects.filter(username=validated_data['username']).exists() == False:
            return validated_data



class SimpleAccountGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountGuest
        fields = (
            'living_area_id',
            'phone_number', 
            'kakao_number', 
            'google_number', 
            'naver_number', 
            'username', 
            'gender', 
            'birthday', 
            'agreed_marketing_receive'
            )
    
    def create(self, validated_data, living_area_id):

        phone_number  = validated_data['phone_number']
        kakao_number  = validated_data['kakao_number']
        google_number = validated_data['google_number']
        naver_number  = validated_data['naver_number']

        if validated_data['phone_number'] != "" : 
            AccountGuest.objects.create(
                living_area_id           = living_area_id,
                phone_number             = Authentication.objects.get(id=phone_number[0]).phone_number,
                kakao_number             = validated_data.get(None),
                google_number            = validated_data.get(None),
                naver_number             = validated_data.get(None),
                username                 = validated_data['username'],
                gender                   = validated_data['gender'],
                birthday                 = validated_data['birthday'],
                agreed_marketing_receive = validated_data['agreed_marketing_receive']
            )
        if validated_data['kakao_number'] != "" :
            AccountGuest.objects.create(
                living_area_id           = living_area_id,
                phone_number             = validated_data.get(None),
                kakao_number             = KakaoGuest.objects.get(id=kakao_number[0]).kakao_number,
                google_number            = validated_data.get(None),
                naver_number             = validated_data.get(None),
                username                 = validated_data['username'],
                gender                   = validated_data['gender'],
                birthday                 = validated_data['birthday'],
                agreed_marketing_receive = validated_data['agreed_marketing_receive']
            )
        if validated_data['google_number'] != "" :
            AccountGuest.objects.create(
                living_area_id           = living_area_id,
                phone_number             = validated_data.get(None),
                kakao_number             = validated_data.get(None),
                google_number            = GoogleGuest.objects.get(id=google_number[0]).google_number,
                naver_number             = validated_data.get(None),
                username                 = validated_data['username'],
                gender                   = validated_data['gender'],
                birthday                 = validated_data['birthday'],
                agreed_marketing_receive = validated_data['agreed_marketing_receive']
            )
        if validated_data['naver_number'] != "" :
            AccountGuest.objects.create(
                living_area_id           = living_area_id,
                phone_number             = validated_data.get(None),
                kakao_number             = validated_data.get(None),
                google_number            = validated_data.get(None),
                naver_number             = NaverGuest.objects.get(id=naver_number[0]).naver_number,
                username                 = validated_data['username'],
                gender                   = validated_data['gender'],
                birthday                 = validated_data['birthday'],
                agreed_marketing_receive = validated_data['agreed_marketing_receive']
            )

class MyLikeListShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyLikeListShop
        fields = ['id','shop']

class MyLikeListSerializer(serializers.ModelSerializer):
    mylikeshop_list = serializers.SerializerMethodField()
    
    class Meta:
        model = MyLikeList
        fields = ['id', 'list_name', 'mylikeshop_list']

    def get_mylikeshop_list(self,obj):
        mylikeshops = obj.mylikelistshop_set.all()
        shops_data  = [{
            "id"             : mylikeshop.id,
            "shop_id"        : mylikeshop.shop.id,
            "shop_name"      : mylikeshop.shop.shop_name,
            "coupon_content" : [coupon.coupon_content for coupon in mylikeshop.shop.coupon_set.all()]
        } for mylikeshop in mylikeshops]

        return shops_data
    

class FunDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunData
        fields = ['account_guest', 'menu', 'score']

class PreferenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Preference
        fields = [
            'account_guest_id',
            'taste_service',
            'taste_cleanliness',
            'taste_vibe',
            'taste_price',
            'service_cleanliness',
            'service_vibe',
            'service_price',
            'cleanliness_vibe',
            'cleanliness_price',
            'vibe_price',
            ]
    
    def create(self, validated_data, account_guest_id):
 
        Preference.objects.create(
            account_guest_id    = account_guest_id,
            taste_service       = validated_data['taste_service'],
            taste_cleanliness   = validated_data['taste_cleanliness'],
            taste_vibe          = validated_data['taste_vibe'],
            taste_price         = validated_data['taste_price'],
            service_cleanliness = validated_data['service_cleanliness'],
            service_vibe        = validated_data['service_vibe'],
            service_price       = validated_data['service_price'],
            cleanliness_vibe    = validated_data['cleanliness_vibe'],
            cleanliness_price   = validated_data['cleanliness_price'],
            vibe_price          = validated_data['vibe_price']
        )
        return validated_data, account_guest_id

    def update(self, instance, validated_data):
        instance.taste_service       = validated_data.get('taste_service')
        instance.taste_cleanliness   = validated_data.get('taste_cleanliness')
        instance.taste_vibe          = validated_data.get('taste_vibe')
        instance.taste_price         = validated_data.get('taste_price')
        instance.service_cleanliness = validated_data.get('service_cleanliness')
        instance.service_vibe        = validated_data.get('service_vibe')
        instance.service_price       = validated_data.get('service_price')
        instance.cleanliness_vibe    = validated_data.get('cleanliness_vibe')
        instance.cleanliness_price   = validated_data.get('cleanliness_price')
        instance.vibe_price          = validated_data.get('vibe_price')
        instance.save()

        return instance

class LivingAreaUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = LivingArea
        fields = '__all__'

    def update(self, instance, validated_data):
        account = validated_data.pop('account')
        instance, created = LivingArea.objects.update_or_create(
            area_name = validated_data['area_name'],
            defaults= {
                'area_name' : validated_data['area_name'],
                'latitude'  : validated_data['latitude'],
                'longitude' : validated_data['longitude']
            }
        )
        account.living_area = instance
        account.save()
        instance.people_count = instance.accountguest_set.count()
        instance.save()
        
        return instance

class AccountGuestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AccountGuest
        fields = ['profile_img_path']

    def update(self, instance, validated_data):
        instance.profile_img_path = validated_data.get('profile_img_path')

        return instance

class TestTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].required = False

    def validate(self, attrs):
            attrs.update({'password': ''})
            return super(TestTokenObtainPairSerializer, self).validate(attrs)