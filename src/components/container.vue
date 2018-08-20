<template>
    <div>
        <mu-appbar class="wj-home-appbar" :color="colors.bgcolor">
            <!-- <mu-button round slot="right" color="deepOrange600" @click="login">注册</mu-button>
            <mu-button round slot="right" color="blueGrey800" @click="login">登录</mu-button> -->
            <mu-button icon slot="right" @click="openRegisterDialog">
                <mu-icon size="18" value=":fa fa-user"></mu-icon>
            </mu-button>
            <mu-button icon slot="right" @click="openLoginDialog">
                <mu-icon size="18" value=":fa fa-sign-in"></mu-icon>
            </mu-button>
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
            openLogin: false
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
