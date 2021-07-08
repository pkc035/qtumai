from django.db import models
from django.db.models.deletion import CASCADE
from django.conf import settings

# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=10)
    marker_path = models.CharField(max_length=100)
    like_count = models.PositiveIntegerField(default=0)


class AccountShopkeeper(models.Model):
    shopkeeper_name = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)
    

class Coupon(models.Model):
    coupon_content = models.TextField()
    expire_date = models.DateTimeField()


class ShopArea(models.Model):
    area_name = models.CharField(max_length=10)


class Shop(models.Model):
    shopkeeper = models.ForeignKey(AccountShopkeeper, on_delete=models.CASCADE, null=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    area = models.ForeignKey(ShopArea, on_delete=models.CASCADE, null=True) # 지역 구분용(그룹)
    shop_name = models.CharField(max_length=20)
    shop_address = models.CharField(max_length=50)
    shop_description = models.TextField()
    phone_number = models.CharField(max_length=15)
    open_time = models.TextField()
    img_url = models.TextField()
    like_count = models.PositiveIntegerField(default=0)
    shop_info_url = models.TextField() 
    star_score = models.FloatField() # 네이버 평점
    latitude = models.TextField() # 위도
    longitude = models.TextField() # 경도
    is_subscribe = models.BooleanField(default=False)
    subscribe_time = models.DateField()
    is_new_opend = models.BooleanField(default=False)

    def __str__(self):
        return self.shop_name


class Menu(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    menu_name = models.CharField(max_length=20)
    price = models.PositiveIntegerField(blank=True)


class Ingredient(models.Model):
    menu = models.ManyToManyField(
        Menu, 
        related_name="ingredients", 
        blank=True
    )
    ingredient_name = models.CharField(max_length=20)

    # def get_menus(self):
    #     return "\n".join([i.menu_name for i in self.ingredient_name.all()])
    

class Review(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    guest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="guestReview",
        on_delete=models.CASCADE,
        blank=True
    )
    score_taste = models.PositiveIntegerField(default=0)
    score_service = models.PositiveIntegerField(default=0)
    score_cleanliness = models.PositiveIntegerField(default=0)
    score_vibe = models.PositiveIntegerField(default=0)
    score_price = models.PositiveIntegerField(default=0)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ThemeKeyword(models.Model):
    shop = models.ForeignKey(Shop, on_delete=CASCADE, null=True)
    theme_keyword = models.CharField(max_length=10)