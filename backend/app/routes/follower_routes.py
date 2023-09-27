from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms.follower_forms.new_follower import NewFollowerForm
from ..models import Follower, db
from .auth_routes import validation_errors_to_msgs

follower_routes = Blueprint('followers', __name__)


@follower_routes.route('/new', methods=['POST'])
@login_required
def new_follower():
    form = NewFollowerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        follower = Follower(
            follower_id=form.data['follower_id'],
            user_id=form.data['user_id']
        )
        db.session.add(follower)
        db.session.commit()
        return follower.to_dict()
    return {'errors': validation_errors_to_msgs(form.errors)}, 401


@follower_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_follower(id):
    Follower.query.filter_by(id=id).delete()
    db.session.commit()
    return {"message": "Follower deleted"}


@follower_routes.route('/<int:user_id>/')
@login_required
def get_all_user_followers(user_id):
    followers = Follower.query.filter_by(user_id=user_id).all()
    return {'followers': [follower.to_dict() for follower in followers]}


@follower_routes.route('/<int:user_id>/following')
@login_required
def check_if_following(user_id):
    follower = Follower.query.filter_by(
        follower_id=current_user.id).filter_by(user_id=user_id).first()
    if follower:
        return {'following': 'True'}
    else:
        return {'following': 'False'}
