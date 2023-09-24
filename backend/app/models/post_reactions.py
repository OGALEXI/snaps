from .db import db
from sqlalchemy import relationship


class Post_Reaction(db.Model):
    __tablename__ = 'post_reactions'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    post = relationship('Post', back_populates='post_reactions')
    users = relationship('User', back_populates='post_reactions')
