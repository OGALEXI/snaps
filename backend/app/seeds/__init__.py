from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .post_reactions import seed_post_reactions, undo_post_reactions
from .notications import seed_notifications, undo_notifications
from .followers import seed_followers, undo_followers
from .comments import seed_comments, undo_comments

import os

environment = os.environ["ENVIRONMENT"]

seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_comments()
        undo_followers()
        undo_notifications()
        undo_post_reactions()
        undo_posts()
        undo_users()

    seed_users()
    seed_posts()
    seed_post_reactions()
    seed_notifications()
    seed_followers()
    seed_comments()


@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_followers()
    undo_notifications()
    undo_post_reactions()
    undo_posts()
    undo_users()
