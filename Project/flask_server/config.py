from decouple import config

import os
from datetime import timedelta

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

    
class Config:
    SECRET_KEY= config('SECRET_KEY')


class DevConfig(Config):
    DEBUG = True
    CLEANUP_DATA = False
    
    MONGO_URI = config('MONGO_URI')
    MONGO_API_URL = config("MONGO_API_URL")
    MONGO_DATABASE_NAME = config("MONGO_DATABASE_NAME")
    
    SQLALCHEMY_DATABASE_URI = "sqlite:///"+ os.path.join(BASE_DIR,"dev.db")      # SQLALCHEMY_DATABASE_URI = config("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_DATABASE_PEM = config("SQLALCHEMY_DATABASE_PEM")
    SQLALCHEMY_ECHO=True
    SQLALCHEMY_TRACK_MODIFICATIONS=config('SQLALCHEMY_TRACK_MODIFICATIONS', cast=bool)
    
    TELEGRAM_ONLINE = False
    TELEGRAM_API_TOKEN = config('TELEGRAM_API_TOKEN')
    TELEGRAM_CHAT_ID = config('TELEGRAM_CHAT_ID')

class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI="sqlite:///test.db"
    SQLALCHEMY_ECHO=False
    TESTING=True
    
    
class ProdConfig(Config):
    JWT_COOKIE_SECURE=True
    JWT_COOKIE_CSRF_PROTECT =True
    ACCESS_EXPIRES= timedelta(hours=1)
    JWT_ACCESS_TOKEN_EXPIRES= ACCESS_EXPIRES
    #JWT_SECRET_KEY=""
    #JWT_TOKEN_LOCATION = ["headers", "cookies", "json", "query_string"]
    
    
configuration = DevConfig()