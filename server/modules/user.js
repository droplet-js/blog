const User = require('../models/user')
const Token = require('../utils/token')
const crypto = require('crypto')
const config = require('../config')

module.exports = {
    // 注册
    async register (ctx) {
        let { username, password, phone = '', email = '', avatar = '' } = ctx.request.body
        try {
            let oldUser = await User.findOne({ username })
            if (oldUser) {
                ctx.body = { code: 0, data: '该用户名已存在' }
                return
            }
            const hmac = crypto.createHmac('sha256', config.secretKey)
            password = hmac.update(password).digest('base64')
            let data = await User.create({
                username,
                password,
                avatar,
                phone,
                email
            })
            if (data) {
                let userToken = {
                    username: username,
                    password: password
                }
                let token = Token.generateToken(userToken)
                ctx.body = { code: 0, data: token }
            } else {
                ctx.body = { code: -1, data: '注册失败'}
            }
        } catch (err) {
            ctx.body = { code: -1, data: err }
        }
    },
    // 登录
    async login (ctx) {
        let { username, password } = ctx.request.body
        const hmac = crypto.createHmac('sha256', config.secretKey)
        password = hmac.update(password).digest('base64')
        try {
            let data = await User.findOne({ username, password })
            if (data) {
                let userToken = {
                    username: username,
                    password: password
                }
                let token = Token.generateToken(userToken)
                ctx.body = { code: 0, data: token }
            } else {
                ctx.body = { code: -1, data: '用户不存在' }
            }
        } catch (err) {
            ctx.body = { code: -1, data: '登录失败' }
        }
    },
    // 获取用户信息
    async getUserInfo (ctx) {
        try {
            let user = ctx.state.user && ctx.state.user.data
            if (user && user.username) {
                let username = user.username
                let userInfo = await User.findOne({ username }, { username: 1, avatar: 1, phone: 1, email: 1, createAt: 1, updateAt: 1 })
                if (userInfo) {
                    ctx.body = { code: 0, data: userInfo}
                }
            } else {
                ctx.body = { code: 401, data: '请求数据失败' }
            }
        } catch (err) {
            ctx.body = { code: -1, data: err }
        }
    },
    // 修改用户信息
    async modifyUserInfo (ctx) {
        try {
            let { username: name, phone, email } = ctx.request.body
            let user = ctx.state.user && ctx.state.user.data
            if (user && user.username) {
                let username = user.username
                let userInfo = await User.findOne({ username }, { username: 1, avatar: 1, phone: 1, email: 1, createAt: 1, updateAt: 1 })
                if (userInfo) {
                    userInfo.username = name || userInfo.username
                    userInfo.phone = phone || userInfo.phone
                    userInfo.email = email || userInfo.email
                    let data = await userInfo.save()
                    ctx.body = { 
                        code: 0,
                        data: {
                            username: data.username,
                            avatar: data.avatar,
                            phone: data.phone,
                            email: data.email,
                            createAt: data.createAt,
                            updateAt: data.updateAt
                        }
                    }
                } else {
                    ctx.body = { code: 0, data: '用户不存在' }
                }
            } else {
                ctx.body = { code: 401, data: '请求数据失败' }
            }
        } catch (err) {
            ctx.body = { code: -1, data: err }
        }
    },
    // 保存头像
    async saveAvatar (ctx) {
        try {
            let user = ctx.state.user && ctx.state.user.data
            if (user && user.username) {
                let username = user.username
                let userInfo = await User.findOne({ username }, { username: 1, avatar: 1, phone: 1, email: 1, createAt: 1, updateAt: 1 })
                if (userInfo) {
                    userInfo.avatar = ctx.state.avatar
                    return await userInfo.save()
                } else {
                    return void 0
                }
            } else {
                return void 0
            }
        } catch (err) {
            return void 0
        }
    }
}