from django.urls import path
from .views import AccountValidateView

urlpatterns = [
    path('auth/account-validate/', AccountValidateView.as_view(), name='account_validate'),
]
