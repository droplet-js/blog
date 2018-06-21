const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
import config from './config'
import router from './router'

const mongoose = require('mongoose')
mongoose.connect(config.db.url)

// koa middlewares
app
    .use(logger())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

// koa static server
app.listen(config.port, () => {
    console.log('The server is start on port ' + config.port)
})