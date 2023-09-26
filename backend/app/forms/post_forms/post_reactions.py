from flask_wtf import FlaskForm
from wtforms import DecimalField
from wtforms.validators import DataRequired


class UpdateReactionsForm(FlaskForm):
    newNumber = DecimalField('newNumber', validators=[DataRequired()])
