from .db import db
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    firstname = db.Column(db.String(255), nullable=False)
    lastname = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=True)
    number_of_posts = db.Column(db.BigInteger, nullable=True)
    number_of_followers = db.Column(db.BigInteger, nullable=True)
    number_of_following = db.Column(db.BigInteger, nullable=True)

    posts = relationship('Post', back_populates='user',
                         cascade='all, delete-orphan')
    post_reactions = relationship(
        'Post_Reaction', back_populates='user', cascade='all, delete-orphan')
    notifications = relationship(
        'Notification', back_populates='user', cascade='all, delete-orphan')
    comments = relationship(
        'Comment', back_populates='user', cascade='all, delete-orphan')

    # TODO - Hashed password setter, getter, and checker
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'avatar': self.avatar,
            'number_of_posts': self.number_of_posts,
            'number_of_followers': self.number_of_followers,
            'number_of_following': self.number_of_following
        }
