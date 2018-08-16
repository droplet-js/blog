const menu = require('../modules/menu')
const page = require('../modules/page')
const router = require('koa-router')()

router.get('/api/getMenuList', menu.getMenuList)
router.get('/api/getPage', page.getPage)
router.get('/api/getDetailPage', page.getDetailPage)
router.post('/api/savePage', page.savePage)

module.exports = router
