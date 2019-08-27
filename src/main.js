// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routers from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Toast from 'muse-ui-toast'
import 'highlight.js/styles/github.css'
import commonUtil from './utils/common'
import User from './api/user'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(MuseUI)
Vue.use(mavonEditor)
Vue.use(Toast, {
  position: 'top'
})

// The routing configuration
const RouterConfig = {
  routes: Routers
}

const router = new VueRouter(RouterConfig)

let getUserInfo = async (next) => {
  let res = await User.getUserInfo()
  if (res.code === 0) {
    commonUtil.cookies('userInfo', JSON.stringify(res.data), 3600 * 24)
    next(vm => {
      vm.userInfo = res.data
    })
  }
}

router.beforeEach((to, from, next) => {
  if (commonUtil.getCookie('token')) {
    let userInfo = commonUtil.cookies('userInfo')
    if (userInfo) {
      next(vm => {
        vm.userInfo = JSON.parse(userInfo)
      })
    } else {
      try {
        getUserInfo(next)
      } catch (err) {
        Toast.error('获取个人信息失败')
        console.log(err)
        next()
      }
    }
  } else {
    // token不存在，则删除userInfo信息
    commonUtil.delCookie('userInfo')
    if (to.meta.requireAuth) {
      next({
        path: '/page'
      })
    }
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
