<template>
  <div id="app">
    <Menu :docked="docked" :open="open" :selected="selected" @close="closeMenu" @onMenuChange="onMenuChange"></Menu>
    <router-view @onMenuChange="onMenuChange" @toggleMenu="toggleMenu" />
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
      docked: true,
      selected: '/'
    }
  },
  created () {
    this.initMenu()
  },
  methods: {
    initMenu () {
      if (this.$route.name === 'index') {
        this.open = false
        this.docked = false
      } else {
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
    },
    // 菜单改变
    onMenuChange (val) {
      this.selected = val
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
}
</style>
