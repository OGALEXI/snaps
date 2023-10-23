from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from ...models import User


class EditUserInfoForm(FlaskForm):
    firstname = StringField('firstname')
    lastname = StringField('lastname')
    avatar = StringField('avatar')
    bio = StringField('bio')
