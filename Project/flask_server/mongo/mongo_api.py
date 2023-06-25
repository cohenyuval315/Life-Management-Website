from database import get_mongo_database
from pymongo import CursorType, MongoClient
from typing import Any, Iterable, Mapping, Sequence, Tuple, Union,Optional
from bson import ObjectId
import pymongo
from pymongo.collection import ReturnDocument
import bson
# auth checking:
# import urllib.parse
# username = urllib.parse.quote_plus('user')

# command  , command('aggregate', 'things', pipeline=pipeline, explain=True)
# client = MongoClient('example.com',
#                      username='user',
#                      password='password',
#                      authSource='the_database',
#                      authMechanism='SCRAM-SHA-1')

class MongoAPI(object):
    ASCENDING  = 1
    DESCENDING = -1
    GEO2D = '2d'
    GEOSPHERE = '2dsphere'
    HASHED = 'hashed'
    TEXT = 'text'
    def __init__(self) -> None:
        self.db = get_mongo_database()
    
    def collection(self,collection_name):
        if not isinstance(collection_name ,str):
            print("string please")
            return 
            
        if collection_name not in self.db.list_collection_names():
            self.db.create_collection(collection_name)

        return self.db[collection_name]

    def insert_one(self,
                    collection_name:str,
                    document: Union[pymongo.typings._DocumentType, bson.raw_bson.RawBSONDocument],
                    bypass_document_validation: bool = False, 
                    comment: Optional[Any] = None):
        # pymongo.results.InsertOneResult
        return self.collection(collection_name).insert_one(document,bypass_document_validation,comment)
    
    def insert_many(self,collection_name:str,documents: Iterable[Union[pymongo.typings._DocumentType, bson.raw_bson.RawBSONDocument]], ordered: bool = True, bypass_document_validation: bool = False, comment: Optional[Any] = None):
        return self.collection(collection_name).insert_many(documents,ordered,bypass_document_validation,comment)
         #pymongo.results.InsertManyResult¶
    
    
    def replace_one(self,
                    collection_name:str,
                    filter: Mapping[str, Any],
                    replacement: Mapping[str, Any],
                    upsert: bool = False,
                    bypass_document_validation: bool = False,
                    Any: Optional[Union[Mapping[str, Any],Any]] = None,
                    hint: Optional[Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]]] = None, 
                    let: Optional[Mapping[str, Any]] = None, 
                    comment: Optional[Any] = None):
        return self.collection(collection_name).replace_one(filter,replacement,upsert,bypass_document_validation,Any,hint,let,comment) # pymongo.results.UpdateResult
        

    
    def update_one(self,
                   collection_name:str,
                   filter: Mapping[str, Any], 
                   update: Union[Mapping[str, Any], Sequence[Mapping[str, Any]]],
                   upsert: bool = False, 
                   bypass_document_validation: bool = False,Any: Optional[Union[Mapping[str, Any],Any]] = None, 
                   array_filters: Optional[Sequence[Mapping[str, Any]]] = None,
                   hint: Optional[Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]]] = None, 
                   let: Optional[Mapping[str, Any]] = None, 
                   comment: Optional[Any] = None):
        return self.collection(collection_name).update_one(filter,update,upsert,bypass_document_validation,array_filters,hint,let,comment) # pymongo.results.UpdateResult¶
        
    
    def update_many(self,
                    collection_name:str,
                    filter: Mapping[str, Any], 
                    update: Union[Mapping[str, Any], Sequence[Mapping[str, Any]]], 
                    upsert: bool = False, 
                    array_filters: Optional[Sequence[Mapping[str, Any]]] = None, 
                    bypass_document_validation: Optional[bool] = None,Any: Optional[Union[Mapping[str, Any],Any]] = None,
                    hint: Optional[Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]]] = None,
                    let: Optional[Mapping[str, Any]] = None, 
                    comment: Optional[Any] = None):
        return self.collection(collection_name).update_many(filter,update,upsert,array_filters,bypass_document_validation,hint,let,comment) # pymongo.results.UpdateResult
    
    def delete_one(self,
                   collection_name:str,
                   filter: Mapping[str, Any],
                   Any: Optional[Union[Mapping[str, Any],Any]] = None,
                   hint: Optional[Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]]] = None, 
                   let: Optional[Mapping[str, Any]] = None,
                   comment: Optional[Any] = None):
        return self.collection(collection_name).delete_one(filter,Any,hint,let,comment)

    
         # pymongo.results.DeleteResult¶
    
    def delete_many(self,
                    collection_name:str,
                    filter: Mapping[str, Any],
                    Any: Optional[Union[Mapping[str, Any],Any]] = None, 
                    hint: Optional[Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]]] = None, 
                    let: Optional[Mapping[str, Any]] = None, 
                    comment: Optional[Any] = None):
        return self.collection(collection_name).delete_many(filter,Any,hint,let,comment)

    
         # pymongo.results.DeleteResult
    
    def aggregate_raw_batches(self,
                              collection_name:str,
                              pipeline: Sequence[Mapping[str, Any]],
                              comment: Optional[Any] = None, 
                              **kwargs: Any):
        return self.collection(collection_name).aggregate_raw_batches(pipeline,comment,kwargs)
               
             # pymongo.cursor.RawBatchCursor[pymongo.typings._DocumentType]

    def watch(self,
              collection_name:str,
              pipeline: Optional[Sequence[Mapping[str, Any]]] = None,
              full_document: Optional[str] = None,
              resume_after: Optional[Mapping[str, Any]] = None,
              max_await_time_ms: Optional[int] = None, 
              batch_size: Optional[int] = None,
              Any: Optional[Union[Mapping[str, Any],Any]] = None, 
              start_at_operation_time: Optional[bson.timestamp.Timestamp] = None, 
              start_after: Optional[Mapping[str, Any]] = None, 
              comment: Optional[Any] = None,
              full_document_before_change: Optional[str] = None,
              show_expanded_events: Optional[bool] = None):
        res = self.collection(collection_name).watch(
            pipeline=pipeline,
            full_document=full_document,
            resume_after=resume_after,
            max_await_time_ms=max_await_time_ms,
            batch_size=batch_size,
            Any=Any,
            start_at_operation_time=start_at_operation_time,
            start_after=start_after,
            comment=comment,
            full_document_before_change=full_document_before_change,
            show_expanded_events=show_expanded_events,
            )
        return res        
        
         # pymongo.change_stream.CollectionChangeStream[pymongo.typings._DocumentType]
    
    def find_raw_batches(self,
                         collection_name:str,
                         filter=None, 
                         projection=None, 
                         skip=0, 
                         limit=0, 
                         no_cursor_timeout=False,
                         cursor_type=CursorType.NON_TAILABLE, 
                         sort=None, allow_partial_results=False,
                         oplog_replay=False,
                         batch_size=0,Any=None,
                         hint=None, max_scan=None,
                         max_time_ms=None, max=None, 
                         min=None, return_key=False, 
                         show_record_id=False,
                         snapshot=False,
                         comment=None,
                         session=None, 
                         allow_disk_use=None):
        res = self.collection(collection_name).find_raw_batches(
                        filter=filter, 
                         projection=projection, 
                         skip=skip, 
                         limit=limit, 
                         no_cursor_timeout=no_cursor_timeout,
                         cursor_type=cursor_type, 
                         sort=sort, allow_partial_results=allow_partial_results,
                         oplog_replay=oplog_replay,
                         batch_size=batch_size,Any=Any,
                         hint=hint, max_scan=max_scan,
                         max_time_ms=max_time_ms, max=max, 
                         min=min, return_key=return_key, 
                         show_record_id=show_record_id,
                         snapshot=snapshot,
                         comment=comment,
                         session=session, 
                         allow_disk_use=allow_disk_use)
        return res
        pass
    
    def find_one(self,collection_name:str,filter=None, *args, **kwargs):
        return self.collection(collection_name).find_one(filter=filter,args=args,kwargs=kwargs)
        
        
    
    def find_one_and_delete(self,collection_name:str,filter: Mapping[str, Any], projection: Optional[Union[Mapping[str, Any], Iterable[str]]] = None, sort: Optional[Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]] = None, hint: Optional[Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]]] = None, let: Optional[Mapping[str, Any]] = None, comment: Optional[Any] = None, **kwargs: Any):
        return self.collection(collection_name).find_one_and_delete(filter=filter,projection=projection,sort=sort,hint=hint,let=let,comment=comment)
        # pymongo.typings._DocumentType
    
    def find_one_and_replace(self,collection_name:str,
                             filter,
                             replacement,
                             projection=None,
                             sort=None,
                             return_document=ReturnDocument.BEFORE,
                             hint=None,
                             session=None,
                             **kwargs):
        return self.collection(collection_name).find_one_and_replace(
            
filter=filter,
replacement=replacement,
projection=projection,
sort=sort,
return_document=return_document,
hint=hint,
session=session,
kwargs=kwargs)

         # ReturnDocument
    
    def find_one_and_update(self,
                            collection_name:str,
                            filter, 
                            update,
                            projection=None, 
                            sort=None,
                            return_document=ReturnDocument.BEFORE, 
                            array_filters=None, 
                            hint=None, 
                            session=None,
                            **kwargs
                            ):
        return self.collection(collection_name).find_one_and_update(
filter=filter,
update=update,
projection=projection,
sort=sort,
return_document=return_document,
array_filters=array_filters,
hint=hint,
session=session,
kwargs=kwargs)

         # ReturnDocument   
    
    def find(self,collection_name:str,
             filter=None, 
             projection=None, 
             skip=0, 
             limit=0, 
             no_cursor_timeout=False, 
             cursor_type=CursorType.NON_TAILABLE,
             sort=None,
             allow_partial_results=False,
             oplog_replay=False,
             batch_size=0,
             Any=None, 
             hint=None, 
             max_scan=None, 
             max_time_ms=None,
             max=None, 
             min=None,
             return_key=False,
             show_record_id=False, 
             snapshot=False, 
             comment=None, 
             session=None, 
             allow_disk_use=None):
        return self.collection(collection_name).find(filter=filter,
projection=projection,
skip=skip,
limit=limit,
no_cursor_timeout=no_cursor_timeout,
cursor_type=cursor_type,
sort=sort,
allow_partial_results=allow_partial_results,
oplog_replay=oplog_replay,
batch_size=batch_size,
Any=Any,
hint=hint,
max_scan=max_scan,
max_time_ms=max_time_ms,
max=max,
min=min,
return_key=return_key,
show_record_id=show_record_id,
snapshot=snapshot,
comment=comment,
session=session,
allow_disk_use=allow_disk_use)

    
    def aggregate(self,collection_name:str,
                  pipeline: Sequence[Mapping[str, Any]],
                  let: Optional[Mapping[str, Any]] = None, 
                  comment: Optional[Any] = None,
                  **kwargs: Any
                  ):
        res = self.collection(collection_name).aggregate(pipeline=pipeline,
let=let,
comment=comment,
kwargs=kwargs)
        return res
         # pymongo.command_cursor.CommandCursor[pymongo.typings._DocumentType]¶

    def count_document(self,collection_name:str,
                       filter: Mapping[str, Any],
                       comment: Optional[Any] = None, 
                       **kwargs: Any):
        return self.collection(collection_name).count_document(filter=filter,
comment=comment,
kwargs=kwargs)

    
    def estimate_document_count(self,collection_name:str,
                                comment: Optional[Any] = None, 
                                **kwargs: Any):
        return self.collection(collection_name).estimate_document_count(comment=comment,kwargs=kwargs)

    
    def distinct(self,collection_name:str,
                 key: str, 
                 filter: Optional[Mapping[str, Any]] = None,
                 comment: Optional[Any] = None,
                 **kwargs: Any):
        return self.collection(collection_name).distinct(key=key,
filter=filter,
comment=comment,
kwargs=kwargs)
         # list
    
    def rename(self,collection_name:str,
               new_name: str,
               comment: Optional[Any] = None, 
               **kwargs: Any):
        return self.collection(collection_name).rename(
            new_name= new_name,
comment=comment,
kwargs=kwargs
        )

    
    def drop(self,collection_name:str,
             comment: Optional[Any] = None,
             encrypted_fields: Optional[Mapping[str, Any]] = None):
        return self.collection(collection_name).drop(comment=comment,encrypted_fields=encrypted_fields)

    
    def index_information(self,collection_name:str, comment: Optional[Any] = None):
        return self.collection(collection_name).index_information(comment)
 #  MutableMapping[str, Any]¶
    
    def list_indexes(self,collection_name:str, comment: Optional[Any] = None):
        return self.collection(collection_name).list_indexes(comment=comment)
        #  pymongo.command_cursor.CommandCursor[MutableMapping[str, Any]]¶
    
    def drop_indexes(self,collection_name:str, comment: Optional[Any] = None, **kwargs: Any):
        return self.collection(collection_name).drop_indexes(comment=comment,kwargs=kwargs)
    
    def create_index(self,collection_name:str,
                     keys: Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]],
                     comment: Optional[Any] = None, **kwargs: Any):
        return self.collection(collection_name).create_index(keys=keys,kwargs=kwargs)
        # str
    
    def create_indexes(self,collection_name:str,
                       indexes: Sequence[pymongo.operations.IndexModel], 
                       comment:  Optional[Any] = None, **kwargs: Any):
        return self.collection(collection_name).create_indexes(collection_name=collection_name,indexes=indexes,comment=comment,kwargs=kwargs)
        # List[str]
    
    def drop_index(self,collection_name:str,
                   index_or_name: Union[str, Sequence[Tuple[str, Union[int, str, Mapping[str, Any]]]]],
                   comment: Optional[Any] = None, **kwargs: Any):
        return self.collection(collection_name).drop_index(index_or_name=index_or_name, comment=comment, kwargs=kwargs)
    
    
    
    def check_existence_DB(self,collection_name:str,db_name):
        list_of_dbs = self.db.list_database_names()
        if db_name in list_of_dbs:
            return True
        return False

    def is_collection_exists(self,collection_name):
        collection_list = self.db.list_collection_names()
        if collection_name in collection_list:
            return True
        return False


