from django.contrib import admin
from .models import Notice

# Register your models here.
def get_fields_model(model):
    return [field.name for field in model._meta.get_fields()]

class NoticeAdmin(admin.ModelAdmin):
    list_display = get_fields_model(Notice)
    # list_display = ('pk', 'title', 'content', 'public', 'hits', 'top_fixed', 'created_at', 'updated_at')

admin.site.register(Notice, NoticeAdmin)