from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ...models import User


def follower_is_valid(form, field):
    follower_id = field.data
    if follower_id != current_user.id:
        raise ValidationError('You must sign in to follow someone.')


def user_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError('User does not exist.')


class NewFollowerForm(FlaskForm):
    follower_id = StringField('follower_id', validators=[
                              DataRequired(), follower_is_valid])
    user_id = StringField('user_id', validators=[DataRequired(), user_exists])
