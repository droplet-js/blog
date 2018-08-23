const fs = require('fs')
const User = require('../modules/user')
const Menu = require('../modules/menu')
const Page = require('../modules/page')
const Upload = require('../modules/upload')
const router = require('koa-router')()

router.post('/api/register', User.register)
router.post('/api/login', User.login)
router.get('/api/getUserInfo', User.getUserInfo)
router.get('/api/getMenuList', Menu.getMenuList)
router.get('/api/getPage', Page.getPage)
router.get('/api/getDetailPage', Page.getDetailPage)
router.post('/api/savePage', Page.savePage)
// router.post('/api/upload', Upload.uploadImg, async (ctx) => {
//     console.log('upload:', ctx.req.file)
//     let tmpPath = ctx.req.file
//     let targetPath = 'uploads/' + Date.now().getTime() + ctx.req.file.originalname
//     let src = fs.createReadStream(tmpPath)
//     let dest = fs.createWriteStream(targetPath)
//     src.pipe(dest)
//     ctx.body = {
//         filename: '111'
//     }
// })

module.exports = router
