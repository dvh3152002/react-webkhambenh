import axios from "../axios"

const handleLoginApi = (email, password) => {//(userEmail,userPassword)
    return axios.post('/api/login', { email, password })//Viet tat neu email:email,password:password
    // return axios.post('/api/login', { email:userEmail, password:userpassword })//Viet day du
}

export { handleLoginApi }