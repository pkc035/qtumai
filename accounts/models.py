from django.db import models

# Create your models here.

class Account_Guest(models.Model):
    name = models.CharField(max_length=20, null=False)
    gender = models.CharField(max_length=2, null=False)
    birthday = models.DateField(auto_now=False, auto_now_add=False)
    visited_store = models.CharField(max_length=20)
    search_content = models.CharField(max_length=20)
    email = models.EmailField(max_length=128)
    like_category = models.CharField(max_length=10)
    is_subscribe = models.BooleanField(null=True, default=False)
    subscribe_time = models.DateTimeField(auto_created=False)
    main_area = models.CharField(max_length=10)
    sub_area = models.CharField(max_length=10)
    detail_area = models.CharField(max_length=10)

    def __str__(self):
        return self.username

    
    