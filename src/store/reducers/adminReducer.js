import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    position: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire redux start: ', action);
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copy = { ...state };
            copy.genders = action.data;
            console.log('fire redux success: ', copy);

            return {
                ...copy,
            }

        case actionTypes.FETCH_GENDER_FAIL:
            console.log('fire redux fail: ', action);
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;