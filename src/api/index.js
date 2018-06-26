import axios from 'axios'
import config from '../config'

// create an axios instance
const api = axios.create({
    baseURL: config.baseURL
})

// api.defaults.headers.common['Authorization'] = ''
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
api.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

// response interceptor
api.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err)
})

export default api
