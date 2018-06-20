import {
    getMyCandidateDetails, getMyRecruiterDetails, updateMyCandidateDetails, updateMyCandidateSkills,
    updateMyRecruiterDetails
} from '../comms/backend';
import { parseJSON } from '../utils/misc';

export const startLoadMyCandidateDetails = (token) => {
    return (dispatch) => {
        return getMyCandidateDetails(token)
            .then(parseJSON)
            .then((response) => {
                dispatch(loadMyDetails(response.candidate))
            })
    }
};

export const startUpdateMyCandidateDetails = (token, candidateDetails) => {
    return (dispatch) => {
        return updateMyCandidateDetails(token, candidateDetails)
            .then(parseJSON)
            .then((response) => {
                dispatch(startLoadMyCandidateDetails(token))
            })
    }
};

export const startUpdateMyCandidateSkills = (token, skills) => {
    return (dispatch) => {
        return updateMyCandidateSkills(token, skills)
            .then(parseJSON)
            .then((response) => {
                dispatch(startLoadMyCandidateDetails(token))
            })
    }
};

export const startLoadMyRecruiterDetails = (token) => {
    return (dispatch) => {
        return getMyRecruiterDetails(token)
            .then(parseJSON)
            .then((response) => {
                dispatch(loadMyDetails(response.recruiter))
            })
    }
};

export const startUpdateMyRecruiterDetails = (token, recruiterDetails) => {
    return (dispatch) => {
        return updateMyRecruiterDetails(token, recruiterDetails)
            .then(parseJSON)
            .then((response) => {
                dispatch(startLoadMyRecruiterDetails(token))
            })
    }
};

export const loadMyDetails = (me) => ({
    type: 'LOAD_MY_DETAILS',
    me
});

