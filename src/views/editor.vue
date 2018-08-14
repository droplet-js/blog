<template>
    <div class="editor">
        <div id="editor-area">
            <mavon-editor v-model="value"/>
            <mu-button class="commit-btn" color="success" @click="onCommit">commit</mu-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value: ''
        }
    },
    methods: {
        onCommit () {}
    }
}
</script>

<style lang="scss" scoped>
.editor {

}

#editor-area {
    margin-left: 260px;
    height: 100%;
}

.commit-btn {
    margin-top: 20px;
}
</style>
