from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    url(r'^', include('api.urls')),
]