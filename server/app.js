const path = require('path')
const config = require('./config')
const router = require('./router')
const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const cors = require('koa-cors');
const convert = require('koa-convert');
const app = new Koa()

const mongoose = require('mongoose')
mongoose.connect(config.db.url)

// middlewares
const middlewares = [
    convert(cors()),
    logger(),
    bodyParser(),
    serve(path.join(__dirname, config.publicPath)),
    router.routes(),
    router.allowedMethods()
]

middlewares.forEach(middleware => {
    if (!middleware) {
        return
    }
    app.use(middleware)
})

// koa middlewares
// app
//     .use(convert(cors()))
//     .use(logger())
//     .use(bodyParser())
//     .use(serve(path.join(__dirname, config.publicPath)))
//     .use(router.routes())
//     .use(router.allowedMethods())

app.on('error', (err) => {
    console.log(err)
})

// koa static server
const server = app.listen(config.port, () => {
    console.log('The server is start on port ' + config.port)
})

// terminal ctrl+c to exit the server
process.on('SIGTERM', () => {
    console.log('Stopping dev server')
    server.close(() => {
        process.exit(0)
    })
})