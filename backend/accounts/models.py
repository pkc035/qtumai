from django.db import models
from django.conf import settings
from shops.models import Shop
from django.contrib.auth.models import AbstractUser

# Create your models here.

class AccountGuest(AbstractUser):
    name = models.CharField(max_length=20, null=False)
    gender = models.CharField(max_length=2, null=False)
    birthday = models.DateField(auto_now=False, auto_now_add=False, null=True)
    living_area = models.CharField(max_length=10)
    visited_store = models.CharField(max_length=20)
    search_content = models.CharField(max_length=20)
    email = models.EmailField(max_length=128)
    like_category = models.CharField(max_length=10)
    is_subscribe = models.BooleanField(null=True, default=False)
    subscribe_time = models.DateTimeField(auto_created=False, null=True)
    dislike_shop = models.ManyToManyField(Shop, related_name="userDislikeShop", blank=True)
    review_like_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username


class SearchedArea(models.Model):
    account = models.ManyToManyField(AccountGuest, related_name="searchedArea", blank=True)
    area = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# class Area(models.Model):
#     name = models.CharField(max_length=20)
#     user = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         related_name="userArea",
#         blank=True
#     )