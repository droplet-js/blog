const Keyword = require('../models/keyword')

module.exports = {
  // 保存标签
  async saveKeyword (keyword) {
    const arr = keyword.split(',')
    let data
    for (let i = 0; i < arr.length; i++) {
      data = await Keyword.findOne({ name: keyword })
      if (data) return data
      data = await Keyword.create({ name: keyword })
    }
    return data
  },
  // 更新标签
  async updateKeyword (keyword) {
    const arr = keyword.split(',')
    let data
    for (let i = 0; i < arr.length; i++) {
      data = await Keyword.findOne({ name: keyword })
      if (!data) {
        data = await Keyword.create({ name: keyword })
      } else {
        data.name = keyword
        data = data.save()
        console.log('update:', data)
      }
    }
    return data
  }
}
