from connection.mongo import MongoDatabase
from connection.database import Database
from config import DevConfig

mongo = MongoDatabase(DevConfig)

db = Database(mongo)
