const index = () => import('@/views/index')
const page = () => import('@/views/page')
const editor = () => import('@/views/editor')
const detail = () => import('@/views/detail')
const information = () => import('@/views/information')

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/page',
        name: 'page',
        component: page,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/editor',
        name: 'newEditor',
        component: editor,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/editor/:id',
        name: 'editor',
        component: editor,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: detail,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/information',
        name: 'information',
        component: information,
        meta: {
            requireAuth: true
        }
    }
]

export default routes
