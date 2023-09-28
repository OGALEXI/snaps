from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ...models import User, Post


def post_exists(form, field):
    post_id = field.data
    post = Post.query.get(post_id)
    if not post:
        raise ValidationError('Post does not exist.')


class NewCommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
