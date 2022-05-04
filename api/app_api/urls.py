from django.urls import path, include
from app_api import views

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('auth/account-confirm-email/',
    #      VerifyEmailView.as_view(),
    #      name='account_email_verification_sent'
    #      ),
    path('muscles/', views.ListMuscle.as_view()),
]
