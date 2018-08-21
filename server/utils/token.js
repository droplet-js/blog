const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = {
    getSecret (file) {
        return fs.readFileSync(path.join(__dirname, '../config/' + file))
    },
    // 通过私钥生成token
    generateToken (data) {
        // 过期时间
        let date = Math.floor(Date.now() / 1000)
        const cert = this.getSecret('private.pem')
        const token = jwt.sign({data, exp: date + 3600 * 24}, cert, { algorithm: 'RS256' })
        return token
    },
    verifyToken (token) {
        if (token) {
            let res
            const cert = this.getSecret('public.pem')
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
    },
    isRevoked (ctx, decodedToken, token) {
        let currentTime = Math.floor(Date.now() / 1000)
        let { exp = 0 } = decodedToken, current = Math.floor(Date.now() / 1000)
        if (current <= exp) {
            return 0
        } else {
            return 1
        }
    }
}