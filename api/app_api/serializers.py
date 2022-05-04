import logging

from api import settings
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from django.db import transaction

from django.contrib.auth import get_user_model

from core.models import User

from rest_framework import serializers

logger = logging.getLogger(__name__)


class UserSerializerTest(serializers.ModelSerializer):
    """Serializers for users"""

    class Meta:
        model = get_user_model()
        fields = '__all__'
        read_only_fields = ('id', 'last_login', 'created_at', 'updated_at',)
        extra_kwargs = {
            'password': {
                'write_only': True,
                'min_length': 8,
                'style': {'input_type': 'password'}
            },
        }

    def create(self, validated_data):
        """Create and return a new user"""
        user = get_user_model().objects.create_user(**validated_data)
        return user


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
