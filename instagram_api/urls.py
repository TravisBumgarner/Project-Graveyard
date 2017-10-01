from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    # url(r'^hello$', views.hello),
    url(r'^hello_response$', views.hello_response),
    url(r'^get_images$', views.load_images),
    url(r'^admin/', admin.site.urls),
]
