from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ...models import User


def user_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError('User does not exist.')


class NewNotificationForm(FlaskForm):
    message = StringField('message', validators=[DataRequired()])
