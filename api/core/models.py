import os
import json
import logging

from api import settings

from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth import get_user_model

from allauth.account.signals import user_signed_up, password_changed, password_reset, \
    email_confirmed

from public_api.utils import send_mail

logger = logging.getLogger(__name__)


with open(os.path.join(settings.BASE_DIR, '../common/enum/muscles.json')) as file:
    muscles = json.load(file)

MUSCLES_CHOICES = [(m['key'], m['value']) for m in muscles]


class UserManager(BaseUserManager):
    """Manager for User model"""

    def create_user(self, email, password=None, **extra_fields):
        """Create a new user"""
        if not email:
            raise ValueError('User must have an email address.')

        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, firstname, lastname, password):
        """Create a new super user"""
        user = self.create_user(email=email, password=password, firstname=firstname, lastname=lastname)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser):
    """database model for users"""
    firstname = models.CharField(max_length=255, null=True, blank=True)
    lastname = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname']

    def __str__(self):
        """Return string representation of User"""
        return self.email


class Muscle(models.Model):
    """database model for muscle"""
    slug = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return string representation of muscle"""
        return self.slug


@receiver(user_signed_up)
def after_user_signup(request, user, **kwargs):
    logger.debug('---- AFTER USER SIGNUP----')

    user_inst = User.objects.get(email=user)
    context = {}
    send_mail('new_user', user_inst, 'account/email/test.html', context)


@receiver(password_changed)
def after_password_changed(request, user, **kwargs):
    logger.error('---- AFTER PASSWORD CHANGED----')


@receiver(password_reset)
def after_password_reset(request, user, **kwargs):
    logger.error('---- AFTER PASSWORD RESET----')


@receiver(email_confirmed)
def after_email_confirmed(request, email_address, **kwargs):
    logger.error('---- AFTER EMAIL CONFIRMED ----')