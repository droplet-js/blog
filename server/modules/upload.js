const multer = require('koa-multer')
// const storage = multer.diskStorage({
//     destination: 'uploads/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate(),
//     filename(ctx, file, cb) {
//         const filenameArr = file.originalname.split('.')
//         cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1])
//     }
// })
  
const upload = multer({ dest: 'uploads/' })

module.exports = {
    uploadImg () {
        return upload.single('avatar')
    }
}