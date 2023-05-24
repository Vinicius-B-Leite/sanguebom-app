import axios from "axios";

// export const baseURL = 'http://192.168.4.104:3333/'
export const baseURL = 'https://sangue-bom.onrender.com/'

export const api = axios.create({
    baseURL
})
