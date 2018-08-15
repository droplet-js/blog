const Page = require('../models/page')
// const { JsonError } = require('../utils/error')

module.exports = {
    // 保存文章
    async savePage (ctx, next) {
        let { title, content, keyword } = ctx.request.body
        try {
            let data = await Page.create({title, content, keyword})
            ctx.body = {code: 0, data: data}
        } catch (err) {
            ctx.body = {code: -1, data: err}
        }
    },
    // 获取文章
    async getPage (ctx, next) {
        try {
            let data = await Page.find({})
            ctx.body = {code: 0, data: data}
        } catch (err) {
            ctx.body = {code: -1, data: err}
        }
    }
}
