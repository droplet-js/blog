const Menu = require('../models/menu')
// const { JsonError } = require('../utils/error')

module.exports = {
  // 获取菜单列表
  async getMenuList (ctx, next) {
    let data
    try {
      if (ctx.state.token || ctx.header.authorization) {
        data = await Menu.find({}).exec()
      } else {
        data = await Menu.find({ isAdmin: { $ne: '1' } }).exec()
      }
      ctx.body = { code: 0, data: data }
    } catch (err) {
      ctx.body = { code: -1, data: err }
    }
  }
}
