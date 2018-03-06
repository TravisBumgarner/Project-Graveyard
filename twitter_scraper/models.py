# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Tweet(models.Model):
    contributors = models.TextField(blank=True, null=True)
    coordinates = models.TextField(blank=True, null=True)
    created_at_in_seconds = models.IntegerField(blank=True, null=True)
    favorite_count = models.IntegerField(blank=True, null=True)
    favorited = models.BooleanField(blank=True, default=False)
    tweet_id = models.IntegerField(blank=True, null=True)
    in_reply_to_screen_name = models.TextField(blank=True, null=True)
    in_reply_to_status_id = models.TextField(blank=True, null=True)
    in_reply_to_user_id = models.TextField(blank=True, null=True)
    lang = models.TextField(blank=True, null=True)
    possibly_sensitive = models.TextField(blank=True, null=True)
    quoted_status = models.TextField(blank=True, null=True)
    quoted_status_id = models.IntegerField(blank=True, null=True)
    retweet_count = models.IntegerField(blank=True, null=True)
    retweeted = models.BooleanField(blank=True, default=False)
    retweeted_status = models.TextField(blank=True, null=True)
    text = models.TextField(blank=True, null=True)
    hashtag = models.ManyToManyField('Hashtag', related_name='hashtag')
    user = models.ManyToManyField('User', related_name='user')
    user_mentions = models.ManyToManyField('User', related_name='user_mentions')

    def __str__(self):
        return self.text


class Hashtag(models.Model):
    name = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name



class User(models.Model):
    name = models.TextField(blank=True, null=True)
    screen_name = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    created_at = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    favourites_count = models.IntegerField(blank=True, null=True)
    followers_count = models.IntegerField(blank=True, null=True)
    friends_count = models.IntegerField(blank=True, null=True)
    twitter_id = models.IntegerField(blank=True, null=True)
    statuses_count = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name
