let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
    name: String
})

let User = mongoose.model('User', UserSchema)

module.exports = User
