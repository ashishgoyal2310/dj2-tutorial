from django.views.generic.base import TemplateView

from django.core.cache import caches
cache = caches['default']
fbcache = caches['fbCache']

class DownloadTrackerView(TemplateView):

    template_name = "tracker.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        tracker_task_ids = cache.get('tracker_task_ids', [])
        context['tracker_task_ids'] = tracker_task_ids

        return context
