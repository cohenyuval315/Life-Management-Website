from flask_restx import Resource,Namespace,fields,marshal_with
from flask import jsonify, make_response, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

objective_ns =  Namespace('objective', description="a namespace for tag")

view_model = objective_ns.model(
    "view",{
        "icon": fields.String(required=True, title="id", description="tag id"),
        "color": fields.String(required=True, title="id", description="tag id"),        
        "background_color": fields.String(required=True, title="id", description="tag id"),                
        "border_color": fields.String(required=True, title="id", description="tag id"),                        
        "is_action": fields.String(required=True, title="id", description="tag id"),
        "is_hidden": fields.String(required=True, title="name", description="tag name"),        
    }
)


    
section_model = objective_ns.model(
    "section",{
        "_id": fields.String(required=True, title="id", description="tag id"),
        "title": fields.String(required=True, title="id", description="tag id"),
        "note": fields.String(required=True, title="name", description="tag name"),        
    }
)
  
challenge_model = objective_ns.model(
    "challenge",{
        "_id": fields.String(required=True, title="id", description="tag id"),
        "challenge": fields.String(required=True, title="id", description="tag id"),
        "action": fields.String(required=True, title="name", description="tag name"),        
    }
)
history_item_model = objective_ns.model(
    "history",{
        "_id": fields.String(required=True, title="id", description="tag id"),
        "date": fields.String(required=True, title="id", description="tag id"),
        "time": fields.String(required=True, title="name", description="tag name"),        
        "expected_tasks": fields.String(),
        "expected_duration": fields.String(),
        "expected_routines": fields.String(),   
    }
)
    
objective_model = objective_ns.model(
    "objective", {
        "_id": fields.String(required=True, title="id", description="tag id"),
        "user_id": fields.String(required=True, title="id", description="tag id"),
        "title": fields.String(required=True, title="name", description="tag name"),
        "note": fields.String(required=True, title="name", description="tag name"),
        "is_visible_view": fields.String(required=True, title="name", description="tag name"),
        "is_visible": fields.String(required=True, title="name", description="tag name"),
        "parent_id": fields.String(required=True, title="name", description="tag name"),
        "is_starred": fields.String(required=True, title="name", description="tag name"),
        "priority": fields.String(),
        "mental_difficulty": fields.String(),
        "physical_difficulty": fields.String(),
        "emotional_difficulty": fields.String(),
        "tags_ids": fields.List(fields.String()), 
        "montivations": fields.List(fields.String()), 
        "importance": fields.String(required=True, title="name", description="tag name"),
        "challenges":fields.List(fields.Nested(challenge_model)), 
        "sections":fields.List(fields.Nested(section_model)), 
        "progress": fields.Boolean(),
        "is_commited": fields.Boolean(),
        "due_date": fields.String(),
        "check_in": fields.String(),
        "has_end": fields.String(),
        "status": fields.String(),
        "check_ins": fields.List(fields.String()), 
        "expected_tasks": fields.String(),
        "expected_duration": fields.String(),
        "expected_routines": fields.String(),
        "last_check_in_date": fields.String(),
        "check_in_weeks": fields.String(),
        "check_in_start_date": fields.String(),
        "check_in_questions": fields.List(fields.String()), 
        "group": fields.String(),
        "updated_at": fields.String(required=True, title="name", description="tag name"),
        "history": fields.List(fields.Nested(history_item_model)),
        "created_at": fields.String(required=True, title="name", description="tag name"),
        "view": fields.Nested(view_model),
    }
)


@objective_ns.route("/objectives") # get all , post 1 , 
class ObjectivesResource(Resource):
    
    @objective_ns.marshal_list_with(objective_model)
    @jwt_required()
    def get(self):
        """Get all the tags of entry in the database"""
        user = get_jwt_identity()
        tags = db.get_user_tags(user)
        return tags,200
    
    @marshal_with(objective_model)
    @jwt_required()
    def post(self):
        """create tag"""
        data = request.get_json()
        tag = data.get('tag')
        user = get_jwt_identity()
        created_tag = db.create_user_tag(user,tag)
        
        return created_tag,200


@objective_ns.route('/objective/<string:id>')
class ObjectiveResource(Resource):

    @marshal_with(objective_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        tag = db.get_user_tag(user,id)
        return tag,200
        
    
    @marshal_with(objective_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        tag = data.get('tag')
        user = get_jwt_identity()
        return db.update_user_tag(user,id,tag)
    
    @marshal_with(objective_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_tag(user,id)
        
        