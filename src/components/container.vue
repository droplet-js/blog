<template>
  <div>
    <mu-appbar :color="colors.bgcolor" class="wj-home-appbar">
      <mu-button @click="openRegisterDialog" icon slot="right" v-if="!isLogin">
        <mu-icon size="18" value=":fa fa-user"></mu-icon>
      </mu-button>
      <mu-button @click="openLoginDialog" icon slot="right" v-if="!isLogin">
        <mu-icon size="18" value=":fa fa-sign-in"></mu-icon>
      </mu-button>
      <mu-flex align-items="center" slot="right" v-if="isLogin">
        <mu-menu open-on-hover placement="bottom-start">
          <mu-avatar>
            <img :src="avatar" alt />
          </mu-avatar>
          <mu-list slot="content">
            <mu-list-item @click="information" button>
              <mu-list-item-title>个人信息</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @click="logout" button>
              <mu-list-item-title>退出登录</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
        <mu-button class="new-post-btn" color="pink400" round slot="right" to="/editor">写文章</mu-button>
      </mu-flex>
      <!-- <mu-button icon slot="right" :href="githubUrl">
                <mu-icon size="18" value=":fa fa-github"></mu-icon>
      </mu-button>-->
    </mu-appbar>
    <div class="wj-container">
      <slot></slot>
      <div class="footer">
        <p>
          The blog was created by
          <a :href="githubUrl" class="key">@halapro.liu</a>
        </p>
        <p>
          <a :href="vueUrl" class="key">Vuejs</a> &
          <a :href="museuiUrl" class="key">MuseUI</a>
        </p>
        <i class="fa fa-github fa-2x"></i>
      </div>
    </div>

    <loading :open="open"></loading>
    <Register :open="openRegister" @onClose="closeRegisterDialog"></Register>
    <login :open="openLogin" @onClose="closeLoginDialog"></login>
  </div>
</template>

<script>
import {colors, userData} from '../constant'
import Loading from './loading'
import Login from './login'
import Register from './register'
import commonUtil from '../utils/common'
import defaultAvatar from '../assets/img/timg.jpg'
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
      userInfo: {},
      isLogin: false,
      avatar: defaultAvatar
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getUserInfo()
    },
    getUserInfo () {
      if (commonUtil.getCookie('userInfo')) {
        this.userInfo = JSON.parse(commonUtil.getCookie('userInfo'))
        this.avatar = this.userInfo.avatar ? 'http://localhost:3000/' + this.userInfo.avatar : defaultAvatar
        this.isLogin = true
      }
    },
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
    information () {
      this.$router.push('/information')
    },
    logout () {
      commonUtil.delCookie('token')
      commonUtil.delCookie('userInfo')
      this.$router.go('/page')
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

.new-post-btn {
  margin-left: 20px;
  margin-right: 40px;
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
    color: #fff;
  }
}
</style>
