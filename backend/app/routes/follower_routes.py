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
