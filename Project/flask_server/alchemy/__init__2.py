# from database import session
# from alchemy.orm.models import User

# # from .orm import orm_create_user, orm_delete_user


# def create_and_delete_users():
#     """
#     Create a user record via SQLAlchemy's ORM, and subsequently delete it.
#     :return: None
#     """
#     user = User(
#         username="admin",
#         password="Password123lol",
#         email="admin@example.com",
#         firstname="Todd",
#         lastname="Birchard",
#         date_of_birth="",
#         routines = [],
#         info_snippets = [],
#         tags = [],
#         categories = [],
#         reminders =[],
#         notifications =[],
#         graphs = [],
#         calendars = [],
#         events =[],        
#         bio="I write code.",
#         # avatar_url="",
#     )

#     # user = orm_create_user(session, user)
#     # orm_delete_user(session, user)