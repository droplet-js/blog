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
import commonUtil from '../utils/common'
import WebWorker from '../utils/web-worker'
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
                    // this.getContent(this.detail.content)
                }
            } catch (err) {
                console.log(err)
            }
        },
        getContent (content) {
            let webWorker
            if (commonUtil.isSupportWebWorker) {
                if (typeof webWorker === 'undefined') {
                    webWorker = new WebWorker(() => {
                        onmessage = e => {
                            // webworker内部只能用importScripts加载js
                            // self是webworker的自己的全局对象
                            // 加载marked和hightlight.js
                            self.importScripts(
                                'https://cdnjs.cloudflare.com/ajax/libs/marked/0.5.0/marked.min.js',
                                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
                            )
                            self.marked.setOptions({
                                renderer: new self.marked.Renderer(),
                                highlight: function (code) {
                                    return self.hljs.highlightAuto(code).value
                                },
                                gfm: true
                            })
                            let result = self.marked(e.data)
                            postMessage(result)
                        }
                    })
                    webWorker.dispatch(content).then(res => {
                        this.content = res
                        self.close()
                    })
                }
            } else {
                this.content = this.marked(content)
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
