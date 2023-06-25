

class Database:
    def __init__(self,db) -> None:
        self.db = db

    def find_user_by_username(self,username):
        return self.db.db_find_user_by_username(username)

    def find_user_by_email(self,email):
        return self.db.db_find_user_by_email(email)
        
    def create_user(self,username,password,firstname,lastname,date_of_birth,email):
        return self.db.db_create_user(username,password,firstname,lastname,date_of_birth,email)
    
    def get_app_data(self):
        return self.db.db_get_app_data()
    
    
    # SAVES
    
    def get_user_data(self,identity):
        return self.db.db_get_user_data(identity)
    
    def save_user_data(self,identity,user_data):
        return self.db.db_save_user_data(identity,user_data)
    
    def get_user_data_saves(self,identity):
        return self.db.db_get_user_data_saves(identity)
    
    def get_user_data_by_datetime(self,identity,datetime):
        return self.db.db_get_user_data_by_datetime(identity,datetime)
    
    def load_user_data(self,identity,data):
        return self.db.db_load_user_data(identity,data)
    
    def delete_user_data_save(self,identity,date):
        return self.db.db_delete_user_data_save(identity,date)
    
    # uncategorised finished

    def get_user_objects_by_feature(self,identity,feature):
        return self.db.db_get_user_objects_by_feature(identity,feature)
    
    def get_user_categories_by_feature(self,identity,feature):
        return self.db.db_get_user_categories_by_feature(identity,feature)
    
    def get_user_categories_by_feature_group(self,identity,feature,group):
        return self.db.db_get_user_categories_by_feature_group(identity,feature,group)

    
    
    
    
    def get_user_objects_by_tag(self,identity,tag_id):
        return self.db.db_get_user_objects_by_tag(identity,tag_id)
    
    def get_user_objects_by_feature_category(self,identity,feature,category_id):
        return self.db.get_user_objects_by_feature_category(identity,feature,category_id)
    
    def get_user_objects_by_category(self,identity,category_id):
        return self.db.get_user_objects_by_category(identity,category_id)
    
    def get_user_objects_by_state(self,identity,state):
        return self.db.db_get_user_objects_by_state(identity,state)
    
    def get_user_objects_by_feature_category_group(self,identity,feature,category,group):
        return self.db.get_user_objects_by_feature_category_group(identity,feature,category,group)
    
    
    
    
    

    def get_user_routines_by_object_property(self,identity,object_id,property_id):
        return self.db.db_get_routines_by_object_property(identity,object_id,property_id)

    def get_user_nodes_by_object_property(self,identity,object_id,property_id):
        return self.db.db_get_nodes_by_object_property(identity,object_id,property_id)
    
    def get_user_edges_by_object_property(self,identity,object_id,property_id):
        return self.db.db_get_edges_by_object_property(identity,object_id,property_id)

    def get_user_edges_by_id(self,identity, node_id):
        return self.db.db_get_user_edges_by_id(identity,node_id)  
    
    def get_user_count_objects_by_category(self,identity, category_id):
        return self.db.db_get_user_count_objects_by_category(identity,category_id)
    
    def get_user_count_objects_by_tag(self,identity, tag_id):
        return self.db.db_get_user_count_objects_by_tag(identity,tag_id)
       
      
      
    def get_user_events_categories(self,identity,category_id):
        return self.db.db_get_user_events_categories(identity,category_id)
    

    
    def get_user_events_by_date(self,identity, date):
        return self.db.db_get_user_events_by_date(identity,date)
    
    def get_user_events_by_date_span(self,identity,start_date,end_date):
        return self.db.db_get_user_events_by_date_span(identity,start_date,end_date)

    def get_user_graph_edges_by_id(self,identity,graph_id, node_id):
        return self.db.db_get_user_graph_edges_by_id(identity,graph_id,node_id)  
    
    def get_user_stats(self,identity):
        return self.db.db_get_user_stats(identity)
    
    
    

    # REMINDER    
     
    # NOTIFICATION
    
    
    # GRAPH EDGE   
    
    # GRAPH VERTEX 
    
    # GRAPH 
    
    
    # EVENT 
    # getEventsByCategoriesGroup , feature === scheduler
    # getEventsByDate
    # getEventsByDateSpan
    
    
    # ROUTINE 
      
    

    
    # CATEGORY 
    # getCategoriesByFeature
    # getCategoriesByFeatureGroup
    
    
    
    # OBJECTS 
    # getObjectsByFeature
    # getObjectsByCategoryFeature
    # getObjectsByCategoriesFeatureGroup
    # getObjectsByTags
    # getNumOfObjectsByTag
    # getObjectsByState
    # getObjectsByAttributes

    
    
    
    
    
    
    
    
    
    # CRUDS
    
    
    # OBJECTS CRUD
    
    def create_user_object(self,identity,object):
        return self.db.db_create_user_object(identity,object)
    
    def create_user_objects(self,identity,objects):
        return self.db.db_create_user_objects(identity,objects)
    
    def get_user_object(self,identity, object_id):
        return self.db.db_get_user_object(identity,object_id)
    
    def get_user_objects(self, identity):
        return self.db.db_get_user_objects(identity)

    def update_user_object(self,identity, object_id, object):
        return self.db.db_update_user_object(identity,object_id,object)
    
    def update_user_objects(self,identity, objects):
        return self.db.db_update_user_objects(identity,objects)
    
    def delete_user_object(self,identity, object_id):
        return self.db.db_delete_user_object(identity,object_id)
    
    def delete_user_objects(self,identity,object_ids):
        return self.db.db_delete_user_objects(identity,object_ids)




    # GROUPS CRUD
    
    def create_user_group(self,identity,group):
        return self.db.db_create_user_group(identity,group)
    
    def create_user_groups(self,identity,groups):
        return self.db.db_create_user_groups(identity,groups)
    
    def get_user_group(self,identity, group_id):
        return self.db.db_get_user_group(identity,group_id)
    
    def get_user_groups(self, identity):
        return self.db.db_get_user_groups(identity)

    def update_user_group(self,identity, group_id, group):
        return self.db.db_update_user_group(identity,group_id,group)
    
    def update_user_groups(self,identity, groups):
        return self.db.db_update_user_groups(identity,groups)
    
    def delete_user_group(self,identity, group_id):
        return self.db.db_delete_user_group(identity,group_id)
    
    def delete_user_groups(self,identity,group_ids):
        return self.db.db_delete_user_groups(identity,group_ids)






    # PROPERTY CRUD
    def create_user_property(self,identity , property):
        return self.db.db_create_user_property(identity,property)
    
    def create_user_properties(self,identity, properties):
        return self.db.db_create_user_properties(identity,properties)
    
    def get_user_property(self,identity, property_id):
        return self.db.db_get_user_property(identity,property_id)
    
    def get_user_properties(self,identity):
        return self.db.db_get_user_properties(identity)
    
    def update_user_property(self,identity,property_id,property):
        return self.db.db_update_user_property(identity,property_id,property)
    
    def update_user_properties(self,identity,properties):
        return self.db.db_update_user_properties(identity,properties)
        
    def delete_user_property(self,identity,property_id):
        return self.db.db_delete_user_property(identity,property_id)
    
    def delete_user_properties(self,identity,properties_ids):
        return self.db.db_delete_user_properties(identity,properties_ids)   
      
           
      
      
     






    # CATEGORY CRUD

    def create_user_category(self,identity,category):
        return self.db.db_create_user_category(identity,category)
    
    def create_user_categories(self,identity,categories):
        return self.db.db_create_user_categories(identity,categories)

    def get_user_category(self,identity,category_id):
        return self.db.db_get_user_category(identity,category_id)
    
    def get_user_categories(self,identity):
        return self.db.db_get_user_categories(identity)
    
    def update_user_category(self,identity,category_id,category):
        return self.db.db_update_user_category(identity,category_id,category)
    
    def update_user_categories(self,identity, categories):
        return self.db.db_update_user_categories(identity,categories)
    
    def delete_user_category(self,identity,category_id,features):
        res = self.db.db_delete_user_category(identity,category_id)
        # if "wiki" in features:
        #     self.delete_user_object_category(identity,category_id)
        # if "calendar" in features:
        #     self.delete_user_event_category(identity,category_id)
        return res
    
    def delete_user_object_category(self,identity,category_id):
        objects = self.get_user_objects(identity)
        for obj in objects:
            categories = obj["categories"]
            new_categories = []
            for category in categories:
                object_category_id = category['id']
                if(object_category_id!=category_id):
                    new_categories.append(category)
            if(len(obj['categories']) != len(new_categories)):
                obj["categories"] = new_categories
                self.update_user_object(identity,obj['id'],obj)
                
    def delete_user_event_category(self,identity,category_id):
        events = self.get_user_events(identity)
        for event in events:
            event_category_id = event["calendarId"]
            if event_category_id == category_id:
                event['calendarId'] = None
            self.update_user_event(identity,event['id'],event)
               
    
    def delete_user_categories(self,identity,categories_ids):
        return self.db.db_delete_user_categories(identity,categories_ids)
        
        
   

    # TAG CRUD
        
    def create_user_tag(self,identity,tag):
        return self.db.db_create_user_tag(identity,tag)
    
    def create_user_tags(self,identity,tags):
        return self.db.db_create_user_tags(identity,tags)

    def get_user_tag(self,identity,tag_id):
        return self.db.db_get_user_tag(identity,tag_id)
    
    def get_user_tags(self,identity):
        return self.db.db_get_user_tags(identity)
    
    def update_user_tag(self,identity,tag_id, tag):
        return self.db.db_update_user_tag(identity,tag_id,tag)
    
    def update_user_tags(self,identity, tags):
        return self.db.db_update_user_tags(identity,tags)
    
    def delete_user_tag(self,identity,tag_id):
        res = self.db.db_delete_user_tag(identity,tag_id)
        self.delete_user_object_tag(identity,tag_id)
        return res
    
    def delete_user_object_tag(self,identity,tag_id):
        objects = self.get_user_objects(identity)
        for obj in objects:
            tags = obj["tags"]
            new_tags = []
            for tag in tags:
                object_tag_id = tag['id']
                if(object_tag_id!=tag_id):
                    new_tags.append(tag)
            if(len(obj['tags']) != len(new_tags)):
                obj["tags"] = new_tags
                self.update_user_object(identity,obj['id'],obj)
            
    
    def delete_user_tags(self,identity,tags_ids):
        return self.db.db_delete_user_tags(identity,tags_ids)
        


    # ROUTINE CRUD
        
    def create_user_routine(self,identity , routine):
        return self.db.db_create_user_routine(identity,routine)
    
    def create_user_routines(self,identity, routines):
        return self.db.db_create_user_routines(identity,routines)
    
    def get_user_routine(self,identity, routine_id):
        return self.db.db_get_user_routine(identity,routine_id)   
    
    def get_user_routines(self,identity):
        return self.db.db_get_user_routines(identity)
    
    def update_user_routine(self,identity,routine_id,routine):
        return self.db.db_update_user_routine(identity,routine_id,routine)
    
    def update_user_routines(self,identity,routines):
        return self.db.db_update_user_routines(identity,routines)
        
    def delete_user_routine(self,identity,routine_id):
        return self.db.db_delete_user_routine(identity,routine_id)
    
    def delete_user_routines(self,identity,routines_ids):
        return self.db.db_delete_user_routines(identity,routines_ids)  
      
      
      


    # EVENT CRUD

    def create_user_event(self,identity , event):
        return self.db.db_create_user_event(identity,event)
    
    def create_user_events(self,identity, events):
        return self.db.db_create_user_events(identity,events)
    
    def get_user_event(self,identity, event_id):
        return self.db.db_get_user_event(identity,event_id)
    
    def get_user_events(self,identity):
        return self.db.db_get_user_events(identity)
    
    def update_user_event(self,identity,event_id,event):
        return self.db.db_update_user_event(identity,event_id,event)
    
    def update_user_events(self,identity,events):
        return self.db.db_update_user_events(identity,events)
        
    def delete_user_event(self,identity,event_id):
        return self.db.db_delete_user_event(identity,event_id)
    
    def delete_user_events(self,identity,events_ids):
        return self.db.db_delete_user_events(identity,events_ids)   
      
      
      
      
      

    # CALENDAR CRUD

    def create_user_calendar(self,identity , calendar):
        return self.db.db_create_user_calendar(identity,calendar)
    
    def create_user_calendars(self,identity, calendars):
        return self.db.db_create_user_calendars(identity,calendars)
    
    def get_user_calendar(self,identity, calendar_id):
        return self.db.db_get_user_calendar(identity,calendar_id)
    
    def get_user_calendars(self,identity):
        return self.db.db_get_user_calendars(identity)
    
    def update_user_calendar(self,identity,calendar_id,calendar):
        return self.db.db_update_user_calendar(identity,calendar_id,calendar)
    
    def update_user_calendars(self,identity,calendars):
        return self.db.db_update_user_calendars(identity,calendars)
        
    def delete_user_calendar(self,identity,calendar_id):
        return self.db.db_delete_user_calendar(identity,calendar_id)
    
    def delete_user_calendars(self,identity,calendars_ids):
        return self.db.db_delete_user_calendars(identity,calendars_ids)   
      
           
      
      
     

    # GRAPH CRUD
      
    def create_user_graph(self,identity , graph):
        return self.db.db_create_user_graph(identity,graph)  
    
    def create_user_graphs(self,identity, graphs):
        return self.db.db_create_user_graphs(identity,graphs)  

    def get_user_graph(self,identity, graph_id):
        return self.db.db_get_user_graph(identity,graph_id)  
    
    def get_user_graphs(self,identity):
        return self.db.db_get_user_graphs(identity)  
    
    def update_user_graph(self,identity,graph_id,graph):
        return self.db.db_update_user_graph(identity,graph_id,graph)  
    
    def update_user_graphs(self,identity,graphs):
        return self.db.db_update_user_graphs(identity,graphs)
        
    def delete_user_graph(self,identity,graph_id):
        return self.db.db_delete_user_graph(identity,graph_id)  
    
    def delete_user_graphs(self,identity,graphs_ids):
        return self.db.db_delete_user_graphs(identity,graphs_ids)    
      
      
      

    # GRAPH VERTEX CRUD

    def create_user_graph_vertex(self,identity ,graph_id,  vertex):
        return self.db.db_create_user_graph_vertex(identity,graph_id, vertex)  
    
    def create_user_graph_vertices(self,identity,graph_id, vertices):
        return self.db.db_create_user_graph_vertices(identity,graph_id, vertices)  

    def get_user_graph_vertex(self,identity,graph_id, vertex_id):
        return self.db.db_get_user_graph_vertex(identity,graph_id,vertex_id)   
    
    def get_user_graph_vertices(self,identity,graph_id):
        return self.db.db_get_user_graph_vertices(identity,graph_id)  
    
    def update_user_graph_vertex(self,identity,graph_id,vertex_id,vertex):
        return self.db.db_update_user_graph_vertex(identity,graph_id,vertex_id,vertex)  
    
    def update_user_graph_vertices(self,identity,graph_id,vertices):
        return self.db.db_update_user_graph_vertices(identity,graph_id,vertices)  
        
    def delete_user_graph_vertex(self,identity,graph_id,vertex_id): # delete edges of node
        return self.db.db_delete_user_graph_vertex(identity,graph_id,vertex_id)  
    
    def delete_user_graph_vertices(self,identity,graph_id,vertices_ids):# delete edges of node
        return self.db.db_delete_user_graph_vertices(identity,graph_id,vertices_ids)     
      
      
      


    # GRAPH EDGE CRUD  
        

    def create_user_graph_edge(self,identity,graph_id , edge):
        return self.db.db_create_user_graph_edge(identity,graph_id,edge)  
    
    def create_user_graph_edges(self,identity,graph_id, edges):
        return self.db.db_create_user_graph_edges(identity,graph_id,edges)  

    def get_user_graph_edge(self,identity,graph_id, edge_id):
        return self.db.db_get_user_graph_edge(identity,graph_id,edge_id)    
    
    def get_user_graph_edges(self,identity,graph_id):
        return self.db.db_get_user_graph_edges(identity,graph_id)  
    
    def update_user_graph_edge(self,identity,graph_id,edge_id,edge):
        return self.db.db_update_user_graph_edge(identity,graph_id,edge_id,edge)  
    
    def update_user_graph_edges(self,identity,graph_id,edges):
        return self.db.db_update_user_graph_edges(identity,graph_id,edges)
        
    def delete_user_graph_edge(self,identity,graph_id,edge_id):
        return self.db.db_delete_user_graph_edge(identity,graph_id,edge_id)  
    
    def delete_user_graph_edges(self,identity,graph_id,edges_ids):
        return self.db.db_delete_user_graph_edges(identity,graph_id,edges_ids)  
        
    def delete_user_graph_node_edges(self,identity,graph_id,node_id):
        return self.db.db_delete_user_node_graph_edges(identity,graph_id,node_id)  
        


    # NOTIFICATION CRUD
    
    def create_user_notification(self,identity , notification):
        return self.db.db_create_user_notification(identity,notification)  
    
    def create_user_notifications(self,identity, notifications):
        return self.db.db_create_user_notifications(identity,notifications)  

    def get_user_notification(self,identity, notification_id):
        return self.db.db_get_user_notification(identity,notification_id)     
    
    def get_user_notifications(self,identity):
        return self.db.db_get_user_notifications(identity)  
    
    def update_user_notification(self,identity,notification_id,notification):
        return self.db.db_update_user_notification(identity,notification_id,notification)  
    
    def update_user_notifications(self,identity,notifications):
        
        return self.db.db_update_user_notifications(identity,notifications)
        
    def delete_user_notification(self,identity,notification_id):
        return self.db.db_delete_user_notification(identity,notification_id)  
    
    def delete_user_notifications(self,identity,notifications_ids):
        return self.db.db_delete_user_notifications(identity,notifications_ids)      
      



    # REMINDER CRUD

    def create_user_reminder(self,identity , reminder):
        return self.db.db_create_user_reminder(identity,reminder)
    
    def create_user_reminders(self,identity, reminders):
        return self.db.db_create_user_reminders(identity,reminders)
    
    def get_user_reminder(self,identity, reminder_id):
        return self.db.db_get_user_reminder(identity,reminder_id)
    
    def get_user_reminders(self,identity):
        return self.db.db_get_user_reminders(identity)
    
    def update_user_reminder(self,identity,reminder_id,reminder):
        return self.db.db_update_user_reminder(identity,reminder_id,reminder)
    
    def update_user_reminders(self,identity,reminders):
        return self.db.db_update_user_reminders(identity,reminders)
        
    def delete_user_reminder(self,identity,reminder_id):
        return self.db.db_delete_user_reminder(identity,reminder_id)
    
    def delete_user_reminders(self,identity,reminders_ids):
        return self.db.db_delete_user_reminders(identity,reminders_ids)   
      
  
     

    # SETTING CRUD 

    def get_user_setting(self,identity, setting_id):
        return self.db.db_get_user_setting(identity,setting_id)     
    
    def get_user_settings(self,identity):
        return self.db.db_get_user_settings(identity)  
    
    def update_user_setting(self,identity,setting_id,setting):
        return self.db.db_update_user_setting(identity,setting_id,setting)  
    
    def update_user_settings(self,identity,setting):
        return self.db.db_update_user_settings(identity,setting)
        
        


    
