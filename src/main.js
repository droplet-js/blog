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

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(MuseUI)
Vue.use(mavonEditor)

// The routing configuration
const RouterConfig = {
    routes: Routers
}

const router = new VueRouter(RouterConfig)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
