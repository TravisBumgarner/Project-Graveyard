# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-06-05 19:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20180605_1942'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='SnippetFoo',
            name='author',
        ),
        migrations.AddField(
            model_name='SnippetFoo',
            name='author',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.Author'),
        ),
    ]
