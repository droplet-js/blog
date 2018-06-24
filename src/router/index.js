import home from '@/components/home'
import index from '@/views/index'

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
