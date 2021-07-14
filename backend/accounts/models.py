from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from shops.models import Shop, Category

# Create your models here.
# 같은 동네에 사는 사람들 묶어주기 위한 테이블(등록된 동네가 없으면 항목 새로 추가 + Account에 연결, 있으면 있는 항목(pk)에 Account 연결)
class LivingArea(models.Model):
    living_area = models.TextField()
    people_count = models.IntegerField(default=0)


class AccountJob(models.Model):
    job = models.CharField(max_length=20)


class AccountGuest(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True)
    # nickname = models.CharField(max_length=20, blank=True) # 네이버 로그인 시 받아올 수 있으면 바로 입력
    kakao_number = models.CharField(max_length=50, blank=True)
    google_number = models.EmailField(max_length=50, blank=True)
    google_mail = models.EmailField(max_length=128, blank=True) # 안들어올수도 있음
    naver_id = models.CharField(max_length=50, blank=True)
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
    my_shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="accountMyShop", null=True)
    shopkeeper_tel = models.CharField(max_length=20, blank=True)
    searched_person = models.ManyToManyField('self', symmetrical=False) # 같이갈 사람 추가할 때 필요
    my_friends = models.ManyToManyField('self', symmetrical=False) # symmetrical: 대칭관계(상대방쪽에서도 자동추가 여부)
    job = models.ForeignKey(AccountJob, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.username


# 방문 시간도 함께 체크하기 위해 through 사용 (ManyToMany에서 컬럼 추가하는 방법)
class VisitedShop(models.Model):
    account_guest = models.ForeignKey(AccountGuest, on_delete=models.CASCADE, null=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    visited_time = models.DateTimeField(auto_now_add=True)


class SearchedLocation(models.Model):
    account_guest = models.ManyToManyField(
        AccountGuest, # 역참조 할 수 있도록 manytomany 사용
        related_name="searchedLocation", 
        blank=True
    )
    content_word = models.CharField(max_length=20, blank=True)
    searched_count = models.PositiveIntegerField(default=0)


class SearchedMenu(models.Model):
    account_guest = models.ManyToManyField(
        AccountGuest, # 역참조 할 수 있도록 manytomany 사용
        related_name="searchedMenu", 
        blank=True
    )
    content_word = models.CharField(max_length=20, blank=True)
    searched_count = models.PositiveIntegerField(default=0)


class SearchedStore(models.Model):
    account_guest = models.ManyToManyField(
        AccountGuest, # 역참조 할 수 있도록 manytomany 사용
        related_name="searchedStore", 
        blank=True
    )
    content_word = models.CharField(max_length=20, blank=True)
    searched_count = models.PositiveIntegerField(default=0)


class Preference(models.Model):
    account_guest = models.ForeignKey(
        AccountGuest,
        on_delete=models.CASCADE,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
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
    
    # 0 ~ 1023번 그룹으로 분류
    def group_num(self):
        group_num = self.taste_service * 512 + self.taste_cleanliness * 256 + self.taste_vibe * 128 + self.taste_price * 64
        + self.service_cleanliness * 32 + self.service_vibe * 16 + self.service_price * 8
        + self.cleanliness_vibe * 4 + self.cleanliness_price * 2 + self.vibe_price
        return group_num


class FunData(models.Model):
    account_guest = models.ManyToManyField(
        AccountGuest,
        related_name="userFunData",
        blank=True
    )
    content_name = models.CharField(max_length=20, blank=True)
    score = models.SmallIntegerField(default=0) # 싫어요: 0, 좋아요: 1, Super Like: 2
    created_at = models.DateTimeField(auto_now_add=True)


# 유저 체류데이터 수집 테이블
class ClickData(models.Model):
    account_guest = models.ForeignKey(
        AccountGuest,
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
    clicked_time = models.TimeField(auto_now_add=True)
    stayed_time = models.TimeField() # 페이지 이동했을 때 체크


class MyLikeList(models.Model):
    account_guest = models.ForeignKey(AccountGuest, on_delete=models.CASCADE, null=True)
    list_name = models.CharField(max_length=20)


class MyLikeListShop(models.Model):
    my_like_list = models.ManyToManyField(
        MyLikeList, 
        related_name="myLikeListShop", 
        blank=True
    )
    shop_name = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.my_like_list