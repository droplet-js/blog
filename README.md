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
    createAt: Date(),
    updateAt: Date()
}])
```

## fontawesome

**Main Page**: [fontawesome](http://fontawesome.dashgame.com/)

## Material Icons

**Main Page** [Material Icons](http://google.github.io/material-design-icons/#getting-icons)

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
