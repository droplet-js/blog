const mongoose = require('mongoose')
// const baseMode = require('./base_model')

let Schema = mongoose.Schema

let PageSchema = new Schema({
    id: String,
    title: String, // 标题
    content: String, // 内容
    keyword: String, // 关键词
    reads: Number, // 阅读数
    comments: Number, // 评论
    createAt: { // 创建时间
        type: Date,
        default: Date.now()
    },
    updateAt: { // 修改时间
        type: Date,
        default: Date.now()
    }
})

PageSchema.index({id: -1})

// PageSchema.plugin(baseModel)

let Page = mongoose.model('Page', PageSchema)

module.exports = Page
