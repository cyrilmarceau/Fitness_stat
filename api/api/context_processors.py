from django.conf import settings


def custom_variables(request):
    # Return dictionary with value
    return {'APP_NAME': settings.APP_NAME}
