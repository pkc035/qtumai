from rest_framework.routers import DefaultRouter

from .views import ShopListViewSet, ShopDetailViewSet

router = DefaultRouter(trailing_slash=True)
router.register(r"list", ShopListViewSet, basename="list")
router.register(r"detail/(?P<id>.+)", ShopDetailViewSet,basename="detail")

urlpatterns = router.urls