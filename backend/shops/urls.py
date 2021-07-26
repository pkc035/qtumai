from django.urls    import path

from .views import (
    ShopRecommendViewSet, ShopListViewSet, ShopDetailViewSet, ShopSearchViewSet, ShopVisitedViewSet,
    ReportReviewViewSet, AccountSearchViewSet, LocationSearchViewSet, get_raw_fundata, review_command,
    review_create, report_shop, report_shop_command, report_review_command
    )

from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=True)
router.register(r"detail/(?P<id>.+)", ShopDetailViewSet,basename="detail")
router.register(r"review/report", ReportReviewViewSet,basename="ReportReview")
router.register(r"list", ShopListViewSet, basename="list")
router.register(r"recommend", ShopRecommendViewSet, basename="recommend")
router.register(r"search/account", AccountSearchViewSet, basename="search/account")
router.register(r"search/location", LocationSearchViewSet, basename="search/location")
router.register(r"search/shop", ShopSearchViewSet, basename="search/shop")
router.register(r"visited", ShopVisitedViewSet, basename="visited")

urlpatterns = [
    path('review', review_create),
    path('report', report_shop),
    path('report/<int:shop_id>',report_shop_command),
    path('review/<int:review_id>', review_command),
    path('report/review/<int:report_review_id>', report_review_command),
    path('fun', get_raw_fundata)
]+ router.urls