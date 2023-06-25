from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

event_item_ns =  Namespace('eventItem', description="a namespace for event")

# config_model = event_ns.model(
#     "config",{
#         "start": fields.String(title="entry id", description="entry has"),
#         "end": fields.String(title="category tree", description="index of parent"),
#         "bgColor": fields.String(title="path", description=" path"),
#         "showPopover": fields.Boolean(title="path", description=" path"),
#         "resizable": fields.Boolean(rtitle="path", description="category path"),
#         "startResizable": fields.Boolean(title="path", description="category path"),
#         "endResizable": fields.Boolean(title="path", description="category path"),
#         "movable": fields.Boolean(title="path", description="category path"),
#         "rrule": fields.String(title="path", description="category path"),
#         "isCompleted" : fields.Boolean(default=False),
#         "isScheduled": fields.Boolean(),
        
#     }
    
# )



# because of toast ui , so i can use custom fields
raw_model = event_item_ns.model( 
    "raw",{ 
        "later": fields.String(required=True, title="event id", description="entry has "),
    }
)

# MODAL FOR EVNET CLICK ONE OF THE PINNGED TASK SO ITS CAN ADDED TO THE CALENDAR CLICK TIMEBLOCK
event_model = event_item_ns.model(
    "event", {
        "_id": fields.String(required=True, title="event id", description="entry has "),
        "user_id": fields.String(required=True, title="event id", description="entry has "),
        "calendar_id": fields.String(required=True, title="event id", description="entry has "),
        "title": fields.String(required=True,title="path", description=" path"),
        "note": fields.String(required=True, title="event id", description="entry has "),        
        "is_all_day": fields.Boolean(required=True,title="path", description="category path"),
        "start": fields.String(title="path", description=" path"),
        "end": fields.String(title="event id", description="entry has "),
        "category": fields.String(default=None,required=True, title="event id", description="entry has "),
        "due_date": fields.String(required=True, title="event id", description="entry has "),
        "location": fields.String(required=True, title="event id", description="entry has "),
        "state": fields.String(required=True, title="event id", description="entry has "),
        "is_private": fields.Boolean(required=True, title="event id", description="entry has "),
        "body": fields.String(required=True, title="event id", description="entry has "),
        "going_duration": fields.Integer(required=True, title="event id", description="entry has "),
        "coming_duration": fields.Integer(required=True, title="event id", description="entry has "),
        "recurrence_rule": fields.String(required=True, title="event id", description="entry has "),
        "is_read_only": fields.Boolean(required=True, title="event id", description="entry has "),
        "color": fields.String(required=True, title="event id", description="entry has "),
        "attendees": fields.List(fields.String(required=True, title="event id", description="entry has ")),
        "background_color": fields.String(required=True, title="event id", description="entry has "),
        "drag_background_color": fields.String(required=True, title="event id", description="entry has "),
        "border_color": fields.String(required=True, title="event id", description="entry has "),
        "custom_style": fields.String(required=True, title="event id", description="entry has "),
        "raw": fields.Nested(raw_model),
        "type": fields.String(required=True, title="event id", description="entry has"),
        "serial_id": fields.String(default=None,required=True, title="event id", description="entry has "),
        "is_completed": fields.Boolean(required=True, title="event id", description="entry has "),
        "is_pinned":fields.String(),
    }
)

events_model = event_item_ns.model(
    "events",{        
        "events": fields.List(fields.Nested(event_model),required=True, title="event id", description="entry has categories"),     
    }
)

calendar_model = event_item_ns.model(
    "calendar", {
        "_id": fields.String(required=True, title="event id", description="entry has "),
        "user_id": fields.String(required=True, title="event id", description="entry has "),        
        "title": fields.String(required=True, title="event id", description="entry has "),
        "note": fields.String(required=True, title="event id", description="entry has "),
        "color": fields.String(required=True, title="event id", description="entry has "),
        "border_color": fields.String(required=True, title="event id", description="entry has "),
        "background_color": fields.String(required=True, title="event id", description="entry has "),
        "drag_background_color": fields.String(required=True, title="event id", description="entry has "),
        "is_private": fields.Boolean(required=True, title="event id", description="entry has "),
        "password": fields.String(required=True, title="event id", description="entry has "),
    }
)

