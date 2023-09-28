from .db import db
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    created_date = db.Column(db.DateTime(
        timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    user = relationship('User', back_populates='comments')
    post = relationship('Post', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_date': self.created_date,
            'user_id': self.user_id,
            'post_id': self.post_id
        }
