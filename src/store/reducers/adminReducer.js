import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctor: [],
    allDoctor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoading = false;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoading = false;
            state.genders = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAIL:
            state.position = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAIL:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.topDoctor = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctor = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            state.allDoctor = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;