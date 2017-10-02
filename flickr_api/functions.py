import requests
import json

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect
from requests_oauthlib import OAuth1Session

from.api_config import KEY, SECRET, INTERMEDIATE_REDIRECT_URI, FINAL_REDIRECT_URI, USER_ACCESS_TOKEN

# http://requests-oauthlib.readthedocs.io/en/latest/api.html
request_token_url = 'https://www.flickr.com/services/oauth/request_token'
request_token_callback_uri = 'http://127.0.0.1:8000/flickr_api/access_token'
access_token_url = 'https://www.flickr.com/services/oauth/access_token'


def get_request_token():
    oauth = OAuth1Session(
        KEY,
        client_secret=SECRET,
        callback_uri=request_token_callback_uri)

    fetch_response = oauth.fetch_request_token(request_token_url)

    resource_owner_key = fetch_response.get('oauth_token')
    print("resource owner key {}".format(resource_owner_key))
    resource_owner_secret = fetch_response.get('oauth_token_secret')
    print("resource owner secret {}".format(resource_owner_secret))

    base_authorization_url = 'https://www.flickr.com/services/oauth/authorize?perms=read'
    authorization_url = oauth.authorization_url(base_authorization_url)

    return redirect(authorization_url)


def get_access_token(request):
    url_params = request.GET
    resource_owner_key = url_params["oauth_token"]
    verifier = url_params["oauth_verifier"]
    # The secret might be different from before and after request
    # That might be the issue and I might need to store this somewhere temporarily

    oauth = OAuth1Session(KEY,
                          client_secret=SECRET,
                          resource_owner_key=resource_owner_key,
                          verifier=verifier)

    # Took out  resource_owner_secret=resource_owner_secret,
    # from above

    oauth_tokens = oauth.fetch_access_token(access_token_url)
    resource_owner_key = oauth_tokens.get('oauth_token')
    resource_owner_secret = oauth_tokens.get('oauth_token_secret')

    return HttpResponse("yay?")