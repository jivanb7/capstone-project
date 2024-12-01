from app.models import db, PostImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_post_images():
    db.session.add_all([
        PostImage(url="https://m.media-amazon.com/images/I/71XzySKdedL._SL1250_.jpg", post_id=1, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/51BMXpjOXSL.jpg", post_id=1, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/51yWZxN3vRL._AC_SL1188_.jpg", post_id=2, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/61ARqaLBktL._AC_SL1307_.jpg", post_id=2, preview_image=False),
        PostImage(url="https://m.media-amazon.com/images/I/51AYjJpFSuL._AC_SL1500_.jpg", post_id=2, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/71SkhUpW+sS._AC_SL1500_.jpg", post_id=3, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/71N+ScqNATL._AC_SL1500_.jpg", post_id=4, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/81kLa9mGqNL._AC_SL1500_.jpg", post_id=4, preview_image=False),
        PostImage(url='https://m.media-amazon.com/images/I/71my-mWW1eL._AC_SL1500_.jpg', post_id=4, preview_image=False),
    
        PostImage(url="https://m.media-amazon.com/images/I/91K8TYMlpfL._SL1500_.jpg", post_id=5, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/81IUVGOFIGL._SL1500_.jpg", post_id=6, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/715Mh2MmA8L._AC_SL1500_.jpg", post_id=7, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/91RZKutT5gL._SL1500_.jpg", post_id=8, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/61Z1YA+pX9L.jpg", post_id=9, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/71FJp9C0SoL.jpg", post_id=10, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/81YyZGuP-OL.jpg", post_id=10, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/61iKtkgVO6L.jpg", post_id=11, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/71l4IltZBHL.jpg", post_id=11, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/71y7O0b1UTL.jpg", post_id=12, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/71e1yBCkHBL.jpg", post_id=12, preview_image=False),
        PostImage(url='https://m.media-amazon.com/images/I/717A1pPBtzL.jpg', post_id=12, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/61ncvLHkA+L.jpg", post_id=13, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/71OKyoZ-AkL.jpg", post_id=13, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/719NXaao0VL.jpg", post_id=14, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/81v7Nl6HU-L._AC_SL1500_.jpg", post_id=15, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/61WwlTqwYqL.jpg", post_id=15, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/71rHEj4NIXL.jpg", post_id=16, preview_image=True),

        PostImage(url="https://m.media-amazon.com/images/I/71IUoa9veCL.jpg", post_id=17, preview_image=True),
        PostImage(url="https://m.media-amazon.com/images/I/71G-Su6mzFL.jpg", post_id=17, preview_image=False),
        PostImage(url="https://m.media-amazon.com/images/I/61Rrv4kd7AL.jpg", post_id=17, preview_image=False),

        PostImage(url="https://m.media-amazon.com/images/I/71tyTG3P1FL.jpg", post_id=18, preview_image=True),
    ])
    db.session.commit()

def undo_post_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.post_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM post_images"))
        
    db.session.commit()
