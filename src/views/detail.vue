<template>
    <Container>
        <h1 class="title">{{detail.title}}</h1>
        <div class="content" v-html="content"></div>
    </Container>
</template>

<script>
import api from '../api'
import Container from '../components/container'
import marked from 'marked'
export default {
    components: {
        Container
    },
    data () {
        return {
            detail: {},
            marked: marked,
            content: ''
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this.getDetailPage()
            this.initMarked()
        },
        initMarked () {
            this.marked.setOptions({
                renderer: new marked.Renderer(),
                highlight: function (code) {
                    return require('highlight.js').highlightAuto(code).value
                },
                gfm: true
            })
        },
        async getDetailPage () {
            let id = this.$route.params.id
            try {
                let res = await api.get('/getDetailPage', {
                    params: { id }
                })
                if (res.code === 0) {
                    this.detail = res.data
                    this.content = this.marked(this.detail.content)
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    text-align: left;
    margin-left: 40px;
    border-bottom: 1px solid #eee;
}

.content {
    text-align: left;
    margin: 0 40px;
    margin-bottom: 40px;
}
</style>
