from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db


group_ns =  Namespace('group', description="a namespace for group")

group_model = group_ns.model(
    "group", {
        "id": fields.String(required=True, title="id", description="group id"),
        "name": fields.String(required=True, title="name", description="group name"),        
    }
)


@group_ns.route("/groups")
class GroupsResource(Resource):
    
    @group_ns.marshal_list_with(group_model)
    @jwt_required()
    def get(self):
        """Get all the categories of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_groups(user),200
    
    
    @marshal_with(group_model)
    @jwt_required()
    def post(self):
        """create category"""
        data = request.get_json()
        group = data.get('group')
        user = get_jwt_identity()
        db.create_user_group(user,group)
        
        return group,200



    
@group_ns.route('/group/<string:id>')
class GroupResource(Resource):

    @marshal_with(group_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        db.get_user_group(user,id)
    
    @marshal_with(group_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        group = data.get('group')
        user = get_jwt_identity()
        return db.update_user_group(user,id,group)
    
    @marshal_with(group_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_group(user,id)
        