<template>
    <div class="editor">
        <div id="editor-area">
            <div class="input-text">标题：</div>
            <input class="input-value" type="text" placeholder="请输入标题" v-model="title">
            <div class="input-text">内容：</div>
            <mavon-editor class="input-content" v-model="value"/>
            <div class="input-text">关键词：</div>
            <input type="text" class="input-value" v-model="tag">
            <mu-button class="commit-btn" color="success" placeholder="请输入关键词" @click="onCommit">commit</mu-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            value: '',
            tag: ''
        }
    },
    methods: {
        onCommit () {}
    }
}
</script>

<style lang="scss" scoped>
$input-border: skyblue;

.editor {

}

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
}

.input-content {
    margin-top: 14px;
}

.commit-btn {
    margin-top: 20px;
}
</style>
