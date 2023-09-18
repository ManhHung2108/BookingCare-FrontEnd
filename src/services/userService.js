import axios from "../utils/axios";

const handleLoginApi = (email, passWord) => {
    return axios.post("/api/login", { email, passWord });
};

const getAllUsersService = (inputId) => {
    //axios trả về promise
    return axios.get(`/api/get-all-users`, {
        params: {
            id: inputId,
        },
    }); //phải cùng method vs server
};

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, {
        ...data,
    });
};

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user/${userId}`);
};

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user/${inputData.id}`, inputData);
};

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export {
    handleLoginApi,
    getAllUsersService,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
};
