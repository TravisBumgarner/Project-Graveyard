# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Tweet(models.Model):
    contributors = models.TextField(blank=True, null=True)
    coordinates = models.TextField(blank=True, null=True)
    created_at = models.TextField(blank=True, null=True)
    created_at_in_seconds = models.IntegerField()
    favorite_count = models.IntegerField()
    favorited = models.BooleanField()
    tweet_id = models.IntegerField()
    in_reply_to_screen_name = models.TextField(blank=True, null=True)
    in_reply_to_status_id = models.TextField(blank=True, null=True)
    in_reply_to_user_id = models.TextField(blank=True, null=True)
    lang = models.TextField(blank=True, null=True)
    possibly_sensitive = models.TextField(blank=True, null=True)
    quoted_status = models.TextField(blank=True, null=True)
    quoted_status_id = models.IntegerField(blank=True, null=True)
    retweet_count = models.IntegerField()
    retweeted = models.BooleanField()
    retweeted_status = models.TextField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    hashtag = models.ManyToManyField('Hashtag', related_name='hashtag')
    user = models.ManyToManyField('User', related_name='user')
    user_mentions = models.ManyToManyField('User', related_name='user_mentions')


class Hashtag(models.Model):
    name = models.TextField(blank=True, null=True)


class User(models.Model):
    name = models.TextField(blank=True, null=True)
    screen_name = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    created_at = models.DateField()
    description = models.TextField(blank=True, null=True)
    favourites_count = models.IntegerField()
    followers_count = models.IntegerField()
    friends_count = models.IntegerField()
    twitter_id = models.IntegerField()
    statuses_count = models.IntegerField()