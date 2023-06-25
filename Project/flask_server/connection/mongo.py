from datetime import datetime
from uuid import uuid4  
from pymongo import MongoClient
import json
# find all under filter 
# db.collection.aggregate([
#   {
#     "$match": {
#       "tags.name": "yee"
#     }
#   },
#   {
#     "$project": {
#       "tags": {
#         "$filter": {
#           "input": "$tags",
#           "cond": {
#             "$eq": [
#               "$$this.name",
#               "yee"
#             ]
#           }
#         }
#       }
#     }
#   }
# ])    
 
# get the second element of array from filter , gives first if length 1
# db.collection.find({
#   "tags.name": {
#     $in: [
#       "yee"
#     ]
#   }
# },
# {
#   "tags.$": 2
# })

class MongoAPI(object):
    
    def __init__(self,config) -> None:
        self.client = MongoClient(f"{config.MONGO_API_URL}") 
        self.db = self.client[f"{config.MONGO_DATABASE_NAME}"]

    def user_find_and_replace(self,identity,collection_name,data, filters=[],upsert=False):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}
        return self.db[collection_name].replace_one(filter=ready_user_filters,replacement=data,upsert=upsert)

    def user_find_many(self,identity,collection_name ,filters=[], projection=None,limit=50,sort=None):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}
        result = self.db[collection_name].find(filter=ready_user_filters, projection=projection, limit=limit, sort=sort)
        return result

    def user_update_many(self,identity,collection_name ,update,filters=[] ,upsert=False, array_filters=None):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}
        result = self.db[collection_name].update_many(filter=ready_user_filters,update=update, upsert=upsert,array_filters=array_filters)
        return result.matched_count
        
    def user_delete_many(self,identity,collection_name ,filters=[]):  # find all from db
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}
        result = self.db[collection_name].delete_many(filter=ready_user_filters)
        return result.deleted_count
 
    def user_find_one(self,identity,collection_name ,filters=[]):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}
        result = self.db[collection_name].find_one(filter=ready_user_filters)
        return result

    def user_update_one(self,identity,collection_name ,update,filters=[],upsert=False, array_filters=None):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}
        result = self.db[collection_name].update_one(filter=ready_user_filters,update=update, upsert=upsert,array_filters=array_filters)
        return result.matched_count
        
    def user_delete_one(self,identity,collection_name ,filters=[]):  # find all from db
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}
        result = self.db[collection_name].delete_one(filter=ready_user_filters)
        return result.deleted_count
 
        

    def find_user_by_email(self, email):
        user = self.db["users"].find_one({"email":email})
        return user

    def find_user_by_username(self, username):
        user = self.db["users"].find_one({"username":username})
        return user

    def create_user(self, username,password,firstname,lastname,date_of_birth,email):
        user_id=uuid4().hex

        self.db["backups"].insert_one(
            {            
            "userId":user_id,
            "username":username,
            "saves":[]
            }
            
        )
        
        defaultCategories = self.getDefaultCategories()
        defaultSettings =self.getDefaultSettings()
        defaultTags = self.getDefaultTags
        defaultStats = self.getDefaultStats()
        defaultCalendars = self.getDefaultCalendars()
        defaultProperties = self.getDefaultProperties()
        defaultGroups = self.getDefaultGroups()
        
        self.db["archives"].insert_one(
            {            
            "userId":user_id,
            "username":username,
            "history":{
                    "objects":[],
                    "infos":[],
                    "tags":defaultTags,
                    "categories":defaultCategories,   
                    "graphs" :[],
                    "events":[],
                    "calendars":defaultCalendars,
                    "routines":[],
                    "notifications":[],
                    "reminders":[],
                    "properties":defaultProperties,
                    "settings":defaultSettings,
                    "stats":defaultStats,
                    "groups":defaultGroups,
                }
            }
            
        )
        

        new_user = {   
            "id":user_id,
            "username":username,
            "password":password,
            "firstname":firstname,
            "lastname":lastname,
            "dateOfBirth":date_of_birth.strftime("%m.%d.%Y %H:%M:%S"),
            "email":email,
            "objects":[],
            "infos":[],
            "tags":defaultTags,
            "categories":defaultCategories,   
            "graphs" :[],
            "events":[],
            "calendars":defaultCalendars,
            "routines":[],
            "notifications":[],
            "properties":defaultProperties,
            "reminders":[],
            "settings":defaultSettings,
            "stats":defaultStats,
            "groups":defaultGroups,
            "created":datetime.now().strftime("%m.%d.%Y %H:%M:%S"),
            "updated":datetime.now().strftime("%m.%d.%Y %H:%M:%S"),
        }
        
        result = self.db["users"].insert_one(new_user)
        return str(result.inserted_id)
    
    def get_user_data(self,identity):
        found = self.db["users"].find_one({"username":identity})
        return found
    
    def get_app_data(self):
        found = self.db["metadata"].find_one()
        return found
    

    def getDefaultCategories(self):
        return []
    
    def getDefaultGroups(self):
        return []
    
    def getDefaultTags(self):
        return []
    
    def getDefaultCalendars(self):
        return []
    
    def getDefaultProperties(self):
        return []
    
    def getDefaultSettings(self):
        return []
    
    def getDefaultStats(self):
        return []



