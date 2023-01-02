# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-06 00:32
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter_scraper', '0012_remove_tweet_favorited'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='favorited',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='tweet',
            name='retweeted',
            field=models.BooleanField(default=False),
        ),
    ]
