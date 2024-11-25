from .db import db, add_prefix_for_prod,  environment, SCHEMA

class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    db.UniqueConstraint('follower_id', 'followed_id', name='unique_follow')

    def to_dict(self):
        return {
            'id': self.id,
            'follower_id': self.follower_id,
            'followed_id': self.followed_id
        }
