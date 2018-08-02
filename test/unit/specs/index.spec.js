// import Vue from 'vue'
// import MuseUI from 'muse-ui'
import Index from '@/views/index'

// Vue.use(MuseUI)

describe('Index.vue', () => {
    it('sets the correct default data', () => {
        expect(typeof Index.data).to.equal('function')
        const defaultData = Index.data()
        expect(defaultData.bgColor).to.equal('#00bed4')
        expect(defaultData.githubUrl).to.equal('https://github.com/halaproliu')
        expect(defaultData.museuiUrl).to.equal('https://muse-ui.org/#/zh-CN')
        expect(defaultData.vueUrl).to.equal('https://vuejs.org')
        expect(defaultData.open).to.equal(false)
        expect(defaultData.docked).to.equal(false)
        expect(typeof Index.methods).to.equal('object')
    })

    // it('test methods has correct result', () => {
    //     const vm = new Vue(Index).$mount()
    //     expect(vm.toggleMenu()).to.equal(true)
    // })
})
