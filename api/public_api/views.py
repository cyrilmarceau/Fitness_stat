from django.views.generic.base import TemplateView


class AccountValidateView(TemplateView):
    template_name = "account/account-validate.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
