const Menu = require('../models/menu')

module.exports = {
    // 获取菜单列表
    async getMenuList (ctx, next) {
        // ctx.body = 'hello'
        Menu.find({}).exec((err, res) => {
            if (err) ctx.body = {code: -1, data: err}
            ctx.body = {code: 0, data: res}
        })
        let data = await Menu.find({}).exec()
        console.log(data)
        ctx.body = {code: 0, data: data}
    }
}
