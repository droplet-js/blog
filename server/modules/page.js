const Page = require('../models/page')
// const { JsonError } = require('../utils/error')

module.exports = {
    // 保存文章
    async savePage (ctx, next) {
        let { content } = ctx.request
        try {
            let data = await Page.save({content}).exec()
            ctx.body = {code: 0, data: data}
        } catch (err) {
            ctx.body = {code: -1, data: err}
        }
    }
}