class MongoJsonPerUser():
    """
        **- My Mongo database users requirments implementation -**
        
        1.user data = two jsons,
        2.one json in users collection ,
        3.one json in backups collection ,
        4.insert,delete invalid operations for user 
        5.update,find valid operations for user  
          
    """
    METADATA_COLLECTION_NAME = "metadata"
    USERS_COLLECTION_NAME = "users"
    USERS_BACKUP_COLLECTION_NAME = "backups"


    
    def __init__(self) -> None:
        self.mongo = MongoAPI()
        self.metadata = self.mongo.collection(self.METADATA_COLLECTION_NAME)
        self.users = self.mongo.collection(self.USERS_COLLECTION_NAME)
        self.backups = self.mongo.collection(self.USERS_BACKUP_COLLECTION_NAME)
    
    # def _user_filter(func):
    #     def wrapper(self,identity,filters=[], *args, **kwargs):
    #         user_filters = [{"username": identity}]
    #         user_filters.extend(filters)
    #         ready_user_filters = {"$and":user_filters}
    #         return func(self,ready_user_filters,*args,**kwargs)
    #     return wrapper
    
    
    def meta_data(self):     
        return self.metadata
     
    def user_find(self,identity,filters, projection=None,limit=50,sort=None):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}        
        return self.users.find_one(filter=ready_user_filters, projection=projection, limit=limit, sort=sort)
     

    def user_update(self,identity,filters,update,upsert=False, array_filters=None):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}    
        return self.users.update_one(filter=ready_user_filters,update=update, upsert=upsert,array_filters=array_filters)
    

    def backup_find(self,identity,filters, projection=None,limit=50,sort=None):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}            
        return self.backups.find_one(filter=ready_user_filters, projection=projection, limit=limit, sort=sort)
     

    def backup_update(self,identity,filters,update,upsert=False, array_filters=None):
        user_filters = [{"username": identity}]
        user_filters.extend(filters)
        ready_user_filters = {"$and":user_filters}            
        return self.backups.update_one(filter=ready_user_filters,update=update, upsert=upsert,array_filters=array_filters)
         

