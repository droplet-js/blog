import axios from 'axios'
import config from '../config'
import commonUtil from '../utils/common'
import router from '../router'
import {
    REQUEST_UNRECORNIZED,
    REQUEST_FORBIDDEN
} from '../constant/status'

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
    console.log(err.response.status)
    console.log(err.response.statusText)
    if (!err.response) {
        return Promise.reject(err)
    }
    switch (err.response.status) {
    case REQUEST_UNRECORNIZED:
        commonUtil.delCookie('token')
        commonUtil.delCookie('userInfo')
        router.push('/')
        break
    case REQUEST_FORBIDDEN:
        console.log('No Permission')
        break
    }
    return Promise.reject(err.response)
})

export default api
