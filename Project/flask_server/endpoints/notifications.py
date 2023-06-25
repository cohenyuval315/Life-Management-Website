from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

notification_ns =  Namespace('notification', description="a namespace for category")

notification_model = notification_ns.model(
    "notification", {
        "id": fields.String(required=True, title="id", description="category id"),
        "title": fields.String(title="path", description="category path"), 
        "feature": fields.String(title="path", description="category path"), 
        "description": fields.String(title="path", description="category path"), 
        "datetime": fields.String(required=True,title="path", description="category path"), 
        "isSeen": fields.Boolean(required=False,title="id", description="category id",nullable=True),
    }
)


@notification_ns.route("/notifications")
class NotificationsResource(Resource):
    
    @notification_ns.marshal_list_with(notification_model)
    @jwt_required()
    def get(self):
        """Get all the categories of entry in the database"""
        user = get_jwt_identity()
        notifications = db.get_user_notifications(user)
        return notifications,200
    
    
    @marshal_with(notification_model)
    @jwt_required()
    def post(self):# create categories as well needed
        """create category"""
        data = request.get_json()
        notification = data.get('notification')
        user = get_jwt_identity()
        created_notification = db.create_user_notification(user,notification)
        
        return created_notification,200

    
@notification_ns.route('/notification/<int:id>')
class NotificationResource(Resource):

    @marshal_with(notification_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        notification = db.get_user_notification(user,id)
        return notification,200
    
    @marshal_with(notification_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        notification = data.get('notification')
        user = get_jwt_identity()
        return db.update_user_notification(user,id,notification)
    
    @marshal_with(notification_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_notification(user,id)
        