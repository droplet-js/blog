const { JsonError } = require('../utils/error')
/**
 * @description 异常处理
 * @author halapro.liu
 * @param {*} ctx
 * @param {*} next
 */
async function errorHandler (ctx, next) {
    try {
        await next()
    } catch (e) {
        console.log('------------e:', e.name)
        if (e instanceof JsonError) {
            console.log(111)
        }
        // ctx.throw(status, message)
    }
}

module.exports = errorHandler