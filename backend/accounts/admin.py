from django.contrib import admin
from .models import AccountGuest, SearchedLocation, SearchedMenu, SearchedStore, Preference, FunData, LivingArea, AccountJobCategory, AccountJob, SearchedPeopleThrough, MyLikeList, MyLikeListShop
# Register your models here.

admin.site.register(AccountGuest)
admin.site.register(SearchedLocation)
admin.site.register(SearchedMenu)
admin.site.register(SearchedStore)
admin.site.register(Preference)
admin.site.register(FunData)
admin.site.register(LivingArea)
admin.site.register(AccountJobCategory)
admin.site.register(AccountJob)
admin.site.register(SearchedPeopleThrough)
admin.site.register(MyLikeList)
admin.site.register(MyLikeListShop)