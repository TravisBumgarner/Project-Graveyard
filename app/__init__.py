from flask import Flask

app = Flask(__name__)
app.config.from_pyfile('config.cfg')

from app import views

if __name__ == '__main__':
    app.run()