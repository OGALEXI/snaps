from .db import db
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class Post(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    category = db.Column(db.Integer, nullable=False)
    created_date = db.Column(db.DateTime(
        timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    number_of_reactions = db.Column(db.Integer, nullable=True)

    user = relationship('User', back_populates='posts')
    post_reactions = relationship(
        'Post_Reaction', back_populates='post', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'category': self.category,
            'created_date': self.created_date,
            'number_of_reactions': self.number_of_reactions
        }
