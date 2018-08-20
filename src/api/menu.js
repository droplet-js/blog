import api from './index'

export default {
    // 获取菜单列表
    async getMenuList (params) {
        let res = await api.get('/getMenuList', {
            params: params
        })
        return res
    }
}
