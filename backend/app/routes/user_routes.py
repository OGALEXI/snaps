from flask import Blueprint, request
from flask_login import login_required
from ..models import User
from ..forms.user_forms.update_follow import UpdateUserStatsForm
from ..models.db import db
from .auth_routes import validation_errors_to_msgs

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.order_by(User.id).all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/followers', methods=['PUT'])
@login_required
def update_follower_count(id):
    form = UpdateUserStatsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        user.number_of_followers = form.data['newNumber']
        db.session.commit()
        return user.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401


@user_routes.route('/<int:id>/posts', methods=['PUT'])
@login_required
def update_post_count(id):
    form = UpdateUserStatsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        user.number_of_posts = form.data['newNumber']
        db.session.commit()
        return user.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401


@user_routes.route('/<int:id>/following', methods=['PUT'])
@login_required
def update_following_count(id):
    form = UpdateUserStatsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        user.number_of_following = form.data['newNumber']
        db.session.commit()
        return user.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401
