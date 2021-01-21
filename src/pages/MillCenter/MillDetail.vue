<template>
    <div id="milldetail">

<van-panel title="矿机的级别" status="0级"></van-panel>

<van-steps :active="active">
  <van-step>0级</van-step>
  <van-step>1级</van-step>
  <van-step>2级</van-step>
  <van-step>3级</van-step>
  <van-step>4级</van-step>
</van-steps>

<van-panel title="经理级别：" status="0级"></van-panel>
 <van-panel title="旷工级别：" status="0级"></van-panel>
        <div class="MillProfitList">

         <van-panel title="矿机收益列表"></van-panel>
          <van-panel title="总收益001" status="确认转出"></van-panel>
        <!-- <div class="MillProfit">
            <div></div>
            <div @click="goRoll()">确认转出</div>
        </div> -->

        </div>

        
    </div>
</template>

<script>
    import Vue from "vue";

import { Step, Steps } from 'vant';

Vue.use(Step).use(Steps);

import { Panel } from 'vant';

Vue.use(Panel);

  
    import { setTimeout } from 'timers';

    export default {
        data() {
            return {
                active: 0
            };
        },

        mounted() {
            
        },
        methods: {
            goPayElectricity(){
                this.$router.replace('/PayElectricity');
            },
            goRoll(){
                this.$router.replace('/EarningsLog');
            }
            

        },

        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },
    };
</script>

<style lang="less">

    #milldetail {        
    height: 100%;
    background-color: #000;
    overflow: auto;
    padding: 10px;
    .top {
        .left-icon {
            position: absolute;
            display: flex;
            right: 10px;

            > a {
                padding: 10px;
                display: block;
                font-size: 28px;
                color: #fff;
                
            }
        }
    }
    .back {
        padding: 0 10px;
        i {
            font-size: 15px;
            color: #fff;
            line-height: 50px;
        }
    }

    .MillProfit{
        display: flex;
        justify-content: space-between;
        background: #fff
    }
        @keyframes myfirst {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
</style>
