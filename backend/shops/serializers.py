from accounts.views import dislikeshop
from django.contrib.auth import get_user_model
from django.db.models    import F

from rest_framework      import serializers

from .models             import ReportShop, ReportReview, Review, Shop, ShopImage, ThemeKeyword, Coupon, Menu
from accounts.models     import SearchedLocation, SearchedPeopleThrough

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['coupon_content']

    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['coupon_content']

class ThemeKeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeKeyword
        fields = ['shopThemeKeyword']

    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['shopThemKeyword']

class ShopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopImage
        fields = ['img_url']
    
    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['img_url']

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
class ShopImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopImage
        fields = '__all__'

class ShopDetailSerializer(serializers.ModelSerializer):
    shop_image_list = serializers.SerializerMethodField()
    shop_status = serializers.SerializerMethodField()

    class Meta:
        model = Shop
        fields = '__all__'

    def get_shop_image_list(self,obj):
        shopimages = obj.shopimage_set.all()
        images = [shop.img_url for shop in shopimages]
        return images
    
    def get_shop_status(self,obj):
        user = self.context['request'].user
        likeshop = obj.likeshopaccounts_set.filter(guest_id=1)
        dislikeshop = obj.dislikeShop.filter(id=1)
        result = {
            'like_status' : True if likeshop else False,
            'dislike_status' : True if dislikeshop else False
        }

        return result
    
class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = '__all__'
        
    def get_username(self,obj):
        user = get_user_model().objects.get(id=obj.user_id)

        return user.username

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
        location = (
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
        location[0].searched_count = F('searched_count') + 1
        location[0].account_guest.add(account)
        location[0].save()
