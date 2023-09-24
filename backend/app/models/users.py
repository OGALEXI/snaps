from .db import db
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    firstname = db.Column(db.String(255), nullable=False)
    lastname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=False)
    number_of_posts = db.Column(db.BigInteger, nullable=True)
    number_of_followers = db.Column(db.BigInteger, nullable=True)
    number_of_following = db.Column(db.BigInteger, nullable=True)

    followers = relationship(
        'Follower', back_populates='user', cascade='all, delete-orphan')
    posts = relationship('Post', back_populates='user',
                         cascade='all, delete-orphan')
    post_reactions = relationship(
        'Post_Reaction', back_populates='user', cascade='all, delete-orphan')
    notifications = relationship(
        'Notification', back_populates='user', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'password': self.password,
            'avatar': self.avatar,
            'number_of_posts': self.number_of_posts,
            'number_of_followers': self.number_of_followers,
            'number_of_following': self.number_of_following
        }
