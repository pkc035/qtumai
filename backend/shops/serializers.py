from datetime            import datetime

from django.contrib.auth import get_user_model
from django.db.models    import F

from rest_framework      import serializers

from .models             import ReportShop, ReportReview, Review, Shop, ThemeKeyword, Coupon, Menu
from accounts.models     import AccountGuest, SearchedLocation

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['coupon_content']

class ThemeKeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThemeKeyword
        fields = ['theme_keyword']

class ShopListSerializer(serializers.ModelSerializer):
    themekeyword_set =  ThemeKeywordSerializer(many=True, read_only=True)
    coupon = CouponSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = [
            'id','shop_name','shop_info_url','kakao_score',
            'latitude','longitude', 'coupon', 'themekeyword_set'
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

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'
class AccountSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields =['id', 'username']

    # AccountGuest - AccountGuest 중간테이블 생성 후 변경
    # def update_or_create(self,validated_data,account):
    #     SearchedPeopleThrough.objects.update_or_create(
    #     from_accountguest=account,
    #     to_accountguest_id=validated_data['id'],
    #     # searched_time = datetime.now(),
    #     defaults = {
    #         'from_accountguest': account,
    #         'to_accountguest_id' : validated_data['id']
    #         }
    #     )

class LocationSearchSerializer(serializers.Serializer):
    class Meta:
        model  = SearchedLocation
        fields = ['content_word', 'searched_count'] 
        # fields = ['content_word', 'latitude', 'longitude', 'searched_count', 'searched_time'] 

    def update_or_create(self,validated_data,account):
        location = SearchedLocation.objects.update_or_create(
            content_word = validated_data['content_word'],
            # latitude = validated_data['latitude'],
            # longitude = validated_data['longitude'],
            searched_time = datetime.now()
        )
        # location.searched_count = F('searched_count') + 1
        location.account_guest.add(account)
        location.save()
