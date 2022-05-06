import logging

from allauth.account.signals import user_signed_up, password_changed, password_reset, \
    email_confirmed, email_confirmation_sent
from django.dispatch import receiver

logger = logging.getLogger(__name__)


