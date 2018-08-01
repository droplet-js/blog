const menu = require('../modules/menu')
const page = require('../modules/page')
const router = require('koa-router')()

router.get('/api/getMenuList', menu.getMenuList)
router.get('/api/savePage', page.savePage)

module.exports = router
