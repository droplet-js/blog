const Menu = require('../models/menu')
const Keyword = require('../models/keyword')
// const { JsonError } = require('../utils/error')

module.exports = {
  // 获取菜单列表
  async getMenuList (ctx) {
    let results
    try {
      if (ctx.state.token || ctx.header.authorization) {
        results = await Menu.find({}).exec()
      } else {
        results = await Menu.find({ isAdmin: { $ne: '1' } }).exec()
      }
      // let keywords = await Keyword.find({}).exec()
      // keywords = keywords.map(item => {
      //   item._doc.icon = ':fa fa-html5'
      //   console.log(item)
      //   return item
      // })
      // results = results.concat(keywords)
      ctx.body = { code: 0, data: results }
    } catch (err) {
      ctx.body = { code: -1, data: err }
    }
  }
}
