import { Menu } from '../models'

export default {
    getMenuList (ctx, next) {
        let promise = new Promise((resolve, reject) => {
            Menu.find({}).exec((err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
        return promise
    }
}