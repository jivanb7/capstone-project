from flask import Blueprint, jsonify, request
from app.models import Post, db
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_all_posts():
    """
    Retrieves all posts with their comments.
    """
    posts = Post.query.options(joinedload(Post.author)).all()

    response = [
        {
            **post.to_dict(),
            'username': post.author.username,
            'comments': [comment.to_dict() for comment in post.comments]
        }
        for post in posts
    ]
    return jsonify(response)

@post_routes.route('/current', methods=['GET'])
@login_required
def get_user_posts():
    """
    Retrieves all posts made by the current user.
    """
    posts = Post.query.filter(Post.user_id == current_user.id).all()

    return jsonify([post.to_dict() for post in posts])

@post_routes.route('/<int:post_id>', methods=['GET'])
def get_post_details(post_id):
    """
    Retrieves details for a single post, including its comments and images.
    """
    # post = Post.query.options(
    #     joinedload(Post.comments),
    #     joinedload(Post.images)
    # ).get(post_id)

    # if post is None:
    #     return {'error': 'Post not found'}, 404 
    
    # return jsonify({
    #     'post': post.to_dict(),
    #     'comments': [comment.to_dict() for comment in post.comments],
    #     'images': [image.to_dict() for image in post.images]
    # }), 200

    post = Post.query.options(
        joinedload(Post.comments),
        joinedload(Post.images)
    ).get(post_id)

    if post is None:
        return {'error': 'Post not found'}, 404
    
    post_data = {
        **post.to_dict(),
        'username': post.author.username 
    }
    
    comments_data = [
        {**comment.to_dict(), 'username': comment.author.username} 
        for comment in post.comments
    ]
    
    images_data = [image.to_dict() for image in post.images]
    
    return jsonify({
        'post': post_data,
        'comments': comments_data,
        'images': images_data
    }), 200

@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    """
    Creates a new post for the authenticated user.
    """
    data = request.get_json()
    content = data.get('content')

    if not content or len(content.strip()) == 0:
        return {'error': 'Content is required and cannot be empty.'}, 400

    new_post = Post(
        content=content,
        user_id=current_user.id
    )
    db.session.add(new_post)
    db.session.commit()

    return jsonify(new_post.to_dict()), 201

@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):
    """
    Edits an existing post for the authenticated user.
    """
    data = request.get_json()
    content = data.get('content')

    if not content or len(content.strip()) == 0:
        return {'error': 'Content is required and cannot be empty.'}, 400

    post = Post.query.get(post_id)
    if not post:
        return {'error': 'Post not found.'}, 404

    if post.user_id != current_user.id:
        return {'error': 'Unauthorized to edit this post.'}, 403

    post.content = content
    db.session.commit()

    return jsonify(post.to_dict()), 200

@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    """
    Deletes a post owned by the authenticated user.
    """
    post = Post.query.get(post_id)
    if not post:
        return {'error': 'Post not found.'}, 404

    if post.user_id != current_user.id:
        return {'error': 'Unauthorized to delete this post.'}, 403

    db.session.delete(post)
    db.session.commit()

    return {'message': f'Post {post_id} has been deleted successfully.'}, 200