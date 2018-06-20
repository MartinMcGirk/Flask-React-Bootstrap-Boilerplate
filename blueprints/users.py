import uuid

from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

from blueprints.helpers import token_required
from extensions import db
from models.user.user import User
from transformers.user_transformer import UserTransformer

users = Blueprint('users', __name__)


@users.route('/user', methods=['GET'])
@token_required
def get_all_users(current_user):

    if not current_user.is_admin():
        return jsonify({'message': 'Cannot perform that function!'})

    users = User.query.all()
    user_transformer = UserTransformer()
    output = user_transformer.models_to_obj(users)

    return jsonify({'users': output})


@users.route('/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):
    if not current_user.is_admin():
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message': 'No user found'})

    user_transformer = UserTransformer()
    user_data = user_transformer.model_to_obj(user)

    return jsonify({'user': user_data})


@users.route('/user', methods=['POST'])
@token_required
def create_user(current_user):
    if not current_user.is_admin():
        return jsonify({'message': 'Cannot perform that function!'})

    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        public_id=str(uuid.uuid4()),
        username=data['username'],
        password=hashed_password,
        role='candidate'
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'New user created!'})


@users.route('/user/<public_id>', methods=['PUT'])
@token_required
def promote_user(current_user, public_id):
    if not current_user.is_admin():
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found'})

    user.role = 'admin'
    db.session.commit()

    return jsonify({'message': 'The user has been promoted to admin'})


@users.route('/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    if not current_user.is_admin():
        return jsonify({'message': 'Cannot perform that function!'})

    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message' : 'The user has been deleted!'})
