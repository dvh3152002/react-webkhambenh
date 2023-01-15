import actionTypes from './actionTypes';
import { getAllcodeService, createNewUserService } from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllcodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            console.log("fetch gender err", error);
            dispatch(fetchGenderFail());
        }
    }
}

export const fetchGenderSuccess = (genders) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genders
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            console.log("fetch gender err", error);
            dispatch(fetchPositionFail());
        }
    }
}

export const fetchPositionSuccess = (position) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: position
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            console.log("fetch gender err", error);
            dispatch(fetchRoleFail());
        }
    }
}

export const fetchRoleSuccess = (roles) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roles
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        let res = await createNewUserService(data);
        console.log("check data user: ", data)
        try {
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFail())
            }
        } catch (error) {
            dispatch(saveUserFail())
            console.log("saveUserFail fail: ", error);
        }
    }
}

export const saveUserSuccess = ({
    type: "CREATE_USER_SUCCESS"
})

export const saveUserFail = ({
    type: "CREATE_USER_FAIL"
})