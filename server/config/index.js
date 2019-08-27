// server config
const config = {
  port: 3000, // server port
  db: {
    url: 'mongodb://localhost:27017/blog'
  },
  publicPath: '../static',
  uploadPath: '../uploads',
  secretKey: 'halapro'
}

module.exports = config
