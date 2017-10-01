import requests
import json

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect
from requests_oauthlib import OAuth1Session

from.api_config import KEY, SECRET, INTERMEDIATE_REDIRECT_URI, FINAL_REDIRECT_URI, USER_ACCESS_TOKEN

# http://requests-oauthlib.readthedocs.io/en/latest/api.html
callback_uri = 'http://127.0.0.1:8000/flickr_api/access_token'
base_request_token_url = 'https://www.flickr.com/services/oauth/request_token'
base_authorization_url = 'https://www.flickr.com/services/oauth/authorize'
base_access_token_url = 'https://www.flickr.com/services/oauth/access_token'

def get_request_token():
    oauth_session = OAuth1Session(KEY, client_secret=SECRET, callback_uri=callback_uri)
    fetch_response = oauth_session.fetch_request_token(base_request_token_url)

    resource_owner_key = fetch_response.get('oauth_token')
    resource_owner_secret = fetch_response.get('oauth_token_secret')
    print(resource_owner_key, resource_owner_secret)

    user_request_token_url = oauth_session.authorization_url(base_authorization_url, perms ="read")

    response = redirect(user_request_token_url)
    return response

#
def get_access_token(request):
    print(request)
    oauth_session = OAuth1Session(KEY, client_secret=SECRET, callback_uri="http://localhost:3000")
    oauth_response = request.GET
    verifier = oauth_response.get('oauth_verifier')

    authorize_url = base_authorization_url + '?perms=read&oauth_token='
    authorize_url += oauth_response['oauth_token']
    response = redirect(authorize_url)
    print(authorize_url)
    return response