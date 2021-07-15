from django.db.models.fields import EmailField
from shops.models import Shop
from rest_framework import serializers
from .models import AccountGuest
from django.contrib.auth import authenticate, get_user_model
from . import models

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = get_user_model()
        fields =[
            'username',
            'gender',
            'birthday',
            'living_area_id',
            'phone_number',
            'google_number',
            'kakao_number',
            'group_num',
            'stayed_time'
        ]
    def create(self, validated_data):
        user = get_user_model().objects.create(
            username       = validated_data['username'],
            google_number  = validated_data['google_number'],
            google_email   = validated_data['google_email'],
            kakao_number   = validated_data['kakao_number'],
            phone_number   = validated_data['phone_number'],
            living_area_id = validated_data['living_area_id'],
            birthday       = validated_data['birthday'],
            gender         = validated_data['gender']
        )
        user.save()
        return user

    def validate(self, data):
        non_alpha = set([s for s in "!@#$%^&*()|-=_+\[]{};':\",./?><"])
        error = dict({'username' : [], 'email' : [],'password': []})
        if data['password'].isdigit():  # password is only numbers: 3
            error['password'].append('비밀번호를 다른 문자와 조합해주세요!')
        if get_user_model().objects.filter(email= data['email']): # same username in db : 4
            error['email'].append('중복된 email이 있습니다.')
        if get_user_model().objects.filter(username=data['username']):
            error['username'].append('중복된 username이 있습니다.')
        if not 0 < len(data['username']) < 16:  # username length error: 5 
            error['username'].append('username을 1 ~ 16 글자로 해주세요!')
        for word in data['username']: # non_alph in username: 6
            if word in non_alpha:
                error['username'].append('username에 특수문자를 넣지 말아주세요!')
                break
        return error
        

class AccountGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AccountGuest
        fields = '__all__'