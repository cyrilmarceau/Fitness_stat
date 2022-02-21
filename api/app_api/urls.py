from django.urls import path, include
from rest_framework import routers
from app_api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    # Crud
    path('', include(router.urls)),
]
