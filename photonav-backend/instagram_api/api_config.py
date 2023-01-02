from django.conf import settings

KEY = ''
SECRET = ''

if settings.DEBUG:
    REDIRECT_URI = ''
else:
    REDIRECT_URI = ''