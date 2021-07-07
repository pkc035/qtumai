from django.contrib import admin
from .models import AccountGuest, SearchedContent, Preference, FunData
# Register your models here.

admin.site.register(AccountGuest)
admin.site.register(SearchedContent)
admin.site.register(Preference)
admin.site.register(FunData)