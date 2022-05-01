from django.urls import path, include
from rest_framework import routers
from app_api import views
from jwt import utils
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register('users', views.UserViewSet, basename='User')

urlpatterns = [
    # Crud
    path('', include(router.urls)),
    path('auth/', include('dj_rest_auth.urls')),
    path('muscles/', views.ListMuscle.as_view()),
]