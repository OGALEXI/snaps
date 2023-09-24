from .db import db
from sqlalchemy.orm import relationship


class Post_Reaction(db.Model):
    __tablename__ = 'post_reactions'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    post = relationship('Post', back_populates='post_reactions')
    user = relationship('User', back_populates='post_reactions')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user_id': self.user_id
        }
