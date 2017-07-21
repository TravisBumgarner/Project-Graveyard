import requests
import json
from .config import config 

def flickrRequest(lat=None, long=None):
    """
    Example: https://api.flickr.com/services/rest/?
        method=flickr.photos.getPopular
        &api_key=0ebb6cf43cd6ccab59f2ffaf1b63f0c5
        &user_id=126568985@N04
        &format=json
        &nojsoncallback=1
    """
    print(config)
    flickrConfig = {
        "api_key" : config["FLICKR_API_KEY"],
        "per_page" : 9,
        "user_id" : "126568985@N04",
        "format" : "json",
        "nojsoncallback": 1
    }

    flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getPopular"
    for k,v in flickrConfig.items():
        flickrUrl += "&{}={}".format(k,v)

    print(flickrUrl)

    r = requests.get(flickrUrl).content.decode('UTF-8')
    return r



