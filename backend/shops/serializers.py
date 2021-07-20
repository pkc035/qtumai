from django.contrib.auth import get_user_model
from django.db.models    import F

from rest_framework      import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from .models             import ReportShop, ReportReview, Review, Shop, ShopImage, ThemeKeyword, Coupon
from accounts.models     import SearchedLocation, SearchedPeopleThrough, VisitedShop

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

class VisitedShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitedShop
        fields = ['visited_time']

    def to_representation(self, instance):
        row = super().to_representation(instance)
        return row['visited_time']

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

    class Meta:
        model = Shop
        fields = ShopListSerializer.Meta.fields + [
            'visitedshop_set'
        ]

class ShopDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

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