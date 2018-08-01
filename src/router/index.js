import index from '@/views/index'
import home from '@/views/home'
import editor from '@/views/editor'

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
    }
]

export default routes
