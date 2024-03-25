from django.urls import path, include
from django.contrib.auth.views import LoginView, LogoutView

from . import views

app_name = 'portefolio'
urlpatterns = [
    path('', views.index, name='index'),
]