from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .follows import seed_follows, undo_follows
from .shared_posts import seed_shared_posts, undo_shared_posts
from .post_images import seed_post_images, undo_post_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_posts()
        undo_comments()
        undo_likes()
        undo_follows()
        undo_shared_posts()
        undo_post_images()

    seed_users()
    # Add other seed functions here
    seed_posts()
    seed_comments()
    seed_likes()
    seed_follows()
    seed_shared_posts()
    seed_post_images()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_posts()
    undo_comments()
    undo_likes()
    undo_follows()
    undo_shared_posts()
    undo_post_images()