calendars_model = event_item_ns.model(
    "calendars",{        
        "events": fields.List(fields.Nested(calendar_model),required=True, title="event id", description="entry has categories"),     
    }
)

timeblock_model = event_item_ns.model(
    "timeblock", {
        "_id": fields.String(required=True, title="event id", description="entry has "),
        "user_id": fields.String(required=True, title="event id", description="entry has "),        
        "title": fields.String(required=True, title="event id", description="entry has "),
        "note": fields.String(required=True, title="event id", description="entry has "),        
        "color": fields.String(required=True, title="event id", description="entry has "),
        "border_color": fields.String(required=True, title="event id", description="entry has "),
        "background_color": fields.String(required=True, title="event id", description="entry has "),
        "drag_background_color": fields.String(required=True, title="event id", description="entry has "),
        "is_private": fields.Boolean(required=True, title="event id", description="entry has "),
        "password": fields.String(required=True, title="event id", description="entry has "),
        "recurrance_rule": fields.String(required=True, title="event id", description="entry has "),
        "date": fields.String(required=True, title="event id", description="entry has "),
        "time": fields.String(required=True, title="event id", description="entry has "),
        "duration": fields.String(required=True, title="event id", description="entry has "),
        "exceptions": fields.String(required=True, title="event id", description="entry has "),
        "is_section": fields.String(required=True, title="event id", description="entry has "),
        "cancel_dates": fields.String(),
        "calendar_id": fields.String(),
    }
)

timeblocks_model = event_item_ns.model(
    "timeblocks",{        
        "timeblock": fields.List(fields.Nested(timeblock_model),required=True, title="event id", description="entry has categories"),     
    }
)

event_items_model = event_item_ns.model(
    "event_items",{
        "timeblocks":fields.Nested(timeblocks_model),
        "events":fields.Nested(events_model),
        "calendars":fields.Nested(calendars_model),
    }
)


@event_item_ns.route("/events")
class EventsResource(Resource):
    
    @event_item_ns.marshal_list_with(event_model)
    @jwt_required()
    def get(self):
        """Get all the categories of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_events(user)
    
    @marshal_with(event_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        event = data.get('event')
        user = get_jwt_identity()
        return db.create_user_event(user,event)
            
@event_item_ns.route('/event/<string:id>')
class EventResource(Resource):

    @marshal_with(event_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        db.get_user_event(user,id)
    
    @marshal_with(event_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        event = data.get('event')
        user = get_jwt_identity()
        db.update_user_event(user,id,event)
    
    @marshal_with(event_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        result = db.delete_user_event(user,id)
        return result,200



@event_item_ns.route("/calendars")
class CalendarsResource(Resource):
    
    @event_item_ns.marshal_list_with(calendar_model)
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        return db.get_user_calendars(user)
    
    @marshal_with(calendar_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        calendar = data.get('calendar')
        user = get_jwt_identity()
        db.create_user_calendar(user,calendar)
         
@event_item_ns.route('/calendar/<string:id>')
class CalendarResource(Resource):

    @marshal_with(calendar_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        db.get_user_calendar(user,id)
    
    @marshal_with(calendar_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        calendar = data.get('calendar')
        user = get_jwt_identity()
        db.update_user_calendar(user,id,calendar)
    
    @marshal_with(calendar_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        result = db.delete_user_calendar(user,id)
        
        return result,200
    
    
    
@event_item_ns.route("/eventItems")
class EventItemsResource(Resource):
    
    @marshal_with(event_items_model)
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        return db.get_user_calendars(user)
    
