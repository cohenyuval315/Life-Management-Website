from attr import field
from flask_restx import Resource,Namespace,fields,marshal_with
from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from exts import db

graph_ns =  Namespace('graph', description="a namespace for action")


weight_model = graph_ns.model(
    "weight", {
        "id":fields.String(), # == objectId
        "weightName": fields.String(),
        "weightDataType": fields.String(),
        "weightValue" : fields.String(),
    } 
)

weights_model = graph_ns.model(
    "weights",{
        "weights":fields.List(fields.Nested(weight_model))
    } 
)


edge_model = graph_ns.model(
    "edge", {
        "id":fields.String(), # == objectId
        "graphId" :fields.String(), # == objectId
        "childObjectId" : fields.String(title="objects",description="objects under category"),
        "parentObjectId" : fields.String(title="objects",description="objects under category"),
        "connectionType" : fields.String(),
        "weights" : fields.List(fields.Nested(weights_model),as_list=True,title="objects",description="objects under category"),
        "isBidirectional" : fields.Boolean(default=False)
    }
)

edges_model = graph_ns.model(
    "edges", {
        "edges": fields.List(fields.Nested(edge_model),as_list=True,title="categories",description="custom categories"),
    }
)

vertex_model = graph_ns.model(
    "vertex", {
        "id" : fields.String(title="objects",description="objects under category"),
        "objectId" : fields.String(title="objects",description="objects under category"),
        "graphId" :fields.String(title="objects",description="objects under category"),
        "color" :fields.String(title="objects",description="objects under category"),
    }
)

vertices_model = graph_ns.model(
    "vertices", {
        "vertices": fields.List(fields.Nested(vertex_model),as_list=True,title="categories",description="custom categories"),
    }
)
config_model = graph_ns.model(
    "config", {
        "priority" :fields.String(title="objects",description="objects under category"),
    }
)

graph_model = graph_ns.model(
    "graph", {
        "id" : fields.String(title="objects",description="objects under category"),
        "title" : fields.String(title="objects",description="objects under category"),
        "config": fields.Nested(config_model),
        "objectId" : fields.String(title="objects",description="objects under category"),
        "categoryId": fields.String(required=True,title="path", description="category path"),
        "numberVertices" : fields.String(title="objects",description="objects under category"),
        "isDirected" : fields.Boolean(),
        "vertices" : fields.List(fields.Nested(vertex_model),as_list=True,title="objects",description="objects under category"),
        "edges" : fields.List(fields.Nested(edge_model),as_list=True,title="objects",description="objects under category"),
    }
)

# graphs_model = graph_ns.model(
#     "graphs", {
#         "graphs": fields.List(fields.Nested(graph_model),as_list=True,title="graphs",description="graphs"),
#     }
# )


@graph_ns.route("/graphs")
class GraphsResource(Resource):
    
    @graph_ns.marshal_list_with(graph_model)
    @jwt_required()
    def get(self):
        """Get all the routines of entry in the database"""
        user = get_jwt_identity()
        graphs = db.get_user_graphs(user)
        return graphs,200
    
    
    @marshal_with(graph_model)
    @jwt_required()
    def post(self):
        """create category"""
        data = request.get_json()
        graph = data.get('graph')
        user = get_jwt_identity()
        db.create_user_graph(user,graph)
        
        return {"graph":graph},200


    
@graph_ns.route("/graph/<int:id>")
class GraphResource(Resource):
    

    @marshal_with(graph_model)    
    @jwt_required()  
    def get(self,id):
        user = get_jwt_identity()
        db.get_user_graph(user,id)
    
    @marshal_with(graph_model)    
    @jwt_required()  
    def put(self,id):
        data = request.get_json()
        graph = data.get('graph')
        user = get_jwt_identity()
        db.update_user_graph(user,id,graph)
    
    @marshal_with(graph_model)    
    @jwt_required()  
    def delete(self,id):
        user = get_jwt_identity()
        db.delete_user_graph(user,id)
        
    
    
@graph_ns.route("/graph/<int:id>/edges")
class GraphEdgesResource(Resource):
    
    @graph_ns.marshal_list_with(edge_model)
    @jwt_required()
    def get(self,id):
        """Get all the routines of entry in the database"""
        user = get_jwt_identity()
        return {"edges":db.get_user_graph_edges(user,id)},200
    
    @marshal_with(edges_model)
    @jwt_required()
    def put(self,id):
        """Update a edge"""
        data = request.get_json()
        edges = data.get("edges")
        user = get_jwt_identity()
        updated = db.update_user_graph_edges(user,id,edges)
        return {"edges":updated},201
    
    
@graph_ns.route("/graph/<int:graph_id>/edge/<int:edge_id>")
class GraphEdgeResource(Resource):
    

    @marshal_with(graph_model)    
    @jwt_required()  
    def get(self,graph_id,edge_id):
        user = get_jwt_identity()
        edge = db.get_user_graph_vertices(user,graph_id,edge_id)
        return edge,200
        
    
    @marshal_with(graph_model)    
    @jwt_required()  
    def put(self,graph_id,edge_id):
        data = request.get_json()
        edge = data.get('edge')
        user = get_jwt_identity()
        result = db.update_user_graph_edge(user,graph_id,edge_id,edge)
        return result,200
    
    @marshal_with(graph_model)    
    @jwt_required()  
    def delete(self,graph_id,edge_id):
        user = get_jwt_identity()
        result = db.delete_user_graph_edge(user,graph_id,edge_id)
        return result,200
        
    
    
    
@graph_ns.route("/graph/<int:id>/vertices")
class GraphEdgesResource(Resource):
    
    @graph_ns.marshal_list_with(vertex_model)
    @jwt_required()
    def get(self,id):
        """Get all the routines of entry in the database"""
        user = get_jwt_identity()
        return {"vertices":db.get_user_graph_vertices(user,id)},200
    
    @marshal_with(vertices_model)
    @jwt_required()
    def put(self,id):
        """Update a edge"""
        data = request.get_json()
        vertices = data.get("vertices")
        user = get_jwt_identity()
        updated = db.update_user_graph_vertices(user,id,vertices)
        return {"vertices":updated},201
    
    
@graph_ns.route("/graph/<int:graph_id>/vertex/<int:vertex_id>")
class GraphEdgeResource(Resource):
    

    @marshal_with(vertex_model)    
    @jwt_required()  
    def get(self,graph_id,vertex_id):
        user = get_jwt_identity()
        vertex = db.get_user_graph_vertex(user,graph_id,vertex_id)
        return vertex,200
        
    
    @marshal_with(vertex_model)    
    @jwt_required()  
    def put(self,graph_id,vertex_id):
        data = request.get_json()
        vertex = data.get('vertex')
        user = get_jwt_identity()
        result = db.update_user_graph_vertex(user,graph_id,vertex_id,vertex)
        return result,200
    
    @marshal_with(vertex_model)    
    @jwt_required()  
    def delete(self,graph_id,vertex_id):
        user = get_jwt_identity()
        result = db.delete_user_graph_vertex(user,graph_id,vertex_id)
        return result,200
        
    