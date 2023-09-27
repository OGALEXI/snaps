from flask import Blueprint, request
from flask_login import login_required
from ..models import User
from ..forms.user_forms.edit_user import EditUserInfoForm
from ..models.db import db
from .auth_routes import validation_errors_to_msgs

edit_user_routes = Blueprint('edit_user', __name__)


@edit_user_routes.route('/<int:id>/avatar', methods=['PUT'])
@login_required
def edit_avatar(id):
    form = EditUserInfoForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)

        user.avatar = form.data['content']
        db.session.commit()
        return user.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401


@edit_user_routes.route('/<int:id>/firstname', methods=['PUT'])
@login_required
def edit_firstname(id):
    form = EditUserInfoForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)

        user.firstname = form.data['content']
        db.session.commit()
        return user.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401


@edit_user_routes.route('/<int:id>/lastname', methods=['PUT'])
@login_required
def edit_lastname(id):
    form = EditUserInfoForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)

        user.lastname = form.data['content']
        db.session.commit()
        return user.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401
