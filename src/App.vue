<template>
  <div id="app">
      <Menu :open="open" :docked="docked" @close="closeMenu"></Menu>
      <router-view @toggleMenu="toggleMenu" />
  </div>
</template>

<script>
import Menu from './components/menu'
export default {
    name: 'App',
    components: {
        Menu
    },
    data () {
        return {
            open: true,
            docked: true
        }
    },
    created () {
        this.initMenu()
    },
    methods: {
        initMenu () {
            switch (this.$route.name) {
            case 'index':
                this.open = false
                this.docked = false
                break
            case 'home':
                this.open = true
                this.docked = true
                break
            default:
                this.open = true
                this.docked = true
            }
        },
        // 打开关闭菜单
        toggleMenu () {
            this.open = !this.open
        },
        // 点击遮罩关闭菜单
        closeMenu (val) {
            this.open = val
        }
    },
    watch: {
        $route: 'initMenu'
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
}
</style>
