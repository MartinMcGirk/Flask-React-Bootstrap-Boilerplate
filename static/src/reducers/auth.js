import { decodeToken } from '../utils/misc';

const initialState = {
    token: null,
    isAuthenticating: false,
    isAuthenticated: false,
    user: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isAuthenticating: true,
                isAuthenticated: false
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                token: action.token,
                isAuthenticating: false,
                isAuthenticated: true,
                user: decodeToken(action.token).user
            };
        case 'LOGIN_FAILURE':
            return initialState;
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};