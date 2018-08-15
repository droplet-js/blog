<template>
    <div class="wj-container">
        <mu-container>
            <mu-paper class="item-paper" :z-depth="1" v-for="(page, index) in pages" :key="index">
                <mu-flex class="item-paper-title" justify-content="between" align-items="center">
                    <mu-flex align-items="center">
                        <mu-avatar>
                            <img src="../assets/img/timg.jpg" alt="">
                        </mu-avatar>
                        <span class="item-paper-name">halapro.liu</span>
                    </mu-flex>
                    <mu-button class="item-paper-button" color="secondary" :ripple="true">Read</mu-button>
                </mu-flex>
                <p class="item-paper-sub-title">
                    {{page.title}}
                </p>
                <p class="item-paper-content">
                    {{page.content}}
                </p>
            </mu-paper>
            <!-- <mu-paper class="item-paper" :z-depth="1">
                <mu-flex class="item-paper-title" justify-content="between" align-items="center">
                    <mu-flex align-items="center">
                        <mu-avatar>
                            <img src="../assets/img/timg.jpg" alt="">
                        </mu-avatar>
                        <span class="item-paper-name">halapro.liu</span>
                    </mu-flex>
                    <mu-button class="item-paper-button" color="secondary" :ripple="true">Read</mu-button>
                </mu-flex>
                <p class="item-paper-sub-title">
                    前端性能优化的方法
                </p>
                <p class="item-paper-content">
                    （1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

                    （2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

                    （3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

                    （4） 当需要设置的样式很多时设置className而不是直接操作style。

                    （5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

                    （6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。

                    （7） 图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。

                    （8） 避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢。
                </p>
            </mu-paper> -->

            <mu-flex class="item-pagination" justify-content="center">
                <mu-pagination :total="total" :current.sync="current" :page-size="pageSize" :page-count="pageCount"></mu-pagination>
            </mu-flex>
        </mu-container>
        <div class="footer">
            <p>The blog was created by <a class="key" :href="githubUrl">@halapro.liu</a></p>
            <p><a class="key" :href="vueUrl">Vuejs</a> & <a class="key" :href="museuiUrl">MuseUI</a></p>
            <i class="fa fa-github fa-2x"></i>
        </div>
    </div>
</template>

<script>
import api from '../api'
export default {
    props: {
        total: {
            type: Number,
            default: 1
        },
        current: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 5
        },
        pageCount: {
            type: Number,
            default: 7
        }
    },
    data () {
        return {
            githubUrl: 'https://github.com/halaproliu',
            museuiUrl: 'https://muse-ui.org/#/zh-CN',
            vueUrl: 'https://vuejs.org',
            pages: []
        }
    },
    created () {
        this.getPaperList()
    },
    methods: {
        async getPaperList () {
            try {
                let res = await api.get('/getPage')
                res.code === 0 && (this.pages = res.data)
            } catch (err) {
                console.log(err)
                this.$toast.error('获取文章失败！')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wj-container {
    width: calc(100% - 256px);
    height: auto;
    margin-top: 64px;
    margin-left: 256px;
}

.item-paper {
    margin: 48px 72px;
    .item-paper-title {
        margin-left: 20px;
        padding-top: 20px;
    }

    .item-paper-name {
        margin-left: 10px;
        font-size: 15px;
        color: rgba(0, 0, 0, .87)
    }

    .item-paper-button {
        margin-right: 20px;
    }

    .item-paper-sub-title,
    .item-paper-content {
        margin-left: 20px;
        margin-right: 20px;
        text-align: left;
    }

    .item-paper-sub-title {
        color: rgba(0, 0, 0, .87);
        font-size: 20px;
        line-height: 36px;
    }

    .item-paper-content {
        color: rgba(0, 0, 0, .54);
        font-size: 16px;
        line-height: 24px;
        padding-bottom: 20px;
    }
}

.item-pagination {
    padding-bottom: 40px;
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
        color:  #fff;
    }
}

</style>
