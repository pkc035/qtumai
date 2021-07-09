from backend.shops.models import Category
from django.db import models

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
    

class BuisnessForm(models.Model):
    shop_name = models.CharField(max_length=30, blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        null=True
    )
    business_img = models.TextField(blank=True) # 사업자등록증
    address = models.TextField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    open_time = models.TextField(blank=True)
    representitive_menu = models.CharField(max_length=20, blank=True)


class BusinessShopImage(models.Model):
    shop = models.ForeignKey(BuisnessForm, on_delete=models.CASCADE, null=True)
    img_url = models.TextField(blank=True)