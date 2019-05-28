import axios from 'axios'

export default axios.create({
    baseURL: "https://delfinkitrainingapi.azurewebsites.net/.auth/login/",
    responseType: "json"
})