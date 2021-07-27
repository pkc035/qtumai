from django.db import models
from accounts.models import AccountGuest
from shops.models import Category, Shop
from django.conf import settings
from django.utils import timezone

# Create your models here.

class Notice(models.Model):
    title = models.CharField(max_length=30, blank=True)
    content = models.TextField(blank=True)
    public = models.BooleanField(default=True)
    hits = models.PositiveIntegerField(verbose_name='조회수', default=0)
    top_fixed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# 비즈니스 신청하기 폼
class BusinessForm(models.Model):
    shop_name = models.CharField(max_length=30, blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        null=True
    )
    guest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="guestBusiness",
        on_delete=models.CASCADE,
        blank=True,
        default=None
    )
    business_img = models.TextField(blank=True) # 사업자등록증
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    open_time = models.TextField(blank=True)
    representitive_menu = models.CharField(max_length=20, blank=True)
    img_url_1 = models.TextField(blank=True)
    img_url_2 = models.TextField(blank=True)
    img_url_3 = models.TextField(blank=True)


class ProposeGoodShop(models.Model):
    shop_name = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)


# 고객센터 - 이메일 문의 내용 테이블
class EmailQuestion(models.Model):
    username = models.ForeignKey(AccountGuest, on_delete=models.CASCADE, null=True)
    email = models.EmailField(max_length=75, blank=True)
    kind = models.CharField(max_length=10, blank=True)
    title = models.CharField(max_length=30, blank=True)
    content = models.TextField(blank=True)
    img_url_1 = models.TextField(blank=True)
    img_url_2 = models.TextField(blank=True)
    img_url_3 = models.TextField(blank=True)


# 사업 제휴 문의 폼
class ProposeBusinessForm(models.Model):
    shop_name = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    manager_name = models.CharField(max_length=10, blank=True)
    content = models.CharField(max_length=150, blank=True)


class FAQForm(models.Model):
    title = models.CharField(max_length=30, blank=True)
    content = models.TextField(blank=True)
    hits = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)