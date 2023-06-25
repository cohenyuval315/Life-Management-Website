from flask_restx import Resource,Namespace
from flask_restx import Resource,Namespace,fields
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db
me_ns =  Namespace('me', description="a namespace for me")

skill_model = me_ns.model(
    "skill",{
        "_id": fields.String(required=True,title="username",description="identifier for user"),
        "is_passive": fields.String(),
        "title": fields.String(),        
        "icon": fields.String(),  
        "description": fields.String(),  
        "source": fields.String(),  
        "points": fields.String(),  
        "rank": fields.String(),  
        "max_points": fields.String(),  
        "prerequisite_skills": fields.String(),  
        
    }
)

class_model = me_ns.model(
    "class",{
        "_id": fields.String(required=True,title="username",description="identifier for user"),
        "title": fields.String(),
        "level": fields.String(),
        "xp": fields.String(),
        "requirement": fields.String(),
        "skills": fields.List(fields.Nested(skill_model)),
    }
)

stats_model = me_ns.model(
    "stats",{
        "points": fields.String(),
        "unassigned_points": fields.String(),
        "experience": fields.String(),
        "fame": fields.String(),
        "strength": fields.String(),
        "dexterity": fields.String(),
        "intelligense": fields.String(),
        "wisdom": fields.String(),
        "luck": fields.String(),
        "defense": fields.String(),
        "reflex": fields.String(),
        "vitality": fields.String(),
        "vitality_recovery": fields.String(),
        "stamina": fields.String(),
        "stamina_recovery": fields.String(),
        "mind": fields.String(),
        "willpower": fields.String(),
        "charisma": fields.String(),
        "spirit": fields.String(),
        "speed": fields.String(),
        "cold_resistance": fields.String(),
        "hot_resistance": fields.String(),
        "concentration": fields.String(),
        "accuracy": fields.String(),
        "offense": fields.String(),
        "critical_change": fields.String(),
        "rage": fields.String(),
        "weight": fields.String(),
        "height": fields.String(),
        "water": fields.String(),
        "food": fields.String(),
        
    }
)

achievement_model = me_ns.model(
    "achievement",{
        "_id": fields.String(required=True,title="username",description="identifier for user"),        
        "title": fields.String(),   
        "source": fields.String(),
        "xp": fields.String(),
        "points": fields.String(),
        "strength": fields.String(),
        "wisdom": fields.String(),
        "mental": fields.String(),
        "luck": fields.String(),
        "dex": fields.String(),
        "hp": fields.String(),
        "mp": fields.String(),
        "classes": fields.List(fields.Nested(class_model)),
    }
)
buff_model = me_ns.model(
    "buff",{
        "_id": fields.String(required=True,title="username",description="identifier for user"),        
        "title": fields.String(),   
        "start_date": fields.String(),   
        "end_date": fields.String(),   
        "history": fields.List(fields.String()),   
        "strength_changes": fields.String(),
        "wisdom_changes": fields.String(),
        "mental_changes": fields.String(),
        "luck_changes": fields.String(),
        "dex_changes": fields.String(),
        "hp_changes": fields.String(),
        "mp_changes": fields.String(),
        "source": fields.String(),
        "classes_changes": fields.List(fields.Nested(class_model)),
    }
)

item_model = me_ns.model(
    "item",{
        "_id": fields.String(required=True,title="username",description="identifier for user"),        
        "title": fields.String(),   
        "strength_changes": fields.String(),
        "wisdom_changes": fields.String(),
        "mental_changes": fields.String(),
        "luck_changes": fields.String(),
        "dex_changes": fields.String(),
        "hp_changes": fields.String(),
        "mp_changes": fields.String(),
        "source": fields.String(),
    }
)

me_model = me_ns.model("user",{
        "_id": fields.String(required=True,title="username",description="identifier for user"),
        "username": fields.String(required=True,title="username",description="identifier for user"),
        "password": fields.String(required=True,title="password",description="identifier for user"),
        "firstname": fields.String(required=True,title="first name",description="first name of user"),
        "lastname": fields.String(required=True,title="last name",description="last name of user"),
        "date_of_birth": fields.DateTime(required=True,title="birth date",description="birth date of user"),
        "email": fields.String(required=True,title="email",description="email of user"),
        "stats": fields.Nested(stats_model),
        "skills": fields.List(fields.Nested(skill_model)),
        "achievements": fields.List(fields.Nested(achievement_model)),
        "buffs": fields.List(fields.Nested(buff_model)),
        "items": fields.List(fields.Nested(item_model)),
        "classes": fields.List(fields.Nested(class_model)),
        "coins": fields.String(),    
        
})


@me_ns.route("")
class MeResource(Resource):
    
    @jwt_required()
    def get(self):
        user = get_jwt_identity()
        return  user,200
        
