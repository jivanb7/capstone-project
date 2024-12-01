from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    posts = [
        Post(content="Exploring the wonders of the earth!", user_id=3),
        Post(content="Thoughts on my new bose headphones from Black Friday.", user_id=5),
        Post(content="A beautiful day to share positivity.", user_id=7),
        Post(content="Here is a gadget I use working from home.", user_id=8),
        Post(content="Check out my favorite book recommendations!", user_id=10),
        Post(content="A look back at history: lessons we can learn today.", user_id=12),
        Post(content="Today's mood: calm and focused, this stuff is the best.", user_id=15),
        Post(content="Learning a new recipe: anyone tried making fresh pasta?", user_id=6),
        Post(content="The new gaming console is incredible!", user_id=7),
        Post(content="Staying active with my favorite dumbbells.", user_id=18),
        Post(content="For those wondering, this is the coffee I drink everyday.", user_id=11),
        Post(content="My latest hiking adventure were using these shoes. Super comfortable and affordable.", user_id=14),
        Post(content="Can we talk about how underrated jazz music is?", user_id=9),
        Post(content="Best book I read for clean code, any developers can chime in!", user_id=13),
        Post(content="Building my dream garden and the first thing I got are these lights, any tips are welcome!", user_id=20),
        Post(content="Hand warmers are a must in the cold.", user_id=17),
        Post(content="Photography tips for beginners, composition and lighting are key.", user_id=19),
        Post(content="These flowers smell amazing!", user_id=16),
    ]

    db.session.add_all(posts)
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))
        
    db.session.commit()
