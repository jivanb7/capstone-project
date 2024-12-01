from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    comments = [
        Comment(description="This is so inspiring, thank you!", user_id=2, post_id=1),
        Comment(description="I love topics about the universe, great post!", user_id=4, post_id=1),

        Comment(description="What a fascinating headphone, I might get one.", user_id=6, post_id=2),
        Comment(description="I completely agree with your recent purchase.", user_id=9, post_id=2),

        Comment(description="Positivity is contagious! Thank you for this.", user_id=12, post_id=3),
        Comment(description="Needed this today. Much appreciated!", user_id=14, post_id=3),

        Comment(description="Remote work has been a game changer for me.", user_id=7, post_id=4),
        Comment(description="Do you have any specific software apps you'd recommend?", user_id=11, post_id=4),

        Comment(description="I've read most of those books! Fantastic list.", user_id=8, post_id=5),
        Comment(description="Thanks for the recommendations, adding these to my list.", user_id=10, post_id=5),

        Comment(description="History never ceases to amaze me.", user_id=16, post_id=6),
        Comment(description="Love learning from the past, insightful post!", user_id=17, post_id=6),

        Comment(description="I need this calm energy in my life.", user_id=19, post_id=7),

        Comment(description="Fresh pasta sounds amazing. Can I get the recipe?", user_id=14, post_id=8),
        Comment(description="Cooking is therapeutic, love it!", user_id=12, post_id=8),

        Comment(description="Which games are your favorite on the console?", user_id=5, post_id=9),
        Comment(description="This console is on my wishlist, thanks for the insight!", user_id=4, post_id=9),

        Comment(description="Yo, what's your workout routine, I want to build muscle.", user_id=8, post_id=10),

        Comment(description="I have to try this, you always wake up with so much energy!", user_id=15, post_id=11),
        Comment(description="Where did you get this from? I want to try it.", user_id=13, post_id=11),

        Comment(description="Clean code is life. Excellent post!", user_id=3, post_id=14),
        Comment(description="I'm learning so much about best practices, thank you!", user_id=6, post_id=14),

        Comment(description="Gardening is so fulfilling. What are you planting?", user_id=7, post_id=15),
        Comment(description="Nothing beats homegrown vegetables!", user_id=9, post_id=15),

        Comment(description="This is a much-needed hand warmer, I might consider getting one.", user_id=11, post_id=16),
        Comment(description="That looks so expensive.", user_id=10, post_id=16),

        Comment(description="Great photography tips, much needed for a beginner!", user_id=18, post_id=17),
        Comment(description="Lighting really does make all the difference.", user_id=20, post_id=17),
        Comment(description="I really do like the lighting in these pictures.", user_id=2, post_id=17),
        Comment(description="The lights really brighten everything up.", user_id=1, post_id=17),
        Comment(description="Wow these photos looks super high definition, nice!", user_id=5, post_id=17),
    ]

    db.session.add_all(comments)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()
