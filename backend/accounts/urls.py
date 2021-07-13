"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls    import path

from .      import views
from .views import KakaoLogInView, GoogleLoginView

from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=True)
router.register(r"accounts", views.UserViewSet, basename="accounts")

urlpatterns = [
    # views.py에서 정의한(def) 함수 연결 가능 (path)
    # path('send_sms/', views.send_sms),
    path('kakaologin/',KakaoLogInView.as_view()),
    path('GoogleLoginView/',GoogleLoginView.as_view()),
    path('dislike-shop', views.dislikeshop),
    path('like-shop', views.likeshop),
    
] + router.urls
