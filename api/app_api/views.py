import logging

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import APIException

from .serializers import UserSerializer

from core.models import User

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for user profile model"""
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
       
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'email': serializer.data['email']}, status=status.HTTP_201_CREATED)
        else:
            return Response(JSONRenderer().render(APIException(serializer.errors).get_full_details()), status=status.HTTP_400_BAD_REQUEST)