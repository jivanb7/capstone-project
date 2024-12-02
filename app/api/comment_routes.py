from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Comment, db

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/current', methods=['GET'])
@login_required
def get_user_comments():
    """
    Retrieves all comments made by the current user.
    """
    comments = Comment.query.filter(Comment.user_id == current_user.id).all()

    return jsonify([comment.to_dict() for comment in comments]), 200

@comment_routes.route('/<int:post_id>', methods=['GET'])
def get_comments_by_post(post_id):
    """
    Retrieves all comments for a specific post by post ID.
    """
    # comments = Comment.query.filter(Comment.post_id == post_id).all()

    # return jsonify([comment.to_dict() for comment in comments]), 200
    comments = Comment.query.options(joinedload(Comment.author)).filter(Comment.post_id == post_id).all()

    response = [
        {
            **comment.to_dict(),
            'username': comment.author.username
        }
        for comment in comments
    ]

    return jsonify(response)

@comment_routes.route('/<int:post_id>', methods=['POST'])
@login_required
def create_comment(post_id):
    """
    Creates a comment for the specified post.
    """
    data = request.get_json()
    description = data.get('description')

    if not description or len(description.strip()) == 0:
        return {'error': 'A valid description is required.'}, 400

    new_comment = Comment(
        post_id=post_id,
        user_id=current_user.id,
        description=description
    )
    db.session.add(new_comment)
    db.session.commit()

    return jsonify(new_comment.to_dict()), 201

@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    """
    Edits a comment for the authenticated user.
    """
    data = request.get_json()
    description = data.get('description')

    if not description or len(description.strip()) == 0:
        return {'error': 'A valid description is required.'}, 400

    comment = Comment.query.get(comment_id)
    if not comment:
        return {'error': 'Comment not found.'}, 404

    if comment.user_id != current_user.id:
        return {'error': 'Unauthorized to edit this comment.'}, 403

    comment.description = description
    db.session.commit()

    return jsonify(comment.to_dict()), 200

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    """
    Deletes a comment for the authenticated user.
    """
    comment = Comment.query.get(comment_id)
    if not comment:
        return {'error': 'Comment not found.'}, 404

    if comment.user_id != current_user.id:
        return {'error': 'Unauthorized to delete this comment.'}, 403

    db.session.delete(comment)
    db.session.commit()

    return {'message': f'Comment {comment_id} has been deleted successfully.'}, 200

