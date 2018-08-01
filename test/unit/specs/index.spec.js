import Vue from 'vue'
import MuseUI from 'muse-ui'
import index from '@/views/index'
import VueRouter from 'vue-router'
import Routers from '../../../src/router'

Vue.use(VueRouter)
Vue.use(MuseUI)

const RouterConfig = {
    routes: Routers
}

const router = new VueRouter(RouterConfig)

describe('index.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(index)
        const vm = new Constructor({router}).$mount()
        expect(vm.$el.querySelector('.bg-desc h1').textContent)
            .to.equal('halapro.liu Blog')
    })
})
