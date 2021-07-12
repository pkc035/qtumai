from django.contrib.auth import get_user_model

from .models import Review, Shop

from rest_framework import serializers

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