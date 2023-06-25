import datetime
from unicodedata import category
from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
# from endpoints.actions import action_model
from exts import db
from endpoints.tags import tag_model
from endpoints.categories import category_model

info_ns =  Namespace('info', description="a namespace for entry")

attribute_model = info_ns.model(
    "attribute",{
        "id": fields.String(required=True,title="name of object",description="name value"),
        "name": fields.String(required=True,title="name of object",description="name value"),
        "description": fields.String(required=True,title="name of object",description="name value"),
        "dataType": fields.String(required=True,title="name of object",description="name value"),
        "measureUnits": fields.String(required=True,title="name of object",description="name value"),
        "ValidationRules": fields.List(fields.String()),
        

    }
)
property_model = info_ns.model(
    "property",{
        "id": fields.String(required=True,title="name of object",description="name value"),
        "name": fields.String(required=True,title="name of object",description="name value"),
        "attribute": fields.Nested(attribute_model),
        "value": fields.Raw(required=True,title="description of entry",description="description"),
        
        
    }
)
feature_model = info_ns.model(
    "feature",{
        "id": fields.String(required=True,title="name of object",description="name value"),
        "name": fields.String(required=True,title="name of object",description="name value"),

    }
)

state_model = info_ns.model(
    "feature",{
        "id": fields.String(required=True,title="name of object",description="name value"),
        "name": fields.String(required=True,title="name of object",description="name value"),

    }
)


info_model = info_ns.model(
    "info", {
        "id": fields.String(required=True, title="id", description="object id"),
        "name": fields.String(required=True,title="name of object",description="name value"),
        "description": fields.String(required=True,title="description of entry",description="description"),
        "state": fields.Nested(state_model),
        "properties" : fields.List(fields.Nested(property_model),as_list=True,title="properties",description="custom properties for object"),
        "tags": fields.List(fields.Nested(tag_model),as_list=True,title="tags",description="tags for object"),
        "categories": fields.List(fields.Nested(category_model),as_list=True,title="categories",description="tags for object"),
        "features": fields.List(fields.Nested(feature_model),required=True,as_list=True,title="categories",description="tags for object"),
    }
)

#current_user = get_jwt_identity()
#return {'task': 'Hello world'}, 201, {'Etag': 'some-opaque-string'}

@info_ns.route("/infos")
class InfosResource(Resource):
    
    @info_ns.marshal_list_with(info_model)
    @jwt_required()
    def get(self):
        """Get all the infos from user"""
        user = get_jwt_identity()
        infos = db.get_user_infos(user)
        return infos,200

    @marshal_with(info_model)
    @info_ns.expect(info_model) 
    @jwt_required()
    def post(self):
        """Create a new info"""
        data = request.get_json()
        info = data.get('info')
        user = get_jwt_identity()
        new_info = db.create_user_info(user,info)
        return new_info, 201
    

@info_ns.route("/infos/feature=<string:feature>")
class InfosFeatureResource(Resource):
    
    @info_ns.marshal_list_with(info_model)
    @jwt_required()
    def get(self,feature):
        """Get all the infos from user"""
        user = get_jwt_identity()
        infos = db.get_user_infos_by_feature(user,feature)
        return infos,200




@info_ns.route("/info/<string:id>")
class InfoResource(Resource):

    @marshal_with(info_model)
    @jwt_required()
    def get(self,id):
        """Get a info by name"""       
        user = get_jwt_identity()     
        info = db.get_user_info(user,id)
        return info,200   


    
    @marshal_with(info_model)
    @jwt_required()
    def put(self,id):
        """Update a info by name"""
        data = request.get_json()
        info = data.get('info')
        user = get_jwt_identity()  
        updated_info = db.update_user_info(user,id,info)
        return updated_info,200


    @marshal_with(info_model)
    @jwt_required()
    def delete(self,id):
        """Delete a info by name """
        user = get_jwt_identity()
        deleted_info = db.delete_user_info(user,id)  
        return deleted_info , 200

    