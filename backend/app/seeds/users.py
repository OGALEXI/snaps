from ..models.db import db
from ..models.user import User
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        firstname='Demo', lastname='User', username='DemoUser', email='demo@user.com', password='password', number_of_posts=1, number_of_following=1, number_of_followers=1
    )
    bob = User(
        firstname='Bob', lastname='Bobert', username='BobBobert', email='bob@bob.com', password='password'
    )
    mike = User(
        firstname='Mike', lastname='Ross', username='MikeRoss', email='mike@ross.com', password='harvey'
    )

    db.session.add(demo)
    db.session.add(bob)
    db.session.add(mike)
    db.session.commit()


def undo_users():
    db.session.execute(text("DELETE FROM users"))
    db.session.commit()
