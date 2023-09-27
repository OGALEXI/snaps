from ..models import db, Notification
from sqlalchemy.sql import text


def seed_notifications():
    notification1 = Notification(
        image="todo", message="blablabla", user_id=1
    )
    notification2 = Notification(
        image="todo", message="blablabla", user_id=2
    )

    db.session.add(notification1)
    db.session.add(notification2)
    db.session.commit()


def undo_notifications():
    db.session.execute(text("DELETE FROM notifications"))
    db.session.commit()
