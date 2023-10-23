from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import Follower, db
from .auth_routes import validation_errors_to_msgs

follower_routes = Blueprint('followers', __name__)


@follower_routes.route('/new/<int:user_id>', methods=['POST'])
@login_required
def new_follower(user_id):
    follower = Follower(
        follower_id=current_user.id,
        user_id=user_id
    )
    db.session.add(follower)
    db.session.commit()
    return follower.to_dict()


@follower_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_follower(id):
    Follower.query.filter_by(follower_id=id).delete()
    db.session.commit()
    return {"message": "Follower deleted"}


@follower_routes.route('/<int:user_id>')
@login_required
def get_all_user_followers(user_id):
    followers = Follower.query.filter_by(user_id=user_id).all()
    return {'followers': [follower.to_dict() for follower in followers]}
