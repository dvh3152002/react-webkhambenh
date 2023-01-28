import actionTypes from './actionTypes';
import {
    saveInforDoctor, getAllDoctors, getAllcodeService, createNewUserService, getAllUserService,
    deleteUserService, editUserService, getTopDoctorHome
} from '../../services/userService';
import { toast } from 'react-toastify';

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
                toast.success("Create new user success");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Create user fail");
                dispatch(saveUserFail())
            }
        } catch (error) {
            toast.error("Create user fail");
            dispatch(saveUserFail())
            console.log("saveUserFail fail: ", error);
        }
    }
}

export const saveUserSuccess = () => ({
    type: "CREATE_USER_SUCCESS"
})

export const saveUserFail = () => ({
    type: "CREATE_USER_FAIL"
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUserService("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            console.log("fetch gender err", error);
            dispatch(fetchAllUsersFail());
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                toast.success("Delete user success");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Delete user fail");
                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.error("Delete user fail");
            dispatch(deleteUserFail());
            console.log("fetch gender err", error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("edit user success");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("edit user fail");
                dispatch(editUserFail());
            }
        } catch (error) {
            toast.error("edit user fail");
            dispatch(editUserFail());
            console.log("fetch gender err", error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome(10);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
                })
            }
        } catch (error) {
            console.log("FETCH_TOP_DOCTORS_FAIL error: ", error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
                })
            }
        } catch (error) {
            console.log("FETCH_ALL_DOCTORS_FAIL error: ", error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL
            })
        }
    }
}

export const saveDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save infor doctor success")
                dispatch({
                    type: actionTypes.FETCH_SAVE_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Save infor doctor fail");
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_SAVE_DOCTOR_FAIL
                })
            }
        } catch (error) {
            toast.error("Save infor doctor fail");
            console.log("FETCH_SAVE_DOCTOR_FAIL error: ", error);
            dispatch({
                type: actionTypes.FETCH_SAVE_DOCTOR_FAIL
            })
        }
    }
}
