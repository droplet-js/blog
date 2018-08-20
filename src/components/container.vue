<template>
    <div>
        <mu-appbar class="wj-home-appbar" :color="colors.bgcolor">
            <!-- <mu-button round slot="right" color="deepOrange600" @click="login">注册</mu-button>
            <mu-button round slot="right" color="blueGrey800" @click="login">登录</mu-button> -->
            <mu-button icon slot="right" @click="openRegisterDialog" v-if="!isLogin">
                <mu-icon size="18" value=":fa fa-user"></mu-icon>
            </mu-button>
            <mu-button icon slot="right" @click="openLoginDialog" v-if="!isLogin">
                <mu-icon size="18" value=":fa fa-sign-in"></mu-icon>
            </mu-button>
            <mu-flex slot="right" v-if="isLogin">
                <mu-menu placement="bottom-start" open-on-hover>
                    <mu-avatar>
                        <img src="../assets/img/timg.jpg" alt="">
                    </mu-avatar>
                    <mu-list slot="content">
                        <mu-list-item button>
                            <mu-list-item-title>个人信息</mu-list-item-title>
                        </mu-list-item>
                        <mu-list-item button @click="logout">
                            <mu-list-item-title>退出登录</mu-list-item-title>
                        </mu-list-item>
                    </mu-list>
                </mu-menu>
            </mu-flex>
            <mu-button icon slot="right" :href="githubUrl">
                <mu-icon size="18" value=":fa fa-github"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="wj-container">
            <slot></slot>
            <div class="footer">
                <p>The blog was created by <a class="key" :href="githubUrl">@halapro.liu</a></p>
                <p><a class="key" :href="vueUrl">Vuejs</a> & <a class="key" :href="museuiUrl">MuseUI</a></p>
                <i class="fa fa-github fa-2x"></i>
            </div>
        </div>

        <loading :open="open"></loading>
        <Register :open="openRegister" @onClose="closeRegisterDialog"></Register>
        <login :open="openLogin" @onClose="closeLoginDialog"></login>
    </div>
</template>

<script>
import { colors, userData } from '../constant'
import Loading from './loading'
import Login from './login'
import Register from './register'
import commonUtil from '../utils/common'
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Loading,
        Register,
        Login
    },
    data () {
        return {
            githubUrl: userData.githubUrl,
            museuiUrl: userData.museuiUrl,
            vueUrl: userData.vueUrl,
            colors: colors,
            searchText: '',
            openRegister: false,
            openLogin: false,
            userInfo: {}
        }
    },
    created () {
        console.log(this.userInfo)
        if (commonUtil.getCookie('userInfo')) {
            this.userInfo = JSON.parse(commonUtil.getCookie('userInfo'))
        }
    },
    computed: {
        isLogin () {
            if (commonUtil.getCookie('userInfo')) {
                this.userInfo = JSON.parse(commonUtil.getCookie('userInfo'))
            }
            return this.userInfo.hasOwnProperty('username')
        }
    },
    methods: {
        openRegisterDialog () {
            this.openRegister = true
        },
        closeRegisterDialog () {
            this.openRegister = false
        },
        openLoginDialog () {
            this.openLogin = true
        },
        closeLoginDialog () {
            this.openLogin = false
        },
        logout () {
            commonUtil.delCookie('token')
            commonUtil.delCookie('userInfo')
            this.$router.go(0)
        }
    }
}
</script>

<style lang="scss" scoped>
.wj-home-appbar {
    width: calc(100% - 256px);
    margin-left: 256px;
    &.close {
        width: 100%;
        margin-left: 0;
    }
}

.avatar {
    width: 20px;
}

.wj-container {
    width: calc(100% - 256px);
    height: auto;
    margin-top: 64px;
    margin-left: 256px;
}

.footer {
    padding: 72px 24px;
    box-sizing: border-box;
    background-color: rgb(33, 33, 33);
    text-align: center;
    p {
        margin: 0 auto;
        padding: 0;
        color: rgba(255, 255, 255, 0.54);
        max-width: 335px;
    }

    .key {
        color: rgba(255, 255, 255, 0.87);
    }

    i {
        color:  #fff;
    }
}

</style>
