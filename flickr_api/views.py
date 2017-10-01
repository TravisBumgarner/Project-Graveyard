from django.shortcuts import redirect
from .functions import get_access_token, get_images


# def hello(request):
#     response = authorize_user_url()
#     return response


def hello_response(request):
    response = get_access_token(request)
    return response


def load_images(request):
    response = get_images(request)
    return response