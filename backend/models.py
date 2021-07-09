# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AccountsAccountguest(models.Model):
    id = models.BigAutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    nickname = models.CharField(max_length=20)
    kakao_number = models.CharField(max_length=20)
    gender = models.CharField(max_length=2)
    birthday = models.DateField(blank=True, null=True)
    living_area = models.CharField(max_length=10)
    is_subscribe = models.IntegerField(blank=True, null=True)
    subscribe_time = models.DateTimeField(blank=True, null=True)
    review_like_count = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'accounts_accountguest'


class AccountsAccountguestDislikeShop(models.Model):
    id = models.BigAutoField(primary_key=True)
    accountguest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)
    shop = models.ForeignKey('ShopsShop', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_accountguest_dislike_shop'
        unique_together = (('accountguest', 'shop'),)


class AccountsAccountguestGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    accountguest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)
    group = models.ForeignKey('AuthGroup', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_accountguest_groups'
        unique_together = (('accountguest', 'group'),)


class AccountsAccountguestLikeCategory(models.Model):
    id = models.BigAutoField(primary_key=True)
    accountguest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)
    category = models.ForeignKey('ShopsCategory', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_accountguest_like_category'
        unique_together = (('accountguest', 'category'),)


class AccountsAccountguestLikeShop(models.Model):
    id = models.BigAutoField(primary_key=True)
    accountguest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)
    shop = models.ForeignKey('ShopsShop', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_accountguest_like_shop'
        unique_together = (('accountguest', 'shop'),)


class AccountsAccountguestUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    accountguest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_accountguest_user_permissions'
        unique_together = (('accountguest', 'permission'),)


class AccountsFundata(models.Model):
    id = models.BigAutoField(primary_key=True)
    content_name = models.CharField(max_length=20)
    score = models.IntegerField()
    created_at = models.DateTimeField()
    account_guest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accounts_fundata'


class AccountsPreference(models.Model):
    id = models.BigAutoField(primary_key=True)
    preference_name = models.CharField(max_length=20)
    score = models.IntegerField()
    created_at = models.DateTimeField()
    account_guest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'accounts_preference'


class AccountsSearchedcontent(models.Model):
    id = models.BigAutoField(primary_key=True)
    content_word = models.CharField(max_length=20)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'accounts_searchedcontent'


class AccountsSearchedcontentAccountGuest(models.Model):
    id = models.BigAutoField(primary_key=True)
    searchedcontent = models.ForeignKey(AccountsSearchedcontent, models.DO_NOTHING)
    accountguest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_searchedcontent_account_guest'
        unique_together = (('searchedcontent', 'accountguest'),)


class AccountsVisitedshop(models.Model):
    id = models.BigAutoField(primary_key=True)
    visited_time = models.DateTimeField()
    account_guest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)
    shop = models.ForeignKey('ShopsShop', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_visitedshop'


class AccountsVisitedstore(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'accounts_visitedstore'


class AccountsVisitedstoreAccountGuest(models.Model):
    id = models.BigAutoField(primary_key=True)
    visitedstore = models.ForeignKey(AccountsVisitedstore, models.DO_NOTHING)
    accountguest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'accounts_visitedstore_account_guest'
        unique_together = (('visitedstore', 'accountguest'),)


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class NoticeNotice(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=30)
    content = models.TextField()
    public = models.IntegerField()
    hits = models.PositiveIntegerField()
    top_fixed = models.IntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'notice_notice'


class ShopsAccountshopkeeper(models.Model):
    id = models.BigAutoField(primary_key=True)
    shopkeeper_name = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'shops_accountshopkeeper'


class ShopsCategory(models.Model):
    id = models.BigAutoField(primary_key=True)
    category_name = models.CharField(max_length=10)
    marker_path = models.CharField(max_length=100)
    like_count = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'shops_category'


class ShopsCoupon(models.Model):
    id = models.BigAutoField(primary_key=True)
    coupon_content = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'shops_coupon'


class ShopsIngredient(models.Model):
    id = models.BigAutoField(primary_key=True)
    ingredient_name = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'shops_ingredient'


class ShopsIngredientMenu(models.Model):
    id = models.BigAutoField(primary_key=True)
    ingredient = models.ForeignKey(ShopsIngredient, models.DO_NOTHING)
    menu = models.ForeignKey('ShopsMenu', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'shops_ingredient_menu'
        unique_together = (('ingredient', 'menu'),)


class ShopsMenu(models.Model):
    id = models.BigAutoField(primary_key=True)
    menu_name = models.CharField(max_length=20)
    price = models.IntegerField()
    shop = models.ForeignKey('ShopsShop', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shops_menu'


class ShopsReview(models.Model):
    id = models.BigAutoField(primary_key=True)
    score_taste = models.IntegerField()
    score_service = models.IntegerField()
    score_cleanliness = models.IntegerField()
    score_vibe = models.IntegerField()
    score_price = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    guest = models.ForeignKey(AccountsAccountguest, models.DO_NOTHING)
    shop = models.ForeignKey('ShopsShop', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shops_review'


class ShopsShop(models.Model):
    id = models.BigAutoField(primary_key=True)
    shop_name = models.CharField(max_length=20)
    shop_address = models.CharField(max_length=50)
    shop_description = models.TextField()
    phone_number = models.CharField(max_length=15)
    open_time = models.TextField()
    img_url = models.TextField()
    like_count = models.IntegerField()
    shop_info_url = models.TextField()
    star_score = models.IntegerField()
    is_subscribe = models.IntegerField()
    subscribe_time = models.DateField()
    is_new_opend = models.IntegerField()
    area = models.ForeignKey('ShopsShoparea', models.DO_NOTHING, blank=True, null=True)
    category = models.ForeignKey(ShopsCategory, models.DO_NOTHING, blank=True, null=True)
    coupon = models.ForeignKey(ShopsCoupon, models.DO_NOTHING, blank=True, null=True)
    shopkeeper = models.ForeignKey(ShopsAccountshopkeeper, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shops_shop'


class ShopsShoparea(models.Model):
    id = models.BigAutoField(primary_key=True)
    area_name = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'shops_shoparea'


class ShopsThemekeyword(models.Model):
    id = models.BigAutoField(primary_key=True)
    theme_keyword = models.CharField(max_length=10)
    shop = models.ForeignKey(ShopsShop, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shops_themekeyword'
