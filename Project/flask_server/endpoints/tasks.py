from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db


task_ns =  Namespace('task', description="a namespace for task")

sub_task_model = task_ns.model(
    "sub_task",{
        "_id": fields.String(required=True, title=""),
        "rank":fields.String(), # number
        "title":fields.String(required=True, title=""),
        "note":fields.String(required=True, title=""),
        "time_estimate":fields.String(required=True, title=""),
        "duration":fields.String(required=True, title=""),
        "is_completed": fields.Boolean(), 
        "duration_worked": fields.String(), # number   
        "priority": fields.String(), # number
        "mental_difficulty": fields.String(), # number
        "physical_difficulty": fields.String(), # number        
        "emotional_difficulty": fields.String(), # number       
        "created_at": fields.String(title="category tree", description="index of parent" , default="0"),        
        "updated_at": fields.String(title="category tree", description="index of parent" , default="0"),
        "work_times": fields.List(fields.String()), # list of  date.now() , every 2 index repressent 1 time 
        "is_dreadful": fields.Boolean(),                              
    }
)

reminder_model = task_ns.model(
    "reminder",{
        "_id": fields.String(required=True, title=""),
        "reminder_time":fields.String(required=True, title=""),
        "snooze_duraton":fields.String(required=True, title=""),
        "max_snooze_count":fields.String(required=True, title=""),        
        "task_time":fields.String(required=True, title=""),        
        "auto_snooze":fields.Boolean(required=True, title=""),        
    }
)
        
comment_model = task_ns.model(
    "comment",{
        "_id": fields.String(required=True, title=""),
        "title":fields.String(required=True, title=""),
        "description":fields.String(required=True, title=""),
        "review_date":fields.String(required=True, title=""),
    }
)

reward_model = task_ns.model(
    "reward",{
        "xp": fields.String(required=True,title="user_id", description="category name"),
        "reward_points": fields.String(required=True,title="user_id", description="category name"),
        "coins": fields.String(required=True,title="user_id", description="category name"),
    }
)

view_model = task_ns.model(
    "view",{
        "color": fields.String(required=True,title="user_id", description="category name"),
        "icon": fields.String(required=True,title="user_id", description="category name"),
        "encryption": fields.String(required=True,title="user_id", description="category name"),
    }
)   
        
task_model = task_ns.model(
    "task", {
        "_id": fields.String(required=True,title="id", description="category id"),
        "user_id": fields.String(required=True,title="user_id", description="category name"),
        "parent_id": fields.String(title="path", description="so its can live in categories"), 
        "title": fields.String(),
        "description": fields.String(),
        "note": fields.String(), # MARKDOWN NEED TO SAVE HANDLE
        "rank":fields.String(), # number
        "master_rank":fields.String(), 
        "due_date":fields.String(), # date
        "completed_at":fields.String(), # date
        "is_completed": fields.Boolean(), 
        "duration_worked": fields.String(), # number
        "work_times": fields.List(fields.String()), # list of  date.now() , every 2 index repressent 1 time
        "priority": fields.String(), # number
        "mental_difficulty": fields.String(), # number
        "physical_difficulty": fields.String(), # number        
        "emotional_difficulty": fields.String(), # number
        "is_dreadful": fields.Boolean(),
        "is_pinned": fields.Boolean(),
        "schedule_date": fields.String(), # date
        "group": fields.String(required=True,title="path", description="category path"),
        "sub_tasks": fields.List(fields.Nested(sub_task_model)),        
        "is_recurring_child": fields.String(title="category tree", description="index of parent" , default="0"),        
        "recurring_parent_task_id": fields.String(title="category tree", description="index of parent" , default="0"),        
        "tags_ids": fields.String(title="category tree", description="index of parent" , default="0"),        
        "deleted_at": fields.String(title="category tree", description="index of parent" , default="0"),        
        "created_at": fields.String(title="category tree", description="index of parent" , default="0"),        
        "updated_at": fields.String(title="category tree", description="index of parent" , default="0"),        
        "worked_on_at": fields.String(title="category tree", description="index of parent" , default="0"),        
        "comments": fields.List(fields.Nested(comment_model),title="category tree", description="index of parent" , default="0"),        
        "time_estimate": fields.String(title="category tree", description="index of parent" , default="0"),        
        "objective_id": fields.String(title="category tree", description="index of parent" , default="0"),        
        "objective_phase_id": fields.String(title="category tree", description="index of parent" , default="0"),        
        "objective_rank": fields.String(title="category tree", description="index of parent" , default="0"),        
        "timeblock_section_id": fields.String(title="category tree", description="index of parent" , default="0"),        
        "prerequisite_tasks_ids": fields.String(title="category tree", description="index of parent" , default="0"),        
        "calendar_id": fields.String(title="category tree", description="index of parent" , default="0"),        
        "start_date": fields.String(title="category tree", description="index of parent" , default="0"),        
        "end_date": fields.String(title="category tree", description="index of parent" , default="0"),        
        "reminders": fields.List(fields.Nested(reminder_model),title="category tree", description="index of parent" , default="0"),                
        "objective_phase_id": fields.String(title="category tree", description="index of parent" , default="0"),        
        "reward": fields.Nested(reward_model),                
        "view": fields.Nested(view_model),                
    }
)


@task_ns.route("/tasks")
class TasksResource(Resource):
    
    @task_ns.marshal_list_with(task_model)
    @jwt_required()
    def get(self):
        """Get all the categories of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_categories(user),200
    
    
    @marshal_with(task_model)
    @jwt_required()
    def post(self):# create categories as well needed
        """create category"""
        data = request.get_json()
        category = data.get('category')
        user = get_jwt_identity()
        db.create_user_category(user,category)
        
        return category,200
    
@task_ns.route('/task/<string:id>')
class TaskResource(Resource):

    @marshal_with(task_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        db.get_user_category(user,id)
    
    @marshal_with(task_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        category = data.get('category')
        user = get_jwt_identity()
        return db.update_user_category(user,id,category)
    
    @marshal_with(task_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_category(user,id)
        