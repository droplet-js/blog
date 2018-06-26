import { Menu } from '../models'

export default {
    // 获取菜单列表
    getMenuList (ctx, next) {
        // var promise = new Promise()
        // promise((resolve, reject) => {
        //     Menu.find({}).exec((err, res) => {
        //         if (err) return reject(err)
        //         resolve(res)
        //     })
        // })
        return Menu.find({}).exec((err, res) => {
            if (err) ctx.body = {code: -1, data: err}
            ctx.body = {code: 0, data: res}
        })
    }
}
