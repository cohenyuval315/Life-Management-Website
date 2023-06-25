from typing import Union,Optional
from datetime import datetime


class BaseDB:
    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    # users
    
    def get_all_users(self)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_by_username(self,username:str)->Optional[object]:
        raise NotImplementedError
    
    def get_user_by_email(self,email:str)->Optional[object]:
        raise NotImplementedError
    
    def get_user_by_id(self,user_id:str)->Optional[object]:
        raise NotImplementedError
    
    def create_user(self,username:str,password:str,firstname:str,lastname:str,date_of_birth:datetime,email:str,bio:str='',avatar_url:str='')-> Optional[object]:
        raise NotImplementedError

    def delete_user_by_id(self,user_id:str)-> Optional[int]:
        raise NotImplementedError

    def update_user_by_id(self,identity:str,password:Optional[str],firstname=Optional[str],lastname=Optional[str],date_of_birth=Optional[datetime],email=Optional[str],bio=Optional[str],avatar_url=Optional[str])-> Optional[object]:
        raise NotImplementedError

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    # info snippets

    def get_user_info_snippets(self,
                               identity:str
                               ) -> Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_info_snippet_by_id(self,
                                    identity:str,
                                    info_id:str
                                    ) -> Optional[object]:
        raise NotImplementedError

    def get_user_info_snippets_by(self,
                                  identity:str,
                                  name:Optional[str]=None,
                                  state:Optional[str]=None,
                                  group:Optional[str]=None,
                                  categories:Union[list[object],object,None]=None,
                                  tags:Union[list[object],object,None]=None,
                                  properties:Union[list[object],object,None]=None
                                  ) -> Union[list[object],object,None]:
        raise NotImplementedError
    
    def create_user_info_snippet(self,identity:str,info_name:str,group:Optional[str]='',description:str='',state:Optional['str']=None ,tags:Union[list[object],object,None] = None  ,categories:Union[list[object],object,None] = None ,properties:Union[list[object],object,None] = None )->Optional[object]:
        raise NotImplementedError

    def update_user_info_snippet_by_id(self,identity:str,info_id:str,info_name:Optional['str']=None,group:Optional['str']=None,description:Optional['str']=None,state:Optional['str']=None,tags:Union[list[object],object,None] = None ,categories:Union[list[object],object,None] = None,properties:Union[list[object],object,None] = None )->Optional[object]:
        raise NotImplementedError
    
    def delete_user_info_snippet_by_id(self,identity:str,info_id:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_info_snippet_by_name(self,identity:str,info_name:str)->Optional[int]:
        raise NotImplementedError

    def create_user_info_snippet_property(self,identity:str,info_id:str,key:str,value:any)->Optional[object]:
        raise NotImplementedError
    
    def get_user_info_snippets_property_by_key(self,identity:str,info_id:str,property_key:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_info_snippets_property_by_id(self,identity:str,info_id:str,property_id:str)->Union[list[object],object,None]:
        raise NotImplementedError
     
    def delete_user_info_snippet_property_by_key(self,identity:str,info_id:str,property_key:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_info_snippet_propertyby__id(self,identity:str,info_id:str,property_id:str)->Optional[int]:
        raise NotImplementedError
    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    # categories
    
    def get_user_category_by_id(self,identity:str,category_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_category_by_name(self,identity:str,category_name:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_categories(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_categories_by(self,identity:str,category_name:Optional[str]=None,feature:Optional[str]=None,group:Optional[str]=None)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def create_user_category(self,identity:str,category_name:str,parent_id:str,feature:str,group:Optional[str]='') -> Optional[object]:
        raise NotImplementedError
    
    def update_user_category_by_id(self,identity:str,category_id:str,parent_id:Optional[str],feature:Optional[str],group:Optional[str])->Optional[object]:
        raise NotImplementedError
        
    def delete_user_category_by_id(self,identity:str,category_id:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_category_by_name(self,identity:str,catgegory_name:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_category_update_parents(self,identity:str,category_id:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_category_delete_children(self,identity:str,category_id:str)->Optional[int]:
        raise NotImplementedError
    
    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    # tag 
    
    def get_user_tag_by_id(self,identity:str,tag_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_tag_by_name(self,identity:str,tag_name:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_tags(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_tags_by(self,identity:str,tag_name:Optional[str]=None,group:Optional[str]=None)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def create_user_tag(self,identity:str,name:str,group:Optional[str] = '')-> Optional[object]:
        raise NotImplementedError
    
    def update_user_tag_by_id(self,identity:str,tag_id:str,name:Optional[str]=None,group:Optional[str]=None)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_tag_by_id(self,identity:str,tag_id:str)->Optional[int]:
        raise NotImplementedError
     
    def delete_user_tag_by_name(self,identity:str,tag_name:str)->Optional[int]:
        raise NotImplementedError
    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    # calendar 
    
    def get_user_calendar_by_id(self,identity:str,calendar_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_calendar_by_name(self,identity:str,calendar_name:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_calendars(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def create_user_calendar(self,identity:str,calendar_name:str,description:Optional[str]='',private:Optional[bool]=False,password:Optional[str]=None,color:Optional[str]='',background_color:Optional[str]='' ,drag_background_color:Optional[str]='',border_color:Optional[str]='')-> Optional[object]:
        raise NotImplementedError
    
    def update_user_calendar_by_id(self,identity:str,calendar_id:str,calendar_name:Optional[str]=None,description:Optional[str]=None,private:Optional[str]=None,password:Optional[str]=None,color:Optional[str]=None,background_color:Optional[str]=None,drag_background_color:Optional[str]=None,border_color:Optional[str]=None)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_calendar_by_id(self,identity:str,calendar_id:str)->Optional[int]:
        raise NotImplementedError
     
    def delete_user_calendar_by_name(self,identity:str,calendar_name:str)->Optional[int]:
        raise NotImplementedError
    
    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    # event
    
    def get_user_event_by_id(self,identity:str,event_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_events(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
       
    def get_user_events_by(self,identity:str,title:Optional[str]=None,type:Optional[str]=None,calendar_name:Optional[str]=None,start_date:Optional[datetime]=None,end_date:Optional[datetime]=None)->Union[list[object],object,None]:
        raise NotImplementedError
     
    def create_user_event(self,identity:str,title:str,calendar_id:Optional[str]=None,info_snippet_id:Optional[str]=None,type:Optional[str]='event',body:Optional[str]='',due_date_class:Optional[str]='',category:Optional[str]='time',start:Optional[datetime]=None,end:Optional[datetime]=None,all_day:Optional[bool]=False,private:Optional[bool]=False,visible:Optional[bool]=True,read_only:Optional[bool]=False,pending:Optional[bool]=False,focused:Optional[bool]=False,location:Optional[str]='',state:Optional[str]='',going_duration:Optional[int]=0,coming_duration:Optional[int]=0,recurrence_rule:Optional[str]='',custom_style:Optional[str]='',raw:Optional[str]='',recurrence_id:Optional[int]=None,attendees:Union[list[str],str,None]=None,color:Optional[str]='',background_color:Optional[str]='',drag_background_color:Optional[str]='',border_color:Optional[str]='')-> Optional[object]:
        raise NotImplementedError
    
    def update_user_event_by_id(self,identity:str,event_id:str,calendar_id:Optional[str]=None,title:Optional[str]=None,info_snippet_id:Optional[str]=None,type:Optional[str]=None,body:Optional[str]=None,due_date_class:Optional[str]=None,category:Optional[str]=None,start:Optional[datetime]=None,end:Optional[datetime]=None,all_day:Optional[bool]=None,private:Optional[bool]=None,visible:Optional[bool]=None,read_only:Optional[bool]=None,pending:Optional[bool]=None,focused:Optional[bool]=None,location:Optional[str]=None,state:Optional[str]=None,going_duration:Optional[int]=None,coming_duration:Optional[int]=None,recurrence_rule:Optional[str]=None,custom_style:Optional[str]=None,raw:Optional[str]=None,recurrence_id:Optional[int]=None,attendees:Union[list[str],str,None]=None,color:Optional[str]=None,background_color:Optional[str]=None,drag_background_color:Optional[str]=None,border_color:Optional[str]=None)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_event_by_id(self,identity:str,event_id:str)->Optional[int]:
        raise NotImplementedError
     
    def create_user_event_reccurence(self,identity:str,event_id:str,reccurence_rule:str)-> Union[list[object],object]:
        raise NotImplementedError
    
    def delete_user_event_reccurences(self,identity:str,event_id:str,start_date:Optional[datetime]=None,end_date:Optional[datetime]=None)->Optional[int]:
        raise NotImplementedError
    
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    # routine
    
    def get_user_routines(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_routine_by_id(self,identity:str,routine_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_routine_by_name(self,identity:str,routine_name:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_routines_by(self,identity:str,categories:Union[list[object],object,None]=None,tags:Union[list[object],object,None]=None,properties:Union[list[object],object,None]=None)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def create_user_routine(self,identity:str,routine_name:str,description:Optional[str]='',tags:Union[list[object],object,None]=None,categories:Union[list[object],object,None]=None,properties:Union[list[object],object,None]=None)-> Optional[object]:
        raise NotImplementedError
    
    def update_user_routine_by_id_update_or_delete_actions(self,identity:str,routine_id:str,routine_name:Optional[str]=None,description:Optional[str]=None,tags:Union[list[object],object,None]=None,categories:Union[list[object],object,None]=None,properties:Union[list[object],object,None]=None)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_routine_by_id_delete_actions(self,identity:str,routine_id:str)->Optional[int]:
        raise NotImplementedError
    
    def create_user_routine_property_create_action_property(self,identity:str,routine_id:str,routine_property_key:str,action_prop_default_value:any)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_routines_property_by_key(self,identity:str,routine_id:str,property_key:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_routines_property_by_id(self,identity:str,routine_id:str,property_id:str)->Union[list[object],object,None]:
        raise NotImplementedError
     
    def delete_user_routine_property_by_key_delete_actions_property(self,identity:str,routine_id:str,property_key:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_routine_property_by_id_delete_actions_property(self,identity:str,routine_id:str,property_id:str)->Optional[int]:
        raise NotImplementedError
    
    def get_user_routine_actions_topological_sort(self,identity:str,routine_id:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_routine_actions(self,identity:str,routine_id:str)->Union[list[object],object,None]:
        raise NotImplementedError
      
    def get_user_routine_action_by_id(self,identity:str,routine_id:str,action_id:str)-> Optional[object]:
        raise NotImplementedError
      
    def create_user_routine_action(self,identity:str,routine_id:str,action_name:str,duration:int,info_id:Optional[str]=None,description:Optional[str]='',parents:Union[list[object],object,None]=None)->Optional[object]:
        raise NotImplementedError
    
    def update_user_routine_action_property_value(self,identity:str,routine_id:str,action_id:str,property_key:str,new_value:any)-> Optional[object]: 
        raise NotImplementedError
    
    def update_user_routine_action_by_id(self,identity:str,routine_id:str,action_id:str,action_name:Optional[str]=None,info_id:Optional[str]=None,description:Optional[str]=None,duration:Optional[int]=None,parents:Union[list[object],object,None]=None)-> Optional[object]: # props stay same
        raise NotImplementedError
    
    def delete_user_routine_action_by_id(self,identity:str,routine_id:str,action_id:str)->Optional[int]:
        raise NotImplementedError

    def delete_user_routine_action_update_parents(self,identity:str,routine_id:str,action_id:str)->Optional[int]:
        raise NotImplementedError

    def delete_user_routine_action_update_children(self,identity:str,routine_id:str,action_id:str)->Optional[int]:
        raise NotImplementedError

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    # graph 
      
    def create_user_graph(self,identity:str,directed:bool,acyclic:bool,name:str,description:Optional[str]='',group:Optional[str]='',color:Optional[str]='',background_color:Optional[str]='',drag_background_color:Optional[str]='',border_color:Optional[str]='',tags:Union[list[object],object,None]=None,categegories:Union[list[object],object,None]=None,properties:Union[list[object],object,None]=None,num_vertices=0)-> Optional[object]:
        raise NotImplementedError
    
    def update_user_graph_by_id_update_or_delete_vertices_and_edges(self,identity:str ,directed:Optional[bool]=None,acyclic:Optional[bool]=None,name:Optional[str]=None,description:Optional[str]=None,group:Optional[str]=None,color:Optional[str]=None,background_color:Optional[str]=None,drag_background_color:Optional[str]=None,border_color:Optional[str]=None,tags:Union[list[object],object,None]=None,categories:Union[list[object],object,None]=None,properties:Union[list[object],object,None]=None,num_vertices:Optional[int]=None)-> Optional[object]:
        raise NotImplementedError
    
    def create_user_graph_vertex(self,identity:str, graph_id:str,name:str,info_id:Optional[str]=None,vertex_properties:Union[list[object],object,None]=None)-> Optional[object]: # add later some view configuration ,vertex got his own properties , !==  graph properties
        raise NotImplementedError
    
    def update_user_graph_vertex(self,identity:str, graph_id:str,name:str,info_id:Optional[str]=None,vertex_properties:Union[list[object],object,None]=None)-> Optional[object]: 
        raise NotImplementedError
    
    def create_user_graph_vertex_property(self,identity:str, graph_id:str,vertex_id:str,property_key:str,value:any)-> Optional[object]: 
        raise NotImplementedError
    
    def update_user_graph_vertex_property_by_key(self,identity:str, graph_id:str,vertex_id:str,property_key:str,new_value:any)-> Optional[object]: 
        raise NotImplementedError
    
    def delete_user_graph_vertex_property_by_key(self,identity:str, graph_id:str,vertex_id:str,property_key:str)->Optional[int]: 
        raise NotImplementedError
    
    def update_user_graph_vertex_property_by_id(self,identity:str, graph_id:str,vertex_id:str,property_id:str,new_value:any)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_graph_vertex_property_by_id(self,identity:str, graph_id:str,vertex_id:str,property_id:str)->Optional[int]: 
        raise NotImplementedError
    
    def create_user_graph_edge(self,identity:str,graph_id:str,lower_id:str,higher_id:str)-> Optional[object]: # edge properties (weights) == graph properties
        raise NotImplementedError

    def create_user_graph_property_create_edge_property(self,identity:str,graph_id:str,graph_property_key:str,edge_prop_default_value:str)-> Optional[object]:
        raise NotImplementedError
     
    def delete_user_graph_property_by_key_delete_edges_property(self,identity:str,graph_id:str,property_key:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_graph_property_by_id_delete_edges_property(self,identity:str,graph_id:str,property_id:str)->Optional[int]:
        raise NotImplementedError
    
    def get_user_graphs(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_graph_by_id(self,identity:str,graph_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_graph_by_name(self,identity:str,graph_name:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_graphs_by(self,identity:str,categories: Union[list[object],object,None]=None,tags: Union[list[object],object,None]=None,properties: Union[list[object],object,None]=None,directed:Optional[bool]=None,acylic:Optional[bool]=None,num_vertices:Optional[int]=None,group:Optional[str]=None)->Union[list[object],object,None]:
        raise NotImplementedError

    def delete_user_graph_by_id_delete_edges_vertices(self,identity:str,graph_id:str)->Optional[int]:
        raise NotImplementedError
    
    def get_user_graphs_property_by_key(self,identity:str,graph_id:str,property_key:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_graphs_property_by_id(self,identity:str,graph_id:str,property_id:str)->Union[list[object],object,None]:
        raise NotImplementedError

    def get_user_graph_sorted_by(self,identity:str,graph_id:str,sort:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_graph_vertices(self,identity:str,graph_id:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_user_graph_edges(self,identity:str,graph_id:str)->Union[list[object],object,None]:
        raise NotImplementedError
      
    def get_user_graph_edge_by_id(self,identity:str,graph_id:str,edge_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_graph_vertex_by_id(self,identity:str,graph_id:str,vertex_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_graph_vertex_by_id(self,identity:str,graph_id:str,vertex_id:str)-> Optional[object]:
        raise NotImplementedError
      
    def update_user_graph_edge_property_value(self,identity:str,graph_id:str,edge_id:str,property_key:str,new_value:str)-> Optional[object]: 
        raise NotImplementedError

    def update_user_graph_edge_by_id(self,identity:str,graph_id:str,lower_id:str,higher_id:str)-> Optional[object]: 
        raise NotImplementedError
    
    def delete_user_graph_edge_by_id(self,identity:str,graph_id:str,edge_id:str)->Optional[int]:
        raise NotImplementedError
    
    def delete_user_graph_vertex_update_edges(self,identity:str,graph_id:str,vertex_id:str)->Optional[int]:
        raise NotImplementedError

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    # notification

    def get_user_notification_by_id(self,identity:str,notification_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def create_user_notification(self,identity:str,notification_name:str,event_id:Optional[str]=None,start_date: Optional[datetime]=None,seen:bool=False,description:Optional[str]='')-> Optional[object]:
        raise NotImplementedError
    
    def get_user_notifications(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
       
    def get_user_notifications_by(self,identity:str,notification_name:Optional[str]=None,start_date:Optional[datetime]=None,end_date:Optional[datetime]=None,seen:Optional[bool]=None,event_id:Optional[str]=None)->Union[list[object],object,None]:
        raise NotImplementedError
     
    def update_user_notification_by_id(self,identity:str,notification_id:str,notification_name:str,event_id:Optional[str]=None,start_date: Optional[datetime]=None,seen:bool=False,description:Optional[str]=None)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_notification_by_id(self,identity:str,notification_id:str)->Optional[int]:
        raise NotImplementedError
       
# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
    # reminder
    
    def get_user_reminder_by_id(self,identity:str,reminder_id:str)-> Optional[object]:
        raise NotImplementedError
    
    def create_user_reminder(self,identity:str,reminder_name:str,event_id:Optional[str]=None,start_date:Optional[datetime]=None,favorite:Optional[bool]=False,on:Optional[bool]=False,description:Optional[str]='',rest_between:Optional[int]=None,max_snooze_count:Optional[int]=None,alarm_time_length:Optional[int]=None,seen:Optional[bool]=None)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_reminders(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
       
    def get_user_reminders_by(self,identity:str,reminder_name:Optional[str]=None,start_date:Optional[datetime]=None,end_date:Optional[datetime]=None,favorite:Optional[bool]=None,on:Optional[bool]=None,event_id:Optional[str]=None)->Union[list[object],object,None]:
        raise NotImplementedError
     
    def update_user_reminder_by_id(self,identity:str,reminder_id:str,reminder_name:str,event_id:Optional[str]=None,start_date:Optional[datetime]=None,favorite:Optional[bool]=False,on:Optional[bool]=False,description:Optional[str]=None,rest_between:Optional[int]=None,max_snooze_count:Optional[int]=None,alarm_time_length:Optional[int]=None,seen:Optional[bool]=None)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_reminder_by_id(self,identity:str,reminder_id:str)->Optional[int]:
        raise NotImplementedError


# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    # saves
    
    def get_all_user_data_backups(self,identity:str)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def create_user_data_backup(self,identity:str,user_data:object)-> Optional[object]:
        raise NotImplementedError
    
    def update_current_user_data_and_create_backup(self,identity:str)-> Optional[object]:
        raise NotImplementedError
    
    def get_user_data_backups_by_dates(self,identity:str,start_date:Optional[datetime]=None,end_date:Optional[datetime]=None)->Union[list[object],object,None]:
        raise NotImplementedError
    
    def get_current_user_data(self,identity:str,data:object)-> Optional[object]:
        raise NotImplementedError
    
    def delete_user_data_backup_by_id(self,identity:str,backup_id:str)->Optional[int]:
        raise NotImplementedError
    