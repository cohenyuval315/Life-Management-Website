from flask_restx import Resource,Namespace,fields,marshal_with
from flask import jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

tag_ns =  Namespace('tag', description="a namespace for tag")

view_model = tag_ns.model(
    "view",{
        "icon": fields.String(required=True, title="id", description="tag id"),
        "color": fields.String(required=True, title="id", description="tag id"),        
        "background_color": fields.String(required=True, title="id", description="tag id"),                
        "border_color": fields.String(required=True, title="id", description="tag id"),                        
        "is_action": fields.String(required=True, title="id", description="tag id"),
        "is_hidden": fields.String(required=True, title="name", description="tag name"),        
    }
)

tag_model = tag_ns.model(
    "tag", {
        "_id": fields.String(required=True, title="id", description="tag id"),
        "user_id": fields.String(required=True, title="id", description="tag id"),
        "title": fields.String(required=True, title="name", description="tag name"),
        "group_id": fields.String(required=True, title="name", description="tag name"),
        "created_at": fields.String(required=True, title="name", description="tag name"),
        "group": fields.String(required=True, title="name", description="tag name"),
        "group": fields.String(required=True, title="name", description="tag name"),
        "view": fields.Nested(view_model),
    }
)


tags_group_model = tag_ns.model(
    "tags_group", {
        "_id": fields.String(required=True, title="id", description="tag id"),
        "user_id": fields.String(required=True, title="id", description="tag id"),
        "title": fields.String(required=True, title="name", description="tag name"),
        "group": fields.String(required=True, title="name", description="tag name"),
        "created_at": fields.String(required=True, title="name", description="tag name"),
        "rank": fields.String(required=True, title="name", description="tag name"),
        "is_exclusive": fields.String(required=True, title="name", description="tag name"),
        "view": fields.Nested(view_model),
    }
)


tags_model = tag_ns.model(
    "tags", {
        "tags": fields.List(fields.Nested(tag_model)),
        "tags_groups": fields.List(fields.Nested(tags_group_model)),
    }
)



@tag_ns.route("/tags") # get all , post 1 , 
class TagsResource(Resource):
    
    @tag_ns.marshal_list_with(tag_model)
    @jwt_required()
    def get(self):
        """Get all the tags of entry in the database"""
        user = get_jwt_identity()
        tags = db.get_user_tags(user)
        return tags,200
    
    @marshal_with(tag_model)
    @jwt_required()
    def post(self):
        """create tag"""
        data = request.get_json()
        tag = data.get('tag')
        user = get_jwt_identity()
        created_tag = db.create_user_tag(user,tag)
        
        return created_tag,200


@tag_ns.route('/tag/<string:id>')
class TagResource(Resource):

    @marshal_with(tag_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        tag = db.get_user_tag(user,id)
        return tag,200
        
    
    @marshal_with(tag_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        tag = data.get('tag')
        user = get_jwt_identity()
        return db.update_user_tag(user,id,tag)
    
    @marshal_with(tag_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_tag(user,id)
        