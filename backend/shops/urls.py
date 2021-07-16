from django.urls    import path

from .views import ShopListViewSet, ShopDetailViewSet, ReportReviewViewSet, MenuViewSet, review_command, review_create, report_shop, report_shop_command, report_review_command

from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=True)
router.register(r"list", ShopListViewSet, basename="list")
router.register(r"detail/(?P<id>.+)", ShopDetailViewSet,basename="detail")
# router.register(r"detail", ShopDetailViewSet,basename="detail")
router.register(r"review/report", ReportReviewViewSet,basename="ReportReview")
router.register(r"menu",MenuViewSet, basename="menu")

urlpatterns = [
    path('review', review_create),
    path('report', report_shop),
    path('report/<int:shop_id>',report_shop_command),
    path('review/<int:review_id>', review_command),
    path('report/review/<int:report_review_id>', report_review_command)
    
]+ router.urls
