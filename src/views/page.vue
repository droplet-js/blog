<template>
    <Container :open="loading">
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
                <p class="item-paper-content" v-html="wordFilter(marked(page.content), 200)"></p>
            </mu-paper>

            <mu-flex class="item-pagination" justify-content="center">
                <mu-pagination @change="loadMore" :total="pagination.total" :current.sync="pagination.current" :page-size="pagination.pageSize" :page-count="pageCount"></mu-pagination>
            </mu-flex>
        </mu-container>
    </Container>
</template>

<script>
import Page from '../api/page'
import Container from '../components/container'
import { colors, userData } from '../constant'
import marked from 'marked'
import { wordFilter } from '../filters'
export default {
    components: {
        Container
    },
    data () {
        return {
            colors: colors,
            githubUrl: userData.githubUrl, // 个人github链接
            pages: [], // 文章列表
            marked: marked, // 解析markdown文本为html
            wordFilter: wordFilter,
            pageCount: 7,
            pagination: {
                current: 1,
                pageSize: 5,
                total: 0
            },
            loading: false // 是否显示loading
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getPaperList()
        })
    },
    methods: {
        async getPaperList () {
            this.loading = true
            try {
                let { current, pageSize } = this.pagination
                let res = await Page.getPage({ current, pageSize })
                if (res.code === 0 && res.data) {
                    this.pagination.total = res.data.page.total
                    this.pages = res.data.result
                    this.loading = false
                }
            } catch (err) {
                this.loading = false
                console.log(err)
                this.$toast.error('获取文章失败！')
            }
        },
        loadMore () {
            this.getPaperList()
        },
        gotoDetail (item) {
            this.$router.push(`/detail/${item.id}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';
.wj-home-appbar {
    width: calc(100% - 256px);
    margin-left: 256px;
    &.close {
        width: 100%;
        margin-left: 0;
    }
}

.wj-list-title {
    margin-left: 24px;
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
</style>
