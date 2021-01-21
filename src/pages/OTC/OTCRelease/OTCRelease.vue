<template>
    <div id="OTCRelease">
        <HeaderTop title="OTC挂单中心">
            <a class="back" @click="goTo('/OTCDeal')" slot="left">
                <i class="iconfont icon-fanhui"></i>
            </a>
        </HeaderTop>
        <ul class="lis">
            <!-- <li>我要出售</li> -->

            <li @click="goTo('/OTCRelease/OTCReleaseBuy')" :class="$route.path=='/OTCRelease/OTCReleaseBuy'?'active':''">我要购买</li>
            <li @click="goTo('/OTCRelease/OTCReleaseSell')" :class="$route.path=='/OTCRelease/OTCReleaseSell'?'active':''">我要出售</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>

    import Vue from 'vue'

    import {Toast} from 'vant'

    Vue.use(Toast)

    import HeaderTop from '../../../components/HeaderTop/HeaderTop.vue'

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

    #OTCRelease {
        height: 100%;
        font-size: 14px;
        padding-top: 50px;
        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .lis {
            width: 50%;
            height: 36px;
            line-height: 36px;
            margin: 0px auto 10px;
            display: flex;
            border: 1px solid #ccc;
            border-right: none;
            justify-content: center;
            li {
                width: 50%;
                text-align: center;
                // background-color: #e9a44e;
                border-right: 1px solid #ccc;
                &.active {
                    background-color: #e9a44e;
                    color: #fff;
                }
            }


        }
        

       
    }

</style>
