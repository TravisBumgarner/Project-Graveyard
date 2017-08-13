from flask import render_template, jsonify, request
from app import app
from .pnFunctions import flickrRequest, getLatLongFromAddress

@app.route('/', methods = ['GET'])
def index():
    flickrJsonData = flickrRequest()

    return render_template(
        'index.html',
        flickrJsonData=flickrJsonData,)

@app.route('/imagesLookup', methods = ['GET', 'POST'])
def imageLookup():
    address = request.json['address']
    lat, lng = getLatLongFromAddress(address)
    # flickrRequest(lat, lng)

    result = {
        'success': 1,
        'lat': lat,
        'lng': lng

    }
    return jsonify(result)




