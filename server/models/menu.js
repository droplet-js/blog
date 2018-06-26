import mongoose from 'mongoose'
import baseModel from './base_model'
let Schema = mongoose.Schema

let MenuSchema = new Schema({
    id: Number,
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

MenuSchema.index({id: -1})

MenuSchema.plugin(baseModel)

let Menu = mongoose.model('Menu', MenuSchema)

export default Menu
