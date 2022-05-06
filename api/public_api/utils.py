import logging
from smtplib import SMTPException

from django.core.mail import EmailMultiAlternatives
from django.template import TemplateDoesNotExist
from django.template.loader import render_to_string
from django.template.loader import get_template

from api import settings

logger = logging.getLogger(__name__)


def send_mail(user, subject, text_template, html_template, **kwds):
    text = render_to_string(text_template, kwds)

    email_subject = settings.DEFAUT_SUBJECT if not subject else settings.SUBJECT_EMAIL.get(subject)

    from_email, to = settings.DEFAULT_FROM_EMAIL, user.email

    msg = EmailMultiAlternatives(email_subject, text, from_email, [to])

    if html_template:
        html = render_to_string(html_template, kwds)
        msg.attach_alternative(html, "text/html")
        msg.content_subtype = "html"
    try:
        msg.send()
    except SMTPException:
        return False
    return True
