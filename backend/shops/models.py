from django.db import models
from django.db.models.deletion import CASCADE
from django.conf import settings

# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=10)
    marker_path = models.CharField(max_length=100)
    like_count = models.IntegerField()

class Menu(models.Model):
    menu_name = models.CharField(max_length=20)
    price = models.IntegerField()


class Ingredients(models.Model):
    ingredient_name = models.ManyToManyField(Menu, related_name="ingredients", blank=True)


class AccountShopkeeper(models.Model):
    shopkeeper_name = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)
    

class Coupon(models.Model):
    coupon_content = models.TextField()
    expire_date = models.DateTimeField()


class Shop(models.Model):
    shopkeeper = models.ForeignKey(AccountShopkeeper, on_delete=models.CASCADE, null=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=20, null=False)
    shop_description = models.TextField()
    phone_number = models.CharField(max_length=15)
    open_time = models.TimeField()
    img_url = models.TextField()
    like_count = models.IntegerField()
    shop_info_url = models.TextField()
    star_score = models.IntegerField()
    kakao_score = models.IntegerField()
    kakao_review_count = models.IntegerField()
    is_subscribe = models.BooleanField(default=False)
    subscribe_time = models.DateField()
    area = models.CharField(max_length=20)

    def __str__(self):
        return self.name
    


class Review(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    writer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="guestReview",
        on_delete=models.CASCADE,
        blank=True
    )
    score_taste = models.IntegerField()
    score_service = models.IntegerField()
    score_cleanliness = models.IntegerField()
    score_vibe = models.IntegerField()
    score_price = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
