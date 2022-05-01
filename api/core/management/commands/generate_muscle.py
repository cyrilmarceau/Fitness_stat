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
        pass