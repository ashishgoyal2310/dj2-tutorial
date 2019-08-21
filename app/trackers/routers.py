from django.urls import path
from app.trackers import api_views

urlpatterns = [
    path('trackers/', api_views.TrackerList.as_view(), name='tracker-list'),
    path('trackers/<str:task_id>/', api_views.TrackerDetail.as_view(), name='tracker-detail'),
]
