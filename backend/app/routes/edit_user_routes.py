from flask import Blueprint, request
from flask_login import login_required
from ..models import User
from ..forms.user_forms.edit_user import EditUserInfoForm
from ..models.db import db
from .auth_routes import validation_errors_to_msgs

edit_user_routes = Blueprint('edit_user', __name__)


@edit_user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    form = EditUserInfoForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)

        user.firstname = form.data['firstname']
        user.lastname = form.data['lastname']
        user.avatar = form.data['avatar']
        user.bio = form.data['bio']
        db.session.commit()
        return user.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401
