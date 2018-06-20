import random

from flask import Blueprint, jsonify, request

from blueprints.helpers import token_required
from models.candidate.candidate import Candidate
from transformers.candidate_transformer import CandidateTransformer

candidates = Blueprint('candidates', __name__)


@candidates.route('/candidates')
@token_required
def get_all_candidates(current_user):

    if not current_user.is_recruiter() and not current_user.is_admin():
        return jsonify({'message': 'You dont have access'})

    db_candidates = Candidate.query.all()
    candidates = CandidateTransformer.models_to_obj(db_candidates)

    return jsonify({'candidates': candidates})


@candidates.route('/candidates/<vacancy_public_id>')
@token_required
def get_all_candidates_for_vacancy(current_user, vacancy_public_id):

    if not current_user.is_recruiter() and not current_user.is_admin():
        return jsonify({'message': 'You dont have access'})


    db_candidates = Candidate.query.all()
    sub_selection = random.sample(db_candidates, len(db_candidates) // 2)
    candidates = CandidateTransformer.models_to_obj(sub_selection)

    return jsonify({'candidates': candidates})


@candidates.route('/candidate')
@token_required
def get_candidate(current_user):

    candidate = Candidate.query.filter_by(user_id=current_user.id).first()

    if not candidate:
        return jsonify({'message': 'Not a candidate'})

    candidate_data = CandidateTransformer.model_to_obj(candidate)

    return jsonify({'candidate': candidate_data})


@candidates.route('/candidate/<candidate_public_id>')
@token_required
def get_candidate_by_public_id(current_user, candidate_public_id):
    candidate = Candidate.query.filter_by(id=candidate_public_id).first()

    if not candidate:
        return jsonify({'message': 'No candidate found'})

    candidate_data = CandidateTransformer.model_to_obj(candidate)
    return jsonify({'candidate': candidate_data})


@candidates.route('/candidate/<candidate_public_id>', methods=['PUT'])
@token_required
def update_candidate(current_user, candidate_public_id):
    candidate = Candidate.query.filter_by(public_id=candidate_public_id).first()
    if not current_user.is_admin() and not current_user.id == candidate.user_id:
        return jsonify({'message': 'Cannot perform that function!'})

    new_data = request.get_json()

    candidate.first_name = new_data.get('first_name', candidate.first_name)
    candidate.last_name = new_data.get('last_name', candidate.last_name)
    candidate.pitch = new_data.get('pitch', candidate.pitch)
    candidate.location = new_data.get('location', candidate.location)
    candidate.phone_number = new_data.get('phone_number', candidate.phone_number)
    candidate.visa_status = new_data.get('visa_status', candidate.visa_status)

    candidate.save()

    return jsonify({'message': 'The candidate has been updated!'})


