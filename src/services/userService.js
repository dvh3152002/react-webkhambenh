import axios from "../axios"

const handleLoginApi = (email, password) => {//(userEmail,userPassword)
    return axios.post('/api/login', { email, password })//Viet tat neu email:email,password:password
    // return axios.post('/api/login', { email:userEmail, password:userpassword })//Viet day du
}

const getAllUserService = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
}

const getAllcodeService = (type) => {
    return axios.get(`/api/allcodes?type=${type}`);
}

const getTopDoctorHome = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors')
}

const saveInforDoctor = (data) => {
    return axios.post('/api/save-infor-doctor', data)
}

const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-details-doctor?id=${id}`);
}

const saveBulkCreateScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getDateScheduleDoctor = (doctorId, date) => {
    return axios.get(`/api/get-date-schedule?doctorId=${doctorId}&date=${date}`)
}

const getExtraDoctorInfor = (id) => {
    return axios.get(`/api/get-extra-doctor-infor?id=${id}`);
}

const getProfileDoctor = (id) => {
    return axios.get(`/api/get-profile-doctor?id=${id}`);
}

const postBookingAppointment = (data) => {
    return axios.post('/api/post-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-booking-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialtyService = () => {
    return axios.get('/api/get-specialty')
}

const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty?id=${data.id}&location=${data.location}`);
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);
}

const getAllClinic = () => {
    return axios.get('/api/get-clinic');
}

const getDetailClinicByIdService = (id) => {
    return axios.get(`/api/get-detail-clinic?id=${id}`);
}


const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?id=${data.id}&date=${data.date}`);
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

export {
    handleLoginApi, getAllUserService, createNewUserService, deleteUserService, editUserService,
    getAllcodeService, getTopDoctorHome, getAllDoctors, saveInforDoctor, getDetailInforDoctor,
    saveBulkCreateScheduleDoctor, getDateScheduleDoctor, getExtraDoctorInfor, getProfileDoctor,
    postBookingAppointment, postVerifyBookAppointment, createNewSpecialty, getAllSpecialtyService,
    getDetailSpecialtyByIdService, createNewClinic, getAllClinic, getDetailClinicByIdService,
    getAllPatientForDoctor, postSendRemedy
}