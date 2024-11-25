from .db import db, add_prefix_for_prod, environment, SCHEMA

class SharedPost(db.Model):
    __tablename__ = 'shared_posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False) 
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    db.UniqueConstraint('post_id', 'recipient_id', name='unique_shared_post')

    sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_shared_posts', lazy=True)
    recipient = db.relationship('User', foreign_keys=[recipient_id], backref='received_shared_posts', lazy=True)
    post = db.relationship('Post', backref='shared_in_posts', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'post_id': self.post_id,
            'recipient_id': self.recipient_id
        }
