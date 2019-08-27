const Keyword = require('../models/keyword')

module.exports = {
  async saveKeyword (keyword) {
    let arr = keyword.split(',') || []
    if (arr.length > 0) {
      arr.forEach(item => {
        Keyword.findOneAndUpdate(
          { name: item },
          { name: item },
          {
            upsert: true
          },
          data => {
            console.log('insert ' + item + 'into keyword success')
          }
        )
      })
    }
  }
}
