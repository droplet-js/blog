const path = require('path')
const config = require('./config')
const router = require('./router')
const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const cors = require('koa-cors')
const convert = require('koa-convert')
const errorHandler = require('./middlewares/errorhandler')
const log = require('./utils/log')
const app = new Koa()

const mongoose = require('mongoose')
mongoose.connect(config.db.url)

const port = config.port || '8080'

// middlewares
const middlewares = [
    convert(cors()),
    logger(),
    bodyParser(),
    serve(path.join(__dirname, config.publicPath)),
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
    console.log(err)
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