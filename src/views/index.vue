<template>
    <div>
        <mu-appbar style="width: 100%;" :color="bgColor">
            <mu-button icon slot="left" @click="toggleMenu">
                <mu-icon size="20" value=":fa fa-bars fa-5x"></mu-icon>
            </mu-button>
            <mu-button flat slot="right" :href="githubUrl">
                <mu-icon size="24" value=":fa fa-github fa-5x"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="bg">
            <img class="logo" src="../assets/img/logo.png" alt="">
            <div class="bg-desc">
                <h1>halapro.liu Blog</h1>
                <h2>A simple Blog used by halapro.liu.Which is learn by Song Zhou</h2>
            </div>
            <mu-button to="/home" class="post-btn" size="15" color="#fff" textColor="#00bcd4">Go for Posts</mu-button>
        </div>

        <div class="content">
            <div class="mu-flex">
                <div class="module">
                    <h3>About</h3>
                    <router-link to="">
                        <img src="../assets/img/get-started.svg" alt="">
                    </router-link>
                </div>
                <div class="module">
                    <h3>Posts</h3>
                    <router-link to="/home">
                        <img src="../assets/img/css-framework.svg" alt="">
                    </router-link>
                </div>
                <div class="module">
                    <h3>Pages</h3>
                    <router-link to="">
                        <img src="../assets/img/components.svg" alt="">
                    </router-link>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>The blog was created by <a class="key" :href="githubUrl">@halapro.liu</a></p>
            <p><a class="key" :href="vueUrl">Vuejs</a> & <a class="key" :href="museuiUrl">MuseUI</a></p>
            <i class="fa fa-github fa-2x"></i>
        </div>

        <Menu :open="open" :docked="docked" @close="closeMenu"></Menu>
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
            bgColor: '#00bed4',
            githubUrl: 'https://github.com/halaproliu',
            museuiUrl: 'https://muse-ui.org/#/zh-CN',
            vueUrl: 'https://vuejs.org',
            open: false,
            docked: false
        }
    },
    methods: {
        toggleMenu () {
            this.open = !this.open
        },
        closeMenu (val) {
            this.open = val
        }
    }
}
</script>

<style lang="scss" scoped>
.bg {
    box-sizing: border-box;
    background: #00bed4;
    padding: 72px 24px;
}

.bg-desc {
    margin: 32px auto 0px;
    text-align: center;
    max-width: 575px;
    h1 {
        color: rgba(255, 255, 255, .87);
        font-size: 36px;
        font-weight: 300;
        line-height: 24px;
    }

    h2 {
        color: rgba(255, 255, 255, 0.87);
        font-weight: 300;
        font-size: 24px;
        line-height: 32px;
        padding-top: 16px;
        margin-bottom: 12px;
        letter-spacing: 0px;
    }
}

.logo {
    width: 150px;
    height: 150px;
}

.content {
    box-sizing: border-box;
    padding: 72px 24px;
    max-width: 906px;
    margin: 0 auto;
}

.mu-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    .module {
        width: 30%;
        &:nth-child(n+2) {
            margin-left: 4px;
        }
        h3 {
            font-size: 20px;
            padding-top: 19px;
            margin-bottom: 13px;
            letter-spacing: 0;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.87);
            background-color: #eeeeee;
            text-align: center;
            margin: 0;
            padding: 0;
            line-height: 64px;
        }
        img {

        }
    }
}

.post-btn {
    font-family: Roboto, sans-serif;
    border-radius: 2px;
    margin: 16px 32px 0px 32px;
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
