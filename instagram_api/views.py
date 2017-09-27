from django.shortcuts import redirect
from .functions import authorize_user_url, get_access_token


def hello(request):
    response = authorize_user_url()
    return response


def hello_response(request):
    response = get_access_token(request)
    return response