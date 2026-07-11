from django.urls import path

from . import views

app_name = "portefolio"
urlpatterns = [
    path("", views.index, name="index"),
    path("projects/", views.project, name="Projects"),
]
