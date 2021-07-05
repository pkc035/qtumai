from django.contrib import admin
from .models import AccountGuest, SearchedArea

# Register your models here.
class AccountGuestAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'birthday', 'living_area')


admin.site.register(AccountGuest, AccountGuestAdmin)