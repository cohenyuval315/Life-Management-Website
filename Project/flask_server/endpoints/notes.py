from flask_restx import Resource,Namespace,fields,marshal_with
from flask import jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

note_ns =  Namespace('note', description="a namespace for tag")

note_model = note_ns.model(
    "note", {
        "_id": fields.String(required=True, title="id", description="tag id"),
        "user_id": fields.String(required=True, title="name", description="tag name"),        
        "title": fields.String(required=True, title="name", description="tag name"),
        "note": fields.String(required=True, title="name", description="tag name"),
        "status": fields.String(required=True, title="name", description="tag name"),
        "created_at": fields.String(required=True, title="name", description="tag name"),
        "updated_at": fields.String(required=True, title="name", description="tag name"),
        "history": fields.List(fields.String(required=True, title="name", description="tag name")),
        "tags": fields.List(fields.String(required=True, title="name", description="tag name")),
        "is_local": fields.Boolean(required=True, title="name", description="tag name"),
        "file_path": fields.String(required=True, title="name", description="tag name"),
        "is_pinned": fields.String(required=True, title="name", description="tag name"),
        "is_pinned_view": fields.String(required=True, title="name", description="tag name"),
        "parent_id": fields.String(required=True, title="name", description="tag name"),     
    }
)


@note_ns.route("/notes") # get all , post 1 , 
class NotesResource(Resource):
    
    @note_ns.marshal_list_with(note_model)
    @jwt_required()
    def get(self):
        """Get all the tags of entry in the database"""
        user = get_jwt_identity()
        tags = db.get_user_tags(user)
        return tags,200
    
    @marshal_with(note_model)
    @jwt_required()
    def post(self):
        """create tag"""
        data = request.get_json()
        tag = data.get('tag')
        user = get_jwt_identity()
        created_tag = db.create_user_tag(user,tag)
        
        return created_tag,200


@note_ns.route('/note/<string:id>')
class NoteResource(Resource):

    @marshal_with(note_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        tag = db.get_user_tag(user,id)
        return tag,200
        
    
    @marshal_with(note_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        tag = data.get('tag')
        user = get_jwt_identity()
        return db.update_user_tag(user,id,tag)
    
    @marshal_with(note_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_tag(user,id)
        
        