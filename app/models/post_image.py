from .db import db, add_prefix_for_prod, environment, SCHEMA

class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    url = db.Column(db.String, nullable=False)
    preview_image = db.Column(db.Boolean, nullable=False, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'url': self.url,
            'preview_image': self.preview_image
        }
