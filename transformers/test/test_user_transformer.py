from unittest import TestCase

from models.user.user import User
from transformers.user_transformer import UserTransformer


class UserTransformerTestCase(TestCase):

    def test_can_transform_list_of_models_into_list_of_obj(self):
        models = [
            User(
                username='martin',
                password='password',
                role='admin',
                id=1,
                public_id='testpublicid',
            ),
            User(
                username='bob',
                password='notpassword',
                role='candidate',
                id=2,
                public_id='testpublicid2',
            )
        ]
        expected_obj = [
            {
                'public_id': 'testpublicid',
                'username': 'martin',
                'password': 'password',
                'role': 'admin'
            },
            {
                'public_id': 'testpublicid2',
                'username': 'bob',
                'password': 'notpassword',
                'role': 'candidate'
            }
        ]
        actual = UserTransformer.models_to_obj(models)
        self.assertEqual(actual, expected_obj)

    def test_can_transform_from_model_to_obj(self):
        model = User(
            username='martin',
            password='password',
            role='admin',
            id=1,
            public_id='testpublicid',
        )
        expected_obj = {
            'public_id': 'testpublicid',
            'username': 'martin',
            'password': 'password',
            'role': 'admin'
        }
        actual = UserTransformer.model_to_obj(model)
        self.assertEqual(expected_obj, actual)
