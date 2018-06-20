from unittest import TestCase

from models.candidate.candidate import Candidate
from transformers.candidate_transformer import CandidateTransformer


class CandidateTransformerTestCase(TestCase):

    def test_can_transform_list_of_models_into_list_of_obj(self):
        models = [
            Candidate(
                first_name='martin',
                last_name='mcgirk',
                pitch='I am great',
                location='NSW',
                visa_status='PR',
                phone_number='0800',
                user_id=1,
                id=1,
                public_id='testpublicid'
            ),
            Candidate(
                first_name='bob',
                last_name='hope',
                pitch='I am decent',
                location='NSW',
                visa_status='PR',
                phone_number='0800',
                user_id=1,
                id=1,
                public_id='testpublicid2'
            )
        ]
        expected_obj = [
            {
                'public_id': 'testpublicid',
                'first_name': 'martin',
                'last_name': 'mcgirk',
                'full_name': 'martin mcgirk',
                'pitch': 'I am great',
                'location': 'NSW',
                'visa_status': 'PR',
                'phone_number': '0800',
            },
            {
                'public_id': 'testpublicid2',
                'first_name': 'bob',
                'last_name': 'hope',
                'full_name': 'bob hope',
                'pitch': 'I am decent',
                'location': 'NSW',
                'visa_status': 'PR',
                'phone_number': '0800',
            }
        ]
        actual = CandidateTransformer.models_to_obj(models)
        self.assertEqual(actual, expected_obj)

    def test_can_transform_from_model_to_obj(self):
        model = Candidate(
            first_name='martin',
            last_name='mcgirk',
            pitch='I am great',
            location='NSW',
            visa_status='PR',
            phone_number='0800',
            user_id=1,
            id=1,
            public_id='testpublicid'
        )
        expected_obj = {
            'public_id': 'testpublicid',
            'first_name': 'martin',
            'last_name': 'mcgirk',
            'full_name': 'martin mcgirk',
            'pitch': 'I am great',
            'location': 'NSW',
            'visa_status': 'PR',
            'phone_number': '0800',
        }
        actual = CandidateTransformer.model_to_obj(model)
        self.assertEqual(expected_obj, actual)