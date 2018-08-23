const fs = require('fs')
const path = require('path')
const config = require('./config')
const router = require('./router')
const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const cors = require('koa-cors')
const convert = require('koa-convert')
const jwt = require('koa-jwt')
const errorHandler = require('./middlewares/errorhandler')
const log = require('./utils/log')
const Token = require('./utils/token')
const app = new Koa()

require('events').EventEmitter.defaultMaxListeners = 15

const mongoose = require('mongoose')
mongoose.connect(config.db.url)

const port = config.port || '8080'

const secret = Token.getSecret('public.pem')
const jwtOpts = {
    secret,
    isRevoked: Token.isRevoked, // 判断token是否过期
    tokenKey: 'token' // 设置ctx.state.token
}

const jwtUnlessOpts = {
    path: [
        /^\/api\/register/,
        /^\/api\/login/,
        /^\/api\/getMenuList/,
        /^\/api\/getPage/,
        /^\/api\/getDetailPage/,
    ]
}

// middlewares
const middlewares = [
    convert(cors()),
    logger(),
    bodyParser(),
    serve(path.join(__dirname, config.publicPath)),
    // 验证是否需要token请求，unless是例外，不需要token就可以请求
    jwt(jwtOpts).unless(jwtUnlessOpts),
    errorHandler,
    router.routes(),
    router.allowedMethods()
]

middlewares.forEach(middleware => {
    if (!middleware) {
        return
    }
    app.use(middleware)
})

app.on('error', (err) => {
    log('cyan', err)
})

// koa static server
const server = app.listen(port, () => {
    log('magenta', 'The server is start on port ' + port)
})

// terminal ctrl+c to exit the server
process.on('SIGINT', () => {
    log('yellow', 'Stopping dev server')
    server.close(() => {
        process.exit(0)
    })
})