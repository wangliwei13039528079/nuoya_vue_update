<template>
    <div id="OTCOrder">
        <HeaderTop title="OTC订单中心">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont icon-fanhui"></i>
            </a>
            <a class="right" @click="goTo('/MyRelease')" slot="right">
                广告管理
            </a>
        </HeaderTop>
        <ul class="lis">
            <li @click="goTo('/OTCOrder/OTCBuyOrder')" :class="$route.path=='/OTCOrder/OTCBuyOrder'?'active':''">购买订单</li>
            <li @click="goTo('/OTCOrder/OTCSellOrder')" :class="$route.path=='/OTCOrder/OTCSellOrder'?'active':''">出售订单</li>
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
                if(path == '/MyRelease') {
                    this.$router.push({path:path})
                }else {
                    this.$router.replace({path:path})
                }
                
           }
        },

        components: {
            HeaderTop
        }
    }
</script>

<style scoped lang="less">

    #OTCOrder {
        height: 100%;
        font-size: 14px;
        padding-top: 50px;
        padding-bottom: 50px;

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
            width: 50%;
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
