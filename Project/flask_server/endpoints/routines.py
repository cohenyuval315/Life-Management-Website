from attr import field
from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db
from endpoints.events import event_model
from endpoints.tags import tag_model

routine_ns =  Namespace('routine', description="a namespace for category")



# property_model = routine_ns.model(
#     "property",{
#         "propertyId": fields.String(required=True,title="name of object",description="name value"),
#         "value": fields.Raw(required=True,title="description of entry",description="description"),
#     }
# )

# durationObject_model = routine_ns.model(
#     "durationObject",{
#         "id":fields.String(),
#         "name":fields.String(),
#         "objectId":fields.String(required=True, title="id", description="category id"),
#         "duration":fields.String(),
#         "parentsIds":fields.List(fields.String(),as_list=True),
#         "properties":fields.List(fields.Nested(property_model)),
#     }
# )




view_model = routine_ns.model(
    "view",{
        "color": fields.String(),
        "background_color": fields.String(),
        "border_color": fields.String(),
        "icon": fields.String(),
    }
)


routine_model = routine_ns.model(
    "routine", {
        "_id": fields.String(required=True, title="id", description="category id"),
        "title": fields.String(required=True, title="id", description="category id"),
        "user_id": fields.String(required=True, title="id", description="category id"),
        "description": fields.String(),
        "note": fields.String(required=True, title="id", description="category id"),
        "tags_ids": fields.List(fields.String()),
        "calendar_id": fields.String(),
        "tasks_ids": fields.List(fields.String()),        
        "is_pinned": fields.Boolean(),
        "is_completed": fields.Boolean(),
        "is_positive": fields.Boolean(),
        "start_date": fields.String(),
        "end_date": fields.String(),
        "start_time": fields.String(),
        "end_time": fields.String(),
        "period": fields.String(), #["day","week","month","quarter","year"],
        "target": fields.String(),
        "time_estimate": fields.String(),
        "priority": fields.String(),
        "mental_difficulty": fields.String(),
        "physical_difficulty": fields.String(),
        "emotional_difficulty": fields.String(),
        "record_type": fields.String(), # bool / number 
        "ask_on": fields.List(fields.String()),# days array
        "appearance_time": fields.String(),
        "show_after_record": fields.Boolean(),
        "show_after_success": fields.Boolean(),
        "history":fields.List(fields.String()),    #"list[(time1,val1,)]",     2 indexes = one value
        "last_slack_date": fields.String(),
        "measure_units": fields.String(), # kms / liters / calories/ etc..
        "show_in_calendar": fields.String(),
        "show_in_calendar_time": fields.String(),
        "view": fields.Nested(view_model),
        "status": fields.String(),
        "rank": fields.String(),
    }
)

        
    
# routines_model = routine_ns.model(
#     "routines",{
#         "routines" : fields.List(fields.Nested(routine_model),as_list=True,title="routines",description="custom routines"),
#     }
# )


@routine_ns.route("/routines")
class RoutinesResource(Resource):
    
    @routine_ns.marshal_list_with(routine_model)
    @jwt_required()
    def get(self):
        """Get all the routines of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_routines(user),200
    
    @marshal_with(routine_model)
    @jwt_required()
    def post(self):
        """create a category"""
        data = request.get_json()
        routine = data.get("routine")
        user = get_jwt_identity()
        new_routine = db.create_user_routine(user,routine)
        return new_routine,200
    
    @marshal_with(routine_model)
    @jwt_required()
    def put(self):
        """Update a category"""
        data = request.get_json()
        routines = data.get("routines")
        user = get_jwt_identity()
        updated_routines = db.update_user_routines(user,routines)
        return updated_routines,201
    
    
@routine_ns.route('/routine/<string:id>')
class RoutineResource(Resource):

    @marshal_with(routine_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        return db.get_user_routine(user,id)
    
    @marshal_with(routine_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        routine = data.get('routine')
        user = get_jwt_identity()
        return db.update_user_routine(user,id,routine)
    
    @marshal_with(routine_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_routine(user,id)

# @routine_ns.route('/routine/durationItem/<string:id>')
# class DurationObjectResource(Resource):

#     @marshal_with(routine_model)    
#     @jwt_required()  
#     def get(self,id):
#         user = get_jwt_identity()
#         return db.get_user_routine(user,id)
    
#     @marshal_with(routine_model)    
#     @jwt_required()  
#     def put(self,id):
#         data = request.get_json()
#         routine = data.get('routine')
#         user = get_jwt_identity()
#         return db.update_user_routine(user,id,routine)
    
#     @marshal_with(routine_model)    
#     @jwt_required()  
#     def delete(self,id):
#         user = get_jwt_identity()
#         return db.delete_user_routine(user,id)
        