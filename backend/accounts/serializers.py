from django.contrib.auth import authenticate, get_user_model

from rest_framework import serializers

from .models import AccountGuest, LivingArea, MyLikeList, MyLikeListShop

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

class MyLikeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyLikeList
        fields = ['id', 'list_name']

class MyLikeListShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyLikeListShop
        fields = ['id', 'shop_name']

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

