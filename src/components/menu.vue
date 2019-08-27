<template>
  <mu-drawer :docked="docked" :open="open" :right="position === 'right'" @close="closeMenu">
    <mu-appbar :color="colors.bgcolor" style="text-align: left;">{{userInfo.username || 'HL' }}的博客</mu-appbar>
    <mu-list :value="selectedMenu" @change="onMenuChange">
      <mu-list-item :class="{'selected-item': selectedMenu === menu.url}" :key="menu.id" :to="menu.url" :value="menu.url" button v-for="menu in menuList">
        <mu-list-item-title>
          <mu-icon :color="iconColor" :value="menu.icon"></mu-icon>
          <span class="wj-list-title">{{menu.name}}</span>
        </mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-drawer>
</template>

<script>
import {colors} from '../constant'
import Menu from '../api/menu'
import commonUtil from '../utils/common'
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    },
    docked: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'left'
    },
    selected: {
      type: String,
      default: '/'
    }
  },
  data () {
    return {
      bgColor: '#00bed4',
      iconColor: '#757575',
      colors: colors,
      menuList: [],
      selectedMenu: '/',
      userInfo: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getUserInfo()
      this.getMenuList()
      this.setSelectedMenu()
    },
    getUserInfo () {
      let userInfo = commonUtil.cookies('userInfo')
      if (userInfo) {
        this.userInfo = JSON.parse(userInfo)
      }
    },
    setSelectedMenu () {
      this.selectedMenu = this.$route.path
    },
    // 获取菜单列表
    async getMenuList () {
      try {
        let res = await Menu.getMenuList()
        res.code === 0 && (this.menuList = res.data)
      } catch (err) {
        console.log(err)
      }
    },
    closeMenu (val) {
      if (val === 'overlay') {
        this.$emit('close', false)
      }
    },
    onMenuChange (value) {
      this.$emit('onMenuChange', value)
    }
  },
  watch: {
    selected (val) {
      this.selectedMenu = val
    },
    $route (to, from) {
      this.selectedMenu = to.path
      this.getUserInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';

.wj-list-title {
  margin-left: 24px;
}

.selected-item {
  background: rgba(0, 0, 0, 0.2);
}
</style>
