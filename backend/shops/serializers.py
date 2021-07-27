from django.contrib.auth import get_user_model
from django.db.models    import F

from rest_framework import serializers

from .models         import (
    OpenTime, ReportShop, ReportReview, Review, Shop, ShopImage, ThemeKeyword, Coupon, Menu
)
from accounts.models import FunDataPercentage, SearchedLocation, SearchedPeopleThrough, VisitedShop


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['coupon_content']

    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['coupon_content']

class OpenTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenTime
        fields = ['open_time']

class ThemeKeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeKeyword
        fields = ['theme_keyword']

    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['theme_keyword']

class ShopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopImage
        fields = ['img_url']
    
    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['img_url']

class VisitedShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitedShop
        fields = ['visited_time']

class ReviewIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id']

    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['id']

class ShopListSerializer(serializers.ModelSerializer):
    shopimage_set = ShopImageSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = [
            'id','shop_name','shop_description','latitude','longitude','naver_score', 'shopimage_set'
        ]
    
class ShopRecommendSerializer(ShopListSerializer):
    shopThemeKeyword =  ThemeKeywordSerializer(many=True, read_only=True)
    coupon_set = CouponSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = ShopListSerializer.Meta.fields + [
            'shopThemeKeyword', 'coupon_set'
        ]

class ShopVisitedSerializer(ShopListSerializer):
    visitedshop_set = VisitedShopSerializer(many=True, read_only=True)
    review_set = ReviewIdSerializer(many=True, read_only=True)
    is_review = serializers.SerializerMethodField()

    class Meta:
        model = Shop
        fields = ShopListSerializer.Meta.fields + [
            'visitedshop_set',
            'review_set',
            'is_review'
        ]
    
    def get_is_review(self, obj):
        if obj.review_set.exists():
            return True
        return False

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = '__all__'
        
    def get_username(self,obj):
        # user = get_user_model().objects.get(id=obj.user_id)
        user = get_user_model().objects.get(id=1)
        
        return user.username

class ShopDetailSerializer(serializers.ModelSerializer):
    shop_image_list = serializers.SerializerMethodField()
    shop_status     = serializers.SerializerMethodField()
    shop_menu       = serializers.SerializerMethodField()
    coupon_set      = CouponSerializer(many=True)
    opentime_set    = OpenTimeSerializer(many=True)
    review_set      = ReviewSerializer(many=True)

    class Meta:
        model = Shop
        fields = '__all__'

    def get_shop_image_list(self,obj):
        shopimages = obj.shopimage_set.all()
        images     = [shop.img_url for shop in shopimages]
        return images
    
    def get_shop_status(self,obj):
        user        = self.context['request'].user
        likeshop    = obj.likeshopaccounts_set.filter(guest_id=1)
        dislikeshop = obj.dislikeShop.filter(id=1)
        reportshop  = obj.reportShop.filter(guest_id=1)
        
        result = {
            'like_status' : True if likeshop else False,
            'dislike_status' : True if dislikeshop else False,
            'report_shop' : True if reportshop else False
        }

        return result
    
    def get_shop_menu(self,obj):
        menus = [menu.menu_name for menu in obj.menu_set.filter(is_representative=True)]

        if menus:
            return menus[0]

        return None
    
class ReportShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportShop
        fields = '__all__'

class ReportReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportReview
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'menu_name', 'img_path_1', 'img_path_2', 'img_path_3', 'price', 'is_representative']

class AccountSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields =['id', 'username']

    def update_or_create(self,validated_data,account):
        SearchedPeopleThrough.objects.update_or_create(
        from_accountguest=account,
        to_accountguest_id=validated_data['id'],
        defaults = {
            'from_accountguest' : account,
            'to_accountguest_id' : validated_data['id']
            }
        )
        
class LocationSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SearchedLocation
        fields = ['content_word', 'latitude', 'longitude', 'searched_count', 'searched_time'] 

    def update_or_create(self,validated_data,account):
        location, created = (
            SearchedLocation.objects.filter(account_guest=account)
                .update_or_create(
                content_word = validated_data['content_word'],
                latitude = validated_data['latitude'],
                longitude = validated_data['longitude'],
                defaults = {
                    'content_word' : validated_data['content_word'],
                }
            )
        )
        location.searched_count = F('searched_count') + 1
        location.account_guest.add(account)
        location.save()

class FunDataPercentageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunDataPercentage
        fields = ['percentage']
