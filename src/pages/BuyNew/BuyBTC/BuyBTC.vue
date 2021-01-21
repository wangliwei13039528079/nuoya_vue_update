<template>
    <div id="buyBTC">
        <BuyItem :name="'小狐狸'" :money="'500'" @goBuy="goTo('/buynewdetail/15')"></BuyItem>
        <BuyItem :name="'小野猫'" :money="'600'" @goBuy="goTo('/buynewdetail/16')"></BuyItem>
    </div>
</template>

<script>


    import VueRouterUtils from '../../../common/script/VueRouterUtils.js'
    import BuyItem from '../../../components/BuyItem/BuyItem.vue'

    export default {

        methods: {
            goTo(path) {
                //等待完善
                VueRouterUtils.push(this.$router, path)
            }
        },
        //组件
        components: {
            BuyItem
        },
    }
</script>

<style scoped lang="less">

    #buyBTC{
        padding-top: 60px;
    }

</style>
