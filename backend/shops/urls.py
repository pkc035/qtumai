from django.urls      import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from shops import views

router = DefaultRouter(trailing_slash=False)
router.register(r"shop/(?P<id>.+)",views.ShopDetailViewSet,basename="shop")

urlpatterns = [

]+ router.urls
