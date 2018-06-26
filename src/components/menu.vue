<template>
    <mu-drawer :open="open" :docked="docked" :right="position === 'right'" @close="closeMenu">
        <mu-appbar :color="colors.bgcolor" style="text-align: left;">
          HL Blog
        </mu-appbar>
        <mu-list>
            <mu-list-item button to="/">
                <mu-list-item-title>
                    <mu-icon value=":fa fa-home" :color="iconColor"></mu-icon>
                    <span class="wj-list-title">Go Home</span>
                </mu-list-item-title>
            </mu-list-item>
            <mu-list-item button to="/home">
                <mu-list-item-title>
                    <mu-icon value=":fa fa-pencil" :color="iconColor"></mu-icon>
                    <span class="wj-list-title">All posts</span>
                </mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
                <mu-list-item-title>
                    <mu-icon value=":fa fa-pencil" :color="iconColor"></mu-icon>
                    <span class="wj-list-title">All posts</span>
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
        }
    },
    data () {
        return {
            bgColor: '#00bed4',
            iconColor: '#757575',
            colors: colors
        }
    },
    methods: {
        init () {
            console.log(api)
            api.get('/getMenuList')
                .then(res => {
                    console.log(res)
                })
        },
        closeMenu (val) {
            if (val === 'overlay') {
                this.$emit('close', false)
            }
        }
    },
    created () {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';

.wj-list-title {
    margin-left: 24px;
}
</style>
