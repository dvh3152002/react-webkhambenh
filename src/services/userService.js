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

export { handleLoginApi, getAllUserService, createNewUserService, deleteUserService, editUserService }