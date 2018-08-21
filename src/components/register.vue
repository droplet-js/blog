<template>
    <div>
        <mu-dialog class="login-dialog" title="Register" width="400" :open.sync="open" @close="closeOpenDialog" :overlay-close="false" :esc-press-close="false">
            <mu-form ref="form" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
                <mu-form-item prop="username" label="Username" :rules="usernameRules">
                    <mu-text-field type="text" v-model="form.username" action-icon=":fa fa-user-o"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="password" label="Password" :rules="passwordRules">
                    <mu-text-field type="text" v-model="form.password" action-icon=":fa fa-eye"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="phone" label="Phone" :rules="phoneRules">
                    <mu-text-field type="text" v-model="form.phone" action-icon=":fa fa-phone"></mu-text-field>
                </mu-form-item>
                <mu-form-item prop="email" label="Email" :rules="emailRules">
                    <mu-text-field type="text" v-model="form.email" action-icon=":fa fa-envelope"></mu-text-field>
                </mu-form-item>
            </mu-form>
            <mu-button slot="actions" flat color="primary" @click="onRegister">register</mu-button>
            <mu-button slot="actions" flat color="error" @click="closeOpenDialog">Close</mu-button>
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
                { validate: (val) => val.length >= 6, message: '用户名长度大于6' },
                { validate: (val) => !(new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(val)), message: '用户名不允许使用特殊字符' }
            ],
            passwordRules: [
                { validate: (val) => !!val, message: '必须填写密码' },
                { validate: (val) => val.length >= 6, message: '密码长度大于等于6' }
            ],
            phoneRules: [
                { validate: (val) => !!val, message: '必须填写手机号' },
                { validate: (val) => /(^1[3|5|8][0-9]{9}$)/.test(val) || /^0\d{2,3}-?\d{7,8}$/.test(val), message: '手机号输入有误' }
            ],
            emailRules: [
                { validate: (val) => !!val, message: '必须填写邮箱' },
                { validate: (val) => /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val), message: '邮箱格式有误' }
            ],
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
.login-dialog {}
</style>
