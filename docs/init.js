var db = {}
// 初始化menu
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
    icon: ':fa fa-pencil',
    url: '/home',
    createAt: Date(),
    updateAt: Date()
}])
