<template>
    <div>
      <mu-appbar class="wj-home-appbar" :color="colors.bgcolor">
          <mu-button icon slot="left">
              <mu-icon size="18" value=":fa fa-bars"></mu-icon>
          </mu-button>
          <mu-button icon slot="right">
              <mu-icon size="18" value=":fa fa-github"></mu-icon>
          </mu-button>
      </mu-appbar>
      <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
          <mu-appbar :color="colors.bgcolor" style="text-align: left;">
            HL Blog
          </mu-appbar>
          <mu-list>
              <mu-list-item button to="/">
                  <mu-list-item-title>
                      <mu-icon value=":fa fa-home" :color="iconColor"></mu-icon>
                      <span class="wj-list-title">Go Home</span>
                  </mu-list-item-title>
              </mu-list-item>
              <mu-list-item button>
                  <mu-list-item-title>
                      <mu-icon value=":fa fa-pencil" :color="iconColor"></mu-icon>
                      <span class="wj-list-title">All posts</span>
                  </mu-list-item-title>
              </mu-list-item>
              <mu-list-item button>
                  <mu-list-item-title>
                      <mu-icon value=":fa fa-pencil" :color="iconColor"></mu-icon>
                      <span class="wj-list-title">All posts</span>
                  </mu-list-item-title>
              </mu-list-item>
          </mu-list>
      </mu-drawer>
    </div>
</template>

<script>
import { colors } from '../constant'
export default {
    data () {
        return {
            open: true,
            docked: true,
            position: 'left',
            colors: colors,
            iconColor: '#757575'
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';
.wj-home-appbar {
    width: calc(100% - 256px);
    margin-left: 256px;
}

.wj-list-title {
    margin-left: 24px;
}
</style>
