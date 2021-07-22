from datetime import timedelta, date

from django.db           import transaction

from rest_framework import serializers

from .models import BusinessForm
from shops.models import Coupon

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