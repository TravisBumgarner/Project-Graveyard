from flask import render_template, jsonify
from app import app
from .pnFunctions import flickrRequest

@app.route('/', methods = ['GET'])
def index():
    flickrJsonData = flickrRequest()

    return render_template(
        'index.html',
        flickrJsonData=flickrJsonData,)

@app.route('/ajax/Flickr', methods = ['POST'])
def ajaxFlickr():



    return render_template('index.html')


