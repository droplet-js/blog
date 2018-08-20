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
        let token = ctx.header.authorization || ''
        try {
            let res = Token.verifyToken(token)
            if (res && res.username) {
                let data = await User.findOne({ username }, { username: 1, avatar: 1, phone: 1, email: 1, createAt: 1, updateAt: 1 })
                if (data) {
                    ctx.body = { code: 0, data: data}
                }
            }
        } catch (err) {
            ctx.body = { code: -1, data: err }
        }
    }
}