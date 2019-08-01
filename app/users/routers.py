from django.urls import include, path
from rest_framework import routers
from app.users import api_views

# router = routers.DefaultRouter()
router = routers.SimpleRouter()
router.register(r'users', api_views.UserViewSet)
router.register(r'groups', api_views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]
