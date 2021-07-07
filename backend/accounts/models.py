from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from shops.models import Shop, Category

# Create your models here.

class AccountGuest(AbstractUser):
    phone_number = models.CharField(max_length=20, null=True)
    nickname = models.CharField(max_length=20, null=False)
    kakao_number = models.CharField(max_length=20)
    gender = models.CharField(max_length=2, null=False)
    birthday = models.DateField(auto_now=False, auto_now_add=False, null=True)
    living_area = models.CharField(max_length=10)
    like_shop = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="likeShop",
        blank=True
    )
    dislike_shop = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="dislikeShop",
        blank=True
    )
    like_category = models.ManyToManyField(
        Category,
        related_name="likeCategory",
        blank=True
    )
    is_subscribe = models.BooleanField(null=True, default=False)
    subscribe_time = models.DateTimeField(auto_created=False, null=True)
    review_like_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username


class SearchedContent(models.Model):
    content_word = models.ManyToManyField(
        AccountGuest, 
        related_name="searchedContent", 
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Preference(models.Model):
    preference_name = models.ForeignKey(
        AccountGuest,
        related_name="userPreference",
        on_delete=models.CASCADE,
        null=True
    )
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class FunData(models.Model):
    content_name = models.ForeignKey(
        AccountGuest,
        related_name="userFunData",
        on_delete=models.CASCADE,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)


class VisitedStore(models.Model):
    store_name = models.ForeignKey(
        AccountGuest,
        related_name="userVisitedStore",
        on_delete=models.CASCADE,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)