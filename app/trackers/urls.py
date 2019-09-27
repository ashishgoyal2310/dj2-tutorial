from django.urls import path

from app.trackers.views import DownloadTrackerView
from app.trackers.views import download

urlpatterns = [
    path('', DownloadTrackerView.as_view(), name='index'),
    path('download', download, name='download'),
]
