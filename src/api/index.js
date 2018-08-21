import axios from 'axios'
import config from '../config'
import commonUtil from '../utils/common'
// import { resolve } from 'path';
// import {
//     REQUEST_SUCCESS,
//     REQUEST_NOT_FOUND,
//     REQUEST_INTERNAL_ERROR,
//     REQUEST_ERROR,
//     REQUEST_UNRECORNIZED,
//     REQUEST_FORBIDDEN,
//     SERVICE_CANNOT_USE
// } from '../constant/status'

// create an axios instance
const api = axios.create({
    baseURL: config.baseURL
})

const token = commonUtil.getCookie('token')
api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''
api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
api.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

// response interceptor
api.interceptors.response.use(res => {
    return res.data
}, err => {
    return Promise.reject(err)
})

export default api
