import os
import json
import logging

from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model

from allauth.account.signals import user_signed_up, password_changed, password_reset, \
    email_confirmed

from api import settings

from public_api.utils import send_mail

logger = logging.getLogger(__name__)

with open(os.path.join(settings.BASE_DIR, '../common/enum/muscles.json')) as file:
    muscles = json.load(file)

MUSCLES_CHOICES = [(m['key'], m['value']) for m in muscles]


def media_file_path(instance, filename):
    """Generate file path for new image"""
    ext = filename.split('.')[-1]
    filename = str(instance.uuid) + '.' + ext
    return os.path.join('uploads/medias/', filename)


class Media(models.Model):
    """database model for medias"""

    uuid = models.UUIDField()
    file = models.FileField(upload_to=media_file_path)
    original_file_name = models.CharField(max_length=255)
    mime_type = models.CharField(max_length=255)
    file_size = models.IntegerField(default=0)
    media_object_id = models.PositiveIntegerField()
    media_content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    media = GenericForeignKey('media_content_type', 'media_object_id')
    usage = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Media'
        verbose_name_plural = 'Medias'
        ordering = ['updated_at']


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
    media = GenericRelation(
        Media,
        'media_object_id',
        'media_content_type',
        related_query_name='avatar'
    )

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
    user_inst = User.objects.get(email=user)

    context = {
        'firstname': user.firstname,
        'lastname': user.lastname
    }
    return send_mail(user_inst,
                     'new_user',
                     'account/email/welcome.html',
                     'account/email/welcome.txt',
                     **context)


@receiver(password_changed)
def after_password_changed(request, user, **kwargs):
    logger.error('---- AFTER PASSWORD CHANGED----')


@receiver(password_reset)
def after_password_reset(request, user, **kwargs):
    logger.error('---- AFTER PASSWORD RESET----')


@receiver(email_confirmed)
def after_email_confirmed(request, email_address, **kwargs):
    logger.error('---- AFTER EMAIL CONFIRMED ----')
