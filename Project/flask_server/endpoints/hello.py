from flask_restx import Resource,Namespace

hello_ns =  Namespace('hello', description="a namespace for hello")

@hello_ns.route("/hello")
class HelloResource(Resource):
    
    def get(self):
        """send hello"""
        return {
            "message":"hello, has reached it's target."
        }
        
