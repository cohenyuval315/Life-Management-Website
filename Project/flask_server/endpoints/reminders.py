from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request,make_response,jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from exts import db

reminder_ns =  Namespace('reminder', description="a namespace for category")

config_model = reminder_ns.model(
    "config",{
        "date": fields.String(required=True,title="path", description="category path"), 
        "isRepeat": fields.String(required=True,title="path", description="category path"),
    }
)

reminder_model = reminder_ns.model(
    "reminder", {
        "id": fields.String(required=True, title="id", description="category id"),
        "title": fields.String(required=True, title="name", description="category name"),
        "eventId": fields.String(title="path", description="category path"), 
        "config":fields.Nested(config_model),

    }
)


@reminder_ns.route("/reminders")
class RemindersResource(Resource):
    
    @reminder_ns.marshal_list_with(reminder_model)
    @jwt_required()
    def get(self):
        """Get all the reminders of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_reminders(user),200
    
    
    @marshal_with(reminder_model)
    @jwt_required()
    def post(self):# create categories as well needed
        """create category"""
        data = request.get_json()
        reminder = data.get('reminder')
        user = get_jwt_identity()
        db.create_user_reminder(user,reminder)
        
        return reminder,200

    
@reminder_ns.route('/reminder/<string:id>')
class ReminderResource(Resource):

    @marshal_with(reminder_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        return db.get_user_reminder(user,id)
    
    @marshal_with(reminder_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        reminder = data.get('reminder')
        user = get_jwt_identity()
        return db.update_user_reminder(user,id,reminder)
    
    @marshal_with(reminder_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_reminder(user,id)
        