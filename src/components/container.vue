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
                    <mu-button @click="gotoDetail(page)" class="item-paper-button" color="secondary" :ripple="true">Read</mu-button>
                </mu-flex>
                <p class="item-paper-sub-title">
                    {{page.title}}
                </p>
                <p class="item-paper-content" v-html="wordFilter(marked(page.content), 150)"></p>
            </mu-paper>

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
import marked from 'marked'
import { wordFilter } from '../filters'
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
            pages: [],
            marked: marked,
            wordFilter: wordFilter
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
        },
        gotoDetail (item) {
            this.$router.push(`/detail/${item.id}`)
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
    margin: 48px 0;
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
