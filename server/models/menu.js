let mongoose = require('mongoose')
let Schema = mongoose.Schema

let MenuSchema = new Schema({
    name: String, // 菜单名称
    icon: String, // 菜单图标
    url: String, // 菜单链接
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
})

let Menu = mongoose.model('Menu', MenuSchema)

export default Menu
