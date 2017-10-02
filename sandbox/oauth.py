from requests_oauthlib import OAuth1Session
import json

request_token_url = 'https://www.flickr.com/services/oauth/request_token'
callback_uri = 'http://127.0.0.1:8000/flickr_api/'

KEY = '0ebb6cf43cd6ccab59f2ffaf1b63f0c5'
SECRET = '60f11289eebaf65c'


# Obtain a request token which will identify you (the client) in the next step. 
# At this stage you will only need your client key and secret.
oauth = OAuth1Session(KEY, client_secret=SECRET, callback_uri=callback_uri)
fetch_response = oauth.fetch_request_token(request_token_url)

resource_owner_key = fetch_response.get('oauth_token')
resource_owner_secret = fetch_response.get('oauth_token_secret')

# Obtain authorization from the user (resource owner) to access their protected 
# resources (images, tweets, etc.). This is commonly done by redirecting the user 
# to a specific url to which you add the request token as a query parameter. Note 
# that not all services will give you a verifier even if they should. Also the 
# oauth_token given here will be the same as the one in the previous step.

base_authorization_url = 'https://www.flickr.com/services/oauth/authorize?perms=read'
authorization_url = oauth.authorization_url(base_authorization_url)
print('Please go here and authorize,', authorization_url)
redirect_response = input('Paste the full redirect URL here: ')

oauth_response = oauth.parse_authorization_response(redirect_response)

verifier = oauth_response.get('oauth_verifier')

# Obtain an access token from the OAuth provider. Save this token as it can be re-used later. 
# In this step we will re-use most of the credentials obtained uptil this point.
access_token_url = 'https://www.flickr.com/services/oauth/access_token'

oauth = OAuth1Session(KEY,
                          client_secret=SECRET,
                          resource_owner_key=resource_owner_key,
                          resource_owner_secret=resource_owner_secret,
                          verifier=verifier)

oauth_tokens = oauth.fetch_access_token(access_token_url)
resource_owner_key = oauth_tokens.get('oauth_token')
resource_owner_secret = oauth_tokens.get('oauth_token_secret')
print(resource_owner_key, resource_owner_secret)
# Access protected resources. OAuth1 access tokens typically do not 
# expire and may be re-used until revoked by the user or yourself.

protected_url = 'https://api.flickr.com/services/rest?method={method}&format=json&nojsoncallback=1&api_key={api_key}&lat={lat}&lon={lon}'.format(
	method='flickr.photos.geo.photosForLocation',
	api_key=KEY,
	lat = 42.373616,
	lon = -71.109734)

oauth = OAuth1Session(KEY,
                          client_secret=SECRET,
                          resource_owner_key=resource_owner_key,
                          resource_owner_secret=resource_owner_secret)

r = oauth.get(protected_url)
json_data = r.content
obj_data = json.loads(json_data)
