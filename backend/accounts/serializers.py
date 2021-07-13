from django.db.models.fields import EmailField
from shops.models import Shop
from rest_framework import serializers
from .models import AccountGuest, LivingArea
from django.contrib.auth import authenticate, get_user_model
from . import models

# User = get_user_model()

class LivingAreaSreialzer(serializers.ModelSerializer):
    class Meta:
        model = LivingArea
        fields = ['id', 'living_area', 'people_count']

class AccountGuestSerializer(serializers.ModelSerializer):
    living_area = LivingAreaSreialzer(many=True)

    class Meta:
        model = get_user_model()
        fields =[
            'username',
            'gender',
            'birthday',
            'living_area',
            'phone_number',
            'google_number',
            'kakao_number',
            'google_mail'
        ]
    def create_account(self, validated_data):
        user = get_user_model().objects.create(
            google_number  = validated_data['google_number'],
            google_email   = validated_data['google_mail'],
            kakao_number   = validated_data['kakao_number'],
            phone_number   = validated_data['phone_number'], #전화번호 인증에서 받음
            username       = validated_data['username'], #닉네임 중복 X
            living_area_id = validated_data['living_area_id'],
            living_area    = validated_data['living_area'],#accounts_livingarea
            birthday       = validated_data['birthday'], 
            gender         = validated_data['gender']
        )
        user.save()
        return user

    def validate(self, data):
        non_alpha = set([s for s in "!@#$%^&*()|-=_+\[]{};':\",./?><"])
        error     = dict({'username' : [],'phone_number':[]})
        if get_user_model().objects.filter(username= data['username']).exists(): # same username in db : 4
            error['username'].append('중복된 닉네임이 있습니다.')
        if not 0 < len(data['username']) < 16:  # username length error: 5 
            error['username'].append('닉네임을 1 ~ 16 글자로 해주세요!')
        for word in data['username']: # non_alph in username: 6
            if word in non_alpha:
                error['username'].append('username에 특수문자를 넣지 말아주세요!')
                break
        if get_user_model().filter(phone_number=data['phone_number']).exist() : 
            error['phone_number'].append('이미 등록된 전화번호입니다.')

        return error
    


# class AccountGuestSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.AccountGuest
#         fields = '__all__'
