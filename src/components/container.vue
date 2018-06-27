<template>
    <div class="wj-container">
        <mu-container>
            <mu-paper class="item-paper" :z-depth="1">
                <mu-flex class="" justify-align="space-between" align-items="center">
                    <mu-avatar>
                        <img src="../assets/img/timg.jpg" alt="">
                    </mu-avatar>
                    halapro.liu
                </mu-flex>
            </mu-paper>
            <mu-paper class="item-paper" :z-depth="2">2</mu-paper>
            <mu-paper class="item-paper" :z-depth="3">3</mu-paper>
            <mu-paper class="item-paper" :z-depth="4">4</mu-paper>
            <mu-paper class="item-paper" :z-depth="5">5</mu-paper>
        </mu-container>
    </div>
</template>

<script>
export default {
    props: {}
}
</script>

<style lang="scss" scoped>
.wj-container {
    width: calc(100% - 256px);
    height: auto;
    margin-top: 64px;
    margin-left: 256px;
}

.item-paper {
    margin: 48px 72px;
}
</style>
