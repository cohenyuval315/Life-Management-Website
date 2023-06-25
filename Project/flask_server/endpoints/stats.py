from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request,make_response,jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

stats_ns =  Namespace('stats', description="a namespace for category")

stats_model = stats_ns.model(
    "stats", {
        "id": fields.String(required=True, title="id", description="category id"),
        "hp": fields.String(required=True, title="id", description="category id"),
    }
)


@stats_ns.route("/stats")
class CategoriesResource(Resource):
    
    @stats_ns.marshal_list_with(stats_model)
    @jwt_required()
    def get(self):
        """Get all the categories of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_stats(user),200
    

  