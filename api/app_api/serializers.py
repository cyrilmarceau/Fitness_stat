import logging

from django.contrib.auth import get_user_model
from rest_framework import serializers
from core.models import User

logger = logging.getLogger(__name__)

class UserSerializer(serializers.BaseSerializer):

    def to_internal_value(self, data):
        email = data.get('email')

        duplicate_users = User.objects.filter(email=email)

        if not email:
            raise serializers.ValidationError({
                'error': {
                    'message': 'Field email missing for create user',
                    'code': 'field_missing'
                }
            })

        if duplicate_users.exists():
            raise serializers.ValidationError({
                'error': {
                    'message': 'User already exist',
                    'code': 'unique_user'
                }
            })

        return {
            'email': email,
           
        }

    def to_representation(self, instance):
        return {
            'email': instance.email,
            'success': True
        }

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)