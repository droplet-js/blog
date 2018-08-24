import api from './index'

export default {
    // 注册
    async register (params) {
        let res = await api.post('/register', params)
        return res
    },
    // 登录
    async login (params) {
        let res = await api.post('/login', params)
        return res
    },
    // 获取用户信息
    async getUserInfo (params) {
        let res = await api.get('/getUserInfo', {
            params: params
        })
        return res
    },
    // 修改个人信息
    async modifyUserInfo (params) {
        let res = await api.post('/modifyUserInfo', params)
        return res
    },
    // 上传图片
    async uploadImg (params) {
        let res = await api.post('/upload', params)
        return res
    }
}
