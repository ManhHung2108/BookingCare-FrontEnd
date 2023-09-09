import actionTypes from "../types/actionTypes";

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
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

        default:
            return state;
    }
};
export default adminReducer;
