import datetime
from unicodedata import category
from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request,jsonify
from flask_jwt_extended import jwt_required,get_jwt_identity
# from endpoints.actions import action_model
from exts import db
from endpoints.tags import tag_model
from endpoints.categories import category_model


object_ns =  Namespace('object', description="a namespace for entry")

# attribute_model = object_ns.model(
#     "attribute",{
#         "id": fields.String(required=True,title="name of object",description="name value"),
#         "name": fields.String(required=True,title="name of object",description="name value"),
#         "description": fields.String(required=True,title="name of object",description="name value"),
#         "dataType": fields.String(required=True,title="name of object",description="name value"),
#         "measureUnits": fields.String(required=True,title="name of object",description="name value"),
#         "ValidationRules": fields.List(fields.String()),
        

#     }
# )
property_model = object_ns.model(
    "property",{
        "propertyId": fields.String(required=True,title="name of object",description="name value"),
        "value": fields.Raw(required=True,title="description of entry",description="description"),
        
        
    }
)
# feature_model = object_ns.model(
#     "feature",{
#         "id": fields.String(required=True,title="name of object",description="name value"),
#         "name": fields.String(required=True,title="name of object",description="name value"),

#     }
# )

# state_model = object_ns.model(
#     "feature",{
#         "id": fields.String(required=True,title="name of object",description="name value"),
#         "name": fields.String(required=True,title="name of object",description="name value"),

#     }
# )



# property ID and value? instead of prop?

object_model = object_ns.model(
    "object", {
        "id": fields.String(required=True, title="id", description="object id"),
        "name": fields.String(required=True,title="name of object",description="name value"),
        "description": fields.String(required=True,title="description of entry",description="description"),
        "stateId": fields.String(),
        "properties" : fields.List(fields.Nested(property_model),as_list=True,title="properties",description="custom properties for object"),
        "tagsIds": fields.List(fields.String(),as_list=True,title="tags",description="tags for object"),
        "categoriesIds": fields.List(fields.String(),as_list=True,title="categories",description="tags for object"),
        "featuresIds": fields.List(fields.String(),required=True,as_list=True,title="categories",description="tags for object"),
    }
)

#current_user = get_jwt_identity()
#return {'task': 'Hello world'}, 201, {'Etag': 'some-opaque-string'}

@object_ns.route("/objects")
class ObjectsResource(Resource):
    
    @object_ns.marshal_list_with(object_model)
    @jwt_required()
    def get(self):
        """Get all the objects from user"""
        user = get_jwt_identity()
        objects = db.get_user_objects(user)
        return objects,200

    @marshal_with(object_model)
    @object_ns.expect(object_model) 
    @jwt_required()
    def post(self):
        """Create a new object"""
        data = request.get_json()
        object = data.get('object')
        user = get_jwt_identity()
        new_object = db.create_user_object(user,object)
        return new_object, 201
    

@object_ns.route("/objects/feature=<string:feature>")
class ObjectsFeatureResource(Resource):
    
    @object_ns.marshal_list_with(object_model)
    @jwt_required()
    def get(self,feature):
        """Get all the objects from user"""
        user = get_jwt_identity()
        objects = db.get_user_objects_by_feature(user,feature)
        return objects,200




@object_ns.route("/object/<string:id>")
class ObjectResource(Resource):

    @marshal_with(object_model)
    @jwt_required()
    def get(self,id):
        """Get a object by name"""       
        user = get_jwt_identity()     
        obj = db.get_user_object(user,id)
        return obj,200   


    
    @marshal_with(object_model)
    @jwt_required()
    def put(self,id):
        """Update a object by name"""
        data = request.get_json()
        object = data.get('object')
        user = get_jwt_identity()  
        updated_obj = db.update_user_object(user,id,object)
        return updated_obj,200


    @marshal_with(object_model)
    @jwt_required()
    def delete(self,id):
        """Delete a object by name """
        user = get_jwt_identity()
        deleted_obj = db.delete_user_object(user,id)  
        return deleted_obj , 200

    