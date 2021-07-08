from rest_framework import serializers
from .models import Shop

class ShopDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'
