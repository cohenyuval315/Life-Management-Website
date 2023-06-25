from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import jwt_required
from exts import db

metadata_ns =  Namespace('metadata', description="a namespace for action")

data_type_model = metadata_ns.model(
    "dataType", {
        "id": fields.String(),  
        "name": fields.String(),
    }
)

# rules = ["start With", "cointains", "jsonFormat"]

validation_rule_model = metadata_ns.model(
    "validationRule", {
        "id": fields.String(),  
        "name": fields.String(), # not null , length > 0  |  format json
        "dataTypes": fields.List(fields.Nested(data_type_model)), # string            |  json   
        "valueDataType": fields.String(default=None,nullable=True),
        "value": fields.Raw(default=None,nullable=True),
    }
)

view_model = metadata_ns.model(
    "view",{
        "id": fields.String(),
        "name": fields.String(), 
        "dataTypes": fields.List(fields.Nested(data_type_model)), # string  
        "validationRules": fields.List(fields.Nested(validation_rule_model)), # must rules for view
    }
)

property_model =  metadata_ns.model(
    "property", {
        "id": fields.String(),
        "name": fields.String(), # tips
        "dataType": fields.Nested(data_type_model),
        "view":fields.Nested(view_model), # folder
        "default": fields.Raw(required=True,nullable=True,title="description of entry",description="description"),
        "value": fields.Raw(required=True,nullable=True, title="description of entry",description="description"),
    }
)


setting_model = metadata_ns.model(
    "setting",{
        "id": fields.String(),
        "name": fields.String(),
        "description": fields.String(),
        "dataType": fields.Nested(data_type_model),
    }
)

states_model = metadata_ns.model(
    "state",{
        "id": fields.String(),
        "name": fields.String(),
    }
)

features_model = metadata_ns.model(
    "feature",{
        "id": fields.String(),
        "name": fields.String(),
    }
)

connection_type_model = metadata_ns.model(
    "feature",{
        "id": fields.String(),
        "name": fields.String(),
    }
)


metadata_model = metadata_ns.model(
    "metadata", {
        "features" : fields.List(fields.Nested(features_model),as_list=True,title="",description=" under category"),
        "states": fields.List(fields.Nested(states_model),as_list=True),
        "validationRules" : fields.List(fields.Nested(validation_rule_model),as_list=True,title="",description=" under category"),
        "properties" : fields.List(fields.Nested(property_model),as_list=True,title="",description=" under category"),
        "views" : fields.List(fields.Nested(view_model),as_list=True,title="",description=" under category"),
        "connectionTypes" : fields.List(fields.Nested(connection_type_model),as_list=True,title="",description=" under category"),
        "dataTypes" : fields.List(fields.Nested(data_type_model),as_list=True,title="",description=" under category"),
        "settings": fields.List(fields.Nested(setting_model),as_list=True,title="",description=" under category"),
    }
)

@metadata_ns.route("/")
class MetaDataResource(Resource):
    
    @metadata_ns.marshal_with(metadata_model)
    @jwt_required()
    def get(self):
        appdata =  db.get_app_data()
        return appdata["metadata"],200

        
