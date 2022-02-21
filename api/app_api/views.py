import logging

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
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

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:            
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(JSONRenderer().render(serializer.errors), status=status.HTTP_400_BAD_REQUEST)