class MongoDatabase:
    
    def __init__(self,config) -> None:
        self.mongo = MongoAPI(config)
    
    def db_find_user_by_username(self,username):
        return self.mongo.find_user_by_username(username)

    def db_find_user_by_email(self,email):
        return self.mongo.find_user_by_email(email)
        
    def db_create_user(self,username,password,firstname,lastname,date_of_birth,email):
        return self.mongo.create_user(username,password,firstname,lastname,date_of_birth,email)
           
    def db_get_app_data(self):
        return self.mongo.get_app_data()
        
    def db_get_user_stats(self,identity):
        return self.mongo.user_find_many(identity,"users")["stats"]
    
        

    
    def db_get_user_data(self,identity):
        res = self.mongo.user_find_one(identity,"users")
        res["_id"] = str(res["_id"])
        return res
    
    def db_save_user_data(self,identity,user_data):
        date = datetime.now().strftime("%d.%m.%Y %H:%M:%S")
        save = {"date":date,"data":user_data}
        return self.mongo.user_update_one(identity,"backups",{"$push":{"saves":save}})
    
    def db_get_user_data_saves(self,identity):
        return self.mongo.user_find_one(identity,"backups")["saves"]
    
    def db_get_user_data_by_datetime(self,identity,datetime):
        res = list(self.mongo.user_find_many(identity,"backups",[{"saves.date": {"$in": [datetime]}}],{"saves.$": 1}))
        if len(res) > 0:
            return res[0]["saves"][0]
        return res

    def db_load_user_data(self,identity,data):
        del data["_id"]
        res = self.mongo.user_find_and_replace(identity,"users",data)
        return res.matched_count
    
    def db_delete_user_data_save(self,identity,date):
        return self.mongo.user_update_one(identity,"backups",{"$pull":{"saves":{"date":date}}},[{"saves.date": {"$in": [date]}}])
    
    
    def get_user_infos_by_feature(self,identity,feature):
        res = list(self.mongo.user_find_many(identity,"users",[{"infos.features": {"$in": [feature]}}],{"infos.$": 1}))
        if len(res) > 0:
            return res[0]["infos"][0]
        return res
    
    def get_user_objects_by_feature(self,identity,feature):
        res = list(self.mongo.user_find_many(identity,"users",[{"objects.features": {"$in": [feature]}}],{"objects.$": 1}))
        if len(res) > 0:
            return res[0]["objects"][0]
        return res
       

    
    
    
    # ---------------------- constuction

      
    def db_get_user_events_categories(self,identity,category_id):
        return self.mongo.find(identity,"users","categories")
        
    
    # ----------------------
    
    def tranform_ids_user_data(self,obj,fieldName,func,identity):
        i = 0
        arr = obj[fieldName]
        for itemId in obj[fieldName]:
            item = func(identity,itemId)
            arr[i] = item
            i += 1 
        return arr
    
    def tranform_ids_meta_data(self,fieldName,ids):
        arr = []
        data = self.db_get_app_data()
        for item in data[fieldName]:
            for id in ids:
                if id == item['id']:
                    arr.append(item)
        return arr
    
    
    
    # OBJECTS CRUD
    
    def db_create_user_object(self,identity,object):
        object["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"objects":object}})
        return res
        
    def db_create_user_objects(self,identity,objects):
        results = []
        for object in objects:
            results.append(self.db_create_user_object(identity,object))
        return results
    


    def db_get_user_object(self,identity, object_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"objects.id": {"$in": [object_id]}}],{"objects.$": 1}))
        
        if len(res) > 0:
            obj =  res[0]["objects"][0]
            
            tags = self.db_get_user_tags(identity)
            obj_tags = []
            for tag in tags:
                for obj_tag_id in obj['tags']:
                    if tag['id'] == obj_tag_id:
                        obj_tags.append(tag)
            obj['tags'] = obj_tags
                            
            categories = self.db_get_user_categories(identity)
            obj_categories = []
            for category in categories:
                for obj_category_id in obj['categories']:
                    if category['id'] == obj_category_id:
                        obj_categories.append(category)
            obj['categories'] = obj_categories      
                 
            # add !!!
            # obj.tags = self.tranform_ids_user_data(obj,"tags",self.db_get_user_tag,identity)
            # obj.categories = self.tranform_ids_user_data(obj,"categories",self.db_get_user_category,identity)
            # obj.groups = self.tranform_ids_user_data(obj,"groups",self.db_get_user_group,identity)
            # obj.features = self.tranform_ids_meta_data(obj,"features",obj.features)
            # obj.state =  self.tranform_ids_meta_data(obj,"states",obj.states)[0]
            return obj
        
    
    def db_get_user_objects(self, identity):
        objs = self.mongo.user_find_one(identity,"users")["objects"]
        # add !!1
        # arr = []
        # for obj in objs:
        #     normal_obj = self.db_get_user_object(identity,obj.id)
        #     arr.append(normal_obj)
        # return arr
        return objs
        
    def db_update_user_object(self,identity, object_id, object):
        return self.mongo.user_update_one(identity,"users",{"$set":{"objects.$":object}},[{"objects.id": {"$in": [object_id]}}])
        
    def db_update_user_objects(self,identity, objects):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"objects",objects}})
        
    def db_delete_user_object(self,identity, object_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"objects":{"id":object_id}}},[{"objects.id": {"$in": [object_id]}}])
    
    def db_delete_user_objects(self,identity,object_ids):
        results = []
        for object_id in object_ids:
            results.append(self.db_delete_user_object(identity,object_id))
        return results
        
    def db_update_objects_after_delete(self,identity,object_field,delete_item):
        user_objects = self.db_get_user_objects(identity)
        new_user_objects = []
        for obj in user_objects:
            items = obj[object_field]
            new_items = []
            for item in items:
                if item.id != delete_item.id:
                    new_items.append(item)
            new_obj = obj
            new_obj[object_field] = new_items
            new_user_objects.append(new_obj)
        print("new objects after deletion" ,new_user_objects)
        # for newobj in new_user_objects:
        #     self.db_update_user_object(newobj)
            
            
    # def db_update_user_fields_after_update_or_delete(self,identity,fieldName,current_item,is_delete):
    #     user_data = self.db_get_user_data(identity) 
    #     new_arr = {}
    #     to_update_arr_names = []
    #     for arr_name in user_data.keys():
    #         if arr_name == fieldName:
    #             continue
    #         arr = user_data[arr_name] 
    #         new_arr[arr_name] = []
    #         if isinstance(arr,list) == False:
    #             new_arr[arr_name] = arr
    #             continue
    #         for object_item in arr: 
    #             obj = object_item
                
    #             if fieldName in obj.keys() and isinstance(object_item[f"{fieldName}"],list) == True:
    #                 items = object_item[f"{fieldName}"] 
    #                 new_items = []
    #                 for item in items:
    #                     if is_delete == True and current_item['id'] != item['id']:
    #                         new_items.append(item)
                            
    #                     if is_delete == False and current_item['id'] == item['id']:
    #                         to_update_arr_names.append(arr_name)
    #                         new_items.append(current_item)
   
    #                 if is_delete == True and len(new_items) != len(items):
    #                     to_update_arr_names.append(arr_name) 
                    
    #                 obj[f"{fieldName}"] = new_items
    #             new_arr[arr_name].append(obj) 
                
                
                
    #     new_data = user_data
    #     for name in to_update_arr_names:
    #         new_data[name] = new_arr[name]
    #     print(json.dumps(new_data['objects'] ,indent=2))
    #     self.db_load_user_data(identity,new_data)
        



    
    # def parse_json_recursively(self,json_object, target_key):
    #     if type(json_object) is dict and json_object:
    #         for key in json_object:
    #             if key == target_key:
    #                 print("{}: {}".format(target_key, json_object[key]))
    #             self.parse_json_recursively(json_object[key], target_key)

    #     elif type(json_object) is list and json_object:
    #         for item in json_object:
    #             self.parse_json_recursively(item, target_key)


    def db_create_user_info(self,identity,info):
        info["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"infos":info}})
        return res
        
    def db_create_user_infos(self,identity,infos):
        results = []
        for info in infos:
            results.append(self.db_create_user_info(identity,info))
        return results
          
    def db_get_user_info(self,identity, info_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"infos.id": {"$in": [info_id]}}],{"infos.$": 1}))
        if len(res) > 0:
            return res[0]["infos"][0]
        return res
    
    def db_get_user_infos(self, identity):
        res=  self.mongo.user_find_one(identity,"users")["infos"]
        return res
        
    def db_update_user_info(self,identity, info_id, info):
        return self.mongo.user_update_one(identity,"users",{"$set":{"infos.$":info}},[{"infos.id": {"$in": [info_id]}}])
        
    def db_update_user_infos(self,identity, infos):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"infos",infos}})
        
    def db_delete_user_info(self,identity, info_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"infos":{"id":info_id}}},[{"infos.id": {"$in": [info_id]}}])
    
    def db_delete_user_infos(self,identity,info_ids):
        results = []
        for info_id in info_ids:
            results.append(self.db_delete_user_info(identity,info_id))
        return results
        




    # GROUP CRUD

    def db_create_user_group(self,identity,group):
        group["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"groups":group}})
        return res
    
    def db_create_user_groups(self,identity,groups):
        results = []
        for group in groups:
            results.append(self.db_create_user_group(identity,group))
        return results
        
    def db_get_user_group(self,identity,group_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"groups.id": {"$in": [group_id]}}],{"groups.$": 1}))
        if len(res) > 0:
            return res[0]["groups"][0]
        return res
    
    def db_get_user_groups(self,identity):
        return self.mongo.user_find_one(identity,"users")["groups"]
        
    def db_update_user_group(self,identity,group_id,group):
        # self.db_update_user_fields_after_update_or_delete(identity,"groups",group,False)
        return self.mongo.user_update_one(identity,"users",{"$set":{"groups.$":group}},[{"groups.id": {"$in": [group_id]}}])

    def db_update_user_groups(self,identity, groups):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"groups",groups}})
        
    def db_delete_user_group(self,identity,group_id):
        # group = None
        # for item in self.db_get_user_groups(identity):
        #     if item['id'] == group_id:
        #         group = item
        res = self.mongo.user_update_one(identity,"users",{"$pull":{"groups":{"id":group_id}}},[{"groups.id": {"$in": [group_id]}}])
        # if group is not None:
        #     self.db_update_user_fields_after_update_or_delete(identity,"groups",group,True)
        return res

        
    
    def db_delete_user_groups(self,identity,groups_ids):
        results = []
        for group_id in groups_ids:
            results.append(self.db_delete_user_group(identity,group_id))
        return results
    



    # CATEGORY CRUD

    def db_create_user_category(self,identity,category):
        category["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"categories":category}})
        return res
    
    def db_create_user_categories(self,identity,categories):
        results = []
        for category in categories:
            results.append(self.db_create_user_category(identity,category))
        return results
        
    def db_get_user_category(self,identity,category_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"categories.id": {"$in": [category_id]}}],{"categories.$": 1}))
        if len(res) > 0:
            return res[0]["categories"][0]
        return res
    
    def db_get_user_categories(self,identity):
        return self.mongo.user_find_one(identity,"users")["categories"]
        
    def db_update_user_category(self,identity,category_id,category):
        return self.mongo.user_update_one(identity,"users",{"$set":{"categories.$":category}},[{"categories.id": {"$in": [category_id]}}])

    def db_update_user_categories(self,identity, categories):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"categories",categories}})
        
    def db_delete_user_category(self,identity,category_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"categories":{"id":category_id}}},[{"categories.id": {"$in": [category_id]}}])
    
    def db_delete_user_categories(self,identity,categories_ids):
        results = []
        for category_id in categories_ids:
            results.append(self.db_delete_user_category(identity,category_id))
        return results
        
        

    # TAG CRUD
        
    def db_create_user_tag(self,identity,tag):
        tag["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"tags":tag}})
        return res
    
    def db_get_user_tag(self,identity,tag_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"tags.id": {"$in": [tag_id]}}],{"tags.$": 1}))
        if len(res) > 0:
            return res[0]["tags"][0]
        return res

    def db_update_user_tag(self,identity,tag_id, tag):
        return self.mongo.user_update_one(identity,"users",{"$set":{"tags.$":tag}},[{"tags.id": {"$in": [tag_id]}}])

    def db_delete_user_tag(self,identity,tag_id):

        # return self.mongo.user_delete_one(identity,"users",[{"tags.id": {"$in": [tag_id]}}]) BAD DELETED ALL!!
        #  {"$pull":{"tags":{"id":tag_id}}}
        return self.mongo.user_update_one(identity,"users",{"$pull":{"tags":{"id":tag_id}}},[{"tags.id": {"$in": [tag_id]}}])
    
    def db_get_user_tags(self,identity):
        return self.mongo.user_find_one(identity,"users")["tags"]

    def db_create_user_tags(self,identity,tags):
        tags_len = len(tags)
        
        results = 0
        for tag in tags:
            res = self.db_create_user_tag(identity,tag)
            results += res
        return results 
        
    def db_update_user_tags(self,identity, tags):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"tags",tags}})
        
    def db_delete_user_tags(self,identity,tags_ids):
        results = []
        for tag_id in tags_ids:
            results.append(self.db_delete_user_tag(identity,tag_id))
        return results
        


    # PROPERTY CRUD
        
    def db_create_user_property(self,identity,property):
        property["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"properties":property}})
        return res
    
    def db_get_user_property(self,identity,property_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"properties.id": {"$in": [property_id]}}],{"properties.$": 1}))
        if len(res) > 0:
            return res[0]["properties"][0]
        return res

    def db_update_user_property(self,identity,property_id, property):
        return self.mongo.user_update_one(identity,"users",{"$set":{"properties.$":property}},[{"properties.id": {"$in": [property_id]}}])

    def db_delete_user_property(self,identity,property_id):  
        return self.mongo.user_update_one(identity,"users",{"$pull":{"properties":{"id":property_id}}},[{"properties.id": {"$in": [property_id]}}])
    
    def db_get_user_properties(self,identity):
        return self.mongo.user_find_one(identity,"users")["properties"]

    def db_create_user_properties(self,identity,properties):
        results = 0
        for property in properties:
            res = self.db_create_user_property(identity,property)
            results += res
        return results 
        
    def db_update_user_properties(self,identity, properties):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"properties",properties}})
        
    def db_delete_user_properties(self,identity,properties_ids):
        results = []
        for property_id in properties_ids:
            results.append(self.db_delete_user_property(identity,property_id))
        return results
        
       





    # ROUTINE CRUD
        
    def db_create_user_routine(self,identity , routine):
        routine["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"routines":routine}})
        return res
    
    def db_create_user_routines(self,identity, routines):
        results = []
        for routine in routines:
            results.append(self.db_create_user_routine(identity,routine))
        return results
    
    def db_get_user_routine(self,identity, routine_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"routines.id": {"$in": [routine_id]}}],{"routines.$": 1}))
        if len(res) > 0:
            return res[0]["routines"][0]
        return res
    
    def db_get_user_routines(self,identity):
        return self.mongo.user_find_one(identity,"users")["routines"]
        
    def db_update_user_routine(self,identity,routine_id,routine):
        return self.mongo.user_update_one(identity,"users",{"$set":{"routines.$":routine}},[{"routines.id": {"$in": [routine_id]}}])
        
    def db_update_user_routines(self,identity,routines):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"routines",routines}})
         
    def db_delete_user_routine(self,identity,routine_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"routines":{"id":routine_id}}},[{"routines.id": {"$in": [routine_id]}}])
    
    def db_delete_user_routines(self,identity,routines_ids):
        results = []
        for routine_id in routines_ids:
            results.append(self.db_delete_user_routine(identity,routine_id))
        return results
        
      
      
    # EVENT CRUD

    def db_create_user_event(self,identity , event):
        event["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"events":event}})
        return event
    
    def db_create_user_events(self,identity, events):
        results = []
        for event in events:
            results.append(self.db_create_user_event(identity,event))
        return results
        
    def db_get_user_event(self,identity, event_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"events.id": {"$in": [event_id]}}],{"events.$": 1}))
        if len(res) > 0:
            event = res[0]["events"][0] 
            if event['objectId'] is not None:
                event['objectId'] = self.db_get_user_object(identity,event['objectId'])
            return event
        return res
    
    def db_get_user_events(self,identity):
        events =  self.mongo.user_find_one(identity,"users")["events"]
        
        for event in events:
            if event['objectId'] is not None:
                event['objectId'] = self.db_get_user_object(identity,event['objectId'])
                
        return events
        
        
    def db_update_user_event(self,identity,event_id,event):
        return self.mongo.user_update_one(identity,"users",{"$set":{"events.$":event}},[{"events.id": {"$in": [event_id]}}])
        
    def db_update_user_events(self,identity,events):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"events",events}})
         
    def db_delete_user_event(self,identity,event_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"events":{"id":event_id}}},[{"events.id": {"$in": [event_id]}}])
    
    def db_delete_user_events(self,identity,events_ids):
        results = []
        for event_id in events_ids:
            results.append(self.db_delete_user_event(identity,event_id))
        return results
        

 
    # CALENDAR CRUD

    def db_create_user_calendar(self,identity , calendar):
        calendar["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"calendars":calendar}})
        return res
    
    def db_create_user_calendars(self,identity, calendars):
        results = []
        for calendar in calendars:
            results.append(self.db_create_user_calendar(identity,calendar))
        return results
        
    def db_get_user_calendar(self,identity, calendar_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"calendars.id": {"$in": [calendar_id]}}],{"calendars.$": 1}))
        if len(res) > 0:
            return res[0]["calendars"][0]
        return res
    
    def db_get_user_calendars(self,identity):
        return self.mongo.user_find_one(identity,"users")["calendars"]
        
    def db_update_user_calendar(self,identity,calendar_id,calendar):
        return self.mongo.user_update_one(identity,"users",{"$set":{"calendars.$":calendar}},[{"calendars.id": {"$in": [calendar_id]}}])
        
    def db_update_user_calendars(self,identity,calendars):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"calendars",calendars}})
         
    def db_delete_user_calendar(self,identity,calendar_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"calendars":{"id":calendar_id}}},[{"calendars.id": {"$in": [calendar_id]}}])
    
    def db_delete_user_calendars(self,identity,calendars_ids):
        results = []
        for calendar_id in calendars_ids:
            results.append(self.db_delete_user_calendar(identity,calendar_id))
        return results
        
      

    # SETTING CRUD 

    def db_get_user_setting(self,identity, setting_id):
        return self.mongo.user_find_one(identity,"users",{"settings.id":setting_id})
    
    def db_get_user_settings(self,identity):
        return self.mongo.user_find_one(identity,"users")["settings"]  
    
    def db_update_user_setting(self,identity,setting_id,setting):
        return self.mongo.user_update_one(identity,"users",{"$set":{"settings.$":setting}},[{"settings.id": {"$in": [setting_id]}}])
        
    def db_update_user_settings(self,identity,settings):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"settings",settings}})
        
        
         
    # GRAPH CRUD
      
    def db_create_user_graph(self,identity , graph):
        graph["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"graphs":graph}})
        return res
    
    def db_create_user_graphs(self,identity, graphs):
        results = []
        for graph in graphs:
            results.append(self.db_create_user_graph(identity,graph))
        return results  

    def db_get_user_graph(self,identity, graph_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"graphs.id": {"$in": [graph_id]}}],{"graphs.$": 1}))
        if len(res) > 0:
            return res[0]["graphs"][0]
        return res
    
    def db_get_user_graphs(self,identity):
        return self.mongo.user_find_one(identity,"users")["graphs"]
        
    def db_update_user_graph(self,identity,graph_id,graph):
        return self.mongo.user_update_one(identity,"users",{"$set":{"graphs.$":graph}},[{"graphs.id": {"$in": [graph_id]}}])
        
    def db_update_user_graphs(self,identity,graphs):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"graphs",graphs}})
        
    def db_delete_user_graph(self,identity,graph_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"graphs":{"id":graph_id}}},[{"graphs.id": {"$in": [graph_id]}}])
        
    def db_delete_user_graphs(self,identity,graphs_ids):
        results = []
        for graph_id in graphs_ids:
            results.append(self.db_delete_user_graph(identity,graph_id))
        return results
      
      
      

      
    def db_create_user_graph_vertex(self,identity ,graph_id, vertex):
        pass
    
    def db_create_user_graph_vertices(self,identity,graph_id, vertices):
        pass
    
    def db_get_user_graph_vertex(self,identity,graph_id, vertex_id):
        pass
    
    def db_get_user_graph_vertices(self,identity,graph_id):
        pass
    
    def db_update_user_graph_vertex(self,identity,graph_id,vertex_id,vertex):
        pass
    
    def db_update_user_graph_vertices(self,identity,graph_id,vertices):
        pass
    
    def db_delete_user_graph_vertex(self,identity,graph_id,vertex_id): # delete edges of node
        pass
    
    def db_delete_user_graph_vertices(self,identity,graph_id,vertices_ids):# delete edges of node
        pass
      
      
      
    # GRAPH EDGE CRUD  
        

    def db_create_user_graph_edge(self,identity,graph_id , edge):
        pass
    
    def db_create_user_graph_edges(self,identity,graph_id, edges):
        pass
    
    def db_get_user_graph_edge(self,identity,graph_id, edge_id):
        pass
    
    def db_get_user_graph_edges(self,identity,graph_id):
        pass
    
    def db_update_user_graph_edge(self,identity,graph_id,edge_id,edge):
        pass
    
    def db_update_user_graph_edges(self,identity,graph_id,edges):
        pass
    
    def db_delete_user_graph_edge(self,identity,graph_id,edge_id):
        pass
    
    def db_delete_user_graph_edges(self,identity,graph_id,edges_ids):
        pass  
    
    def db_delete_user_graph_node_edges(self,identity,graph_id,node_id):
        pass

      
      
            
    # NOTIFICATION CRUD
    
    def db_create_user_notification(self,identity , notification):
        notification["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"notifications":notification}})
        return res
    
    def db_create_user_notifications(self,identity, notifications):
        results = []
        for notification in notifications:
            results.append(self.db_create_user_notification(identity,notification))
        return results
        

    def db_get_user_notification(self,identity, notification_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"notifications.id": {"$in": [notification_id]}}],{"notifications.$": 1}))
        if len(res) > 0:
            return res[0]["notifications"][0]
        return res
    
    def db_get_user_notifications(self,identity):
        return self.mongo.user_find_one(identity,"users")["notifications"]
        
    
    def db_update_user_notification(self,identity,notification_id,notification):
        return self.mongo.user_update_one(identity,"users",{"$set":{"notifications.$":notification}},[{"notifications.id": {"$in": [notification_id]}}])
    
    
    def db_update_user_notifications(self,identity,notifications):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"notifications",notifications}})
        
        
    def db_delete_user_notification(self,identity,notification_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"notifications":{"id":notification_id}}},[{"notifications.id": {"$in": [notification_id]}}])
    
    
    def db_delete_user_notifications(self,identity,notifications_ids):
        results = []
        for notification_id in notifications_ids:
            results.append(self.db_delete_user_notification(identity,notification_id))
        return results
      
       
    # REMINDER CRUD
       
    def db_create_user_reminder(self,identity , reminder):
        reminder["id"] = uuid4().hex
        res = self.mongo.user_update_one(identity,"users",{"$push":{"reminders":reminder}})
        return res
    
    def db_create_user_reminders(self,identity, reminders):
        results = []
        for reminder in reminders:
            results.append(self.db_create_user_reminder(identity,reminder))
        return results
    
    def db_get_user_reminder(self,identity, reminder_id):
        res = list(self.mongo.user_find_many(identity,"users",[{"reminders.id": {"$in": [reminder_id]}}],{"reminders.$": 1}))
        if len(res) > 0:
            return res[0]["reminders"][0]
        return res
    
    def db_get_user_reminders(self,identity):
        return self.mongo.user_find_one(identity,"users")["reminders"]
        
    def db_update_user_reminder(self,identity,reminder_id,reminder):
        return self.mongo.user_update_one(identity,"users",{"$set":{"reminders.$":reminder}},[{"reminders.id": {"$in": [reminder_id]}}])
    
    
    def db_update_user_reminders(self,identity,reminders):
        return self.mongo.user_update_many(identity,"users",[],{"$set":{"reminders",reminders}})
            
    def db_delete_user_reminder(self,identity,reminder_id):
        return self.mongo.user_update_one(identity,"users",{"$pull":{"reminders":{"id":reminder_id}}},[{"reminders.id": {"$in": [reminder_id]}}])
    
    
    def db_delete_user_reminders(self,identity,reminders_ids):
        results = []
        for reminder_id in reminders_ids:
            results.append(self.db_delete_user_reminder(identity,reminder_id))
        return results
      
       
      
      

    # def db_get_app_data(self): 
    #    return self.mongo.db.metadata.find_one()          
                 
    # def db_find_user_by_username(self,username):
    #     user = self.mongo.db.users.find_one({"username":username})
    #     return user
    
    # def db_find_user_by_email(self,email):
    #     return self.mongo.db.users.find_one({"email":email})

    # def db_create_user(self,username,password,firstname,lastname,date_of_birth,email):
    #     user = self.mongo.db.users.find_one({"username":username})
    #     if user is not None:
    #         return None
    #     email =  self.mongo.db.users.find_one({"email":email})
    #     if email is not None:
    #         return None
        

    #     new_user = self.mongo.db.users.insert_one(
    #     {
    #         "username":username,
    #         "password":password,
    #         "firstname":firstname,
    #         "lastname":lastname,
    #         "dateOfBirth":date_of_birth,
    #         "email":email,
    #         "objects":[],
    #         "tags":[],
    #         "categories":[],   
    #         "edges" :[],
    #         "events":[],
    #         "settings":[],
    #         "routines":[],
    #         "created":datetime.datetime.now(),
    #         "lastUpdate":datetime.datetime.now(),
    #     })
    #     new_user_data = self.mongo.db.users.find_one({"username":username})        
    #     self.mongo.db.backup.insert_one(
    #         {
    #             "_id" : new_user_data['_id'],
    #             "username":username,
    #             "saves":[
    #                 {
    #                     "id":uuid4(),
    #                     "saveDate":datetime.datetime.now(),
    #                     "userData": new_user_data
    #                 }
    #             ] 
    #         }
    #     )
        
    #     return new_user


    # def db_get_user_data(self,identity):
    #     user_data = self.mongo.db.users.find_one({"username":identity})
    #     return user_data   
    
    # def db_get_user_categories(self,identity):
    #     user = self.mongo.db.users.find_one({"username":identity})
    #     return user["categories"]
    
    # def db_update_user_categories(self,identity,categories):
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"categories":categories}})
    #     return self.db_get_user_categories(identity)

    # def db_get_user_events(self,identity):
    #     user = self.mongo.db.users.find_one({"username":identity})
    #     return user["events"]
    
    # def db_update_user_events(self,identity,events):
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"events":events}})
    #     return self.db_get_user_routines(identity)

    # def db_get_user_routines(self,identity):
    #     user = self.mongo.db.users.find_one({"username":identity})
    #     return user["routines"]
    
    # def db_update_user_routines(self,identity,routines):
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"routines":routines}})
    #     return self.db_get_user_routines(identity)

    # def db_get_user_edges(self,identity):
    #     user = self.mongo.db.users.find_one({"username":identity})
    #     return user["categories"]
    
    # def db_update_user_edges(self,identity,edges):
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"edges":edges}})
    #     return self.db_get_user_edges(identity)

    # def db_get_user_tags(self,identity):
    #     user = self.mongo.db.users.find_one({"username":identity})
    #     return user["tags"]
    
    # def db_update_user_tags(self,identity,tags):
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"tags":tags}})
    #     return self.db_get_user_tags(identity)       

    # def db_get_user_object(self,identity,object_name):
    #     objects = self.db_get_user_objects(identity)
    #     for obj in objects:
    #         if obj["name"] == object_name:
    #             return obj
    
    # def db_create_user_object(self,identity,object):
    #     object['created'] = datetime.datetime.now()
    #     object['updated'] = datetime.datetime.now()
    #     self.mongo.db.users.update_one({"username":identity},{"$push":{"objects":object}})
    


    
    # def db_update_user_object(self,identity, object):
    #     objects = self.db_get_user_objects(identity)
    #     object['updateDatetime'] = datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")       
    #     new_objects = list(map(lambda obj: object if object["id"] == obj["id"] else obj, objects))         
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"objects":new_objects}})
    #     return object

    # def db_delete_user_object(self,identity, object_id):
    #     objects = self.db_get_user_objects(identity)
    #     deleted_object = self.db_get_user_object_by_id(identity,object_id)
    #     new_objects = list(filter(lambda obj: obj["id"] != object_id, objects))
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"objects":new_objects}})
    #     return deleted_object     

    # def db_get_user_objects(self, identity):
    #     userdata = self.mongo.db.users.find_one({"username":identity})
    #     return userdata["objects"]

    # def db_get_user_object_by_id(self, identity,object_id):
    #     objects = self.db_get_user_objects(identity)
    #     for obj in objects:
    #         if obj["id"] == object_id:
    #             return obj
            

    
    # def db_get_user_settings(self,identity):
    #     userdata = self.mongo.db.users.find_one({"username":identity})
    #     return userdata["settings"]
    
    # def db_update_user_settings(self,identity,new_settings):
    #     self.mongo.db.users.update_one({"username":identity},{"$set":{"settings":new_settings}})
    #     return self.get_db_user_settings(identity)        


                
    # def db_save_user_data(self,identity,user_data):
        
    #     def default(o):
    #         if isinstance(o, (datetime.date, datetime.datetime)):
    #             return o.isoformat()
            
    #     user_saves = self.mongo.db.backup.find_one({"username":identity})["saves"]
    #     new_save_list = []
    #     for save in user_saves:
    #         new_save_list.append(save)
            
    #     new_save = {
    #             # "_id":uuid4(),
    #             "saveDate":datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
    #             "userData": user_data
    #         }
    #     new_save_list.append(
    #         json.dumps(new_save, default=default)
    #     )
    #     self.mongo.db.backup.update_one({"username":identity},{"$set":{"saves":new_save_list}})
    #     return new_save_list


    # def db_get_saved_user_data(self,identity):
    #     pass
    
    
    
    # def db_delete_user_category(self,user,id):
    #     pass
        
    # def db_update_user_category(self,user,id,category):
    #     pass
    # def db_get_user_category(self,user,id):   
    #     pass
