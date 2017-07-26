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
    latAndLong = getLatLongFromAddress(address)

    result = {
        'success': 1,
        'latLong': latAndLong
    }
    return jsonify(result)


