<template>
    <div></div>
</template>

<script>
import api from '../api'
export default {
    data () {
        return {
            detail: {}
        }
    },
    created () {
        this.init()
    },
    methods: {
        init () {
            this.getDetailPage()
        },
        async getDetailPage () {
            let id = this.$route.params.id
            try {
                let res = await api.get('/api/getDetailPage', { id })
                res.data === 0 && (this.detail = res.data)
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style></style>
