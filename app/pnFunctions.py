from flask import request
import json
import requests
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
    # Todo: WILL NOT TAKE LAT/LONG Greater than 4 decimals
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

    r = makeApiRequest(flickrUrl)
    return r

def getLatLongFromAddress(address):
    address = address.replace(" ", "+") # Format address for Google

    latLongUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address={}&key={}'.format(
        address,
        config["GOOGLE_API_KEY"]
    )
    r = makeApiRequest(latLongUrl)
    r = json.loads(r)

    if len(r["results"]) > 1:
        return "More than 1 result for your search, try again."

    else:
        location = r["results"][0]["geometry"]["location"]
        return location["lat"], location["lng"]

def makeApiRequest(url):
    return requests.get(url).content.decode('UTF-8')


