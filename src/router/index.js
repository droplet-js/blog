import index from '@/views/index'
import home from '@/views/home'

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
    }
]

export default routes
