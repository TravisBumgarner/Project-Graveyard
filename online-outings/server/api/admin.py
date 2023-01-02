from __future__ import unicode_literals

from django.contrib import admin

from .models import *


class LinkInline(admin.TabularInline):
    model = Link
    extra = 3


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    inlines = (LinkInline,)

    list_display = ("name", "description", "date_created")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
