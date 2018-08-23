# blog

> A Vue.js Blog

## Init Database
```js
// 在mongodb中
db.getCollection('menus').insertMany([{
    id: '1',
    name: 'Go Home',
    icon: ':fa fa-home',
    url: '/',
    createAt: Date(),
    updateAt: Date()
},{
    id: '2',
    name: 'All Posts',
    icon: ':fa fa-list-ul',
    url: '/page',
    createAt: Date(),
    updateAt: Date()
},{
    id: '3',
    name: 'New Post',
    icon: ':fa fa-pencil',
    url: '/editor',
    isAdmin: '1',
    createAt: Date(),
    updateAt: Date()
}])
```

## Introduce
本系统使用Vue.js配合[muse-ui](https://muse-ui.org/#/zh-CN/)进行开发完成，后端使用的koa框架，数据库使用的是mongodb，整体功能较为简单。

## fontawesome

**Main Page**: [fontawesome](http://fontawesome.dashgame.com/)

## Material Icons

**Main Page**: [Material Icons](http://google.github.io/material-design-icons/#getting-icons)

## mavon-editor

使用[mavon-editor](https://github.com/hinesboy/mavonEditor#readme)这个第三方markdown编辑器，并通过[marked](https://github.com/markedjs/marked)模块转换markdown为html代码进行展示，配合[hightlight.js](https://github.com/highlightjs/highlight.js)进行代码语法高亮。

## 功能列表
- [x] 权限控制
- [x] 路由
- [x] 用户信息
- [x] 文章列表
- [x] 文章详情
- [x] Markdown编辑器
- [ ] 个人头像上传
- [ ] 修改密码
- [ ] 评论功能
- [ ] 文章搜索

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# node serve with hot reload at localhost:3000
npm run server

# front serve and end serve with hot reload at localhost:8080 and localhost:3000
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