# update= objects,tags,categories,edges,routines,events,settings -- new array = new array
# 
# get userdata
# 
#userid,username,password,firstname,lastname,date_of_birth,email,created,last_update,
    
# userdata:{ 
# user-id      
# objects: -id,userid,name,description,createddate,update_date,-  properties:[{id,name,attribute,value}] tags: [{id,name}] - categories: [{id,name,parentId,categoryGroup}]
# tags:[{userid,id,name}],
# categories:{userid,categoriesGroups:{ master: [{id,name,parentid,categoryGroup=master},{}], later: [{}], expermiental: [{}] }
# edges : - [{userId,groupobjectId,childobjectId,parentobjectId,connectionType,weight}]
# routines : [{userid, name, description, list_of_events,order }]
# events : [{userid,objectId,startdate,enddate,repeat:bool,allday:bool,time:{}}]
# settings:[{id,settingsId,value}]
#}
# metadata: - {attributes:[{id,name,description,data_type}],features:[{id,name}],settingsOptions:[{id,name,description,data_type}] , times:{ repeatTypes:{daily:{everyXdays,:endRepeat:bool,numberOfTimes,afterDate},weekly:{days:{sunday:,monday:...},endRepeat:bool,numberOfTimes,afterDate,},monthly:,yearly:,}, }}

