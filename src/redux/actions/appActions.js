import actionTypes from "../types/actionTypes";
const changeLanguageAppAction = (language) => {
    return {
        type: actionTypes.CHANGE_LANGUAGE,
        language: language,
    };
};

export { changeLanguageAppAction };
