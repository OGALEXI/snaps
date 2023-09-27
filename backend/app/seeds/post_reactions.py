from ..models import db, Post_Reaction
from sqlalchemy.sql import text


def seed_post_reactions():
    reaction1 = Post_Reaction(
        post_id=2, user_id=1
    )
    reaction2 = Post_Reaction(
        post_id=1, user_id=2
    )

    db.session.add(reaction1)
    db.session.add(reaction2)
    db.session.commit()


def undo_post_reactions():
    db.session.execute(text("DELETE FROM post_reactions"))
    db.session.commit()
