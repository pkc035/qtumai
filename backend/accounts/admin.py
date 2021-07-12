from django.contrib import admin
from .models import AccountGuest, SearchedLocation, SearchedMenu, SearchedStore, Preference, FunData
# Register your models here.

admin.site.register(AccountGuest)
admin.site.register(SearchedLocation)
admin.site.register(SearchedMenu)
admin.site.register(SearchedStore)
admin.site.register(Preference)
admin.site.register(FunData)