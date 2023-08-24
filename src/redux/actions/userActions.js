import actionTypes from "../types/actionTypes";

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS, //viết tắt return
    userInfo: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL, //viết tắt return
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});
