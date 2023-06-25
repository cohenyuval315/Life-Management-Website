from exts import db
import datetime
import unittest
from unittest import TestCase
from config import TestConfig
from app import create_app



class APITestCase(TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)
        with self.app.app_context():
            db.init_app(self.app)
            db.create_all()

    # <--* HELLO TESTS *--->
    # ----------------------------------------------------------------

    def test_hello_world(self):
        """TEST HELLO"""
        hello_response = self.client.get("/hello/hello")
        hello_json = hello_response.json["message"]
        self.assertEqual(hello_json, "hello, has reached it's target.")
    # ----------------------------------------------------------------



    # <--* AUTH TESTS *--->
    # ----------------------------------------------------------------

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
    # ----------------------------------------------------------------



    # <--* USER TESTS *--->
    # ----------------------------------------------------------------

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
        pass
    
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
    # ----------------------------------------------------------------



    # <--* ENTRY TESTS *--->
    # ----------------------------------------------------------------

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

        create_response = self.client.post(
            f"/entry/entries",
            json={
                "name": "test_entry",
                "entry_type": "entry",
                "description": "test_entry",
                
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = create_response.status_code
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

        create_response = self.client.post(
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

    def test_get_one_entry_from_user_404(self):
        """TEST GET ENTRY FROM USER 404"""
        id = 1
        user_id = 1
        response = self.client.get(f"/entry/{user_id}/entry/{id}")
        status_code = response.status_code
        self.assertEqual(status_code, 404)

    def test_update_one_entry_of_user(self):
        """TEST UPDATE ENTRY OF USER"""
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

        create_response = self.client.post(
            f"/entry/{user_id}/entries",
            json={
                "name": "test_entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        update_response = self.client.put(
            f"/entry/{user_id}/entry/{id}",
            json={
                "name": "test_entry",
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
            f"/entry/{user_id}/entry/{id}",
            json={
                "name": "test_entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        status_code = update_response.status_code
        self.assertEqual(status_code, 404)

    def test_delete_one_entry_of_user(self):
        """TEST DELETE ENTRY OF USER"""
        user_id = 1
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
        create_response = self.client.post(
            f"/entry/{user_id}/entries",
            json={
                "name": "test_entry",
                "description": "test_entry",
            }, headers={
                'Authorization': f"Bearer {access_token}",
            }
        )

        delete_response = self.client.delete(
            f"/entry/{user_id}/entry/{entry_id}",
            headers={
                "content-type": "application/json",
                "Authorization": f"Bearer {access_token}",
            })

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)



    # <--* WORKSPACE TESTS *--->
    # ----------------------------------------------------------------

    def test_get_all_workspaces_of_user(self):
        """TEST GET ALL WORKSPACES OF USER """
        user_id = 1
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
            f'/workspace/{user_id}/workspaces',
            headers={
                'Content-Type': 'application/json',
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)

    def test_create_one_workspace_to_user(self):
        """TEST CREATE WORKSPACE TO USER """
        user_id = 1
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

        create_workspace_response = self.client.post(f"/workspace/{user_id}/workspaces", json={"name": "workspace_name"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = create_workspace_response.status_code
        self.assertEqual(status_code, 201)

    def test_get_one_workspace_of_user(self):
        """TEST GET WORKSPACE OF USER"""
        user_id = 1
        workspace_id = 1
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
        
        create_workspace_response = self.client.post(f"/workspace/{user_id}/workspaces", json={"name": "workspace_name"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        
        response = self.client.get(
            f"/workspace/{user_id}/workspace/{workspace_id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 200)
        
    def test_get_one_workspace_of_user_404(self):
        """TEST GET WORKSPACE OF USER 404"""
        user_id = 1
        workspace_id = 1
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
            f"/workspace/{user_id}/workspace/{workspace_id}",
            headers={
                'Authorization': f"Bearer {access_token}",
            }
        )
        status_code = response.status_code
        self.assertEqual(status_code, 404)
        
    def test_update_one_workspace_of_user(self):
        """TEST UPDATE WORKSPACE OF USER"""
        user_id = 1
        workspace_id = 1
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

        create_workspace_response = self.client.post(f"/workspace/{user_id}/workspaces", json={"name": "workspace_name"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })

        update_response = self.client.put(f"/workspace/{user_id}/workspace/{workspace_id}", json={"name": "new_workspace_name"}, headers={
            "Content-Type": "application/json",
            'Authorization': f"Bearer {access_token}",
        })
        status_code = update_response.status_code
        self.assertEqual(status_code, 200)

    def test_delete_one_workspace_of_user(self):
        """TEST DELETE WORKSPACE OF USER"""
        user_id = 1
        workspace_id = 1
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
        create_workspace_response = self.client.post(
            f"/workspace/{user_id}/workspaces",
            json={
                "name": "workspace_name"
            },
            headers={
                "Content-Type": "application/json",
                'Authorization': f"Bearer {access_token}", }
        )

        delete_response = self.client.delete(
            f"/workspace/{user_id}/workspace/{workspace_id}",
            headers={
                "content-type": "application/json",
                "Authorization": f"Bearer {access_token}",
            })

        status_code = delete_response.status_code
        self.assertEqual(status_code, 200)
    # ----------------------------------------------------------------

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()
