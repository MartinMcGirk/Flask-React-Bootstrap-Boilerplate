import datetime
from functools import wraps

import jwt
from flask import request, jsonify, current_app

from models.user.user import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing.'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'Token is invalid.'}), 401

        return f(current_user, *args, **kwargs)
    return decorated


def get_token(user):
    token = jwt.encode({
        'public_id': user.public_id,
        'user': {
            'public_id': user.public_id,
            'role': user.role
        },
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=4)},
        current_app.config['SECRET_KEY'])
    return token.decode('UTF-8')