from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.conf import settings

# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=30, blank=True)
    marker_path = models.CharField(max_length=200, blank=True)
    like_count = models.PositiveIntegerField(default=0)


class ShopArea(models.Model):
    area_name = models.CharField(max_length=30, blank=True)
    latitude = models.CharField(max_length=20, blank=True)
    longitude = models.CharField(max_length=20, blank=True)


class Shop(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    area = models.ForeignKey(ShopArea, on_delete=models.CASCADE, null=True) # 지역 구분용(그룹)
    shop_name = models.CharField(max_length=50, blank=True)
    shop_address_road = models.CharField(max_length=50, blank=True)
    shop_address_zip = models.CharField(max_length=50, blank=True)
    shop_description = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    # open_time = models.TextField(blank=True)
    like_count = models.PositiveIntegerField(default=0)
    shop_info_url = models.TextField(blank=True) # 공유할 때
    score_taste = models.FloatField(default=0)
    score_service = models.FloatField(default=0)
    score_cleanliness = models.FloatField(default=0)
    score_vibe = models.FloatField(default=0)
    score_price = models.FloatField(default=0)
    review_count = models.IntegerField(default=0) # 리뷰 개수(오늘도)
    naver_score = models.FloatField(default=0)
    naver_score_count = models.IntegerField(default=0)
    # naver_review_count = models.IntegerField(default=0)
    price_range = models.CharField(max_length=15, blank=True)
    latitude = models.CharField(null=True) # 위도
    longitude = models.CharField(null=True) # 경도
    is_subscribe = models.BooleanField(default=False)
    subscribe_time = models.DateField(blank=True, null=True)
    is_new_opend = models.BooleanField(default=False) # 보류 (m.search.naver.com "새로 오픈했어요")
    business_reg_img = models.TextField(blank=True) # 사업자등록증 이미지

    def __str__(self):
        return self.shop_name


class AccountShopkeeper(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    shopkeeper_name = models.CharField(max_length=20, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    

class Coupon(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    coupon_content = models.TextField(blank=True)
    begin_date = models.DateTimeField(null=True)
    expire_date = models.DateTimeField(null=True)


class LikeShopAccounts(models.Model):
    shop = models.ForeignKey(
        Shop, 
        on_delete=models.CASCADE, 
        null=True
    )
    guest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)


# 현재시간 기준으로 가게가 열었는지/닫혔는지 표시하기 위해 사용
class OpenTime(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    open_time = models.TextField(blank=True)
    '''
    what_day = models.CharField(max_length=10, blank=True) # 요일 ('평일', '주말'로도 저장 가능)
    open_time = models.TimeField(null=True)
    close_time = models.TimeField(null=True)
    break_time_begin = models.TimeField(null=True)
    break_time_end = models.TimeField(null=True)
    '''


class Menu(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    menu_name = models.CharField(max_length=20, blank=True)
    img_path_1 = models.TextField(blank=True)
    img_path_2 = models.TextField(blank=True)
    img_path_3 = models.TextField(blank=True)
    price = models.PositiveIntegerField(null=True)
    is_representative = models.BooleanField(default=False) # 대표메뉴 여부


class Ingredient(models.Model):
    menu = models.ManyToManyField(
        Menu, 
        related_name="menuIngredients", 
        blank=True
    )
    img_path = models.TextField(blank=True) # 추후 사용 예정
    ingredient_name = models.CharField(max_length=20, blank=True)


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
    img_path = models.TextField(blank=True) # 이미지 1개만 등록
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ThemeKeywordCategory(models.Model):
    category = models.CharField(max_length=20, blank=True) # 분위기, 인기토픽, 찾는목적


class ThemeKeyword(models.Model):
    category = models.ForeignKey(ThemeKeywordCategory, on_delete=models.CASCADE, null=True)
    theme_keyword = models.TextField(blank=True) # 친절한 / 갓김치 / 재방문
    shop = models.ManyToManyField(Shop, related_name="shopThemeKeyword", blank=True) # 이 키워드를 사용한 가게들을 역참조할 때


class ShopImage(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    img_url = models.TextField(blank=True)


class DataLab(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    age_10s = models.FloatField(default=0)
    age_20s = models.FloatField(default=0)
    age_30s = models.FloatField(default=0)
    age_40s = models.FloatField(default=0)
    age_50s = models.FloatField(default=0)
    age_60s = models.FloatField(default=0)
    male = models.FloatField(default=0)
    female = models.FloatField(default=0)


class ReportShop(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="reportShop", null=True)
    guest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="guestReportShop",
        on_delete=models.CASCADE,
        blank=True,
        default=None
    )
    is_closed = models.BooleanField(default=False)
    time_different = models.BooleanField(default=False)
    address_different = models.BooleanField(default=False)
    no_coupon = models.BooleanField(default=False)
    others = models.TextField(blank=True)


# 댓글 신고기능(Radio Button으로 한 가지 사유만 선택 가능)
class ReportReview(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE, null=True)
    guest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="guestReportReview",
        on_delete=models.CASCADE,
        blank=True,
        default=None
    )
    reason = models.TextField(blank=True) # 선택된 사유 내용 바로 저장
