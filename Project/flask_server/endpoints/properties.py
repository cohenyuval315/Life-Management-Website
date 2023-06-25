from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db
from endpoints.metadata import property_model

property_ns =  Namespace('property', description="a namespace for category")


@property_ns.route("/properties")
class PropertiesResource(Resource):
    
    @property_ns.marshal_list_with(property_model)
    @jwt_required()
    def get(self):
        """Get all the categories of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_properties(user),200
    
    
    @marshal_with(property_model)
    @jwt_required()
    def post(self):# create categories as well needed
        """create property"""
        data = request.get_json()
        property = data.get('property')
        user = get_jwt_identity()
        db.create_user_property(user,property)
        
        return property,200


    
@property_ns.route('/property/<string:id>')
class PropertyResource(Resource):

    @marshal_with(property_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        db.get_user_property(user,id)
    
    @marshal_with(property_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        property = data.get('property')
        user = get_jwt_identity()
        return db.update_user_property(user,id,property)
    
    @marshal_with(property_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_property(user,id)
        