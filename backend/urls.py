from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^instagram_api/', include('instagram_api.urls')),
    url(r'^flickr_api/', include('flickr_api.urls')),
    url(r'^admin/', admin.site.urls),
]
