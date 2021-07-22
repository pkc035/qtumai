from django.contrib.auth import models
from django.db.models import F, fields
from django.db.models import Q
from django.db.models.query import InstanceCheckMeta

from rest_framework import serializers
from .models      import AccountGuest, FunData, LivingArea, MyLikeList, MyLikeListShop, LivingArea, Preference

class LivingAreaSreialzer(serializers.ModelSerializer):

    class Meta:
        model = LivingArea
        fields = ['id', 'area_name', 'people_count','latitude','longitude']
    
    def create(self, area_name, latitude, longitude):
        if LivingArea.objects.filter(# 같은 지명을 사용 할 경우, 위도,경도 일치여부 확인
                Q(area_name=area_name)&
                Q(latitude=latitude)&
                Q(longitude=longitude)
            ).exists():
            print('area1: ')
            area = LivingArea.objects.get(area_name=area_name)
            print('area2: ', area)
            area.people_count = area.people_count + 1
            area.save()
        else:
            area = LivingArea.objects.create(
                    area_name=area_name,
                    people_count=1, 
                    latitude=latitude, 
                    longitude=longitude
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
            'phone_number', 
            'kakao_number', 
            'google_number', 
            'naver_number', 
            'username', 
            'gender', 
            'birthday', 
            'agreed_marketing_receive'
            )
    
    def create(self, validated_data):
        AccountGuest.objects.create(
            phone_number = validated_data.get('phone_number', None),
            kakao_number = validated_data.get('kakao_number', None),
            google_number = validated_data.get('google_number', None),
            naver_number = validated_data.get('naver_number', None),
            username = validated_data['username'],
            gender = validated_data['gender'],
            birthday = validated_data['birthday'],
            agreed_marketing_receive = validated_data['agreed_marketing_receive']
            )


class AccountGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountGuest
        fields = (
            'id',
            'phone_number', 
            'kakao_number',
            'google_number',
            'naver_number',
            'username',
            'gender',
            'birthday',
            'agreed_marketing_receive'
            )
        extra_kwargs = {'area_name':{'write_only':True}}


    def create(self, validated_data, area_name, latitude, longitude):

        if LivingArea.objects.filter(# 같은 지명을 사용 할 경우, 위도,경도 일치여부 확인
                Q(area_name=area_name)&
                Q(latitude=latitude)&
                Q(longitude=longitude)
            ).exists():
            area = LivingArea.objects.get(area_name=area_name)
            area.people_count= area.people_count + 1
            area.save()
            AccountGuest.objects.create(
                phone_number             = validated_data.get("phone_number", None),
                kakao_number             = validated_data.get("kakao_number", None),
                google_number            = validated_data.get("google_number", None),
                naver_number             = validated_data.get("naver_number", None),
                username                 = validated_data["username"],
                gender                   = validated_data["gender"],
                birthday                 = validated_data["birthday"],
                agreed_marketing_receive = validated_data["agreed_marketing_receive"],
                area_name                = area
            )
        else:
            area = LivingArea.objects.create(
                area_name=area_name,
                people_count=1, 
                latitude=latitude, 
                longitude=longitude
                )      
            AccountGuest.objects.create(
                phone_number             = validated_data.get("phone_number", None),
                kakao_number             = validated_data.get("kakao_number", None),
                google_number            = validated_data.get("google_number", None),
                naver_number             = validated_data.get("naver_number", None),
                username                 = validated_data["username"],
                gender                   = validated_data["gender"],
                birthday                 = validated_data["birthday"],
                agreed_marketing_receive = validated_data["agreed_marketing_receive"],
                area_name                = area,

        )
        return validated_data

class MyLikeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyLikeList
        fields = ['id', 'list_name']

class MyLikeListShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyLikeListShop
        fields = ['id', 'shop']

class FunDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunData
        fields = ['account_guest', 'menu', 'score']
    # def validate(self, data):
    #     non_alpha = set([s for s in "!@#$%^&*()|-=_+\[]{};':\",./?><"])
    #     error     = dict({'username' : [],'number':[]})
    #     if AccountGuest.objects.filter(
    #          username= data['username']
    #         ).exists(): # same username in db : 4
    #         error['username'].append('중복된 닉네임이 있습니다.')
    #     if AccountGuest.objects.filter(
    #         kakao_number=data['kakao_number'] 
    #         ).exists(): # same username in db : 4
    #         error['username'].append('중복된 휴대폰번호, 소셜아이디가 있습니다.')
    #     if not 1 < len(data['username']) < 16:  # username length error: 5 
    #         error['username'].append('닉네임을 2 ~ 15 글자로 해주세요!')
    #     for word in data['username']: # non_alph in username: 6
    #         if word in non_alpha:
    #             error['username'].append('username에 특수문자를 넣지 말아주세요!')
    #             break
    #     if AccountGuest.objects.filter(phone_number=data['phone_number']).exists() : 
    #         error['phone_number'].append('이미 등록된 전화번호입니다.')

    #     return error

    

