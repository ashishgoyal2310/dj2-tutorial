from django.views.generic.base import TemplateView


class DownloadTrackerView(TemplateView):

    template_name = "tracker.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
