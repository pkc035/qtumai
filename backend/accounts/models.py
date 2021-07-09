from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import TextField
from shops.models import Shop, Category

# Create your models here.

class AccountGuest(AbstractUser):
    phone_number = models.CharField(max_length=20, null=True)
    nickname = models.CharField(max_length=20) # 네이버 로그인 시 받아올 수 있으면 바로 입력
    kakao_number = models.CharField(max_length=20, blank=True)
    gender = models.CharField(max_length=2)
    birthday = models.DateField(auto_now=False, auto_now_add=False, null=True)
    living_area = models.CharField(max_length=10, blank=True)
    like_shop = models.ManyToManyField(
        Shop,
        related_name="likeShop",
        blank=True
    )
    dislike_shop = models.ManyToManyField(
        Shop,
        related_name="dislikeShop",
        blank=True
    )
    like_category = models.ManyToManyField(
        Category,
        related_name="likeCategory",
        blank=True
    )
    visited_shop = models.ManyToManyField(
        Shop,
        through="VisitedShop",
        related_name="userVisitedStore",
        blank=True
    )
    is_subscribe = models.BooleanField(null=True, default=False)
    subscribe_time = models.DateTimeField(auto_created=False, null=True)
    review_like_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.nickname


# 방문 시간도 함께 체크하기 위해 through 사용 (ManyToMany에서 컬럼 추가하는 방법)
class VisitedShop(models.Model):
    account_guest = models.ForeignKey(AccountGuest, on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    visited_time = models.DateTimeField(auto_now_add=True)


class SearchedContent(models.Model):
    account_guest = models.ManyToManyField(
        AccountGuest, # 역참조 할 수 있도록 manytomany 사용
        related_name="searchedContent", 
        blank=True
    )
    content_word = models.CharField(max_length=20, blank=True)
    searched_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # 검색할 때마다 시간을 저장해두는게 좋을까??


class Preference(models.Model):
    account_guest = models.ForeignKey(
        AccountGuest,
        related_name="userPreference",
        on_delete=models.CASCADE,
        null=True
    )
    preference_name = models.CharField(max_length=20)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class FunData(models.Model):
    account_guest = models.ForeignKey(
        AccountGuest,
        related_name="userFunData",
        on_delete=models.CASCADE,
        null=True
    )
    content_name = models.CharField(max_length=20, blank=True)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)