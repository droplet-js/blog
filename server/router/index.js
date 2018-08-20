const User = require('../modules/user')
const Menu = require('../modules/menu')
const Page = require('../modules/page')
const router = require('koa-router')()

router.post('/api/register', User.register)
router.post('/api/login', User.login)
router.get('/api/getUserInfo', User.getUserInfo)
router.get('/api/getMenuList', Menu.getMenuList)
router.get('/api/getPage', Page.getPage)
router.get('/api/getDetailPage', Page.getDetailPage)
router.post('/api/savePage', Page.savePage)

module.exports = router
