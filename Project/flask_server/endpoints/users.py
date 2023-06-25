from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import jwt_required,get_jwt_identity
from email.utils import parsedate_to_datetime
from exts import db
from endpoints.categories import category_model
from endpoints.objects import object_model
from endpoints.tags import tag_model
from endpoints.events import event_model
from endpoints.routines import routine_model
from endpoints.settings import setting_model
from endpoints.graphs import graph_model
from endpoints.reminders import reminder_model
from endpoints.notifications import notification_model

from endpoints.stats import stats_model    
user_ns =  Namespace('user', description="a namespace for user")

user_model = user_ns.model(
    "user", {
        "username": fields.String(required=True,title="username",description="identifier for user"),
        "password": fields.String(required=True,title="password",description="identifier for user"),
        "firstname": fields.String(required=True,title="first name",description="first name of user"),
        "lastname": fields.String(required=True,title="last name",description="last name of user"),
        "date_of_birth": fields.DateTime(required=True,title="birth date",description="birth date of user"),
        "email": fields.String(required=True,title="email",description="email of user"),
        "objects" : fields.List(fields.Nested(object_model),as_list=True,title="",description="custom  for "),
        "tags" : fields.List(fields.Nested(tag_model),as_list=True,title="",description="custom  for "),
        "categories" : fields.List(fields.Nested(category_model),as_list=True,title="",description="custom  for "),
        "graphs" : fields.List(fields.Nested(graph_model),as_list=True,title="properties",description="custom properties for object"),
        "events" : fields.List(fields.Nested(event_model),as_list=True,title="properties",description="custom properties for object"),
        "settings" : fields.List(fields.Nested(setting_model),as_list=True,title="properties",description="custom properties for object"),
        "routines" : fields.List(fields.Nested(routine_model),as_list=True,title="properties",description="custom properties for object"),
        "reminders" : fields.List(fields.Nested(reminder_model),as_list=True,title="properties",description="custom properties for object"),
        "notifications" : fields.List(fields.Nested(notification_model),as_list=True,title="properties",description="custom properties for object"),
        "stats" : fields.List(fields.Nested(stats_model),as_list=True,title="properties",description="custom properties for object"),        
    }
)



@user_ns.route("/users")
class UsersResource(Resource):
    #@admin_required()

    @user_ns.marshal_with(user_model)
    @jwt_required()
    def get(self):
        """Get all the users in the database"""
        user = get_jwt_identity()
        user_data = db.get_user_data(user)
        return user_data,200


    # @user_ns.marshal_with(user_model)
    # @user_ns.expect(user_model)
    # def post(self):
    #     """Create a new user"""
    #     data = request.get_json()
        
    #     new_user = User(
    #         username=data.get('username'),
    #         password=data.get('password'),
    #         firstname=data.get('firstname'),
    #         lastname=data.get('lastname'),
    #         date_of_birth=parsedate_to_datetime(data.get('date_of_birth')),
    #         email=data.get('email'),
    #     )
    #     new_user.save()
    #     return new_user, 201


# @user_ns.route("/user/<int:id>")
# class UserResource(Resource):

    # @marshal_with(user_model)
    # def get(self, id):
    #     """Get a users by id"""
    #     user = User.query.get_or_404(id)
    #     return user

    
    # @marshal_with(user_model)
    # @jwt_required()
    # def put(self, id):
    #     """Update a user"""
    #     user_to_update = User.query.get_or_404(id)
    #     data = request.get_json()

    #     user_to_update.update(
    #         data.get('username'),
    #         data.get('password'),
    #         data.get('firstname'),
    #         data.get('lastname'),
    #         parsedate_to_datetime(data.get('date_of_birth')),
    #         data.get('email'),
            
    #     )
    #     return user_to_update

    # @marshal_with(user_model)
    # @jwt_required()
    # def delete(self, id):
    #     """Delete a user by id"""
    #     user_to_delete = User.query.get_or_404(id)
    #     user_to_delete.delete()
    #     return user_to_delete