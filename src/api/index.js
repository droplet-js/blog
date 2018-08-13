import axios from 'axios'
import config from '../config'
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
    return res.data
}, err => {
    return Promise.reject(err)
})

let http = {
    get: function (url, params) {
        return new Promise((resolve, reject) => {
            api.get(url, {
                params: params
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post: function (url, params) {
        return new Promise((resolve, reject) => {
            api.post(url, params).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    delete: function (url, params) {
        return new Promise((resolve, reject) => {
            api.delete(url, {
                params: params
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default http
