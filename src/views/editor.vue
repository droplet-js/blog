<template>
    <div class="editor">
        <form name="editor-area" id="editor-area">
            <div class="input-text">标题：</div>
            <input class="input-value" name="title" type="text" placeholder="请输入标题" v-model="title">
            <div class="input-text">内容：</div>
            <mavon-editor ref="md" class="input-content" name="content" v-model="content"></mavon-editor>
            <div class="input-text">关键词：</div>
            <input type="text" class="input-value" name="keyword" placeholder="请输入关键词" v-model="keyword">
            <mu-button class="commit-btn" color="success" @click="onCommit">commit</mu-button>
        </form>
    </div>
</template>

<script>
import Validator from '../utils/validator'
import api from '../api'
export default {
    data () {
        return {
            title: '', // 标题
            content: '', // 内容
            keyword: '', // 关键词
            alertObj: { // alert类型和信息
                type: 'error',
                msg: ''
            },
            showAlert: false // 是否显示alert框
        }
    },
    methods: {
        // 验证条件
        validate () {
            let validator = new Validator()
            validator.add(this.title, 'isNonEmpty', '用户名不能为空')
            validator.add(this.content, 'isNonEmpty', '内容不能为空')
            validator.add(this.keyword, 'isNonEmpty', '关键词不能为空')
            let errorMsg = validator.start()
            return errorMsg
        },
        // 创建文章
        async onCommit () {
            try {
                let errorMsg = this.validate()
                if (errorMsg) {
                    this.$toast.error(errorMsg)
                    return
                }
                let res = await api.post('/savePage', {
                    title: this.title,
                    content: this.content,
                    keyword: this.keyword
                })
                if (res.code === 0) {
                    this.$router.push('/page')
                    this.$emit('onMenuChange', '/page')
                }
            } catch (err) {
                console.log(err)
                this.$toast.error('创建文章失败！')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$input-border: rgba(0, 0, 0, .2);
$input-shadow: rgba(0, 0, 0, .2);

#editor-area {
    margin: 20px 20px 0 280px;
    height: 100%;
}

.input-text {
    text-align: left;
    &:nth-child(n+2) {
        margin-top: 14px;
    }
}

.input-value {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-top: 14px;
    padding: 10px;
    outline: none;
    border: 1px solid $input-border;
    box-shadow: 0 0 10px $input-shadow;
}

.input-content {
    margin-top: 14px;
}

.commit-btn {
    margin-top: 20px;
}

.mu-scale-transition-enter-active,
.mu-scale-transition-leave-active {
  transition: transform .45s cubic-bezier(0.23, 1, 0.32, 1), opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
  backface-visibility: hidden;
}

.mu-scale-transition-enter,
.mu-scale-transition-leave-active {
  transform: scale(0);
  opacity: 0;
}
</style>
