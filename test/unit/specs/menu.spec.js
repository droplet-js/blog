import Vue from 'vue'
import MuseUI from 'muse-ui'
import Menu from '@/components/menu'
import Promise from 'es6-promise'
import api from '../../../src/api'
Promise.polyfill()

Vue.use(MuseUI)

function getRendererProps (Component, propsData, key) {
    const Constructor = Vue.extend(Component)
    const vm = new Constructor({ propsData }).$mount()
    return vm._props[key]
}

describe('Menu.vue', () => {
    it('render Correctly with diffrent props', () => {
        expect(getRendererProps(Menu, {
            open: true
        }, 'open')).to.equal(true)

        expect(getRendererProps(Menu, {
            docked: true
        }, 'docked')).to.equal(true)

        expect(getRendererProps(Menu, {
            position: 'right'
        }, 'position')).to.equal('right')
    })

    it('get data by axios', () => {
        api.get('/getMenuList')
            .then(res => {
                expect(res.code).to.equal(0)
            })
    })
})
