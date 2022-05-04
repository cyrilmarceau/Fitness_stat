from django.urls import path
from dj_rest_auth.registration.views import VerifyEmailView
from allauth.account.views import ConfirmEmailView

urlpatterns = [
    path('auth/account-confirm-email/',
         VerifyEmailView.as_view(),
         name='account_email_verification_sent'
         ),
]
