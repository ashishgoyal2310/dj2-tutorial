from django.views.generic.base import TemplateView
from django.conf import settings
from django.http import HttpResponse, Http404


class HomeView(TemplateView):

    template_name = "home.html"
    template_name = "demo-nav-bar.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
