from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import OneToOneField

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=10)
    marker_path = models.CharField(max_length=50)
    like_count = models.IntegerField()


class MainArea(models.Model):
    name = models.CharField(max_length=10)


class SubArea(models.Model):
    name = models.CharField(max_length=10)
    main_area = models.ForeignKey(MainArea, on_delete=models.CASCADE)


class DetailArea(models.Model):
    name = models.CharField(max_length=10)
    sub_area = models.ForeignKey(SubArea, on_delete=models.CASCADE)


class AccountShopkeeper(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField(max_length=128)


class Coupon(models.Model):
    name = models.CharField(max_length=30)
    content = models.TextField()
    shop = OneToOneField(Shop,)


class Shop(models.Model):
    name = models.CharField(max_length=20, null=False)
    category = models.ForeignKey(Category, on_delete=CASCADE, null=True)
    coupon = models.TextField()
    phone_number = models.CharField(max_length=15)
    description = models.TextField()
    open_time = models.TimeField()
    img_url = models.TextField()
    like_count = models.IntegerField()
    menu_list = models.TextField() #
    shop_info_url = models.TextField()
    star_score = models.IntegerField()
    is_subscribe = models.BooleanField()
    subscribe_time = models.DateField() #
    main_area = models.ForeignKey(MainArea, on_delete=models.CASCADE, null=True)
    sub_area = models.ForeignKey(SubArea, on_delete=models.CASCADE, null=True)
    detail_area = models.ForeignKey(DetailArea, on_delete=models.CASCADE, null=True)
    shopkeeper = models.OneToOneField(AccountShopkeeper, on_delete=models.CASCADE, null=True)