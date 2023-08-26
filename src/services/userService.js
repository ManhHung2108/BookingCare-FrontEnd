import axios from "../utils/axios";

const handleLoginApi = (email, passWord) => {
    return axios.post("/api/login", { email, passWord });
};

const getAllUsers = (inputId) => {
    //axios trả về promise
    return axios.get(`/api/get-all-users?id=${inputId}`); //phải cùng method vs server
};

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, {
        ...data,
    });
};

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user/${userId}`);
};

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService };
