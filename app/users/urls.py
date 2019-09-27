from django.urls import path

from app.users.views import HomeView

urlpatterns = [
    path('home', HomeView.as_view(), name='home'),
]
