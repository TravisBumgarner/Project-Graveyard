import urllib
import requests
import twitter
from django.core.management.base import BaseCommand, CommandError

from bitfoo.utils import strip_weird_chars

from twitter_scraper.settings import CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET
from twitter_scraper.models import Hashtag, Tweet, User

# NOTES
# Search goes back 7 days

# Params
params = {}

'''
Name: q
Required
Description:
    A UTF-8, URL-encoded search query of 500 characters maximum, including operators. 
    Queries may additionally be limited by complexity.
'''
params['q'] = 'bitcoin'

'''
Name: lang
Description: Restricts tweets to the given language, given by an ISO 639-1 code. Language detection is best-effort.
'''
params['lang'] = 'en'

'''
Name: result_type
Description: Specifies what type of search results you would prefer to receive. 
    The current default is 'mixed.' Valid values include:
        * mixed : Include both popular and real time results in the response.
        * recent : return only the most recent results in the response
        * popular : return only the most popular results in the response.
'''
params['result_type'] = 'popular'

'''
Name: count
Description: # of tweets per page, max 100
'''
params['count'] = 100

'''
Name: until
Description: Returns tweets created before the given date. Date should be formatted as YYYY-MM-DD. 
    Keep in mind that the search index has a 7-day limit. In other words, no tweets will be found 
    for a date older than one week.
'''
params['until'] = '2018-02-28'

'''
Name: since_id
Description: Returns results with an ID greater than (that is, more recent than) the specified ID. 
    There are limits to the number of Tweets which can be accessed through the API. If the limit of 
    Tweets has occured since the since_id, the since_id will be forced to the oldest ID available.
'''
# params['since_id'] =

'''
Name: max_id
Description: Returns results with an ID less than (that is, older than) or equal to the specified ID.
'''
# params['max_id'] = 0


class Command(BaseCommand):
    def __init__(self):
        super(BaseCommand, self).__init__()
        self.api = twitter.Api(
            consumer_key= CONSUMER_KEY,
            consumer_secret= CONSUMER_SECRET,
            access_token_key= ACCESS_TOKEN_KEY,
            access_token_secret= ACCESS_TOKEN_SECRET
        )

    def should_get_started(self):
        print('[+] Config:')
        for param in sorted(params.keys()):
            print('[+]     {0:15s} {1:15s}'.format(param, str(params[param])))

        print('\n')

        input = 'y'
        while input not in ['y', 'n']:
            input = raw_input('[>] Continue? (y/n) ')

        if input == 'n':
            print('[-] Process canceled')
            return False
        else:
            print('[+] Commencing scraping')
            return True

    def handle(self, *args, **options):
        if self.should_get_started():
            raw_query = urllib.urlencode(params)
            results = self.api.GetSearch(raw_query=raw_query)

            for r in results:
                try:
                    t = Tweet.objects.get(tweet_id = r.id)
                    if r.favorite_count != t.favorite_count:
                        print('new', r.favorite_count, 'old', t.favorite_count)

                except Tweet.DoesNotExist:
                    u, u_is_new_row = User.objects.get_or_create(twitter_id = r.user.id)
                    if u_is_new_row:
                        u.name                        = r.user.name
                        u.screen_name                 = r.user.screen_name
                        u.location                    = r.user.location
                        u.created_at                  = r.user.created_at
                        u.description                 = r.user.description
                        u.favourites_count            = r.user.favourites_count
                        u.followers_count             = r.user.followers_count
                        u.friends_count               = r.user.friends_count
                        u.statuses_count              = r.user.statuses_count
                        u.save()

                    h_array = []
                    if r.hashtags:
                        for hashtag in r.hashtags:
                            # Hashtags are not case sensitive
                            h, h_is_new_row = Hashtag.objects.get_or_create(name=hashtag.text.lower())
                            h_array.append(h)

                    t = Tweet()
                    t.save() # Need to save before adding many to many.
                    t.contributors              = r.contributors
                    t.coordinates               = r.coordinates
                    t.created_at_in_seconds     = r.created_at_in_seconds
                    t.favorite_count            = r.favorite_count
                    # t.favorited                 = r.favorited
                    t.tweet_id                  = r.id
                    t.in_reply_to_screen_name   = r.in_reply_to_screen_name
                    t.in_reply_to_status_id     = r.in_reply_to_status_id
                    t.in_reply_to_user_id       = r.in_reply_to_user_id
                    t.lang                      = r.lang
                    t.possibly_sensitive        = r.possibly_sensitive
                    t.quoted_status             = r.quoted_status
                    t.quoted_status_id          = r.quoted_status_id
                    t.retweet_count             = r.retweet_count
                    t.retweeted                 = r.retweeted
                    t.retweeted_status          = r.retweeted_status
                    t.text                      = strip_weird_chars(r.text)

                    t.user.add(u)

                    for h in h_array:
                        t.hashtag.add(h)

                    t.save()
