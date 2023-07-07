
from functools import wraps
from flask import Flask, jsonify,request,abort,render_template, url_for, redirect,send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_jwt_extended import verify_jwt_in_request,get_jwt
from database import init_db
from endpoints.api1 import blueprint as api1
from endpoints.api2 import blueprint as api2
import os


def create_app(config):

    app = Flask(__name__)
    
    directory = os.getcwd() +  f'./build/static'
    
    @app.route('/')
    def index():
        path = os.getcwd() +  f'./build/'
        print(path)
        return send_from_directory(directory=path,path='index.html')
    
    @app.route('/static/<folder>/<file>')
    def css(folder,file):
        path = folder + '/' + file
        return send_from_directory(directory=directory,path=path)
    
    
    
    app.config.from_object(config) 
    CORS(app)
    init_db()
    jwt = JWTManager(app)
    app.register_blueprint(api1)
    app.register_blueprint(api2)

    return app


