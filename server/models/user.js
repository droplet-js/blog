const mongoose = require('mongoose')
const baseModel = require('./base_model')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    name: String
})

let User = mongoose.model('User', UserSchema)

UserSchema.plugin(baseModel)

module.exports = User