# {"$set": {“composition”: {“mw”: 15000}}} replace composition
# {"$set": {“composition.mw”: 15000}} update only mw
# franctional updates dammit :/

 





# class MongoAPI(object):
#     def __init__(self) -> None:
#         self.client = MongoClient(config['db']['url'])  # configure db url
#         self.db = self.client[config['db']['name']]  # configure db name
        
#     def insert(self, element, collection_name):
#         element["created"] = datetime.now()
#         element["updated"] = datetime.now()
#         inserted = self.db[collection_name].insert_one(element)  # insert data to db
#         return str(inserted.inserted_id)
    
#     def find(self, criteria, collection_name, projection=None, sort=None, limit=0, cursor=False):  # find all from db

#         if "_id" in criteria:
#             criteria["_id"] = ObjectId(criteria["_id"])

#         found = self.db[collection_name].find(filter=criteria, projection=projection, limit=limit, sort=sort)

#         if cursor:
#             return found

#         found = list(found)

#         for i in range(len(found)):  # to serialize object id need to convert string
#             if "_id" in found[i]:
#                 found[i]["_id"] = str(found[i]["_id"])

#         return found

#     def find_by_id(self, id, collection_name):
#         found = self.db[collection_name].find_one({"_id": ObjectId(id)})
        
#         if found is None:
#             return not found
        
#         if "_id" in found:
#              found["_id"] = str(found["_id"])

#         return found

#     def update(self, id, element, collection_name):
#         criteria = {"_id": ObjectId(id)}

#         element["updated"] = datetime.now()
#         set_obj = {"$set": element}  # update value

#         updated = self.db[collection_name].update_one(criteria, set_obj)
#         if updated.matched_count == 1:
#             return "Record Successfully Updated"

#     def delete(self, id, collection_name):
#         deleted = self.db[collection_name].delete_one({"_id": ObjectId(id)})
#         return bool(deleted.deleted_count)