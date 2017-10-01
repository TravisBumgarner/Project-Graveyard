from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^request_token$', views.request_token),
    url(r'^access_token$', views.access_token),
]
