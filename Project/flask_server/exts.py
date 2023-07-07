from connection.mongo import MongoDatabase
from connection.database import Database
from config import DevConfig
from werkzeug.security import generate_password_hash
from mongo.mongo import MongoDB

mongo = MongoDatabase(DevConfig)

db = Database(mongo)

# import datetime
# user = db.find_user_by_username("admin")
# if not user:
#     mongo.db_create_user("admin",generate_password_hash("password"),"firstname","lastname",datetime.datetime.now(),"email@email.com")

    #db.create_user("admin",generate_password_hash("password"),"firstname","lastname",datetime.datetime.now(),"email@email.com")
