import requests
import json

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect

from.api_config import KEY, SECRET, REDIRECT_URI

def authorize_user_url():
    INSTAGRAM_URI= 'https://api.instagram.com/oauth/authorize/?client_id={}&redirect_uri={}&response_type=code&scope=public_content'\
        .format(
            KEY,
            REDIRECT_URI
        )
    return redirect(INSTAGRAM_URI)


def get_access_token(request):
    if request.GET.get('code', False):
        code = request.GET['code']
        ACCESS_TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
        post_data = {
            'client_id': KEY,
            'client_secret': SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'code': code
        }
        r_serialized = requests.post(ACCESS_TOKEN_URL, data=post_data)
        r_dict = json.loads(r_serialized.text)

        # Todo - User information is returned from request_access_token, can use name, etc. See below.
        response = redirect('https://api.instagram.com/v1/users/self/media/recent/?&access_token={}'.format(r_dict['access_token']))

    else:
        er = request.GET['error_reason']
        e = request.GET['error']
        ed = request.GET['error_description']
        response = HttpResponse("Error: {}\nReason: {}\nDescription: {} ".format(e, er, ed))

    return response


"""
Response text: 
{"access_token": "123", 
 "user": {
    "id": "123", 
    "username": "abc", 
    "profile_picture": "https://scontent.cdninstagram.com/picture.jpg", 
    "full_name": "ABC", 
    "bio": "abc.", 
    "website": "abc", 
    "is_business": false
    }
}
"""

