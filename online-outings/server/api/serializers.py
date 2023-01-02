from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ("id", "name", "url")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class ActivitySerializer(serializers.ModelSerializer):
    links = LinkSerializer(read_only=True, many=True)
    categories = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = Activity
        fields = (
            "categories",
            "date_created",
            "description",
            "id",
            "links",
            "min_cost",
            "max_cost",
            "min_participants",
            "max_participants",
            "name",
        )
