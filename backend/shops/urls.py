from django.urls    import path

from .views import ShopListViewSet, ShopDetailViewSet, review_command, review_create

from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=True)
router.register(r"list", ShopListViewSet, basename="list")
router.register(r"detail/(?P<id>.+)", ShopDetailViewSet,basename="detail")

urlpatterns = [
    path('review', review_create),
    path('review/<int:review_id>', review_command)
]+ router.urls
