from ..models import db, Comment
from sqlalchemy.sql import text


def seed_comments():
    comment1 = Comment(
        content="blablabla", user_id=1, post_id=2
    )
    comment2 = Comment(
        content="blablabla", user_id=2, post_id=1
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.commit()


def undo_comments():
    db.session.execute(text("DELETE FROM comments"))
    db.session.commit()
