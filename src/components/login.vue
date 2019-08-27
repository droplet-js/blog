<template>
  <div>
    <mu-dialog :esc-press-close="false" :open.sync="open" :overlay-close="false" @close="closeOpenDialog" class="login-dialog" title="登录" width="400">
      <mu-form :label-position="labelPosition" :model="form" class="mu-demo-form" label-width="100" ref="form">
        <input style="display:none;" type="text" />
        <input style="display:none;" type="password" />
        <mu-form-item :rules="usernameRules" label="用户名" prop="username">
          <mu-text-field action-icon=":fa fa-user-o" v-model="form.username"></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="passwordRules" label="密码" prop="password">
          <mu-text-field action-icon=":fa fa-eye" type="password" v-model="form.password"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-button @click="onLogin" color="primary" flat slot="actions">确定</mu-button>
      <mu-button @click="closeOpenDialog" color="error" flat slot="actions">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import api from '../api'
import config from '../config'
import commonUtil from '../utils/common'
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      usernameRules: [{validate: val => !!val, message: '必须填写用户名'}, {validate: val => val.length >= 6, message: '用户名长度大于6'}],
      passwordRules: [{validate: val => !!val, message: '必须填写密码'}, {validate: val => val.length >= 6 && val.length <= 10, message: '密码长度大于6小于10'}],
      form: {
        username: '',
        password: ''
      },
      labelPosition: 'top'
    }
  },
  mounted () {
    this.clear()
  },
  methods: {
    // 验证条件
    async validate () {
      let validateResult = await this.$refs.form.validate()
      return validateResult
    },
    async onLogin () {
      try {
        let validateResult = await this.validate()
        if (!validateResult) {
          return
        }
        /* eslint-disable */
        let res = await api.post('/login', {
          username: this.form.username,
          password: hex_hmac_md5(config.secretKey, this.form.password)
        })
        /* eslint-enable */
        if (res.code === 0 && res.data) {
          commonUtil.setCookie('token', res.data, 3600 * 2)
          this.closeOpenDialog()
          this.$router.go(0)
        }
      } catch (err) {
        console.log(err)
        this.$toast.error('登录失败！')
      }
    },
    closeOpenDialog () {
      this.$emit('onClose')
    },
    clear () {
      this.form = {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-dialog {
}
</style>
