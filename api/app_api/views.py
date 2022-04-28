import logging

from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import APIException

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import UserSerializerTest
from core.models import User

logger = logging.getLogger(__name__)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for user profile model"""
    serializer_class = UserSerializerTest
    queryset = get_user_model().objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'email': serializer.data['email'], 'status': status.HTTP_201_CREATED})
        else:
            errors_details = APIException(serializer.errors).get_full_details()
            json_error = Response(JSONRenderer().render(errors_details), status=status.HTTP_400_BAD_REQUEST)
            return json_error

