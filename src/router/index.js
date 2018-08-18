import index from '@/views/index'
import page from '@/views/page'
import editor from '@/views/editor'
import detail from '@/views/detail'

const routes = [
    {
        path: '/',
        name: 'index',
        component: index
    },
    {
        path: '/page',
        name: 'page',
        component: page
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
