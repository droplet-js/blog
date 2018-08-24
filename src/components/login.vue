<template>
    <div>
        <mu-dialog class="login-dialog" title="登录" width="400" :open.sync="open" @close="closeOpenDialog" :overlay-close="false" :esc-press-close="false">
            <mu-form ref="form" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
                <input type="text" style="display:none;">
                <input type="password" style="display:none;">
                <mu-form-item prop="username" label="用户名" :rules="usernameRules">
                    <mu-text-field v-model="form.username" action-icon=":fa fa-user-o"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="password" label="密码" :rules="passwordRules">
                    <mu-text-field type="password" v-model="form.password" action-icon=":fa fa-eye"></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button slot="actions" flat color="primary" @click="onLogin">确定</mu-button>
            <mu-button slot="actions" flat color="error" @click="closeOpenDialog">关闭</mu-button>
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
                { validate: (val) => !!val, message: '必须填写用户名' },
                { validate: (val) => val.length >= 6, message: '用户名长度大于6' }
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '必须填写密码' },
                { validate: (val) => val.length >= 6 && val.length <= 10, message: '密码长度大于6小于10' }
            ],
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
.login-dialog {}
</style>
