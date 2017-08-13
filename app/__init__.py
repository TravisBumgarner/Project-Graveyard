from flask import Flask
from instagram.client import InstagramAPI


app = Flask(__name__)
app.config.from_pyfile('config.cfg')
app.config['SECRET_KEY'] = '\xe5\x8b\x1f\x16*\x12\x12\x1d\xcd\xd6\x92\xd8\xc7cZ\x10\x1b\x9f\x87\x99\x7f\xeb\x97'

insta_config = {
	'client_id':'b34a768ac36a4f5c877eb9bdd8bae1be',
	'client_secret':'9041e3d61be4432d9b55687ec077218a',
	'redirect_uri' : 'http://127.0.0.1:5000/instagram_callback'
}

api = InstagramAPI(**insta_config)

from app import views

if __name__ == '__main__':
    app.run()