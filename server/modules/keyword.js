const Keyword = require('../models/keyword')

module.exports = {
  // 保存标签
  async saveKeyword (id, keyword) {
    let data = await Keyword.create({ id, keyword })
    return data
  },
  // 更新标签
  async updateKeyword (id, keyword) {
    let data = await Keyword.findOne({ id })
    if (!data) return
    data.keyword = keyword
    return data.save()
  }
}
