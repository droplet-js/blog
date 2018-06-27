const menu = require('../modules/menu')
const router = require('koa-router')()

router.get('/api/getMenuList', menu.getMenuList)

module.exports = router
