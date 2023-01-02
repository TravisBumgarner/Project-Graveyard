# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from .utils import generate_color

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=25, unique=True, editable=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'


@receiver(pre_save, sender=Category)
def set_color(sender, instance, *args, **kwargs):
    if instance.pk is None:
        instance.color = generate_color()


class Source(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __unicode__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __unicode__(self):
        return self.name


class Snippet(models.Model):
    text = models.TextField()
    category = models.ForeignKey(Category, default=None, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, default=None, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, default=None, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        max_preview_length = 100
        return self.text if len(self.text) <= max_preview_length else '{}...'.format(self.text[0:(max_preview_length - 3)])

