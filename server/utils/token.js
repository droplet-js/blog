const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = {
    // 通过私钥生成token
    generateToken (data) {
        // 过期时间
        let date = Math.floor(Date.now() / 1000)
        let cert = fs.readFileSync(path.join(__dirname, '../config/private.pem'))
        const token = jwt.sign({data, exp: date}, cert, { algorithm: 'RS256' })
        return token
    },
    verifyToken (token) {
        if (token) {
            let res
            let cert = fs.readFileSync(path.join(__dirname, '../config/public.pem'))
            try {
                let result = jwt.verify(token, cert, { algorithm: 'RS256' }) || {}
                let { exp = 0 } = result, current = Math.floor(Date.now() / 1000)
                if (current <= exp) {
                    res = result.data || {}
                }
            } catch (err) {
                console.log('verifyToken error:', err)
                throw err
            }
            return res
        }
    }
}