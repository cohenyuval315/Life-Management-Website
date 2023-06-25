from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

calendar_ns =  Namespace('calendar', description="a namespace for calendar")

calendar_model = calendar_ns.model(
    "calendar", {
        "id": fields.String(required=True, title="event id", description="entry has "),
        "name": fields.String(required=True, title="event id", description="entry has "),
        "color": fields.String(required=True, title="event id", description="entry has "),
        "borderColor": fields.String(required=True, title="event id", description="entry has "),
        "backgroundColor": fields.String(required=True, title="event id", description="entry has "),
        "dragBackgroundColor": fields.String(required=True, title="event id", description="entry has "),
        "isPrivate": fields.Boolean(required=True, title="event id", description="entry has "),
        "password": fields.String(required=True, title="event id", description="entry has "),
    }
)



@calendar_ns.route("/calendars")
class CalendarsResource(Resource):
    
    @calendar_ns.marshal_list_with(calendar_model)
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
        
    
@calendar_ns.route('/calendar/<string:id>')
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
        