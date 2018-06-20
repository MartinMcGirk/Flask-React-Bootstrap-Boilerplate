const initialState = { users: [] };

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_USERS':
            return {
                users: action.users
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};