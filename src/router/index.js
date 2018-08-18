const index = () => import('@/views/index')
const page = () => import('@/views/page')
const editor = () => import('@/views/editor')
const detail = () => import('@/views/detail')

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
        name: 'newEditor',
        component: editor
    },
    {
        path: '/editor/:id',
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
