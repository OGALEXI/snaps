from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from ...models import User


def user_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError('Unauthorized.')


class NewPostForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    caption = StringField('caption')
