<template>
    <div>
        <mu-appbar class="wj-home-appbar" :color="colors.bgcolor">
            <mu-button icon slot="right" :href="githubUrl">
                <mu-icon size="18" value=":fa fa-github"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="wj-container">
            <slot></slot>
            <div class="footer">
                <p>The blog was created by <a class="key" :href="githubUrl">@halapro.liu</a></p>
                <p><a class="key" :href="vueUrl">Vuejs</a> & <a class="key" :href="museuiUrl">MuseUI</a></p>
                <i class="fa fa-github fa-2x"></i>
            </div>
        </div>

        <mu-dialog class="loading-dialog" width="780" :open.sync="open">
            <div class="loading-text">Loading Data...</div>
            <mu-circular-progress class="loading-circular-progress" :color="colors.bgcolor" :stroke-width="7" :size="200"></mu-circular-progress>
        </mu-dialog>
    </div>
</template>

<script>
import { colors, userData } from '../constant'
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            githubUrl: userData.githubUrl,
            museuiUrl: userData.museuiUrl,
            vueUrl: userData.vueUrl,
            colors: colors,
            searchText: ''
        }
    },
    methods: {
        toggleDialog () {
            this.open = !this.open
        }
    }
}
</script>

<style lang="scss" scoped>
.wj-home-appbar {
    width: calc(100% - 256px);
    margin-left: 256px;
    &.close {
        width: 100%;
        margin-left: 0;
    }
}

.wj-container {
    width: calc(100% - 256px);
    height: auto;
    margin-top: 64px;
    margin-left: 256px;
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

.loading-dialog {
    text-align: center;
    margin-left: 246px;
    box-shadow: 0 0 10px 
}

.loading-text {
    margin-top: 20px;
    margin-bottom: 40px;
    font-size: 30px;
}

.loading-circular-progress {
    margin-top: 40px;
    margin-bottom: 40px;
}

</style>
