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
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import KakaoLogInView, GoogleLoginView, NaverLogInView, SmsSendView, SMSVerificationView,CreatePreferenceAPIView, CheckUsernameAPIView

router = DefaultRouter(trailing_slash=True)
# router.register(r"accounts", views.UserViewSet, basename="accounts")


urlpatterns = [
    # views.py에서 정의한(def) 함수 연결 가능 (path)
    # path('send_sms/', views.send_sms),
    path('sms/',SmsSendView.as_view()),
    path('username-check/',CheckUsernameAPIView.as_view()),
    path('preference',CreatePreferenceAPIView.as_view()),
    path('check-sms/',SMSVerificationView.as_view()),
    path('naver-login/',NaverLogInView.as_view()),
    path('kakao-login/',KakaoLogInView.as_view()),
    path('google-login/',GoogleLoginView.as_view()),
    path('signup',views.AccountGuestAPIView.as_view()),
    path('dislike-shop', views.dislikeshop),
    path('like-shop', views.likeshop),
    path('account-update', views.update_account_guest)
    
] + router.urls
