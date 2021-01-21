<template>
    <div class="footer_guide">
        <a class="guide_item" @click="goTo('/msiteb')" :class="{on: '/msiteb'===$route.path}">
        <span class="item_icon">
            <i class="iconfont icon-home"></i>
        </span>
            <span>首页</span>
        </a>
        <!-- <a class="guide_item" @click="goTo('/bibipagelist')" :class="{on: '/bibipagelist'===$route.path}">
            <span class="item_icon">
                <i class="iconfont icon-paihang-shouye"></i>
            </span>
            <span>交易</span>
        </a> -->
<!--
        <a class="guide_item" :href="'http://kuangji.ty.vjojo.com/wap/index/index?apiauth=' + apiauth">
            <span class="item_icon">
                <i class="iconfont icon-paihang-shouye"></i>
            </span>
            <span>商城</span>
        </a> -->

        <!-- :href="'https://gaiban.sc.jiujiutc.com/wap/index/index?apiauth=' + apiauth"
        @click="goTo('/millcenter')"-->
        <!-- <a class="guide_item" @click="goTo('/buynew')" :class="{on: $route.path.includes('/buynew')}">
            <span class="item_icon">
                <i class="iconfont icon-qian1"></i>
            </span>
            <span>矿机</span>
        </a> -->
        <a class="guide_item" @click="goTo('/OTCDeal')" :class="{on: $route.path.includes('/OTCDeal')}">
            <span class="item_icon">
                <i class="iconfont icon-otcjiaoyi-"></i>
            </span>
            <span>OTC</span>
        </a>
        <a class="guide_item" @click="goTo('/buynew')" :class="{on: $route.path.includes('/BuyNew')}">
            <span class="item_icon">
                <i class="iconfont icon-qian1"></i>
            </span>
            <span>CTC</span>
        </a>

        <a class="guide_item" @click="goTo('/Finance')" :class="{on: '/Finance'===$route.path}">
            <span class="item_icon">
                <i class="iconfont icon-qian"></i>
            </span>
            <span>财务</span>
        </a>
        <a class="guide_item" @click="goTo('/Profile')" :class="{on: '/Profile'===$route.path}">
            <span class="item_icon"><i class="iconfont icon-wode"></i></span>
            <span>我的</span>
        </a>
    </div>
</template>

<script>
    // import {reqUserAllInfo} from '../../api'
// import { setTimeout, clearInterval } from 'timers';
    export default {
        data(){
            return {
                apiauth:'',
                timer:''
            }
        },
         mounted(){
            // this.timer = setInterval(()=>{
            //     this.apiauth = localStorage.getItem('apiauth')
            //     if(this.apiauth) {
            //         clearInterval(this.timer)
            //     }
            // },5000)

        },
        methods: {
            goTo(path) {
                //alert('工程师正在不断的完善！')
                this.$router.replace({path: path})
            },


        },



    }
</script>

<style lang="less">
    .footer_guide {
        // border-top: 1px solid #eee;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        // background-color: #fff;
        width: 100%;
        height: 17vw;
        display: flex;

        .guide_item {
            display: flex;
            flex: 1;
            text-align: center;
            flex-direction: column;
            align-items: center;
            margin: 5px;
            color: #999999;

            &.on {
                color: #406089
            }

            span {
                font-size: 3.5vw;
                margin-top: 1.3vw;
            }


            .iconfont {
                font-size: 7vw;
            }

        }
    }
</style>
