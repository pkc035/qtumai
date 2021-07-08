from django.http import response
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, action

from django.views import View

from shops import serializers, models

class ShopDetailViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ShopDetailSerializer
    
    def get_queryset(self):
        queryset = models.Shop.objects.filter(id=self.kwargs['id'])
        return queryset
