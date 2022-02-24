import logging

from django.contrib.auth import get_user_model
from rest_framework import serializers
from core.models import User

logger = logging.getLogger(__name__)

class UserSerializer(serializers.ModelSerializer):
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
