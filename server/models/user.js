const mongoose = require('mongoose')
const baseModel = require('./base_model')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    id: String,
    username: String,
    password: String,
    avatar: String,
    phone: String,
    email: String,
    createAt: { // 创建时间
        type: Date,
        default: Date.now()
    },
    updateAt: { // 修改时间
        type: Date,
        default: Date.now()
    }
})

let User = mongoose.model('User', UserSchema)

UserSchema.index({id: -1})

UserSchema.plugin(baseModel)

module.exports = User
