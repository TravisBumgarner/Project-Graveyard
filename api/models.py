# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'


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
    source = models.ForeignKey(Source, default=None, on_delete=models.CASCADE, null=True, blank=True)

    def __unicode__(self):
        MAX_PREVIEW_LENGTH = 100
        return self.text if len(self.text) <= MAX_PREVIEW_LENGTH else '{}...'.format(self.text[0:(MAX_PREVIEW_LENGTH - 3)])

