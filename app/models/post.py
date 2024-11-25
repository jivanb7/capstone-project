from .db import db, add_prefix_for_prod, SCHEMA, environment

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    comments = db.relationship('Comment', backref='post', lazy=True, cascade="all, delete-orphan")
    likes = db.relationship('Like', backref='liked_post', lazy=True, cascade="all, delete-orphan")
    shared_posts = db.relationship('SharedPost', backref='shared_in_post', lazy=True, cascade="all, delete-orphan")
    images = db.relationship('PostImage', backref='post', lazy=True, cascade="all, delete-orphan") 

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'images': [image.to_dict() for image in self.images]
        }
