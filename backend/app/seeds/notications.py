from ..models import db, Notification
from sqlalchemy.sql import text


def seed_notifications():
    notification1 = Notification(
        message="blablabla", user_id=1, recipient_id=2
    )
    notification2 = Notification(
        message="blablabla", user_id=2, recipient_id=1
    )
    notif3 = Notification(
        message="Mike liked your post", user_id=1, recipient_id=2
    )
    notif4 = Notification(
        message="Harvey liked your post", user_id=1, recipient_id=2
    )

    db.session.add(notification1)
    db.session.add(notification2)
    db.session.add(notif3)
    db.session.add(notif4)
    db.session.commit()


def undo_notifications():
    db.session.execute(text("DELETE FROM notifications"))
    db.session.commit()
