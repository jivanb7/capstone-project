from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments = [
        Comment(description="Great post! Really enjoyed it.", user_id=1, post_id=1),
        Comment(description="Thanks for sharing! Very helpful.", user_id=2, post_id=1),
        Comment(description="I really like this post.", user_id=3, post_id=2)
    ]

    db.session.add_all(comments)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()
