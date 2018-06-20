import axios from 'axios'

const config = {
    api_url: process.env.API_ROOT
};

function getUrl(url) {
    return `${config.api_url}/${url}`;
}

const basicAuthConfig = (username, password) => {
    const auth = btoa(`${username}:${password}`);
    return {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    }
};

const tokenConfig = (token) => ({
    headers: {
        'x-access-token': token
    },
});

export function getToken(username, password) {
    return axios.get(getUrl('login'), basicAuthConfig(username, password));
}

export function getUsers(token) {
    return axios.get(
        getUrl('user'),
        tokenConfig(token)
    );
}

export const registerUser = ({
    email,
    password,
    firstName,
    lastName,
    role
}) => {
    return axios.post(
        getUrl('register'),
        {
            username: email,
            password,
            role,
            first_name: firstName,
            last_name: lastName
        }
    )
};

export const getMyCandidateDetails = (token) => {
    return axios.get(
        getUrl('candidate'),
        tokenConfig(token)
    );
};

export const updateMyCandidateDetails = (token, candidateDetails) => {
    const { public_id } = candidateDetails;
    return axios.put(
        getUrl(`candidate/${public_id}`),
        candidateDetails,
        tokenConfig(token)
    )
};

export const updateMyCandidateSkills = (token, skills) => {
    return axios.post(
        getUrl(`skills/candidate`),
        {
            ...skills
        },
        tokenConfig(token)
    )
};

export const getAllSkills = (token) => {
    return axios.get(
        getUrl(`skills`),
        tokenConfig(token)
    )
};

export const getMyRecruiterDetails = (token) => {
    return axios.get(
        getUrl('recruiter'),
        tokenConfig(token)
    );
};

export const updateMyRecruiterDetails = (token, recruiterDetails) => {
    const { public_id } = recruiterDetails;
    return axios.put(
        getUrl(`recruiter/${public_id}`),
        recruiterDetails,
        tokenConfig(token)
    )
};

export function checkTokenIsValid(token) {
    return axios.post(
        getUrl('check_token_is_valid'),
        {
            'token': token
        }
    );
}
