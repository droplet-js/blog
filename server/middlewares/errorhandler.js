const { JsonError } = require('../utils/error')
/**
 * @description 异常处理
 * @author halapro.liu
 * @param {*} ctx
 * @param {*} next
 */
async function errorHandler (ctx, next) {
    // console.log(ctx)
    // try {
    //     await next()
    // } catch (e) {
    //     console.log('------------e:', e.name)
    //     if (e instanceof JsonError) {
    //         console.log(111)
    //     }
    //     // ctx.throw(status, message)
    // }
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                error: err.originalError ? err.originalError.message : err.message
            }
        } else {
            throw err
        }
    })
}

module.exports = errorHandler