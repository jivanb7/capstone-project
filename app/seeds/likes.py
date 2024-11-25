from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

def seed_likes():
    likes = [
        Like(user_id=1, post_id=1), 
        Like(user_id=1, post_id=2), 
        Like(user_id=2, post_id=1),
        Like(user_id=3, post_id=2),
        Like(user_id=3, post_id=3),
    ]

    db.session.add_all(likes)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        
    db.session.commit()
