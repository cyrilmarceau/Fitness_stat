from allauth.account.views import ConfirmEmailView

from dj_rest_auth.registration.views import VerifyEmailView

from django.urls import path, include

from app_api import views

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),

    # Need to declare first
    path('auth/registration/account-confirm-email/<str:key>/', ConfirmEmailView.as_view(),),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('auth/registration/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),

    path('muscles/', views.ListMuscle.as_view()),
]
