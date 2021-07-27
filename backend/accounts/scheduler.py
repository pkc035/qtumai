import math
from apscheduler.schedulers.background import BackgroundScheduler

from django.db       import transaction

from accounts.models import AccountGuest, FunDataPercentage

def post_fundatapercentage():
    with transaction.atomic():
        data  = AccountGuest.objects.values_list('fun_data_count', flat=True).order_by('-fun_data_count')
        count = AccountGuest.objects.all().count()

        for i in range(1,1000):
            ranking = round(i*0.001, 3)
            FunDataPercentage.objects.update_or_create(
                percentage = ranking,
                defaults = {
                    'percentage' : ranking,
                    'greater_than' : data[math.floor(count*ranking)]
                }
            )

        FunDataPercentage.objects.create(
            percentage = 100,
            greater_than = 0
        )    

scheduler = BackgroundScheduler()
scheduler.add_job(post_fundatapercentage, 'cron', hour=4, minute=00)