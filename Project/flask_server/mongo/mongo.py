from typing import Union,Optional
from datetime import datetime

from pymongo import ReturnDocument
from .mongo_api import MongoAPI,MongoDatabaseAPI,MongoJsonPerUser
from database import to_db_values,to_db_ids,to_db_value_from_id,to_db_filter_by
from bson.objectid import ObjectId
import re

class MongoDB(object):

    def __init__(self) -> None:
        super().__init__()
        self.db = MongoDatabaseAPI()

    # user
    # ----------
    def is_string(x):
        if isinstance(x, str):
            return True
        return False
    
    
    def is_username_exists(self, username):
        res = self.db.Users.count_documents({"username":username})
        if res == 0:
            return False
        return True
    
    def is_email_exists(self, email):
        res = self.db.Users.count_documents({"email":email})
        if res == 0:
            return False
        return True

    def is_user_exists(self, id):
        res = self.db.Users.count_documents({"_id":id})
        if res == 0:
            return False
        return True

    def find_user_by_id(self,id):
        if not isinstance(id,str):
            print("id not string")
            return None
        if self.is_user_exists(ObjectId(id)):
            res['_id'] = str(res['_id'])
            res = self.db.Users.find_one({"_id":ObjectId(id)})
        if res is None:
            return False
        return res
    
    def insert_new_user(self,username,password,email,firstname,lastname,date_of_birth):
        
        if not isinstance(username,str):
            return None
        
        if re.match("[0-9A-Za-z]",username) is None:
            return None
        
        if self.is_username_exists(username):
            return None
        
        if self.is_email_exists(email):
            return None        
        
        if not isinstance(password,str):
            return None
        
        if not isinstance(email,str):
            return None
        
        if not isinstance(firstname,str):
            return None

        if re.match("[A-Za-z]",firstname) is None:
            return None
        
        if not isinstance(lastname,str):
            return None  
        
        if re.match("[A-Za-z]",lastname) is None:
            return None
                                                  
        if not isinstance(date_of_birth,str):
            return None
        
        valid_date_regex_pattern = '^(?:(?:(?:(?:0[1-9]|1[0-9]|2[0-8])[\/](?:0[1-9]|1[012]))|(?:(?:29|30|31)[\/](?:0[13578]|1[02]))|(?:(?:29|30)[\/](?:0[4,6,9]|11)))[\/](?:19|[2-9][0-9])\d\d)|(?:29[\/]02[\/](?:19|[2-9][0-9])(?:00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96))$'
        
        if re.match(valid_date_regex_pattern,date_of_birth) is None:
            return None
        
        if self.db.Users.count_documents({"username":username}) != 0:
            return None        
        
        if self.db.Users.count_documents({"email":email}) != 0:
            return None
        
        new_user = {
            "_id": ObjectId(),
            "username":username,
            "password":password,
            "email":email,
            "firstname":firstname,
            "lastname":lastname,
            "date_of_birth":date_of_birth
        }
        
        before_count = self.db.Users.count_documents()
        self.db.Users.insert_one(new_user)
        after_count = self.db.Users.count_documents()
        
        if before_count == after_count + 1:
            new_user['_id'] = str(new_user['_id'])
            return new_user
        else:
            return False

    def find_user_by_username(self, username):
        if not isinstance(username,str):
            print("username not string")
            return None        
        if self.is_username_exists(username):
            res =  self.db.Users.find_one({"username":username})
            res['_id'] = str(res['_id'])
            return res
        return None
    
    # def update_user(self,id):
    #     pass
    
    # ----------
    
    
    # routines
    # ----------
    

    
    def find_user_routines(self,user_id:str):
        return self.db.find_user_collection_items(self.db.ROUTINES_COLLECTION_NAME,user_id)
               
    def update_user_routine(self,user_id:str,routine_id:str,updated_routine:object):
        self.db.update_user_collecton_item(self.db.ROUTINES_COLLECTION_NAME,user_id,routine_id,updated_routine)
    
    def insert_user_routine(self,user_id,routine):
        return self.db.insert_user_collection_item(self.db.ROUTINES_COLLECTION_NAME,user_id,routine)
    
    def delete_user_routine(self,user_id,routine_id):
        return self.db.delete_user_collection_item(self.db.ROUTINES_COLLECTION_NAME,user_id,routine_id)
    
    # --------
    
    
    # tasks
    # ----------
    
    def find_user_tasks(self,user_id:str):
        return self.db.find_user_collection_items(self.db.TASKS_COLLECTION_NAME,user_id)
               
    def update_user_task(self,user_id:str,task_id:str,updated_task:object):
        self.db.update_user_collecton_item(self.db.TASKS_COLLECTION_NAME,user_id,task_id,updated_task)
    
    def insert_user_task(self,user_id,task):
        return self.db.insert_user_collection_item(self.db.TASKS_COLLECTION_NAME,user_id,task)
    
    def delete_user_task(self,user_id,task_id):
        return self.db.delete_user_collection_item(self.db.TASKS_COLLECTION_NAME,user_id,task_id,"tasksIds",[self.db.ROUTINES_COLLECTION_NAME])
    
    
    # ----------
    
    
    # events items
    # ----------
    
    def find_user_events_items(self,user_id:str):
        return self.db.find_user_collection_items(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id)
    
    def update_user_calendar(self,user_id,calendar_id,updated_calendar):
        self.db.update_user_collecton_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,calendar_id,updated_calendar)
    
    def delete_user_calendar(self,user_id:str,calendar_id:str):
        return self.db.delete_user_collection_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,calendar_id,"calendarId",[self.db.ROUTINES_COLLECTION_NAME,self.db.EVENTS_ITEMS_COLLECTION_NAME,self.db.TASKS_COLLECTION_NAME],is_dependancy_array=False)
    
    def insert_user_calendar(self,user_id,calendar):
        return self.db.insert_user_collection_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,calendar)
    
    
    def update_user_event(self,user_id:str,event_id,updated_event):
        self.db.update_user_collecton_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,event_id,updated_event)
    
    def delete_user_event(self,user_id:str,event_id:str):
        return self.db.delete_user_collection_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,event_id)
    
    def insert_user_event(self,user_id:str,event:object):
        return self.db.insert_user_collection_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,event)
    
    def update_user_timeblock(self,user_id:str,timeblock_id:str,updated_timeblock:object):
        self.db.update_user_collecton_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,timeblock_id,updated_timeblock)
    
    def delete_user_timeblock(self,user_id:str,timeblock_id):
        return self.db.delete_user_collection_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,timeblock_id)
    
    def insert_user_time_block(self,user_id:str,time_block:object):
        return self.db.insert_user_collection_item(self.db.EVENTS_ITEMS_COLLECTION_NAME,user_id,time_block)
        
    # ----------
    
    
    
    # tags 
    # ----------
    
    def find_user_tags(self,user_id:str):
        pass
    
    def update_user_tag(self,user_id:str):
        pass
    
    def delete_user_tag(self,user_id:str):
        pass
    
    def insert_user_tag(self,user_id:str):
        pass
    
    # ----------
    
    
    # categories
    # ----------

    def find_user_categories(self,user_id:str):
        pass
    
    def update_user_category(self,user_id:str):
        pass
    
    def delete_user_category(self,user_id:str):
        pass
    
    def insert_user_category(self,user_id:str):
        pass
    
    # ----------
    
    
    # markdown notes
    # ----------
    
    def find_user_markdown_notes(self,user_id:str):
        pass
    
    def update_user_category(self,user_id:str):
        pass
    
    def delete_user_category(self,user_id:str):
        pass
    
    def insert_user_category(self,user_id:str):
        pass
    
    # ----------
    
    
     # objectives
    # ----------
    
    def find_user_objectives(self,user_id:str):
        pass
    
    def update_user_objective(self,user_id:str):
        pass
    
    def delete_user_objective(self,user_id:str):
        pass
    
    def insert_user_objective(self,user_id:str):
        pass
    
    # ----------
    
    
    

