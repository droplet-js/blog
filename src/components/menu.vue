<template>
    <mu-drawer :open="open" :docked="docked" :right="position === 'right'" @close="closeMenu">
        <mu-appbar :color="colors.bgcolor" style="text-align: left;">
          HL Blog
        </mu-appbar>
        <mu-list :value="selectedMenu" @change="onMenuChange">
            <mu-list-item :class="{'selected-item': selectedMenu === menu.url}" button :value="menu.url" :to="menu.url" v-for="menu in menuList" :key="menu.id">
                <mu-list-item-title>
                    <mu-icon :value="menu.icon" :color="iconColor"></mu-icon>
                    <span class="wj-list-title">{{menu.name}}</span>
                </mu-list-item-title>
            </mu-list-item>
        </mu-list>
    </mu-drawer>
</template>

<script>
import { colors } from '../constant'
import api from '../api'
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
            selectedMenu: '/'
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this.getMenuList()
            this.setSelectedMenu()
        },
        setSelectedMenu () {
            this.selectedMenu = this.$route.path
        },
        // 获取菜单列表
        async getMenuList () {
            try {
                let res = await api.get('/getMenuList')
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
        '$route' (to, from) {
            this.selectedMenu = to.path
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
    background: rgba(0, 0, 0, .2)
}
</style>
