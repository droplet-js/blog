<template>
  <div>
    <mu-dialog :esc-press-close="false" :open.sync="open" :overlay-close="false" @close="closeOpenDialog" class="login-dialog" title="注册" width="400">
      <mu-form :label-position="labelPosition" :model="form" label-width="100" ref="form">
        <mu-form-item :rules="usernameRules" label="用户名" prop="username">
          <mu-text-field @keyup.enter="onRegister" action-icon=":fa fa-user-o" type="text" v-model="form.username"></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="passwordRules" label="密码" prop="password">
          <mu-text-field @keyup.enter="onRegister" action-icon=":fa fa-eye" type="text" v-model="form.password"></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="phoneRules" label="手机号" prop="phone">
          <mu-text-field @keyup.enter="onRegister" action-icon=":fa fa-phone" type="text" v-model="form.phone"></mu-text-field>
        </mu-form-item>
        <mu-form-item :rules="emailRules" label="邮箱" prop="email">
          <mu-text-field @keyup.enter="onRegister" action-icon=":fa fa-envelope" type="text" v-model="form.email"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-button @click="onRegister" color="primary" flat slot="actions">确定</mu-button>
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
      usernameRules: [
        {validate: val => !!val, message: '必须填写用户名'},
        {validate: val => val.length >= 6, message: '用户名长度大于6'},
        {validate: val => !new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(val), message: '用户名不允许使用特殊字符'}
      ],
      passwordRules: [{validate: val => !!val, message: '必须填写密码'}, {validate: val => val.length >= 6, message: '密码长度大于等于6'}],
      phoneRules: [{validate: val => !!val, message: '必须填写手机号'}, {validate: val => /(^1[3|5|8][0-9]{9}$)/.test(val) || /^0\d{2,3}-?\d{7,8}$/.test(val), message: '手机号输入有误'}],
      emailRules: [{validate: val => !!val, message: '必须填写邮箱'}, {validate: val => /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val), message: '邮箱格式有误'}],
      form: {
        username: '',
        password: '',
        phone: '',
        email: ''
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
    async onRegister () {
      try {
        let validateResult = await this.validate()
        if (!validateResult) {
          return
        }
        /* eslint-disable */
        let res = await api.post('/register', {
          username: this.form.username,
          password: hex_hmac_md5(config.secretKey, this.form.password),
          phone: this.form.phone,
          email: this.form.email
        })
        /* eslint-enable */
        if (res.code === 0 && res.data) {
          commonUtil.setCookie('token', res.data, 3600 * 2)
          this.closeOpenDialog()
          this.$router.go(0)
        }
      } catch (err) {
        console.log(err)
        this.$toast.error('注册失败！')
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
