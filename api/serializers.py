from .models import *
from rest_framework import serializers


class SnippetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Snippet
        fields = (
            'id',
            'text',
            'author',
            'source',
            'category',
        )


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = (
            'name'
        )