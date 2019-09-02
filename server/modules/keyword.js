const Keyword = require('../models/keyword')

module.exports = {
  // 保存标签
  async saveKeyword (keyword) {
    const arr = keyword.split(',')
    let results = []
    for (let item of arr) {
      let data = await Keyword.findOne({ name: item })
      if (!data) {
        data = await Keyword.create({ name: item })
        results.push(data)
      }
    }
    return results
  },
  // 更新标签
  async updateKeyword (keyword) {
    const arr = keyword.split(',')
    let results = []
    for (let item of arr) {
      let data = await Keyword.findOne({ name: item })
      console.log(data)
      if (!data) {
        data = await Keyword.create({ name: item })
        results.push(data)
      }
    }
    return results
  }
}
