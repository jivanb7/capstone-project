from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    users_data = [
        {'username': 'Demo', 'email': 'demo@aa.io', 'password': 'password'},
        {'username': 'marnie', 'email': 'marnie@aa.io', 'password': 'password'},
        {'username': 'bobbie', 'email': 'bobbie@aa.io', 'password': 'password'},
        {'username': 'john', 'email': 'john@aa.io', 'password': 'password'},
        {'username': 'jane', 'email': 'jane@aa.io', 'password': 'password'},
        {'username': 'alice', 'email': 'alice@aa.io', 'password': 'password'},
        {'username': 'charlie', 'email': 'charlie@aa.io', 'password': 'password'},
        {'username': 'david', 'email': 'david@aa.io', 'password': 'password'},
        {'username': 'ellen', 'email': 'ellen@aa.io', 'password': 'password'},
        {'username': 'frank', 'email': 'frank@aa.io', 'password': 'password'},
        {'username': 'grace', 'email': 'grace@aa.io', 'password': 'password'},
        {'username': 'hannah', 'email': 'hannah@aa.io', 'password': 'password'},
        {'username': 'ivan', 'email': 'ivan@aa.io', 'password': 'password'},
        {'username': 'jack', 'email': 'jack@aa.io', 'password': 'password'},
        {'username': 'katie', 'email': 'katie@aa.io', 'password': 'password'},
        {'username': 'lily', 'email': 'lily@aa.io', 'password': 'password'},
        {'username': 'mike', 'email': 'mike@aa.io', 'password': 'password'},
        {'username': 'nina', 'email': 'nina@aa.io', 'password': 'password'},
        {'username': 'oliver', 'email': 'oliver@aa.io', 'password': 'password'},
        {'username': 'paul', 'email': 'paul@aa.io', 'password': 'password'}
    ]
    users = [User(**user_data) for user_data in users_data]

    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
