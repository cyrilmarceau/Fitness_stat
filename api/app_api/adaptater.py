import logging

from allauth.account.adapter import DefaultAccountAdapter
from allauth.utils import build_absolute_uri

logger = logging.getLogger(__name__)


class DefaultAccountAdapterCustom(DefaultAccountAdapter):
    pass
    # def send_mail(self, template_prefix, email, context):
    #     context['activate_url'] = 'http://0.0.0.0:9010/public/auth/registration/account-confirm-email/' + context['key'] + '/'
    #     msg = self.render_mail(template_prefix, email, context)
    #     msg.send()

    # def get_email_confirmation_url(self, request, emailconfirmation):
    #     CUSTOM_ACCOUNT_CONFIRM_EMAIL_URL = 'test/chemin/'
    #     logger.error('REQUEST {}'.format(request))
    #
    #     url = CUSTOM_ACCOUNT_CONFIRM_EMAIL_URL.format(emailconfirmation.key)
    #     ret = build_absolute_uri(
    #         request,
    #         url + '/' + request)
    #     return ret
