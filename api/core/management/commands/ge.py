import os
import json
from api import settings
from core.models import Muscle
from django.core.management.base import BaseCommand

import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Insert estimate model for json"

    def handle(self, *args, **options):
        with open(os.path.join(settings.BASE_DIR, '../common/enum/muscles.json')) as file:
            muscles = json.load(file)
            logger.debug('MUSCLE {}'.format(muscles))