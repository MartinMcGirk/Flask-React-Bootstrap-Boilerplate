import { getUsers } from '../comms/backend';
import { parseJSON } from '../utils/misc';

export const startLoadUsers = (token) => {
    return (dispatch) => {
        return getUsers(token)
            .then(parseJSON)
            .then((response) => {
                dispatch(loadUsers(response.users))
            })
    }
};

export const loadUsers = (users) => ({
    type: 'LOAD_USERS',
    users
});