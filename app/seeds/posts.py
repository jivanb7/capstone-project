from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    posts = [
        Post(content="This is the first post content.", user_id=1),
        Post(content="This post is all about new updates in tech.", user_id=2),
        Post(content="Here's something fun for everyone to check out.", user_id=3)
    ]

    db.session.add_all(posts)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()
