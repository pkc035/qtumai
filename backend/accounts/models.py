from datetime import datetime
from re import M
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models import base
from django.db.models.deletion import CASCADE
from shops.models import Shop, Category, Menu

# Create your models here.
# 같은 동네에 사는 사람들 묶어주기 위한 테이블(등록된 동네가 없으면 항목 새로 추가 + Account에 연결, 있으면 있는 항목(pk)에 Account 연결)
class LivingArea(models.Model):
    area_name = models.TextField(blank=True)
    people_count = models.IntegerField(default=0)
    latitude = models.CharField(max_length=20, blank=True)
    longitude = models.CharField(max_length=20, blank=True)


# 상위 % 구하기 위한 비교 테이블(하루에 한 번 갱신 예정)
class FunDataPercentage(models.Model):
    percentage = models.FloatField(blank=True) # 0.1% 단위로
    greater_than = models.IntegerField(blank=True) # ~개 이상


# 미리 저장해두기
class AccountJobCategory(models.Model):
    category_name = models.CharField(max_length=20, blank=True)
    

class AccountJob(models.Model):
    category = models.ForeignKey(AccountJobCategory, on_delete=models.CASCADE, null=True)
    job = models.CharField(max_length=20, blank=True)


class Authentication(models.Model):
    phone_number = models.CharField(max_length=20, blank=True)
    auth_number = models.CharField(max_length=5, blank=True)


class AccountGuest(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    kakao_number = models.CharField(max_length=50, blank=True, unique=True, null=True)
    google_number = models.EmailField(max_length=50, blank=True, unique=True, null=True)
    naver_number = models.CharField(max_length=50, blank=True, unique=True, null=True)
    profile_img_path = models.TextField(blank=True)
    google_mail = models.EmailField(max_length=128, blank=True) # 안들어올수도 있음
    gender = models.CharField(max_length=2, blank=True)
    birthday = models.DateField(auto_now=False, auto_now_add=False, null=True)
    living_area = models.ForeignKey(LivingArea, on_delete=models.CASCADE, null=True)
    dislike_shop = models.ManyToManyField(
        Shop,
        related_name="dislikeShop",
        blank=True
    )
    like_category = models.ManyToManyField(
        Category,
        related_name="likeCategory",
        blank=True
    )
    visited_shop = models.ManyToManyField(
        Shop,
        through="VisitedShop",
        related_name="userVisitedStore",
        blank=True
    )
    is_subscribe = models.BooleanField(null=True, default=False)
    subscribe_time = models.DateTimeField(auto_created=False, null=True)
    written_review_count = models.PositiveIntegerField(default=0) # 리뷰 개수로 배지 부여하기 위함
    review_like_count = models.PositiveIntegerField(default=0) # 내가 쓴 리뷰에 대한 좋아요 개수
    fun_data_count = models.PositiveIntegerField(default=0)
    agreed_marketing_receive = models.BooleanField(default=False) # 마케팅 정보제공 동의여부
    my_shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="accountMyShop", null=True) # my_shop 있으면 사장님 / 없으면 일반 사용자
    shopkeeper_tel = models.CharField(max_length=20, blank=True)
    searched_people = models.ManyToManyField(
        'self',
        related_name="searchedPeople",
        through="SearchedPeopleThrough",
        symmetrical=False
    ) # 같이갈 사람 추가할 때 필요
    # job = models.ForeignKey(AccountJob, on_delete=models.CASCADE, null=True, default="") # 직업은 잠시 보류
    # my_friends = models.ManyToManyField('self', related_name="myFriends", symmetrical=False) # symmetrical: 대칭관계(상대방쪽에서도 자동추가 여부)

    fun_data_percent = models.ForeignKey(FunDataPercentage, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.username


# 방문 시간도 함께 체크하기 위해 through 사용 (ManyToMany에서 컬럼 추가하는 방법)
class VisitedShop(models.Model):
    account_guest = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    visited_time = models.DateTimeField(auto_now_add=True)


class SearchedLocation(models.Model):
    account_guest = models.ManyToManyField(
        settings.AUTH_USER_MODEL, # 역참조 할 수 있도록 manytomany 사용
        related_name="searchedLocation", 
        blank=True
    )
    content_word = models.CharField(max_length=20, blank=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    searched_count = models.PositiveIntegerField(default=0)    
    searched_time = models.DateTimeField(auto_now=True)


class SearchedMenu(models.Model):
    account_guest = models.ManyToManyField(
        settings.AUTH_USER_MODEL, # 역참조 할 수 있도록 manytomany 사용
        related_name="searchedMenu", 
        blank=True
    )
    content_word = models.CharField(max_length=20, blank=True)
    searched_count = models.PositiveIntegerField(default=0)
    searched_time = models.DateTimeField(auto_now=True)


class SearchedStore(models.Model):
    account_guest = models.ManyToManyField(
        settings.AUTH_USER_MODEL, # 역참조 할 수 있도록 manytomany 사용
        related_name="searchedStore", 
        blank=True
    )
    content_word = models.CharField(max_length=20, blank=True)
    searched_count = models.PositiveIntegerField(default=0)
    searched_time = models.DateTimeField(auto_now=True)


class SearchedPeopleThrough(models.Model):
    from_accountguest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="searcedpeople_from",
        on_delete=CASCADE
    )
    to_accountguest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="searcedpeople_to",
        on_delete=CASCADE
    )
    searched_time = models.DateTimeField(auto_now=True)


