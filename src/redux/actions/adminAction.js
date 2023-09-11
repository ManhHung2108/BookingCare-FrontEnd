import { toast } from "react-toastify";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsersService,
    deleteUserService,
    editUserService,
} from "../../services";
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

//Tạo user mới
export const createNewUserAction = (data) => {
    // console.log(data);
    return async (dispatch) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            }
            return res;
        } catch (error) {
            dispatch(saveUserFailed());
            console.log(error);
        }
    };
};

export const saveUserSuccess = () => {
    return {
        type: actionTypes.CREATE_USER_SUCCESS,
    };
};

export const saveUserFailed = () => {
    return {
        type: actionTypes.CREATE_USER_FAILED,
    };
};

//Lấy danh sách user
export const getAllUserAction = (inputId) => {
    return async (dispatch) => {
        try {
            let res = await getAllUsersService(inputId);
            if (res && res.errCode === 0) {
                dispatch(getAllUserSuccess(res.users));
            }
        } catch (error) {
            console.log(error);
            dispatch(getAllUserFailed());
        }
    };
};

export const getAllUserSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_USER_SUCCESS,
        users: data,
    };
};

export const getAllUserFailed = () => {
    return {
        type: actionTypes.GET_ALL_USER_FAILED,
    };
};

//Xóa người dùng
export const deleteUserAction = (id) => {
    return async (dispatch) => {
        try {
            let res = await deleteUserService(id);
            return res;
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log(error);
        }
    };
};

export const deleteUserSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
    };
};

export const deleteUserFailed = () => {
    return {
        type: actionTypes.DELETE_USER_FAILED,
    };
};

//Sửa người dùng
export const editUserAction = (data) => {
    return async (dispatch) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhập user thành công!");
                dispatch(editUserSuccess());
                dispatch(getAllUserAction("ALL"));
            } else {
                toast.success(res.errMessage);
            }
        } catch (error) {
            toast.error("Cập nhập user lỗi!");
            dispatch(editUserFailed());
            console.log("editUserAction lỗi", error);
        }
    };
};

export const editUserSuccess = () => {
    return {
        type: actionTypes.EDIT_USER_SUCCESS,
    };
};

export const editUserFailed = () => {
    return {
        type: actionTypes.EDIT_USER_FAILED,
    };
};
