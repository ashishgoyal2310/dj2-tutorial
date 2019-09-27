import os
from django.views.generic.base import TemplateView
from django.conf import settings
from django.http import HttpResponse, Http404

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


def download(request):
    filename = request.GET.get('filename', None)
    if not filename:
        return HttpResponse('No media file')

    file_path = os.path.join(settings.MEDIA_ROOT, filename)
    if not os.path.exists(file_path):
        return HttpResponse('Invalid file name')

    response = None
    with open(file_path, 'rb') as f:
        response = HttpResponse(f.read(), content_type="application/vnd.ms-excel")
        response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)

    return response
