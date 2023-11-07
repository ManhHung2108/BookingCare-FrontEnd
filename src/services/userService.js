import axios from "../utils/axios";

//Api đăng nhập và xác thực người dùng
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

//Api quản lý User
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

//Api bảng Allcode
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

//Api bác sĩ nổi bật
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getTopDoctorHome2Service = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`);
};

//Api danh sách Doctor
const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`);
};

//Api tạo thông tin Docotor
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctor`, data);
};

//Api quản lý kế hoạch
const saveBulkScheduleDoctorService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
};

//Api detail Doctor
const getDetailDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
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

//Api phòng khám
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};
const editSpecialtyService = (inputData) => {
    return axios.put(`/api/edit-specialty/${inputData.id}`, inputData);
};
const deleteSpecialtyService = (id) => {
    return axios.delete(`/api/delete-specialty/${id}`);
};

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialtyByIdService = (data) => {
    return axios.get(
        `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
    );
};

//Api phòng khám
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};
const editClinicService = (inputData) => {
    return axios.put(`/api/edit-clinic/${inputData.id}`, inputData);
};
const deleteClinicService = (id) => {
    return axios.delete(`/api/delete-clinic/${id}`);
};

const getAllClinicService = () => {
    return axios.get(`/api/get-clinic`);
};

const getDetailClinicByIdService = (data) => {
    return axios.get(
        `/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}&search=${data.search}`
    );
};

//Api search
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
    editSpecialtyService,
    deleteSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyByIdService,
    createNewClinic,
    editClinicService,
    deleteClinicService,
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
