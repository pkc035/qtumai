from django.urls      import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from shops import views

router = DefaultRouter(trailing_slash=False)
router.register(r"detail/(?P<id>.+)",views.ShopDetailViewSet,basename="shop")

urlpatterns = [
    path('review', views.review_create),
    path('review/<int:review_id>', views.review_command)
]+ router.urls
