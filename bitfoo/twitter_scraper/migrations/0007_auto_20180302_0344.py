# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-02 03:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('twitter_scraper', '0006_tweet_created_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tweet',
            old_name='twitter_id',
            new_name='tweet_id',
        ),
    ]
