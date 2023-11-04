import actionTypes from "../types/actionTypes";

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    doctorDetail: null,
    token: null,
};

const appReducer = (state = initialState, action) => {
    // console.log(state);
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo,
            };
        case actionTypes.USER_LOGIN_SUCCESS2:
            return {
                ...state,
                isLoggedIn: true,
                token: action.token,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.doctorDetail = action.data;
            return {
                ...state,
            };
        case actionTypes.GET_DETAIL_DOCTOR_FAILED:
            state.doctorDetail = {};
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default appReducer;
