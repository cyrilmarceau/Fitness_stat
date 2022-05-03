import json
import logging

from core.models import User
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from django.contrib.auth import get_user_model
from django.utils.encoding import force_str
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .errors import DetailsResponse, ErrorResponse, SuccessValue

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


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'firstname', 'lastname', 'email', 'phone', 'is_active', 'created_at', 'updated_at',)
