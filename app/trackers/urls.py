from django.urls import path

from app.trackers.views import DownloadTrackerView

urlpatterns = [
    path('', DownloadTrackerView.as_view(), name='index'),
]
