const User = require('../modules/user')
const Menu = require('../modules/menu')
const Page = require('../modules/page')
const multer = require('koa-multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const { originalname } = file
    const filename = Date.now() + '_' + originalname
    cb(null, filename)
  }
})
const upload = multer({ storage: storage })
const router = require('koa-router')({
  prefix: '/api'
})

router.post('/register', User.register)
router.post('/login', User.login)
router.get('/getUserInfo', User.getUserInfo)
router.post('/modifyUserInfo', User.modifyUserInfo)
router.get('/getMenuList', Menu.getMenuList)
router.get('/getPage', Page.getPage)
router.get('/getDetailPage', Page.getDetailPage)
router.post('/savePage', Page.savePage)
router.post('/updatePage', Page.updatePage)
router.post('/upload', upload.single('avatar'), async ctx => {
  const { filename } = ctx.req.file
  ctx.state.avatar = filename
  let res = await User.saveAvatar(ctx)
  if (res) {
    ctx.body = {
      code: 0,
      data: res
    }
  } else {
    ctx.body = {
      code: -1,
      data: '上传图片失败'
    }
  }
})

module.exports = router
