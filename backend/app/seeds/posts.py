from ..models import db, Post
from sqlalchemy.sql import text


def seed_posts():
    demoPost = Post(
        content="beepeeeeee", caption="New yacht!! Woo!", user_id=1
    )
    bobPost = Post(
        content="woooo", caption="Bruh, lameee", user_id=2
    )

    db.session.add(demoPost)
    db.session.add(bobPost)


def undo_posts():
    db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
