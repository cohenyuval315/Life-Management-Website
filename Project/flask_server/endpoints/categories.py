from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db


category_ns =  Namespace('category', description="a namespace for category")

# old_category_model = category_ns.model(
#     "category", {
#         "id": fields.String(required=True, title="id", description="category id"),
#         "name": fields.String(required=True, title="name", description="category name"),
#         "feature": fields.String(required=True,title="path", description="category path"), # =scheduler => 
#         "group": fields.String(required=True,title="path", description="category path"),
#         "parentId": fields.String(title="category tree", description="index of parent" , default="0"),        
#         "objectId": fields.String(required=False,title="id", description="category id",nullable=True),
#         "groupOnly": fields.String(required=False,title="path", description="category path"),
#         "hasChildren": fields.Boolean(required=False,title="path", description="category path"),
        
#     }
# )

view_model = category_ns.model(
    "view",{
        "icon":fields.String(default=''),
        "color": fields.String(default=''),
        "background_color": fields.String(default=''),
        "drag_background_color":fields.String(default=''),
        "border_color": fields.String(default='')
    }
)

category_model = category_ns.model(
    "category", {
        "_id": fields.String(required=True, title="id", description="category id",nullable=False),
        "user_id": fields.String(required=True, title="name", description="category name",nullable=False),
        "title": fields.String(required=True,title="path", description="category path",nullable=False), # =scheduler => 
        "note": fields.String(title="path",default='', description="category path",nullable=False),
        "parent_id": fields.String(title="category tree", description="index of parent", default="unassigned",nullable=False),        
        "rank": fields.String(required=False,title="id", description="category id",nullable=False),
        "day_rank": fields.String(required=False,title="path", description="category path",nullable=False),
        "updated_at":fields.String(),#date
        "created_at":fields.String(),#date
        "view":fields.Nested(view_model),
    }
)

# categories_model = category_ns.model(
#     "categories",{
#         "categories" : fields.List(fields.Nested(category_model),as_list=True,title="categories",description="custom categories"),
#     }
# )

@category_ns.route("/categories")
class CategoriesResource(Resource):
    
    @category_ns.marshal_list_with(category_model)
    @jwt_required()
    def get(self):
        """Get all the categories of entry in the database"""
        user = get_jwt_identity()
        return db.get_user_categories(user),200
    
    
    @marshal_with(category_model)
    @jwt_required()
    def post(self):# create categories as well needed
        """create category"""
        data = request.get_json()
        category = data.get('category')
        user = get_jwt_identity()
        db.create_user_category(user,category)
        
        return category,200
    
@category_ns.route('/categories/feature=<string:feature>')
class CategoriesFeatureResource(Resource):
    
    @category_ns.marshal_list_with(category_model)    
    @jwt_required()  
    def get(self, feature):
        user = get_jwt_identity()
        feature_categories = db.get_user_categories_by_feature(user,feature)
        return feature_categories,200
       
@category_ns.route('/categories/feature=<string:feature>/group/<string:group>')
class CategoriesGroupResource(Resource):
    
    @category_ns.marshal_list_with(category_model)    
    @jwt_required()  
    def get(self, feature,group):
        user = get_jwt_identity()
        feature_categories = db.get_user_categories_by_feature_group(user,feature,group)
        return feature_categories,200
     
@category_ns.route('/category/<string:id>')
class CategoryResource(Resource):

    @marshal_with(category_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        db.get_user_category(user,id)
    
    @marshal_with(category_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        category = data.get('category')
        user = get_jwt_identity()
        return db.update_user_category(user,id,category)
    
    @marshal_with(category_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        return db.delete_user_category(user,id)
        