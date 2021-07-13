from rest_framework import serializers

from .models import BusinessForm

class BusinessFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessForm
        fields = '__all__'