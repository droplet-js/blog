const mongoose = require('mongoose')
const baseModel = require('./base_model')
const Schema = mongoose.Schema

let keywordSchema = new Schema({
    name: String,
    createAt: { // 创建时间
        type: Date,
        default: Date.now()
    },
    updateAt: { // 修改时间
        type: Date,
        default: Date.now()
    }
})

let Keyword = mongoose.model('Keyword', keywordSchema)

keywordSchema.plugin(baseModel)

module.exports = Keyword
