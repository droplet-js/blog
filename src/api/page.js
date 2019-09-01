import api from './index'

export default {
  // 获取文章列表
  async getPage (params) {
    let res = await api.get('/getPage', {
      params: params
    })
    return res
  },
  // 获取文章详情
  async getDetailPage (params) {
    let res = await api.get('/getDetailPage', {
      params: params
    })
    return res
  },
  // 创建文章
  async savePage (params) {
    let res = await api.post('/savePage', params)
    return res
  },
  // 更新文章
  async updatePage (params) {
    let res = await api.post('/updatePage', params)
    return res
  }
}
