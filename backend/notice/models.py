from shops.models import Category

from django.db   import models
from django.conf import settings

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
    shop_name = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)