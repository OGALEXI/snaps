from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import Post, db, Comment
from .auth_routes import validation_errors_to_msgs
from ..forms.post_forms.create_comment import NewCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:post_id>/new', methods=['POST'])
@login_required
def create_new_comment(post_id):
    form = NewCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            content=form.data['content'],
            post_id=post_id,
            user_id=current_user.id
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

    return {'errors': validation_errors_to_msgs(form.errors)}, 401


@comment_routes.route('/<int:post_id>')
@login_required
def get_posts_comments(post_id):
    comments = Comment.query.filter_by(post_id=post_id).order_by(
        Comment.created_date.desc()).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    post = Post.query.filter_by(id=comment.post_id).first()
    if comment.user_id != current_user.id and post.user_id != current_user.id:
        return {'message': 'Cannot delete another users comment'}
    if (comment):
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Successfully deleted.'}
    else:
        return {'message': 'Comment already deleted.'}
