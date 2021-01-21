<template>
    <div id="MyRelease">
        <HeaderTop title="我的广告">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont icon-fanhui"></i>
            </a>
        </HeaderTop>
        <ul class="lis">
            <li @click="goTo('/MyRelease/MyReleaseBuy')" :class="$route.path=='/MyRelease/MyReleaseBuy'?'active':''">我的购买订单</li>
            <li @click="goTo('/MyRelease/MyReleaseSell')" :class="$route.path=='/MyRelease/MyReleaseSell'?'active':''">我的出售订单</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>

    import Vue from 'vue'

    import HeaderTop from '../../../components/HeaderTop/HeaderTop.vue'

    import {Toast} from 'vant'

    Vue.use(Toast)

    export default {

        data() {
            return {
                

            }
        },

        mounted() {
            
        },

        methods: {
           goTo(path) {
               this.$router.replace({path:path})
           }
        },

        components: {
            HeaderTop
        }
    }
</script>

<style scoped lang="less">

    #MyRelease {
        height: 100%;
        padding: 50px 0 10px;
        font-size: 14px;
            overflow: auto;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .right {
            position: absolute;
            right: 10px;
            line-height: 50px;
            height: 50px;
            color: #fff;
        }
        .lis {
            width: 70%;
            height: 36px;
            line-height: 36px;
            margin: 0px auto 10px;
            display: flex;
            border: 1px solid #ccc;
            border-right: none;
            li {
                width: 50%;
                text-align: center;
                border-right: 1px solid #ccc;
                &.active {
                    background-color: #e9a44e;
                    color: #fff;
                }
            }


        }
        

       
    }

</style>
