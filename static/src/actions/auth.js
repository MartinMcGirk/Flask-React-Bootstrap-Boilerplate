import { getToken, registerUser } from '../comms/backend';
import { parseJSON } from '../utils/misc';
import { history } from '../routers/AppRouter';

export const startRegisterUser = (userDetails) => {
    return (dispatch) => {
        return registerUser(userDetails)
            .then(parseJSON)
            .then((response) => {
                if (response.token) {
                    dispatch(loginSuccess(response.token));
                    if (history.location.pathname === '/') {
                        history.push('/dashboard');
                    }
                }
            })
    }
}

export const startLogin = (username, password) => {
    return (dispatch) => {
        dispatch(loginUserRequest());
        return getToken(username, password)
            .then(parseJSON)
            .then((response) => {
                try {
                    dispatch(loginSuccess(response.token));
                    if (history.location.pathname === '/') {
                        history.push('/dashboard');
                    }
                } catch (e) {
                    dispatch(loginFailure());

                }

            }).catch((e) => {
                dispatch(loginFailure());
            })
    }
};

export const loginUserRequest = () => {
    return {
        type: 'LOGIN_REQUEST'
    };
};

export const loginSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type: 'LOGIN_SUCCESS',
        token
    };
};

export const loginFailure = () => {
    localStorage.removeItem('token');
    return {
        type: 'LOGIN_FAILURE'
    };
};

export const startLogout = () => {
    return (dispatch) => {
        dispatch(logout());
        history.push('/');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: 'LOGOUT'
    }
};