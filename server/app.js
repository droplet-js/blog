const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static');
const app = new Koa()
import path from 'path'
import config from './config'
import router from './router'

const mongoose = require('mongoose')
mongoose.connect(config.db.url)

// koa middlewares
app
    .use(logger())
    .use(bodyParser())
    .use(serve(path.join(__dirname, config.publicPath)))
    .use(router.routes())
    .use(router.allowedMethods())

app.on('error', (err) => {
    console.log(err);
})

// koa static server
app.listen(config.port, () => {
    console.log('The server is start on port ' + config.port)
})