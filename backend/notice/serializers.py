from datetime import timedelta

from django.db import transaction

from rest_framework           import serializers
from rest_framework.relations import PrimaryKeyRelatedField, StringRelatedField

from shops.models import Coupon, Shop
from .models      import BusinessForm, Notice, ProposeBusinessForm, ProposeGoodShop

class BusinessFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessForm
        fields = '__all__'

class CouponManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'coupon_content', 'begin_date','expire_date']

    def create(self, validated_data):
        account = validated_data.pop('account')
        coupon = Coupon.objects.create(
            shop = account.my_shop,
            coupon_content = validated_data['coupon_content'],
            begin_date = validated_data['begin_date'],
            expire_date = validated_data['expire_date']
        )
        return coupon
    
    def update(self, instance, validated_data):
        with transaction.atomic():
            old_coupon = validated_data.pop('old_coupon')

            instance.status = True
            instance.save()

            if old_coupon.exists():
                old_coupon        = old_coupon.first()
                old_coupon.status = False

                if instance.begin_date:
                    old_coupon.expire_date = instance.begin_date - timedelta(days=1)

                old_coupon.save()

        return instance

# class ShopProposeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Shop
#         fields = ['id', 'shop_name']

class ProposeGoodShopSerializer(serializers.ModelSerializer):
    shop_name_id = PrimaryKeyRelatedField(queryset=Shop.objects.all())
    shop_name = StringRelatedField()

    class Meta:
        model = ProposeGoodShop
        fields = '__all__'
    
    def create(self, validated_data):
        propose = ProposeGoodShop.objects.create(
            shop_name = validated_data['shop_name_id'],
            address = validated_data['address'],
            description = validated_data['description']
        )
        return propose

class ProposeBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposeBusinessForm
        fields = '__all__'
    
    def create(self, validated_data):
        form = ProposeBusinessForm.objects.create(
            shop_name = validated_data['shop_name'],
            phone_number = validated_data['phone_number'],
            manager_name = validated_data['manager_name'],
            content = validated_data['content']
        )
        return form

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'
