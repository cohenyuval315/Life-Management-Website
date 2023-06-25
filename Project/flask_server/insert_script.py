import json
from pprint import pprint
from exts import db
from models.models import User, Setting,Entry,Property,EntryProperties,UserSettings
import datetime
import sys
import pickle

def create_db():
    db.create_all()
    
def str_to_class(classname):
    return getattr(sys.modules[__name__], classname)

def add_bulk(objects):
    db.session.bulk_save_objects(objects)
    db.session.commit()
    
def table_insert(n,table_name, **kwargs):
    properties = kwargs
    i = 0
    object_list = []
    while i < n:
        i += 1 
        object = {}
        for key,value in properties.items():
            if value == "string" :
                object[key] = f'{table_name}_{key}_{i}'
                if key == "email":
                    object[key] = f'{key}_{i}@email.com'
                if key == "data_type":
                    object[key] = 's'
            if value == "int":
                object[key] = f'{i}'
            if value == "datetime":
                object[key] = datetime.datetime.now(datetime.timezone.utc)
        object_list.append(object)
    return object_list

def one_to_many_insert():
    pass

def many_to_one_insert(parent_n,child_class,child_n, child_key_name, **kwargs):
    object_list = []
    i = 0
    j = 0
    while i < parent_n:
        helper_list = table_insert(child_n,child_class,**kwargs)
        j += 1
        for object in helper_list:
            object[child_key_name] = f'{j}'
        object_list.extend(helper_list)
        i += 1
    return object_list
    
def many_to_many_insert(parent_n, parent_key_name, child_n, child_key_name, association_class,parent_second_key_name=None, **kwargs):
    index =0
    associations = []
    while index < parent_n:
        index+=1
        association = table_insert(child_n,association_class,**kwargs)
        for object in association:
            object[parent_key_name] = f'{index}'

            if parent_second_key_name is not None:
                object[parent_second_key_name] = f'{index}'
  
            
        associations.extend(association)
    index2 = 0
    index3 = 0

    for object in associations:
        index3 += 1
        object[child_key_name] = f'{index3}'
        if index3 == child_n:
            index3 = 0
    
 
    return associations

def routine():
    
    user_n = 6
    entry_n = 6# * user_ n
    setting_n = 6
    property_n = 6
    user_settings_n = 6# * user_n * setting_n
    entry_properties_n = 6# * entry_n * property_n
    
    user_table = {
        "id":"int",
        "username": "string",
        "password": "string",
        "firstname": "string",
        "lastname": "string",
        "date_of_birth": "datetime",
        "email": "string",
    }
    
    entry_table = {
        "id":"int",
        "property_parent":"user_id",
        "user_id": "int",
        "name": "string",
        "type": "string",
        "description": "string",
        "state": "string",
    } 
    setting_table = {
        "id":"int",
        "name": "string",
        "description": "string",
    }
    property_table = {
        "id":"int",
        "name": "string",
        "data_type": "string",
    }
    user_settings_table = {
        "user_id":"int",
        "setting_id":"int",
        "setting_value": "string",
    }         
    entry_properties_table = {
        "entry_id":"int",
        "entry_user_id": "int",
        "property_id": "int",
        "property_value": "string",
    }
    user_lst = table_insert(user_n,"User",**user_table)
    setting_lst = table_insert(setting_n,"Setting",**setting_table)
    print(setting_lst)
    property_lst = table_insert(property_n,"Property",**property_table)
    user_settings_lst = many_to_many_insert(user_n,"user_id",setting_n,"setting_id","UserSettings",**user_settings_table)
    entry_lst = many_to_one_insert(user_n, "Entry",entry_n,"user_id", **entry_table)
    entry_properties_lst = many_to_many_insert(entry_n*user_n,"entry_id",property_n,"property_id","EntryProperties","entry_user_id",**entry_properties_table)
    objects= [user_lst,setting_lst,property_lst,user_settings_lst,entry_lst,entry_properties_lst]
    
    return {
        "User":user_lst,
        "Setting":setting_lst,
        "Property":property_lst,
        "UserSettings":user_settings_lst,
        "Entry":entry_lst,
        "EntryProperties":entry_properties_lst
    }
routine()
    # def converter(obj):
    #     if isinstance(obj, (datetime.datetime, datetime.date)):
    #         return obj.isoformat()
    #     raise TypeError (f"{type(obj)} not datetime")
        
    # with open("inserts/user_inserts","w") as f:
    #     for u in user_lst:
    #         js_str = json.dumps(u,default=converter)
    #         f.write(js_str)
    #         f.write("\n")
            
    # with open("inserts/setting_inserts","w") as f:
    #     for u in setting_lst:
    #         js_str = json.dumps(u,default=converter)
    #         f.write(js_str)
    #         f.write("\n")
            
    # with open("inserts/property_inserts","w") as f:
    #     for u in property_lst:
    #         js_str = json.dumps(u,default=converter)
    #         f.write(js_str)
    #         f.write("\n")
            
    # with open("inserts/user_settings_inserts","w") as f:
    #     for us in user_settings_lst:
    #         js_str = json.dumps(us)
    #         f.write(js_str)
    #         f.write("\n")
            
    # with open("inserts/entry_inserts","w") as f:
    #     for u in entry_lst:
    #         js_str = json.dumps(u,default=converter)
    #         f.write(js_str)
    #         f.write("\n")
            
    # with open("inserts/entry_properties_inserts","w") as f:
    #     for u in entry_properties_lst:
    #         js_str = json.dumps(u)
    #         f.write(js_str)
    #         f.write("\n")
            
            
            
            

    # print(setting_lst)
    # print(entry_lst)
    # print(property_lst)
    
    # print(user_settings_lst)
    # print(entry_properties_lst)

