from .db import db, add_prefix_for_prod, environment, SCHEMA

class SharedPost(db.Model):
    __tablename__ = 'shared_posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    db.UniqueConstraint('post_id', 'recipient_id', name='unique_shared_post')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'recipient_id': self.recipient_id
        }
