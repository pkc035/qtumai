from django.contrib import admin
from .models import Shop, Coupon, AccountShopkeeper, Review, Menu, Category, Ingredient, ShopArea, OpenTime, ThemeKeywordCategory, ThemeKeyword, ReportShop, ReportReview

# Register your models here.

admin.site.register(Shop)
admin.site.register(Coupon)
admin.site.register(AccountShopkeeper)
admin.site.register(Review)
admin.site.register(Menu)
admin.site.register(Category)
admin.site.register(Ingredient)
admin.site.register(ShopArea)
admin.site.register(OpenTime)
admin.site.register(ThemeKeywordCategory)
admin.site.register(ThemeKeyword)
admin.site.register(ReportShop)
admin.site.register(ReportReview)