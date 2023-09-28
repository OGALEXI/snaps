import os
from flask import Flask
from flask_wtf.csrf import generate_csrf
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager
from .models.db import db
from .models.user import User
from .seeds import seed_commands
from .routes.auth_routes import auth_routes
from .routes.user_routes import user_routes
from .routes.post_routes import post_routes
from .routes.follower_routes import follower_routes
from .routes.edit_user_routes import edit_user_routes
from .routes.notif_routes import notif_routes
from .routes.comment_routes import comment_routes

host = os.environ["DB_HOST"]
database = os.environ["DB_NAME"]
user = os.environ["DB_USERNAME"]
password = os.environ["DB_PASSWORD"]


app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ["SECRET_KEY"]
app.config["SQLALCHEMY_DATABASE_URI"] = f'postgresql://{user}:{password}@{host}/{database}'

login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


app.cli.add_command(seed_commands)
# TODO other routes
app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(user_routes, url_prefix='/users')
app.register_blueprint(post_routes, url_prefix='/posts')
app.register_blueprint(follower_routes, url_prefix='/followers')
app.register_blueprint(edit_user_routes, url_prefix='/edituser')
app.register_blueprint(notif_routes, url_prefix='/notifs')
app.register_blueprint(comment_routes, url_prefix='/comments')

db.init_app(app)
Migrate(app, db)

CORS(app)


@app.after_request
def give_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
    )
    return response
