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