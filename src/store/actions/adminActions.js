import actionTypes from './actionTypes';
import { getAllcodeService } from '../../services/userService';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService("GENDER");
            if (res && res.errCode === 0) {
                console.log("get state", getState)
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