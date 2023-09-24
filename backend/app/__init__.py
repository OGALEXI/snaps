import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .models.db import db
from .seeds import seed_commands

host = os.environ["DB_HOST"]
database = os.environ["DB_NAME"]
user = os.environ["DB_USERNAME"]
password = os.environ["DB_PASSWORD"]


app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ["SECRET_KEY"]
app.config["SQLALCHEMY_DATABASE_URI"] = f'postgresql://{user}:{password}@{host}/{database}'

app.cli.add_command(seed_commands)
# TODO other routes

db.init_app(app)
Migrate(app, db)

CORS(app)


@app.route('/')
def hello():
    return '<h1>Hello World</h1>'
