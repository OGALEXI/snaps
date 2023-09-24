from .db import db
from sqlalchemy.orm import relationship


class Follower(db.Model):
    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    follower = relationship('User', back_populates='follower')
    user = relationship('User', back_populates='follower')
