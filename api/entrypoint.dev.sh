#!/bin/bash

# celery -A app worker --detach --beat --scheduler django --loglevel=info
python manage.py runserver 0.0.0.0:80