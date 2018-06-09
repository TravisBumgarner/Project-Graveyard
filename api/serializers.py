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
            'created_at',
        )


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = (
            'id',
            'name',
            'description'
        )


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'description'
        )


class SourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Source
        fields = (
            'id',
            'name',
        )