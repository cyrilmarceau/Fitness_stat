from django.core.mail import EmailMultiAlternatives
from django.template import TemplateDoesNotExist
from django.template.loader import render_to_string
from django.template.loader import get_template

from api import settings


def render_mail(subject: str, user, template_name: str, context):
    email_subject = settings.DEFAUT_SUBJECT if not subject else settings.SUBJECT_EMAIL.get(subject)
    from_email, to = settings.DEFAULT_FROM_EMAIL, user

    try:
        template_path = get_template(template_name)
        template_html = render_to_string(template_path)

        msg = EmailMultiAlternatives(email_subject, 'text_content', from_email, to)
        msg.attach_alternative(template_path, template_html)

        return msg

    except TemplateDoesNotExist:
        raise

def send_mail(subject, user, template_name, context):
    msg = render_mail(subject, user, template_name, context)
    msg.send()
