<template>
    <div>
      <mu-appbar class="wj-home-appbar" :class="[open ? '': 'close']" :color="colors.bgcolor">
          <mu-button icon slot="left" @click="toggleMenu">
              <mu-icon size="18" value=":fa fa-bars"></mu-icon>
          </mu-button>
          <mu-button icon slot="right">
              <mu-icon size="18" value=":fa fa-github"></mu-icon>
          </mu-button>
      </mu-appbar>
      <Menu :open="open" :docked="docked"></Menu>
    </div>
</template>

<script>
import Menu from '../components/menu'
import { colors } from '../constant'
export default {
    components: {
        Menu
    },
    data () {
        return {
            open: true,
            docked: true,
            colors: colors
        }
    },
    methods: {
        toggleMenu () {
            this.open = !this.open
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
</style>
