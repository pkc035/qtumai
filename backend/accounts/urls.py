from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    FunDataViewSet, KakaoLogInView, GoogleLoginView, NaverLogInView, MyLikeListViewSet, MyLikeListShopViewSet,
    AccountGuestAPIView, SmsSendView, SMSVerificationView, CreatePreferenceAPIView, CheckUsernameAPIView, dislikeshop, likeshop
    )

router = DefaultRouter(trailing_slash=True)
# router.register(r"accounts", views.UserViewSet, basename="accounts")
router.register(r"mylike", MyLikeListViewSet, basename="mylike")
router.register(r"mylikeshop", MyLikeListShopViewSet, basename="mylikeshop")
router.register(r"fun", FunDataViewSet, basename='fun')

urlpatterns = [
    # views.py에서 정의한(def) 함수 연결 가능 (path)
    # path('send_sms/', views.send_sms),
    path('naver-login/', NaverLogInView.as_view()),
    path('kakao-login/', KakaoLogInView.as_view()),
    path('google-login/', GoogleLoginView.as_view()),
    path('signup', AccountGuestAPIView.as_view()),
    path('dislike-shop', dislikeshop),
    path('like-shop', likeshop),
    path('sms/',SmsSendView.as_view()),
    path('username-check/',CheckUsernameAPIView.as_view()),
    path('preference',CreatePreferenceAPIView.as_view()),
    path('check-sms/',SMSVerificationView.as_view())
    
] + router.urls
