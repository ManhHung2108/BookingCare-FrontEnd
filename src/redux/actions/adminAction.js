import { getAllCodeService } from "../../services";
import actionTypes from "../types/actionTypes";

//redux-thunk
export const fecthGenderStart = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.FETCH_GENDER_START,
        });

        try {
            let res = await getAllCodeService("GENDER");

            if (res && res.errCode === 0) {
                dispatch(fecthGenderSuccess(res.data));
            } else {
                dispatch(fecthGenderFailed());
            }
        } catch (error) {
            dispatch(fecthGenderFailed());
            console.log("fetachGenderStart error: ", error);
        }
    };
};

export const fecthGenderSuccess = (genderData) => {
    return {
        type: actionTypes.FETCH_GENDER_SUCCESS,
        data: genderData,
    };
};
export const fecthGenderFailed = () => {
    return {
        type: actionTypes.FETCH_GENDER_FAILED,
    };
};

//Lấy ra chức vụ
export const fecthPositionStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService("POSITION");

            if (res && res.errCode === 0) {
                dispatch(fecthPositionSuccess(res.data));
            } else {
                dispatch(fecthPositionFailed());
            }
        } catch (error) {
            dispatch(fecthPositionFailed());
            console.log("fecthPositionStart error: ", error);
        }
    };
};

export const fecthPositionSuccess = (positionData) => {
    return {
        type: actionTypes.FETCH_POSITION_SUCCESS,
        data: positionData,
    };
};

export const fecthPositionFailed = () => {
    return {
        type: actionTypes.FETCH_POSITION_FAILED,
    };
};

//Lấy ra role
export const fecthRoleStart = () => {
    return async (dispatch) => {
        try {
            let res = await getAllCodeService("ROLE");

            if (res && res.errCode === 0) {
                dispatch(fecthRoleSuccess(res.data));
            } else {
                dispatch(fecthRoleFailed());
            }
        } catch (error) {
            dispatch(fecthRoleFailed());
            console.log("fecthRoleStart error: ", error);
        }
    };
};
export const fecthRoleSuccess = (roleData) => {
    return {
        type: actionTypes.FETCH_ROLE_SUCCESS,
        data: roleData,
    };
};
export const fecthRoleFailed = () => {
    return {
        type: actionTypes.FETCH_ROLE_FAILED,
    };
};
