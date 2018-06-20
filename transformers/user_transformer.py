class UserTransformer:

    @staticmethod
    def models_to_obj(user_models):
        return [UserTransformer.model_to_obj(model) for model in user_models]

    @staticmethod
    def model_to_obj(user_model):
        return {
            'public_id': user_model.public_id,
            'username': user_model.username,
            'password': user_model.password,
            'role': user_model.role
        }
