from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

event_ns =  Namespace('event', description="a namespace for event")

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

event_model = event_ns.model(
    "event", {
        "id": fields.String(required=True, title="event id", description="entry has "),
        "calendarId": fields.String(required=True, title="event id", description="entry has "),
        "objectId": fields.String(required=True, title="event id", description="entry has "),
        "title": fields.String(required=True,title="path", description=" path"),
        "isAllday": fields.Boolean(required=True,title="path", description="category path"),
        "start": fields.String(title="path", description=" path"),
        "end": fields.String(title="event id", description="entry has "),
        "category": fields.String(default=None,required=True, title="event id", description="entry has "),
        "dueDateClass": fields.String(required=True, title="event id", description="entry has "),
        "location": fields.String(required=True, title="event id", description="entry has "),
        "state": fields.String(required=True, title="event id", description="entry has "),
        "isPrivate": fields.Boolean(required=True, title="event id", description="entry has "),
        "body": fields.String(required=True, title="event id", description="entry has "),
        "goingDuration": fields.Integer(required=True, title="event id", description="entry has "),
        "comingDuration": fields.Integer(required=True, title="event id", description="entry has "),
        "recurrenceRule": fields.String(required=True, title="event id", description="entry has "),
        "isReadOnly": fields.Boolean(required=True, title="event id", description="entry has "),
        "color": fields.String(required=True, title="event id", description="entry has "),
        "attendees": fields.List(fields.String(required=True, title="event id", description="entry has ")),
        "backgroundColor": fields.String(required=True, title="event id", description="entry has "),
        "dragBackgroundColor": fields.String(required=True, title="event id", description="entry has "),
        "borderColor": fields.String(required=True, title="event id", description="entry has "),
        "customStyle": fields.String(required=True, title="event id", description="entry has "),
        "raw": fields.String(required=True, title="event id", description="entry has "),
        "type": fields.String(required=True, title="event id", description="entry has "),
        "serialId": fields.String(default=None,required=True, title="event id", description="entry has "),
        "isPerm": fields.Boolean(required=True, title="event id", description="entry has "),
        "isCompleted": fields.Boolean(required=True, title="event id", description="entry has "),
    }
)

events_model = event_ns.model(
    "events",{        
        "events": fields.List(fields.Nested(event_model),required=True, title="event id", description="entry has categories"),     
    }
)


@event_ns.route("/events")
class EventsResource(Resource):
    
    @event_ns.marshal_list_with(event_model)
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
        
        
    
@event_ns.route('/event/<string:id>')
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
        