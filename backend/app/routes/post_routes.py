from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import User, Post, db
from .auth_routes import validation_errors_to_msgs
from ..forms.post_forms.new_post import NewPostForm
from ..forms.post_forms.post_reactions import UpdateReactionsForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def get_all_posts():
    posts = Post.query.order_by(Post.created_date.desc()).all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/new', methods=['POST'])
@login_required
def create_new_post():
    form = NewPostForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            content=form.data['content'],
            caption=form.data['caption'],
            user_id=current_user.id
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()

    return {'errors': validation_errors_to_msgs(form.errors)}, 401


@post_routes.route('/<int:post_id>')
@login_required
def get_post(post_id):
    post = Post.query.get(post_id)
    return post.to_dict()


@post_routes.route('/<int:post_id>/reactions', methods=['PUT'])
@login_required
def update_post_count(post_id):
    form = UpdateReactionsForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(post_id)
        post.number_of_reactions = form.data['newNumber']
        db.session.commit()
        return post.to_dict()

    else:
        return {'errors': validation_errors_to_msgs(form.errors)}, 401
