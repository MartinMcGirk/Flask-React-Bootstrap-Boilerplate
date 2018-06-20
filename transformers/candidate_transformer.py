class CandidateTransformer:
    @staticmethod
    def models_to_obj(candidate_models):
        return [CandidateTransformer.model_to_obj(model) for model in candidate_models]

    @staticmethod
    def model_to_obj(candidate_model):
        return {
            'public_id': candidate_model.public_id,
            'first_name': candidate_model.first_name or '',
            'last_name': candidate_model.last_name or '',
            'full_name': candidate_model.full_name or '',
            'pitch': candidate_model.pitch or '',
            'location': candidate_model.location or '',
            'phone_number': candidate_model.phone_number or '',
            'visa_status': candidate_model.visa_status or ''
        }
