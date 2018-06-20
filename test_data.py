from werkzeug.security import generate_password_hash

from models.candidate.candidate import Candidate
from models.user.user import User


def add_candidate_data():
    user_candidate = User(
        username='test',
        password=generate_password_hash('test', method='sha256'),
        role='candidate'
    ).save()

    candidate = Candidate(
        first_name='Martin',
        last_name='McGirk',
        user=user_candidate,
        location='NSW',
        pitch="Hi, I'm a senior software developer currently working at a startup in the centre of Edinburgh, I'm super good at all things Salesforce, so let's see how I can help your business reach it's goals and get me paid!",
        user_id=user_candidate.id
    ).save()


def add_recruiter_data():
    user_recruiter = User(
        username='rec',
        password=generate_password_hash('test', method='sha256'),
        role='recruiter'
    ).save()


def create_test_data():
    add_candidate_data()
    add_recruiter_data()