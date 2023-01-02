# Imports
import urllib
import twitter


# NOTES
# Search goes back 7 days

# Params
params = {}

'''
Name: Config
'''
consumer_key = 'b23TzGMScmTbIz90KPD6ma6HX'
consumer_secret = '5ZCvIIneI5po2UZ9v4uPNS0XzqFGpvr0peCytiaztOOksb0lsv'
access_token_key = '969358132605579264-h6Fd9o3BJhdUfr8ceepSU4t22kMW3hi'
access_token_secret = 'Pq4XeT8sXBpVkL53u6df7gMt4YZYRXKKzMqvWU50NEAla'


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
params['result_type'] = 'recent'

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


# Make request
api = twitter.Api(
    consumer_key= consumer_key,
    consumer_secret= consumer_secret,
    access_token_key= access_token_key,
    access_token_secret= access_token_secret
)

raw_query = urllib.urlencode(params)
print(raw_query)
results = api.GetSearch(raw_query=raw_query)
print(results[0].keys)