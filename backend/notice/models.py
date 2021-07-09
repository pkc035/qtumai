from django.db import models

# Create your models here.

class Notice(models.Model):
    title = models.CharField(max_length=30, blank=True)
    content = models.TextField(blank=True)
    public = models.BooleanField(default=True)
    hits = models.PositiveIntegerField(verbose_name='조회수', default=0)
    top_fixed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    