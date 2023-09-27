from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import Post, db, Post_Reaction
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


@post_routes.route('/browse/<int:user_id>')
@login_required
def get_user_posts(user_id):
    posts = Post.query.order_by(
        Post.created_date.desc()).filter_by(user_id=user_id).all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:post_id>/delete', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.filter_by(id=post_id).filter_by(
        user_id=current_user.id).first()
    if post:
        db.session.delete(post)
        db.session.commit()
        return {'message': 'Successfully deleted.'}
    else:
        return {'message': 'Could not find post'}


# POST REACTIONS ROUTES

@post_routes.route('/<int:post_id>/react', methods=['POST'])
@login_required
def create_post_reaction(post_id):
    prev_reaction = Post_Reaction.query.filter_by(
        post_id=post_id).filter_by(user_id=current_user.id).first()
    if not prev_reaction:
        post_reaction = Post_Reaction(
            post_id=post_id,
            user_id=current_user.id
        )
        db.session.add(post_reaction)
        db.session.commit()
        return post_reaction.to_dict()
    else:
        return {'message': 'Cannot like a post twice.'}


@post_routes.route('/<int:post_id>/reacted')
@login_required
def did_user_like(post_id):
    reaction = Post_Reaction.query.filter_by(
        post_id=post_id).filter_by(user_id=current_user.id).first()
    if reaction:
        return {'reacted': 'True'}
    else:
        return {'reacted': 'False'}


@post_routes.route('/reactions/<int:reaction_id>/delete', methods=['DELETE'])
@login_required
def delete_reaction(reaction_id):
    reaction = Post_Reaction.query.filter_by(
        id=reaction_id).filter_by(user_id=current_user.id).first()
    if (reaction):
        db.session.delete(reaction)
        db.session.commit()
        return {'message': 'Successfully deleted.'}
    else:
        return {'message': 'You must be logged in.'}


@post_routes.route('/<int:post_id>/reactions')
@login_required
def get_post_reactions(post_id):
    reactions = Post_Reaction.query.filter_by(post_id=post_id).all()
    return {'posts': [reaction.to_dict() for reaction in reactions]}
