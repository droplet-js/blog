<template>
    <div>
        <mu-dialog class="loading-dialog" width="780" :open.sync="open">
            <div class="loading-text">Loading Data...</div>
            <mu-circular-progress class="loading-circular-progress" :color="colors.bgcolor" :stroke-width="7" :size="200"></mu-circular-progress>
        </mu-dialog>
    </div>
</template>

<script>
import { colors } from '../constant'
export default {
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            colors: colors
        }
    }
}
</script>

<style lang="scss" scoped>
$input-border: rgba(0, 0, 0, .2);
$input-shadow: rgba(0, 0, 0, .2);
.loading-dialog {
    text-align: center;
    margin-left: 246px;
    box-shadow: 0 0 10px $input-shadow;
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
