const mongoose = require('mongoose')
// const baseMode = require('./base_model')

let Schema = mongoose.Schema

let PageSchema = new Schema({
    title: String,
    content: String,
    keyword: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
})

PageSchema.index({id: -1})

// PageSchema.plugin(baseModel)

let Page = mongoose.model('Page', PageSchema)

module.exports = Page
