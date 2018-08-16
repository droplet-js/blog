const mongoose = require('mongoose')
const baseModel = require('./base_model')
const Schema = mongoose.Schema

let uuidSchema = new Schema({
    _id: String,
    uuid: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

let uuid = mongoose.model('Uuid', uuidSchema)

uuidSchema.plugin(baseModel)

module.exports = uuid