class MongoDatabaseAPI():
    """
    
    """
    
    USERS_COLLECTION_NAME = "Users"
    EVENTS_ITEMS_COLLECTION_NAME = "EventsItems"
    TASKS_COLLECTION_NAME = "Tasks"
    ROUTINES_COLLECTION_NAME = "Routines"    
    OBJECTIVES_COLLECTION_NAME = "Objectives"
    MARKDOWN_NOTES_COLLECTION_NAME = "MarkdownNotes"
    TAGS_COLLECTION_NAME = "Tags"
    CATEGORIES_COLLECTION_NAME = "Categories"
    
    
    
    
    # PROFILE_COLLECTION_NAME = "ProfileItems"
    # LIVE_VIEWS_COLLECTION_NAME = "LiveView"
    # USERS_BACKUP_COLLECTION_NAME = "backups"
    # NOTIFICATIONS_COLLECTION_NAME = "notifications"
    # REMINDERS_COLLECTION_NAME = "reminders"

    def __init__(self) -> None:
        self.mongo = MongoAPI()

    def mongo_api(self):
        return self.mongo
        
    def find_user_collection_items(self,collection:str,user_id:str):
        if self.mongo.is_collection_exists(collection_name=collection) == False:
            return False
        
        if not isinstance(user_id,str):
            return None
        
        if self.mongo.collection(collection).count_documents({"user_id":ObjectId(user_id)}) == 0:
            return None
        res = self.mongo.collection(collection).find({"user_id":user_id})
        items = []
        for item in res:
            item['_id'] = str(item['_id'])
            items.append(item)
        return items
               
    def update_user_collecton_item(self,collection:str,user_id:str,item_id:str ,update : object):
        if self.mongo.is_collection_exists(collection_name=collection) == False:
            return False
                
        res = self.mongo.collection(collection).find_one_and_update(filter={"$and":[ {"user_id":user_id}, {"_id":ObjectId(item_id)}]},update={"$set":update},return_document=ReturnDocument.AFTER)    
        if res is None:
            return None
        return res
    
    def replace_user_collecton_item(self,collection:str,user_id:str,item_id:str,item: object):
        if self.mongo.is_collection_exists(collection_name=collection) == False:
            return False
        res = self.mongo.collection(collection).find_one_and_replace(filter={"$and":[ {"user_id":user_id}, {"_id":ObjectId(item_id)}]},replacement=item,return_document=ReturnDocument.AFTER)    
        if res is None:
            return None
        return res
    
    def insert_user_collection_item(self,collection:str,user_id:str,item:object):
        if self.mongo.is_collection_exists(collection_name=collection) == False:
            return False        
        if not isinstance(user_id,str):
            return None
        if not isinstance(item,object):
            return None               
        new_item = item
        new_item["_id"]:ObjectId()
        new_item["user_id"]:user_id

        count_before = self.mongo.collection(collection).count_documents({"user_id":ObjectId(user_id)})
        self.mongo.collection(collection).insert_one(new_item)
        count_after = self.mongo.collection(collection).count_documents({"user_id":ObjectId(user_id)})
        
        if count_before != count_after + 1:
            return None
        
        return new_item
    
    def delete_user_collection_item(self,collection:str,user_id:str,item_id:str,dependancy_field_name:str=None,dependancy_collections:list=None,is_dependancy_array:bool=None):
        if self.mongo.is_collection_exists(collection_name=collection) == False:
            return False        
        count_before = self.mongo.collection(collection).count_documents({"user_id":ObjectId(user_id)})        
        deleted = self.mongo.collection(collection).find_one_and_delete(filter={"$and":[ {"user_id":user_id}, {"_id":ObjectId(item_id)}]})    
        count_after = self.mongo.collection(collection).count_documents({"user_id":ObjectId(user_id)})
        
        if dependancy_collections:
            if is_dependancy_array == True: 
                for dependancy_collection in dependancy_collections:
                    res = self.mongo.collection(dependancy_collection).find_one_and_update(
                        {"user_id":ObjectId(user_id)},
                        { "$pull": { dependancy_field_name: { "_id":item_id } } }
                    )
                    if res == None:
                        return None
            else:
                for dependancy_collection in dependancy_collections:
                    res = self.mongo.collection(dependancy_collection).find_one_and_update(
                        {"user_id":ObjectId(user_id)},
                        { "$set": { dependancy_field_name: "" } }
                    )
                    if res == None:
                        return None
                                    

            
        if count_before - 1 != count_after:
            return None                
        return deleted

    
    
