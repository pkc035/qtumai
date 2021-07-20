from django.db.models import fields, F
from django.db.models.fields import EmailField
from rest_framework import validators
from shops.models import Shop
from rest_framework import serializers
from .models import AccountGuest, LivingArea, Preference
from django.contrib.auth import authenticate, get_user_model
from . import models

from rest_framework.validators import ValidationError
import re

class LivingAreaSreialzer(serializers.ModelSerializer):

    class Meta:
        model = LivingArea
        fields = ['id', 'living_area', 'people_count']

class AccountGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountGuest
        fields = (
            'id',
            'phone_number', 
            'kakao_number',
            'google_number',
            'naver_id',
            'username',
            'gender',
            'birthday',
            # 'group_num',
            )
        extra_kwargs = {'living_area':{'write_only':True}}


    def create(self, validated_data, living_area):

        if LivingArea.objects.filter(living_area=living_area).exists():
            area = LivingArea.objects.get(living_area=living_area)
            area.people_count= area.people_count + 1
            area.save()
        else:
            area = LivingArea.objects.create(living_area=living_area, people_count=1)      
            AccountGuest.objects.create(
            phone_number  = validated_data.get("phone_number", ""),
            kakao_number  = validated_data.get("kakao_number", ""),
            google_number  = validated_data.get("google_number", ""),
            naver_id  = validated_data.get("naver_id", ""),
            username      = validated_data["username"],
            gender        = validated_data["gender"],
            birthday      = validated_data["birthday"],
            living_area   = area,

        )
        return validated_data


    # def validate(self, data):
    #     non_alpha = set([s for s in "!@#$%^&*()|-=_+\[]{};':\",./?><"])
    #     error     = dict({'username' : [],'phone_number':[]})
    #     if get_user_model().objects.filter(username= data['username']).exists(): # same username in db : 4
    #         error['username'].append('중복된 닉네임이 있습니다.')
    #     if not 0 < len(data['username']) < 16:  # username length error: 5 
    #         error['username'].append('닉네임을 1 ~ 16 글자로 해주세요!')
    #     for word in data['username']: # non_alph in username: 6
    #         if word in non_alpha:
    #             error['username'].append('username에 특수문자를 넣지 말아주세요!')
    #             break
    #     if get_user_model().objects.filter(phone_number=data['phone_number']).exists() : 
    #         error['phone_number'].append('이미 등록된 전화번호입니다.')

#         return error

class PreferenceUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model          = Preference
        fields         = []
        optianl_fields = '__all__'

    def update(self, instance, data):
        instance.taste_service       = data.get('taste_service', F('taste_service'))
        instance.taste_cleanliness   = data.get('taste_cleanliness', F('taste_cleanliness'))
        instance.taste_vibe          = data.get('taste_vibe', F('taste_vibe'))
        instance.taste_price         = data.get('taste_price', F('taste_price'))
        instance.service_cleanliness = data.get('service_cleanliness', F('service_cleanliness'))
        instance.service_vibe        = data.get('service_vibe', F('service_vibe'))
        instance.service_price       = data.get('service_price', F('service_price'))
        instance.cleanliness_vibe    = data.get('cleanliness_vibe', F('cleanliness_vibe'))
        instance.cleanliness_price   = data.get('cleanliness_price', F('cleanliness_price'))
        instance.vibe_price          = data.get('vibe_price', F('vibe_price'))        
        instance.save()

class AccountGuestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model           = AccountGuest
        fields          = []
        optional_fields = ['username', 'phone_number']

    def update(self, instance, data):
        instance.phone_number = data.get('phone_number', F('phone_number'))
        instance.username     = data.get('usernamee', F('username'))
        instance.save()
    
class LivingAreaUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = LivingArea
        fields = '__all__'

    def update_or_create(self, data, account):
        area, created = LivingArea.objects.update_or_create(
            living_area = data['living_area'],
            defaults= {
                'living_area' : data['living_area'],
                'latitude' : data['latitude'],
                'longitude' : data['longitude']
            }
        )
        area.people_count = area.accountguest_set.count()
        area.save()
        account.living_area = area
        account.save()