import { getMenuList } from '../modules/menu'

const Router = require('koa-router')
const router = new Router()

router.get('/api/getMenuList', getMenuList)

export default router
