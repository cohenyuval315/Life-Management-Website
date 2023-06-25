from flask_restx import Resource,Namespace,fields,marshal_with
from flask import  request
from flask_jwt_extended import jwt_required,get_jwt_identity
from exts import db

setting_ns =  Namespace('setting', description="a namespace for setting")

setting_model = setting_ns.model(
    "setting", {
        "id": fields.Integer(required=True,titile="id", description="id of property"),
        "key": fields.String(required=True,title="name", description="setting name"),
        "value": fields.String(required=True,title="value", description="setting value"),
    })


@setting_ns.route("/settings")
class SettingsResource(Resource):
    
    @setting_ns.marshal_list_with(setting_model)
    @jwt_required()
    def get(self):
        """Get all the settings from user"""
        user = get_jwt_identity()
        settings = db.get_user_settings(user)
        return settings,200
    
    @setting_ns.marshal_list_with(setting_model)
    @jwt_required()
    def put(self):
        """Get all the settings from user"""
        data = request.get_json()
        settings = data.get("settings")
        user = get_jwt_identity()
        updated_settings = db.update_user_settings(user,settings)
        return updated_settings,201



