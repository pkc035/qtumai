from django.urls import path

from rest_framework.routers import DefaultRouter

from .views import (
    AccountGuestUpdateViewSet, FunDataViewSet, KakaoLogInView, GoogleLoginView, NaverLogInView, MyLikeListViewSet, MyLikeListShopViewSet,
    SmsSendView, SMSLoginVerificationView, SMSSignupVerificationView, CreatePreferenceAPIView, CheckUsernameAPIView, LogoutView,
    dislikeshop, likeshop, LogoutView, GetLocationViewSet
    )

accountguest_list = AccountGuestUpdateViewSet.as_view({
    'get'  : 'list',
    'patch': 'partial_update'
})

router = DefaultRouter(trailing_slash=True)
# router.register(r"accounts", views.UserViewSet, basename="accounts")
router.register(r"mylike", MyLikeListViewSet, basename="mylike")
router.register(r"mylikeshop", MyLikeListShopViewSet, basename="mylikeshop")
router.register(r"fun", FunDataViewSet, basename='fun')
router.register(r"getlocation", GetLocationViewSet, basename='getlocation')

urlpatterns = [
    # views.py에서 정의한(def) 함수 연결 가능 (path)
    # path('send_sms/', views.send_sms),
    path('naver-login/', NaverLogInView.as_view()),
    path('kakao-login/', KakaoLogInView.as_view()),
    path('google-login/', GoogleLoginView.as_view()),
    path('sms/',SmsSendView.as_view()),
    path('username-check/',CheckUsernameAPIView.as_view()),
    path('preference',CreatePreferenceAPIView.as_view()),
    path('sms-check',SMSLoginVerificationView.as_view()),
    path('sms-check-signup',SMSSignupVerificationView.as_view()),
    path('dislike-shop', dislikeshop),
    path('like-shop', likeshop),
    path('username-check/',CheckUsernameAPIView.as_view()),
    path('preference',CreatePreferenceAPIView.as_view()),
    path('account', accountguest_list, name='account'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
] + router.urls
