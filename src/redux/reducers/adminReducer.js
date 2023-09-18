import actionTypes from "../types/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: {
            state.isLoadingGender = true;

            return { ...state };
        }
        case actionTypes.FETCH_GENDER_SUCCESS: {
            let copyState = { ...state };
            copyState.genders = action.data;
            copyState.isLoadingGender = false;

            return copyState;
        }
        case actionTypes.FETCH_GENDER_FAILED: {
            let copyState = { ...state };
            copyState.genders = [];
            copyState.isLoadingGender = false;

            return { ...state };
        }

        case actionTypes.FETCH_POSITION_SUCCESS: {
            state.positions = action.data;
            return { ...state };
        }
        case actionTypes.FETCH_POSITION_FAILED: {
            state.positions = [];
            return { ...state };
        }
        case actionTypes.FETCH_ROLE_SUCCESS: {
            state.roles = action.data;
            return { ...state };
        }
        case actionTypes.FETCH_ROLE_FAILED: {
            state.roles = [];
            return { ...state };
        }

        case actionTypes.CREATE_USER_SUCCESS: {
            return { ...state };
        }
        case actionTypes.CREATE_USER_FAILED: {
            return { ...state };
        }

        case actionTypes.GET_ALL_USER_SUCCESS: {
            state.users = action.users;
            return { ...state };
        }

        case actionTypes.GET_ALL_USER_FAILED: {
            state.users = [];
            return { ...state };
        }

        case actionTypes.GET_TOP_DOCTORS_SUCCESS: {
            state.topDoctors = action.data;
            return { ...state };
        }

        case actionTypes.GET_TOP_DOCTORS_FAILED: {
            state.topDoctors = [];
            return { ...state };
        }

        default:
            return state;
    }
};
export default adminReducer;
