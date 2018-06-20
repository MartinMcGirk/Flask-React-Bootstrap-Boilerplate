const initialState = {
    me: {}
};

export const myDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_MY_DETAILS':
            return {
                me: action.me
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};