class Preference(models.Model):
    account_guest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True
    )
    updated_at = models.DateTimeField(auto_now=True)
    # taste, service, cleanliness, vibe, price
    taste_service = models.SmallIntegerField() # 0, 1로 구분
    taste_cleanliness = models.SmallIntegerField()
    taste_vibe = models.SmallIntegerField()
    taste_price = models.SmallIntegerField()
    service_cleanliness = models.SmallIntegerField()
    service_vibe = models.SmallIntegerField()
    service_price = models.SmallIntegerField()
    cleanliness_vibe = models.SmallIntegerField()
    cleanliness_price = models.SmallIntegerField()
    vibe_price = models.SmallIntegerField()
    group_num = models.IntegerField()

    # 0 ~ 1023번 그룹으로 분류
    def save(self, *args, **kwarg):
        self.group_num = self.taste_service * 512 + self.taste_cleanliness * 256 + self.taste_vibe * 128 + self.taste_price * 64
        + self.service_cleanliness * 32 + self.service_vibe * 16 + self.service_price * 8
        + self.cleanliness_vibe * 4 + self.cleanliness_price * 2 + self.vibe_price

        super(Preference, self).save(*args, **kwarg)

# 추후 메뉴뿐만 아니라 관심사 태그에 대한 내용도 물어볼 예정
class FunData(models.Model):
    account_guest = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, null=True)
    # 추후 태그 관련 컬럼도 추가예정 tag = models.ForeignKey(Tag, on_delete=models.CASCADE, null=True)
    score = models.SmallIntegerField(default=0) # 싫어요: 0, 좋아요: 1, Super Like: 2 (값을 부여하는 방식 O // 더하기 X)
    updated_at = models.DateTimeField(auto_now=True)


# 유저 체류데이터 수집 테이블
class ClickData(models.Model):
    account_guest = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="userClickData",
        on_delete=models.CASCADE,
        null=True
    )
    clicked_shop = models.ForeignKey(
        Shop,
        related_name="userClickShop",
        on_delete=models.CASCADE,
        null=True
    )
    # 보류
    clicked_time = models.TimeField() # 페이지 들어갈 때 체크
    left_time = models.TimeField(auto_now=True) # 페이지 이동했을 때 체크

    # def stayed_time(self):
    #     return self.left_time - self.clicked_time


class MyLikeList(models.Model):
    account_guest = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    list_name = models.CharField(max_length=20, blank=True)


class MyLikeListShop(models.Model):
    my_like_list = models.ForeignKey(
        MyLikeList, 
        on_delete=models.CASCADE,
        null=True
    )
    shop = models.ForeignKey(
        Shop, 
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return self.my_like_list
