<template>
    <div>
        <mu-appbar class="wj-home-appbar" :color="colors.bgcolor">
            <!-- <div class="wj-search">
                <i class="material-icons">search</i>
                <input type="text" class="search-text">
            </div> -->
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
    </div>
</template>

<script>
import { colors, userData } from '../constant'
export default {
    data () {
        return {
            githubUrl: userData.githubUrl,
            museuiUrl: userData.museuiUrl,
            vueUrl: userData.vueUrl,
            colors: colors,
            searchText: ''
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

.wj-search {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    // margin: 20px 0;
    background: rgba(255, 255, 255, .15);
    .search-text {
        outline: none;
        border: none;
        background: none;
    }
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
