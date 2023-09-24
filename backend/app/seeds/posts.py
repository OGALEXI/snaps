from ..models import db, Post
from sqlalchemy.sql import text


def seed_posts():
    demoPost = Post(
        content="beepeeeeee", category=1, user_id=1
    )
    bobPost = Post(
        content="woooo", category=1, user_id=2
    )

    db.session.add(demoPost)
    db.session.add(bobPost)


def undo_posts():
    db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
