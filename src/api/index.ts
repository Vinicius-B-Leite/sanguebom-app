import axios, { AxiosInstance } from "axios";

export const baseURL = 'http://192.168.4.101:3333/'
// export const baseURL = 'https://sangue-bom.onrender.com/'

type ApiAddIntecptorType = AxiosInstance & {
    registerInterceptorTokenMenager: (logout: () => void) => void
}

const api = axios.create({
    baseURL
}) as ApiAddIntecptorType

api.registerInterceptorTokenMenager = (logout) => {
    api.interceptors.response.use((config) => config, (errorRquest) => {
        if (errorRquest.response && ['11', '14'].includes(errorRquest.response.data.code)) {
            logout()
            return Promise.reject(errorRquest)
        }
    })
}


export { api }  