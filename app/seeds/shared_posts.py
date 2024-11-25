from app.models import db, SharedPost, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shared_posts():
    db.session.add_all([
        SharedPost(post_id=1, recipient_id=2, sender_id=1),
        SharedPost(post_id=1, recipient_id=3, sender_id=1),
        SharedPost(post_id=2, recipient_id=1, sender_id=2), 
    ])
    db.session.commit()

def undo_shared_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shared_posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shared_posts"))
        
    db.session.commit()
