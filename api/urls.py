from django.conf.urls import url, include
from rest_framework import routers

from .viewsets import *

router = routers.DefaultRouter()

router.register(r'snippets', SnippetViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'categories', CategoryViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
]