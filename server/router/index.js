const menu = require('../modules/menu')
const router = require('koa-router')()
console.log('modules:', menu)
router.get('/api/getMenuList', menu.getMenuList)

module.exports = router
