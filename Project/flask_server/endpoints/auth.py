from flask_restx import Resource, Namespace, fields
from flask import jsonify, request, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token,jwt_required,get_jwt_identity,set_access_cookies
from exts import db
import datetime
from email.utils import parsedate_to_datetime
from dateutil.parser import parse
import base64

auth_ns = Namespace('auth', description="a namespace for authentication")

signup_model = auth_ns.model(
    'SignUp', {
        "username": fields.String(),
        "password": fields.String(),
        "firstname": fields.String(),
        "lastname": fields.String(),
        "date_of_birth": fields.DateTime(),
        "email": fields.String(),
    }
)
# login_model = auth_ns.model(
#     'Login', {
#         "username": fields.String(),
#         "password": fields.String(),
#     }
# )


@auth_ns.route("/login")
class Login(Resource):

    def post(self):
        headers = request.headers.get('Authorization')
        res = base64.b64decode(headers.replace("Basic ","")).decode('UTF-8').split(":")
        username = res[0]
        password = res[1]

        db_user = db.find_user_by_username(username)
        
        if db_user is None:
            return make_response(jsonify(message=f"username {username} doesnt exist"), 401)
        
        if db_user and check_password_hash(db_user["password"], password):# .password for sqlalchemey
            if username == "admin_user":
                access_token = create_access_token(
                    'admin_user',additional_claims={"is_administrator": True}
                )
                
            else:
                access_token = create_access_token(identity=db_user["username"],expires_delta=datetime.timedelta(days=1)) # .username for sqlalchemey

            refresh_token = create_refresh_token(identity=db_user["username"])
            res = make_response(
                jsonify(
                    {
                        "access_token": access_token,
                        "refresh_token": refresh_token
                    })
                , 200
            )
            # set_access_cookies(res, access_token)
            return res
        else:
            return make_response(jsonify(message=f"wrong password"), 401)
        
            

@auth_ns.route("/signup")
class SignUp(Resource):

    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        if username == "admin_user":
            return make_response(jsonify(message=f"username {username} cannot be used"), 201)
        
        db_user = db.find_user_by_username(username)
        
        if db_user is not None:
            return make_response(jsonify(message=f"username {username} already in use"), 201)
        
        db_email = db.find_user_by_email(email)
        # db_email = User.query.filter_by(email=email).first()
        # db_user = wrapper.getUser(email=email)
        
        if db_email is not None:
            return make_response(jsonify(message=f"email {email} already in use"), 201)
        
        
        # newUser = wrapper.createUser(...)
        # new_user = User(
        #     username=data.get("username"),
        #     password=generate_password_hash(data.get("password")),
        #     firstname=data.get("firstname"),
        #     lastname=data.get("lastname"),
        #     date_of_birth=parse(data.get("date_of_birth")),
        #     email=data.get("email"),
        # )
        db.create_user(
            data.get("username"),
            generate_password_hash(data.get("password")),
            data.get("firstname"),
            data.get("lastname"),
            parse(data.get("date_of_birth")),
            data.get("email")
        )
        # new_user = mongo.db.users.insert_one(
        # {
        #     "username":data.get("username"),
        #     "password":generate_password_hash(data.get("password")),
        #     "firstname":data.get("firstname"),
        #     "lastname":data.get("lastname"),
        #     "date_of_birth":parse(data.get("date_of_birth")),
        #     "email":data.get("email"),           
        # })

        # new_user.save()

        
        return make_response(jsonify(message=f"new user {username} created successfully"), 201)

@auth_ns.route("/tokens")
class Tokens(Resource):
    
    @jwt_required(refresh=True)
    def delete(self):
        current_user=get_jwt_identity()
        new_access_token=create_access_token(identity=current_user)
        return make_response(jsonify({"access_token":new_access_token}),200)
    
    
    
@auth_ns.route("/refresh")
class Refresh(Resource):
    
    @jwt_required(refresh=True)
    def post(self):
        current_user=get_jwt_identity()
        new_access_token=create_access_token(identity=current_user)
        return make_response(jsonify({"access_token":new_access_token}),200)
    
    
@auth_ns.route("/save")
class Save(Resource):
    
    @jwt_required()
    def get(self):
        current_user=get_jwt_identity()
        data = db.get_user_data(current_user)
        return data
    
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        data = db.get_user_data(current_user)
        return db.save_user_data(current_user,data),200
    


@auth_ns.route("/saves")
class Saves(Resource):
    
    @jwt_required()
    def get(self):
        current_user=get_jwt_identity()
        data = db.get_user_data_saves(current_user)
        return data
        
        
@auth_ns.route("/load/<string:datetime>")
class Loads(Resource):
    
    @jwt_required()
    def get(self,datetime):
        current_user=get_jwt_identity()
        data = db.get_user_data_by_datetime(current_user,datetime)
        return data

    
    @jwt_required()
    def put(self,datetime):

        current_user=get_jwt_identity()
        save = db.get_user_data_by_datetime(current_user,datetime)
        data = save["data"]
        olddata = db.get_user_data(current_user)
        db.save_user_data(current_user,olddata)
        return db.load_user_data(current_user,data), 200

    @jwt_required()
    def delete(self,datetime):

        current_user = get_jwt_identity()
        return db.delete_user_data_save(current_user,datetime),200
