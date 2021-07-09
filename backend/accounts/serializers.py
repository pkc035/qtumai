from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from . import models

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = get_user_model()
        fields =['email', 'password', 'username' ,]
    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            age = validated_data['age'] if 'age' in validated_data else None,
            gender = validated_data['gender'] if 'gender' in validated_data else None,
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate(self, data):
        non_alpha = set([s for s in "!@#$%^&*()|-=_+\[]{};':\",./?><"])
        error = dict({'username' : [], 'email' : [],'password': []})
        if not 8 <= len(data['password']) < 16:   # password length error: 2
            error['password'].append('비밀번호를 8 ~ 16자로 작성해주세요!')
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