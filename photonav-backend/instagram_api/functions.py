import requests
import json

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect

from.api_config import KEY, SECRET, INTERMEDIATE_REDIRECT_URI, FINAL_REDIRECT_URI, USER_ACCESS_TOKEN

# def authorize_user_url():
#     INSTAGRAM_URI= 'https://api.instagram.com/oauth/authorize/?client_id={}&redirect_uri={}&response_type=code&scope=public_content'\
#         .format(
#             KEY,
#             INTERMEDIATE_REDIRECT_URI
#         )
#     return redirect(INSTAGRAM_URI)


def get_access_token(request):
    # The access token will be stored in the request get as code
    # If it doesn't exist there was an error.
    if request.GET.get('code', False):
        code = request.GET['code']
        ACCESS_TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
        post_data = {
            'client_id': KEY,
            'client_secret': SECRET,
            'grant_type': 'authorization_code',
            'redirect_uri': INTERMEDIATE_REDIRECT_URI,
            'code': code
        }
        r_serialized = requests.post(ACCESS_TOKEN_URL, data=post_data)
        r_dict = json.loads(r_serialized.text)

        print("Here would be code to store access_token {} for user X in db.".format(r_dict['access_token']))
        # Todo - User information is returned from request_access_token, can use name, etc. See below.

        response = redirect('http://127.0.0.1:3000/')
    else:
        er = request.GET['error_reason']
        e = request.GET['error']
        ed = request.GET['error_description']
        response = HttpResponse("Error: {}\nReason: {}\nDescription: {} ".format(e, er, ed))

    return response


def get_images(request):
    url = 'https://api.instagram.com/v1/users/self/media/recent/?&access_token={}'.format(USER_ACCESS_TOKEN)
    r_serialized = requests.get(url)
    r_dict = json.loads(r_serialized.text)

    return JsonResponse(r_dict)

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

