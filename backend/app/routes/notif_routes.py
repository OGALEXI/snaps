from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Notification
from .auth_routes import validation_errors_to_msgs
from ..forms.user_forms.notification import NewNotificationForm

notif_routes = Blueprint('notifs', __name__)


@notif_routes.route('/<int:user_id>/new', methods=['POST'])
@login_required
def new_notification(user_id):
    form = NewNotificationForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notif = Notification(
            message=form.data['message'],
            user_id=user_id
        )
        db.session.add(notif)
        db.session.commit()
        return notif.to_dict()

    return {'errors': validation_errors_to_msgs(form.errors)}, 401


@notif_routes.route('/<int:user_id>')
@login_required
def get_user_notifs(user_id):
    notifs = Notification.query.order_by(
        Notification.created_date.desc()).filter_by(user_id=user_id).all()
    return {'notifs': [notif.to_dict() for notif in notifs]}
