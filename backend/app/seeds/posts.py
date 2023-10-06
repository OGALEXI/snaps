from ..models import db, Post
from sqlalchemy.sql import text


def seed_posts():
    demoPost = Post(
        content="https://cdn2.thecatapi.com/images/dg6.jpg", caption="New yacht!! Woo!", user_id=1
    )
    bobPost = Post(
        content="woooo", caption="Bruh, lameee", user_id=2
    )
    demoPost2 = Post(
        content="https://cdn2.thecatapi.com/images/MjA2NTEyMg.jpg", caption="yeayuhhh", user_id=1
    )
    demoPost3 = Post(
        content="https://cdn2.thecatapi.com/images/MTY4NzI0Ng.jpg", caption="yeayuhhh", user_id=1
    )
    demoPost4 = Post(
        content="https://cdn2.thecatapi.com/images/1j7vyj1d7.png", caption="yeayuhhh", user_id=1
    )
    demoPost5 = Post(
        content="https://cdn2.thecatapi.com/images/a5s.jpg", caption="yeayuhhh", user_id=1
    )
    demoPost6 = Post(
        content="https://cdn2.thecatapi.com/images/ce8.jpg", caption="yeayuhhh", user_id=1
    )

    db.session.add(demoPost)
    db.session.add(bobPost)
    db.session.add(demoPost2)
    db.session.add(demoPost3)
    db.session.add(demoPost4)
    db.session.add(demoPost5)
    db.session.add(demoPost6)
    db.session.commit()


def undo_posts():
    db.session.execute(text("DELETE FROM posts"))
    db.session.commit()
