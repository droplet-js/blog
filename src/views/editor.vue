<template>
    <Container :open="loading">
        <form name="editor-area" id="editor-area">
            <div class="input-text">标题：</div>
            <input class="input-value" name="title" type="text" placeholder="请输入标题" v-model="title">
            <div class="input-text">内容：</div>
            <mavon-editor ref="md" class="input-content" name="content" v-model="content"></mavon-editor>
            <div class="input-text">关键词：</div>
            <input type="text" class="input-value" name="keyword" placeholder="请输入关键词" v-model="keyword">
            <mu-button class="commit-btn" color="success" @click="onCommit">提交</mu-button>
        </form>
    </Container>
</template>

<script>
import Container from '../components/container'
import Validator from '../utils/validator'
import Page from '../api/page'
export default {
    components: {
        Container
    },
    data () {
        return {
            title: '', // 标题
            content: '', // 内容
            keyword: '', // 关键词
            detail: {},
            alertObj: { // alert类型和信息
                type: 'error',
                msg: ''
            },
            showAlert: false, // 是否显示alert框
            loading: false
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (to.params && to.params.id) {
                vm.getDetailPage()
            }
        })
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
                let res = await Page.savePage({
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
        },
        async getDetailPage () {
            let id = this.$route.params.id
            try {
                let res = await Page.getDetailPage({id})
                if (res.code === 0) {
                    this.detail = res.data
                    this.title = this.detail.title
                    this.content = this.detail.content
                    this.keyword = this.detail.keyword
                }
            } catch (err) {
                this.$toast.error('获取文章详情失败！')
                console.log(err)
            }
        },
        clear () {
            this.title = ''
            this.content = ''
            this.keyword = ''
        }
    },
    watch: {
        '$route' (to, from) {
            if (!to.params.id) {
                this.clear()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// $input-border: rgba(0, 0, 0, .2);
// $input-shadow: rgba(0, 0, 0, .2);
@import '../assets/css/variable.scss';

#editor-area {
    margin: 0 20px 0 24px;
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
    margin-bottom: 40px;
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
