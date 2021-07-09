from django.db import models
from django.db.models.deletion import CASCADE
from django.conf import settings

# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=10, blank=True)
    marker_path = models.CharField(max_length=100, blank=True)
    like_count = models.PositiveIntegerField(default=0)


class AccountShopkeeper(models.Model):
    shopkeeper_name = models.CharField(max_length=20, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    

class Coupon(models.Model):
    coupon_content = models.TextField(blank=True)
    expire_date = models.DateTimeField()


class ShopArea(models.Model):
    area_name = models.CharField(max_length=10, blank=True)


class Shop(models.Model):
    shopkeeper = models.ForeignKey(AccountShopkeeper, on_delete=models.CASCADE, null=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    area = models.ForeignKey(ShopArea, on_delete=models.CASCADE, null=True) # 지역 구분용(그룹)
    shop_name = models.CharField(max_length=20, blank=True)
    shop_address = models.CharField(max_length=50, blank=True)
    shop_description = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    open_time = models.TextField(blank=True)
    like_count = models.PositiveIntegerField(default=0)
    shop_info_url = models.TextField(blank=True) 
    star_score = models.IntegerField() # 추후 고객 평점 데이터
    kakao_score = models.IntegerField(default=0)
    kakao_score_count = models.IntegerField(default=0)
    kakao_review_count = models.IntegerField(default=0)
    price_range = models.CharField(max_length=15, blank=True)
    latitude = models.TextField(blank=True) # 위도
    longitude = models.TextField(blank=True) # 경도
    is_subscribe = models.BooleanField(default=False)
    subscribe_time = models.DateField()
    is_new_opend = models.BooleanField(default=False)
    business_reg_img = models.TextField(blank=True)

    def __str__(self):
        return self.shop_name


class Menu(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    menu_name = models.CharField(max_length=20, blank=True)
    price = models.PositiveIntegerField(blank=True)
    is_representative = models.BooleanField(default=False) # 대표메뉴 여부


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
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ThemeKeyword(models.Model):
    shop = models.ForeignKey(Shop, on_delete=CASCADE, null=True)
    theme_keyword = models.CharField(max_length=10, blank=True)


class ShopImage(models.Model):
    shop = models.ForeignKey(Shop, on_delete=CASCADE, null=True)
    img_url = models.TextField(blank=True)