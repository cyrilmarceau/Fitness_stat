import logging

from django.db import transaction

from rest_framework import serializers

from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from core.models import User, Media

logger = logging.getLogger(__name__)


class CustomRegisterSerializer(RegisterSerializer):
    firstname = serializers.CharField(max_length=255)
    lastname = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=30)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.firstname = self.data.get('firstname')
        user.lastname = self.data.get('lastname')
        user.phone = self.data.get('phone')
        user.save()
        return user


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'firstname', 'lastname', 'email', 'phone', 'is_active', 'created_at', 'updated_at',)


# Serializers define the API representation.
class UploadSerializer(serializers.Serializer):
    avatar = serializers.ImageField()

    class Meta:
        model = Media