class PreferenceSerializer(serializers.ModelSerializer):
    # account_guest = serializers.PrimaryKeyRelatedField(many=True)
    # account_guest = AccountGuestSerializer()
    class Meta:
        model = Preference
        fields = [
            'account_guest',
            'taste_service',
            'taste_cleanliness',
            'taste_vibe',
            'taste_price',
            'service_cleanliness',
            'service_vibe',
            'service_price',
            'cleanliness_vibe',
            'cleanliness_price',
            'vibe_price'
            ]

        # extra_kwargs = {'living_area':{'write_only':True}}

    def create(self, validated_data):
        Preference.objects.create(
            account_guest_id = validated_data['account_guest_id'],
            taste_service = validated_data['taste_service'], 
            taste_cleanliness= validated_data['taste_cleanliness'],
            taste_vibe= validated_data['taste_vibe'],
            taste_price= validated_data['taste_price'],
            service_cleanliness= validated_data['service_cleanliness'],
            service_vibe= validated_data['service_vibe'],
            service_price= validated_data['service_price'],
            cleanliness_vibe= validated_data['cleanliness_vibe'],
            cleanliness_price= validated_data['cleanliness_price'],
            vibe_price= validated_data['vibe_price']
        )
        return validated_data

    def update(self, validated_data):

        Preference.objects.update(
            account_guest_id = validated_data['account_guest'],
            taste_service = validated_data['taste_service'], 
            taste_cleanliness= validated_data['taste_cleanliness'],
            taste_vibe= validated_data['taste_vibe'],
            taste_price= validated_data['taste_price'],
            service_cleanliness= validated_data['service_cleanliness'],
            service_vibe= validated_data['service_vibe'],
            service_price= validated_data['service_price'],
            cleanliness_vibe= validated_data['cleanliness_vibe'],
            cleanliness_price= validated_data['cleanliness_price'],
            vibe_price= validated_data['vibe_price']
        )
        return validated_data

        # fields = (
        #     'account_guest',
        #     'taste_service', 
        #     'taste_cleanliness',
        #     'taste_vibe',
        #     'taste_price',
        #     'service_cleanliness',
        #     'service_vibe',
        #     'service_price',
        #     'cleanliness_vibe',
        #     'cleanliness_price',
        #     'vibe_price'
        #     )
        



    # def validate(self, data):
    #     non_alpha = set([s for s in "!@#$%^&*()|-=_+\[]{};':\",./?><"])
    #     error     = dict({'username' : [],'phone_number':[]})
    #     if AccountGuest.objects.filter(username= data['username']).exists(): # same username in db : 4
    #         error['username'].append('중복된 닉네임이 있습니다.')
    #     if not 0 < len(data['username']) < 16:  # username length error: 5 
    #         error['username'].append('닉네임을 1 ~ 16 글자로 해주세요!')
    #     for word in data['username']: # non_alph in username: 6
    #         if word in non_alpha:
    #             error['username'].append('username에 특수문자를 넣지 말아주세요!')
    #             break
    #     if AccountGuest.objects.filter(phone_number=data['phone_number']).exists() : 
    #         error['phone_number'].append('이미 등록된 전화번호입니다.')

    #     return error

class PreferenceUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Preference
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.taste_service       = validated_data.get('taste_service', F('taste_service'))
        instance.taste_cleanliness   = validated_data.get('taste_cleanliness', F('taste_cleanliness'))
        instance.taste_vibe          = validated_data.get('taste_vibe', F('taste_vibe'))
        instance.taste_price         = validated_data.get('taste_price', F('taste_price'))
        instance.service_cleanliness = validated_data.get('service_cleanliness', F('service_cleanliness'))
        instance.service_vibe        = validated_data.get('service_vibe', F('service_vibe'))
        instance.service_price       = validated_data.get('service_price', F('service_price'))
        instance.cleanliness_vibe    = validated_data.get('cleanliness_vibe', F('cleanliness_vibe'))
        instance.cleanliness_price   = validated_data.get('cleanliness_price', F('cleanliness_price'))
        instance.vibe_price          = validated_data.get('vibe_price', F('vibe_price'))        
        instance.save()
        return instance

        return instance

class AccountGuestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = AccountGuest
        fields = ['username', 'phone_number']

    def update(self, instance, validated_data):
        instance.phone_number = validated_data.get('phone_number', F('phone_number'))
        instance.username     = validated_data.get('usernamee', F('username'))
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
