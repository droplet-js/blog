<template>
  <Container :open="loading">
    <div class="header">
      <h1 class="title">{{detail.title}}</h1>
      <mu-button :color="colors.bgcolor" @click="editPage" v-show="isLogin">编辑</mu-button>
    </div>
    <div class="content" v-html="content"></div>
    <div class="tag-wrapper">
      <div :key="index" class="tag" v-for="(tag, index) in tags">{{tag}}</div>
    </div>
  </Container>
</template>

<script>
import Page from '../api/page'
import Container from '../components/container'
import marked from 'marked'
import commonUtil from '../utils/common'
import WebWorker from '../utils/web-worker'
import {colors} from '../constant'
export default {
  components: {
    Container
  },
  data () {
    return {
      colors: colors,
      detail: {},
      marked: marked,
      content: '',
      loading: false,
      userInfo: {},
      isLogin: false,
      tags: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.init()
    })
  },
  created () {},
  methods: {
    init () {
      this.getDetailPage()
      this.initMarked()
      this.getUserInfo()
    },
    getUserInfo () {
      if (commonUtil.cookies('userInfo')) {
        this.userInfo = JSON.parse(commonUtil.cookies('userInfo'))
        this.isLogin = true
      }
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
      this.loading = true
      let id = this.$route.params.id
      try {
        let res = await Page.getDetailPage({id})
        if (res.code === 0) {
          this.loading = false
          this.detail = res.data
          this.tags = this.detail.keyword.split(',')
          this.getContent(this.detail.content)
        }
      } catch (err) {
        this.loading = false
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
              self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/marked/0.5.0/marked.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js')
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
            webWorker.stopWorker()
          })
        }
      } else {
        this.content = this.marked(content)
      }
    },
    editPage () {
      let id = this.$route.params.id
      this.$router.push(`/editor/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-left: 40px;
  padding-right: 20px;
  padding-bottom: 10px;
}
.title {
  text-align: left;
}

.content {
  text-align: left;
  margin: 0 40px;
  margin-bottom: 40px;
}

.tag-wrapper {
  display: flex;
  flex: 1;
}

.tag {
  background: #ccc;
  padding: 5px;
  border-radius: 10px;
  margin-left: 40px;
  margin-bottom: 10px;
  &:nth-child(n + 2) {
    margin-left: 10px;
  }
}
</style>
