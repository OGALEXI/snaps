from ..models.db import db
from ..models.follower import Follower
from sqlalchemy.sql import text


def seed_followers():
    demoFollower = Follower(
        follower_id=1, user_id=2
    )
    bobFollower = Follower(
        follower_id=2, user_id=1
    )

    db.session.add(demoFollower)
    db.session.add(bobFollower)
    db.session.commit()


def undo_followers():
    db.session.execute(text("DELETE FROM followers"))
    db.session.commit()
