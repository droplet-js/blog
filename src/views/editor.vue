<template>
    <div class="editor">
        <Menu :open="open" :docked="docked"></Menu>
        <div id="editor-area">
            <mavon-editor v-model="value"/>
            <mu-button class="commit-btn" color="success" @click="onCommit">commit</mu-button>
        </div>
    </div>
</template>

<script>
import Menu from '../components/menu'
export default {
    components: {
        Menu
    },
    data () {
        return {
            value: '',
            open: true,
            docked: true
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
