from pymongo import MongoClient
from config import configuration

MONGO_API_URL = configuration.MONGO_API_URL
MONGO_DATABASE_NAME = configuration.MONGO_DATABASE_NAME

def get_mongo_database():
    client = MongoClient(MONGO_API_URL)
    mongodb = client[MONGO_API_URL]
    return mongodb
