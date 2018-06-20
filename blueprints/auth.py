import datetime
import uuid

import jwt
from flask import Blueprint, request, make_response, jsonify, current_app
from werkzeug.security import check_password_hash, generate_password_hash

from blueprints.helpers import get_token
from extensions import db
from models.candidate.candidate import Candidate
from models.user.user import User

auth = Blueprint('auth', __name__)


@auth.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required"'})

    user = User.query.filter_by(username=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({
            'public_id': user.public_id,
            'user': {
                'public_id': user.public_id,
                'role': user.role
            },
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=4)},
            current_app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required"'})


@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    username = data['username']
    password = data['password']
    first_name = data['first_name']
    last_name = data['last_name']
    role = data['role']

    if not username or not password:
        return make_response('You must provide a username and password', 401)

    if not first_name or not last_name:
        return make_response('You must provide a first name and last name', 401)

    if not role:
        return make_response('You must provide a role', 401)

    if role not in ['candidate', 'recruiter']:
        return make_response('That role type does not exist', 401)

    user = User.query.filter_by(username=username).first()
    if user:
        return make_response('User already exists with that email', 401)

    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(
        username=username,
        password=hashed_password,
        role=role
    ).save()

    if role == 'candidate':
        Candidate(
            first_name=first_name,
            last_name=last_name,
            user_id=new_user.id
        ).save()

    token = get_token(new_user)

    return jsonify({
        'message': 'New user created!',
        'token': token
    })


@auth.route('/check_token_is_valid', methods=['POST'])
def check_token_is_valid():
    body = request.get_json()
    token = body['token']
    try:
        data = jwt.decode(token, current_app.config['SECRET_KEY'])

        return jsonify(token_is_valid=True)
    except:
        return jsonify(token_is_valid=False)