from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import PermissionsMixin


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


