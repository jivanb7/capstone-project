from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_images():
    db.session.add_all([
        PostImage(url="https://m.media-amazon.com/images/I/615Oxu21yxL._AC_SL1280_.jpg", post_id=1, preview_image=True),
        PostImage(url="https://example.com/post1_image1.jpg", post_id=1, preview_image=False),
        PostImage(url="https://example.com/post1_image2.jpg", post_id=1, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/617z6N3l59L._AC_SL1500_.jpg", post_id=2, preview_image=True),
        PostImage(url="https://example.com/post2_image1.jpg", post_id=2, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/71x9JI-Il0L._AC_SL1500_.jpg", post_id=3, preview_image=True),
        PostImage(url="https://example.com/post3_image1.jpg", post_id=3, preview_image=False),
        PostImage(url="https://example.com/post3_image2.jpg", post_id=3, preview_image=False),
        PostImage(url="https://example.com/post3_image3.jpg", post_id=3, preview_image=False),
    ])
    db.session.commit()

def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_images"))
        
    db.session.commit()
