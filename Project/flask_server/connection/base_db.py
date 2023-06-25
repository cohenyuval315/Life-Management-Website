class BaseDB:

    def db_init_app(self,flask_app):
        raise NotImplementedError
    
    def db_get_app_data(self): 
        raise NotImplementedError        
                 
    def db_find_user_by_username(self,username):
        raise NotImplementedError
    
    def db_find_user_by_email(self,email):
        raise NotImplementedError
    
    def db_create_user(self,username,password,firstname,lastname,date_of_birth,email):
        raise NotImplementedError

    def db_get_user_data(self,identity):
        raise NotImplementedError
    
    def db_get_user_categories(self,identity):
        raise NotImplementedError
    
    def db_update_user_categories(self,identity,categories):
        raise NotImplementedError
    
    def db_get_user_events(self,identity):
        raise NotImplementedError
    
    def db_update_user_events(self,identity,events):
        raise NotImplementedError
    
    def db_get_user_routines(self,identity):
        raise NotImplementedError
    
    def db_update_user_routines(self,identity,routines):
        raise NotImplementedError
    
    def db_get_user_edges(self,identity):
        raise NotImplementedError
    
    def db_update_user_edges(self,identity,edges):
        raise NotImplementedError
    
    def db_get_user_tags(self,identity):
        raise NotImplementedError
    
    def db_update_user_tags(self,identity,tags):
        raise NotImplementedError
    
    def db_get_user_object(self,identity,object_name):
        raise NotImplementedError
    
    def db_create_user_object(self,identity,object):
        raise NotImplementedError
    
    def db_update_user_object(self,identity, object):
        raise NotImplementedError
    
    def db_delete_user_object(self,identity, object_id):
        raise NotImplementedError
    
    def db_get_user_objects(self, identity):
        raise NotImplementedError
    
    def db_get_user_object_by_id(self, identity,object_id):
        raise NotImplementedError
    
    def update_user_settings(self,identity,new_settings):
        raise NotImplementedError  
    
    def get_user_settings(self,identity):
        raise NotImplementedError
        