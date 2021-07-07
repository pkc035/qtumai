from django.contrib import admin
from .models import Shop, Coupon, AccountShopkeeper, Review, Menu, Category, Ingredient

# Register your models here.

def getFieldsModel(model):
    return [field.name for field in model._meta.get_fields()]

class ShopAdmin(admin.ModelAdmin):
    list_display = getFieldsModel(Shop)


class CouponAdmin(admin.ModelAdmin):
    list_display = ('pk', 'coupon_content', 'expire_date')


class AccountShopkeeperAdmin(admin.ModelAdmin):
    list_display = ('pk', 'shopkeeper_name', 'phone_number')


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('pk', 'score_taste', 'score_service', 'score_cleanliness', 'score_vibe', 'score_price', 'content', 'created_at', 'updated_at')


class MenuAdmin(admin.ModelAdmin):
    list_display = ('pk', 'menu_name', 'price')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('pk', 'category_name', 'marker_path', 'like_count')


class IngredientAdmin(admin.ModelAdmin):
    list_display = ('pk', 'get_menus')

admin.site.register(Shop, ShopAdmin)
admin.site.register(Coupon, CouponAdmin)
admin.site.register(AccountShopkeeper, AccountShopkeeperAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Menu, MenuAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Ingredient, IngredientAdmin)