const Menu = require('../models/menu')
const { JsonError } = require('../utils/error')

module.exports = {
    // 获取菜单列表
    async getMenuList (ctx, next) {
        try {
            let data = await Menu.find({}).exec()
            ctx.body = {code: 0, data: data}
        } catch (err) {
            ctx.body = {code: -1, data: err}
        }
    }
}
