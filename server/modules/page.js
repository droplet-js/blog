const Page = require('../models/page')
const UUID = require('./uuid')
// const { JsonError } = require('../utils/error')

module.exports = {
    // 保存文章
    async savePage (ctx, next) {
        let { title, content, keyword } = ctx.request.body
        try {
            let uuid = await UUID.getUUID('page')
            console.log(uuid)
            let data = await Page.create({id: uuid, title, content, keyword})
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
    },
    // 通过id获取文章详情
    async getDetailPage (ctx, next) {
        let { id } = ctx.request.body
        try {
            let data = await Page.findOne({id})
            ctx.body = {code: 0, data: data}
        } catch (err) {
            ctx.body = {code: -1, data: err}
        }
    }
}
