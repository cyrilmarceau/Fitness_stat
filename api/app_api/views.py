import logging
import cloudinary
import uuid

from django.contrib.contenttypes.models import ContentType

from rest_framework.decorators import permission_classes
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from core.models import muscles, Media
from .serializers import UploadSerializer

logger = logging.getLogger(__name__)


@permission_classes([IsAuthenticated])
class ListMuscle(APIView):

    def get(self, request, format=None):
        """ Return a list of dictionary(key, value) of all muscles."""
        return Response(muscles)


# ViewSets define the view behavior.
class UploadViewSet(ViewSet):
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def create(self, request, format=None):
        logger.error('HERE !!! {}'.format(request.FILES))
        logger.error('HERE !!! 01 {}'.format(request.data))
        return Response({'key': 'ok'})
        # serializer = UploadSerializer(data=request.data)

        # if serializer.is_valid():
        #     # avatar = request.FILES["avatar"]
        #     avatar = request.data.get('avatar')
        #     logger.error('HERE !!! --- 01 {}'.format(avatar))
        #     return Response({'key': 'ok'})
        # else:
        #     logger.error('HERE !!! --- 02 {}'.format(serializer.errors))
        #     return Response({'key': 'non'})
        #
        #     content_type_id = ContentType.objects.get_for_model(request.user)
        #     extra_md_details = {
        #         "uuid": uuid.uuid4(),
        #         "file": avatar,
        #         "original_file_name": avatar.name,
        #         "mime_type": avatar.content_type,
        #         "file_size": avatar.size,
        #         "media_content_type": content_type_id,
        #         "media_object_id": request.user.pk,
        #         "usage": "avatar"
        #     }
        #
        #     # media = Media(**extra_md_details)
        #     # media.save()
        #     media = Media.objects.update_or_create(**extra_md_details)
        #
        #     extra = {
        #         "type": "authenticated",
        #         "resource_type": "auto",
        #         "folder": "uploads/medias/",
        #         "access_mode": "authenticated",
        #     }
        #
        #     file_uploaded_payload = cloudinary.uploader.upload(media.file, **extra)
        #     logger.error('TEST {}'.format(file_uploaded_payload['secure_url']))
        #     return Response({'key': 'ok'})
        # else:
        #     logger.error('SERIALIZER IS NOT VALID ! {}'.format(serializer.errors))
        #     return Response({'key': 'non'})
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
