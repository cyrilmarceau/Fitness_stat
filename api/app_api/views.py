import logging

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import muscles

logger = logging.getLogger(__name__)


@permission_classes([IsAuthenticated])
class ListMuscle(APIView):
    def get(self, request, format=None):
        """ Return a list of dictionary(key, value) of all muscles."""
        return Response(muscles)
