from ..models.db import db
from ..models.user import User
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        firstname='Demo', lastname='User', username='DemoUser', email='demo@user.com', password='password'
    )
    bob = User(
        firstname='Bob', lastname='Bobert', username='BobBobert', email='bob@bob.com', password='password'
    )

    db.session.add(demo)
    db.session.add(bob)
    db.session.commit()


def undo_users():
    db.session.execute(text("DELETE FROM users"))
    db.session.commit()
