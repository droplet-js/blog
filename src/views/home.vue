<template>
    <div>
      <mu-appbar class="wj-home-appbar" :color="colors.bgcolor">
      <!-- <mu-appbar class="wj-home-appbar" :class="[open ? '': 'close']" :color="colors.bgcolor"> -->
          <!-- <mu-button icon slot="left" @click="toggleMenu">
              <mu-icon size="18" value=":fa fa-bars"></mu-icon>
          </mu-button> -->
          <mu-button icon slot="right" :href="githubUrl">
              <mu-icon size="18" value=":fa fa-github"></mu-icon>
          </mu-button>
      </mu-appbar>
      <Container></Container>
    </div>
</template>

<script>
import Container from '../components/container'
import { colors } from '../constant'
export default {
    components: {
        Container
    },
    data () {
        return {
            colors: colors,
            githubUrl: 'https://github.com/halaproliu'
        }
    },
    methods: {}
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
</style>
