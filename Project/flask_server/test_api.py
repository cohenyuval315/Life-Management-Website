import datetime
import unittest
from unittest import TestCase
from config import TestConfig
from exts import db
from app import create_app

class APITestCase(TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)
        with self.app.app_context():
            db.init_app(self.app)
            db.create_all()



    # <--* HELLO TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_hello_world(self):
        """TEST HELLO"""
        hello_response = self.client.get("/hello/hello")
        hello_json = hello_response.json["message"]
        self.assertEqual(hello_json, "hello, has reached it's target.")
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    # <--* AUTH TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_signup(self):
        """TEST SIGNUP"""
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)

    def test_login(self):      
        """TEST LOGIN"""
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })

        status_code = login_response.status_code
        self.assertEqual(status_code, 200)
    
    def test_refresh_token(self):
        """TEST REFRESH"""
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })
        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        refresh_token = login_response.json['refresh_token']
        response = self.client.post(
            "/auth/refresh",
            # json={
            #     "access_token": f'Bearer {access_token}',
            #     "refresh_token": f'Bearer {refresh_token}',
            # }, 
            headers={
                'Authorization': f"Bearer {refresh_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    # <--* USER TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_get_all_users(self):
        """TEST GET ALL USERS"""
        response = self.client.get("/user/users")
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_create_user(self):
        """TEST CREATE USER"""
        response = self.client.post("/user/users", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",

        })
        status_code = response.status_code
        self.assertEqual(response.status_code, 201)

    def test_get_one_user(self):
        """TEST GET ONE USER"""
        id = 1
        response = self.client.get(f"/user/users/{id}")
        status_code = response.status_code
        self.assertEqual(status_code, 404)

    def test_update_user(self):
        """TEST UPDATE USER"""
        id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        update_response = self.client.put(f"/user/user/{id}", json={
            "username": "updated test_user",
            "password": "updated test_password",
            "firstname": "updated test name",
            "lastname": "updated test name",
            "date_of_birth": datetime.datetime.now(),
            "email": "updatedtest@email.com",
            
        }, headers={
            "content-type": "application/json",
            "Authorization": f"Bearer {access_token}",
        })

        status_code = update_response.status_code
        self.assertEqual(status_code, 200)

    def test_admin_user(self):
        """TEST ADMIN USER"""
        pass#auth
    
    def test_not_admin_user(self):
        """TEST NOT ADMIN USER"""
        pass#unauth
    
    def test_delete_user(self):
        """TEST DELETE USER"""
        id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        delete_response = self.client.delete(f"/user/user/{id}", headers={
            "content-type": "application/json",
            "Authorization": f"Bearer {access_token}",
        })

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    # <--* ENTRY TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_get_all_entries_of_user(self):
        """TEST GET ALL ENTRIES OF USER"""
        
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        response = self.client.get(f"/entry/entries",headers={
            'Authorization': f"Bearer {access_token}",
        })
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_create_one_entry_to_user(self):
        """TEST CREATE ENTRY TO USER"""
        
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = create_entry_response.status_code
        self.assertEqual(status_code, 201)

    def test_get_one_entry_from_user(self):
        """TEST GET ENTRY FROM USER"""
        id = 1

        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        get_response = self.client.get(
            f"/entry/entry/{id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = get_response.status_code
        self.assertEqual(status_code, 200)

    def test_update_one_entry_of_user(self):
        """TEST UPDATE ENTRY OF USER"""
        id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        update_response = self.client.put(
            f"/entry/entry/{id}",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        status_code = update_response.status_code
        self.assertEqual(status_code, 200)

    def test_update_one_entry_of_user_404(self):
        """TEST UPDATE ENTRY OF USER 404"""
        user_id = 1
        id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        update_response = self.client.put(
            f"/entry/entry/{id}",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        status_code = update_response.status_code
        self.assertEqual(status_code, 404)

    def test_delete_one_entry_of_user(self):
        """TEST DELETE ENTRY OF USER"""
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post(
            "/auth/login",
            json={
                "username": "test_user",
                "password": "test_pass",
            }
        )
        access_token = login_response.json['access_token']
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        delete_response = self.client.delete(
            f"/entry/entry/{entry_id}",
            headers={
                "content-type": "application/json",
                "Authorization": f"Bearer {access_token}",
            })

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    # <--* ACTIONS TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_get_all_actions_of_user(self):
        """TEST GET ALL ACTIONS OF USER """
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        response = self.client.get(
            f'/action/actions/{entry_id}',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_create_one_action_to_entry(self):
        """TEST CREATE ACTION TO USER """
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        create_action_response = self.client.post(
            f"/action/actions/{entry_id}", 
            json={
                "action_type" : "test_action_type",
                "action_state": "test_action_state",
                "value" : "test_action_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = create_action_response.status_code
        self.assertEqual(status_code, 201)
        
    def test_get_one_action(self):
        """TEST GET ACTION OF USER"""
        entry_id = 1
        action_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_action_response = self.client.post(
            f"/action/actions/{entry_id}", 
            json={
                "action_type" : "test_action_type",
                "action_state": "test_action_state",
                "value" : "test_action_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        response = self.client.get(
            f"/action/action/{action_id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)
        
    def test_get_one_action_404(self):
        """TEST GET ACTION OF USER 404"""
        action_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        response = self.client.get(
            f"/action/action/{action_id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 404)
        
    def test_update_one_action(self):
        """TEST UPDATE ACTION OF USER"""
        entry_id = 1
        action_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_action_response = self.client.post(
            f"/action/actions/{entry_id}", 
            json={
                "action_type" : "test_action_type",
                "action_state": "test_action_state",
                "value" : "test_action_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })

        action_update_response = self.client.put(f"/action/action/{action_id}", json={"name": "new_action_name"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = action_update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_one_action(self):
        """TEST DELETE ACTION OF USER"""
        entry_id = 1
        action_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_action_response = self.client.post(
            f"/action/actions/{entry_id}", 
            json={
                "action_type" : "test_action_type",
                "action_state": "test_action_state",
                "value" : "test_action_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })


        delete_response = self.client.delete(
            f"/action/action/{action_id}",
            headers={
                "content-type": "application/json",
                "Authorization": f"Bearer {access_token}",
            })

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        
        
    # <--* CATEGORIES TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_get_all_categories_of_user(self):
        """TEST GET ALL CATEGORIES OF USER """
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        response = self.client.get(
            f'/category/categories/{entry_id}',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_create_one_category_to_entry(self):
        """TEST CREATE CATEGORY TO USER """
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        create_category_response = self.client.post(
            f"/category/categories/{entry_id}", 
            json={
                "name" : "test_action_type",
                "path": "test_action_state",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = create_category_response.status_code
        self.assertEqual(status_code, 201)
        
    def test_get_one_category(self):
        """TEST GET CATEGORY OF USER"""
        entry_id = 1
        category_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_catgeory_response = self.client.post(
            f"/category/categories/{entry_id}", 
            json={
                "name" : "test_name_category",
                "path": "test_path_category",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        response = self.client.get(
            f"/category/category/{category_id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)
        
    def test_get_one_category_404(self):
        """TEST GET CATEGORY OF USER 404"""

        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        response = self.client.get(
            f"/category/category/{entry_id}", 
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 404)
          
    def test_update_one_category(self):
        """TEST UPDATE CATEGORY OF USER"""
        entry_id = 1
        category_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_category_response = self.client.post(
            f"/category/categories/{entry_id}", 
            json={
                "name" : "test_category_name",
                "path": "test_category_path",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })

        category_update_response = self.client.put(f"/category/category/{category_id}", json={"name": "new_action_name"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = category_update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_one_category(self):
        """TEST DELETE CATEGORY OF USER"""
        entry_id = 1
        category_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries", 
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_category_response = self.client.post(
            f"/category/categories/{entry_id}", 
            json={
                "name" : "test_name_category",
                "path": "test_path_category",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })


        delete_response = self.client.delete(
            f"/category/category/{category_id}",
            headers={
                "content-type": "application/json",
                "Authorization": f"Bearer {access_token}",
            })

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)   
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    
    
    
    # <--* PROPERTIES TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_get_all_properties_of_entry(self):
        """TEST GET ALL PROPERTIES OF ENTRY """
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        response = self.client.get(
            f'/property/properties/{entry_id}',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_create_one_property_to_entry(self):
        """TEST CREATE PROPERTY TO ENTRY """
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        create_property_response = self.client.post(
            f"/property/properties/{entry_id}", 
            json={
                "key" : "test_key",
                "data_type": "s",
                "value": "test_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = create_property_response.status_code
        self.assertEqual(status_code, 201)
        
    def test_get_one_property(self):
        """TEST GET PROPERTY OF ENTRY"""
        entry_id = 1
        property_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_property_response = self.client.post(
            f"/property/properties/{entry_id}", 
            json={
                "key" : "test_key",
                "data_type": "s",
                "value": "test_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        response = self.client.get(
            f"/property/property/{property_id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)
        
    def test_get_one_property_404(self):
        """TEST GET PROPERTY OF ENTRY 404"""
        entry_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        response = self.client.get(
            f"/property/property/{entry_id}", 
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 404)
           
    def test_update_one_property(self):
        """TEST UPDATE PROPERTY OF ENTRY"""
        entry_id = 1
        property_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_property_response = self.client.post(
            f"/property/properties/{entry_id}", 
            json={
                "key" : "test_key",
                "data_type": "s",
                "value": "test_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })

        property_update_response = self.client.put(f"/property/property/{property_id}", json={"key": "new_property_key"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = property_update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_one_property(self):
        """TEST DELETE PROPERTY OF ENTRY"""
        entry_id = 1
        property_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        create_entry_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        create_property_response = self.client.post(
            f"/property/properties/{entry_id}", 
            json={
                "key" : "test_key",
                "data_type": "s",
                "value": "test_value",
            }, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })


        delete_response = self.client.delete(
            f"/property/property/{property_id}",
            headers={
                "content-type": "application/json",
                "Authorization": f"Bearer {access_token}",
            })

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)   
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    
    
    # <--* SETTINGS TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_get_all_settings_of_user(self):
        """TEST GET ALL SETTINGS OF USER """
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        
        response = self.client.get(
            f'/setting/settings',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_get_one_setting(self): #TODO
        """TEST GET SETTING OF USER"""
        entry_id = 1
        setting_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        response = self.client.get(
            f"/setting/setting/{setting_id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 404)
        
    def test_get_one_setting_404(self):
        """TEST GET SETTING"""
        setting_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']
        response = self.client.get(
            f"/setting/setting/{setting_id}", 
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 404)
           
    def test_update_one_setting(self): #TODO
        """TEST UPDATE SETTING OF USER"""
        entry_id = 1
        setting_id = 1
        signup_response = self.client.post("/auth/signup", json={
            "username": "test_user",
            "password": "test_pass",
            "firstname": "test_first_name",
            "lastname": "test_last_name",
            "date_of_birth": datetime.datetime.now(),
            "email": "test@email.com",
        })

        login_response = self.client.post("/auth/login", json={
            "username": "test_user",
            "password": "test_pass",
        })
        access_token = login_response.json['access_token']

        setting_update_response = self.client.put(f"/setting/setting/{setting_id}", json={"value": "new_setting_value"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = setting_update_response.status_code
        self.assertEqual(status_code, 404)
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    # <--* DATABASE TESTS *--->
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    def test_insert_one_user():
        pass

# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------    ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()
