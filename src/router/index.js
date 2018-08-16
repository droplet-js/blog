import index from '@/views/index'
import home from '@/views/home'
import editor from '@/views/editor'
import detail from '@/views/detail'

const routes = [
    {
        path: '/',
        name: 'index',
        component: index
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/editor',
        name: 'editor',
        component: editor
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: detail
    }

]

export default routes
