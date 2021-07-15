from django.contrib.auth  import get_user_model

from .models              import ReportShop, Review, Shop, ReportReview
from accounts.serializers import AccountGuestSerializer
from accounts.models      import AccountGuest

from rest_framework import serializers

from .models import Shop

class ShopListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    shop_name = serializers.CharField()
    shop_info_url = serializers.CharField()
    kakao_score = serializers.IntegerField()
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    
    class Meta:
        model = Shop
        fields = ['id','shop_name','shop_info_url','kakao_score','latitude','longitude']

class ShopDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = '__all__'
        

    def get_username(self,obj):
        user = get_user_model().objects.get(id=obj.user_id)

        return user.username

class ReportShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportShop
        fields = '__all__'

class ReportReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportReview
        fields = '__all__'