import axios from "../utils/axios";

//Đăng nhập và xác thực người dùng
const handleLoginApi = (email, passWord) => {
    return axios.post("/api/login", { email, passWord });
};
const handleLoginApi2 = (username, password) => {
    return axios.post("/login2", { username, password });
};

const getUserInforSystem = (token) => {
    return axios.get("/system-user-infor", {
        headers: {
            Authorization: `Bearer ${token}`, // Thay thế 'Bearer' bằng phần tiêu đề thích hợp nếu yêu cầu của bạn yêu cầu
        },
    });
};

const getAdminSystem = (token) => {
    return axios.get("/admin-dashboard", {
        headers: {
            Authorization: `Bearer ${token}`, // Thay thế 'Bearer' bằng phần tiêu đề thích hợp nếu yêu cầu của bạn yêu cầu
        },
    });
};

//
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
const getTopDoctorHome2Service = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`);
};

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`);
};

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
};

const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctorService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDateServicde = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
    );
};

const getExtraInforDoctorByIdServicde = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointmentService = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointmentService = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialtyByIdService = (data) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
};

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinicService = () => {
    return axios.get(`/api/get-clinic`);
};

const getDetailClinicByIdService = (data) => {
    return axios.get(
        `/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}&search=${data.search}`
    );
};

const getSearchByNameService = (query) => {
    return axios.get(`/api/search-by-name?q=${query}`);
};

const getSearchService = () => {
    return axios.get(`/api/search`);
};

const getListPatientForDoctorService = (doctorId, date) => {
    return axios.get(
        `/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`
    );
};
const sendRemedyService = (data) => {
    return axios.post(`/api/send-remedy`, data);
};

export {
    handleLoginApi,
    getAllUsersService,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctorService,
    getDetailDoctor,
    saveBulkScheduleDoctorService,
    getScheduleDoctorByDateServicde,
    getExtraInforDoctorByIdServicde,
    getProfileDoctorByIdService,
    postPatientBookAppointmentService,
    postVerifyBookAppointmentService,
    createNewSpecialty,
    getAllSpecialtyService,
    getDetailSpecialtyByIdService,
    createNewClinic,
    getAllClinicService,
    getDetailClinicByIdService,
    getSearchByNameService,
    getSearchService,
    getTopDoctorHome2Service,
    handleLoginApi2,
    getUserInforSystem,
    getAdminSystem,
    getListPatientForDoctorService,
    sendRemedyService,
};
