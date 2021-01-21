<template>
    <div id="eosv">

        <div style="width: 100%;height:40px; background-color: #000" class="top">
            <div class="left-icon">
                <a @click="goTo('/BuyEOSV')">节点布置</a>
            </div>
        </div>
        <div class="mills">
            <template v-if="millList.length < 1">
                <div class="none">
                    暂无内容
                </div>
            </template>

            <template>
                <div class="list" @click="goTo('/EOSVDetail?id='+item.id+'&status='+item.status)" v-for="(item,index) in millList">
                    <div class="imgs">
                        <img src="../../../static/image/level1.png" alt="" v-if="item.level == 1">
                        <img src="../../../static/image/level2.png" alt="" v-if="item.level == 2">
                        <img src="../../../static/image/level3.png" alt="" v-if="item.level == 3">
                        <img src="../../../static/image/level4.png" alt="" v-if="item.level == 4">
                        <img src="../../../static/image/level5.png" alt="" v-if="item.level == 5">
                        <img src="../../../static/image/level6.png" alt="" v-if="item.level == 6">
                    </div>
                    <div class="con">
                        <h5>{{getLevel(item.level)}} EOSV</h5>
                        <p>金额：${{Number(item.money).toFixed(2)}}</p>
                        <p>周期：{{item.days}}/{{item.cycle}}天</p>
                        <p>编号： {{item.sign}}</p>
                        <p>状态：{{item.status == 0?'运行中':'已结束'}}</p>
                    </div>
                </div>

            </template>

        </div>



    </div>
</template>

<script>
    import Vue from "vue";
    import { Panel } from "vant";
    import { Row, Col } from "vant";
    import { Toast } from "vant";
    import { Tab, Tabs } from "vant";

    // 确认对话框
    import { Dialog } from "vant";
    Vue.use(Dialog);

    Vue.use(Row).use(Col);
    Vue.use(Panel);
    Vue.use(Tab).use(Tabs);
    import { setTimeout } from 'timers';

    export default {
        data() {
            return {
                mills: [],
                refresh: "",
                timer: null,
                flag: true,
                mac : '',
                millList:[]
            };
        },

        mounted() {
            // this.getOrders()
            this.getMillList()
        },
        methods: {
            goTo(path) {
                this.$router.push({ path: path });
            },
            getMillList(){
                this.$api.millList({},res=>{
                    if(res.status) {
                        this.millList = res.data
                        if(this.millList.length < 1) {
                            this.$router.replace({path:'/BuyEOSV'})
                        }
                    }
                })
            },
            getLevel(status){
                let state = ''
                switch(status) {
                    case 1:
                        state = '一级'
                        break
                    case 2:
                        state = '二级'
                        break
                    case 3:
                        state = '三级'
                        break
                    case 4:
                        state = '四级'
                        break
                    case 5:
                        state = '预备节点'
                        break
                    case 6:
                        state = '超级节点'
                        break
                    default:
                        state = '其他'
                        break
                }
                return state
            }

        },

        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },


    };
</script>

<style lang="less" scoped>
    #eosv {

        padding-bottom: 50px;
        height: 100%;
        .top {
            .left-icon {
                position: absolute;
                display: flex;
                right: 10px;

                > a {
                    padding: 10px;
                    display: block;
                    font-size: 16px;
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

        .tab {

            .van-tabs__nav {
                padding: 1px;
            }
        }

        .mills {
            padding-bottom: 80px;
            // background-color: #edf1f4;

            .mill-item {
                margin-top: 10px;

                &.on-line {
                    .van-panel__header .van-cell__value {
                        color: #44bb00;
                    }
                }

                &.off-line {
                    .van-panel__header .van-cell__value {
                        color: red;
                    }
                }
            }

            .content {
                > p {
                    padding: 2px;
                }

                padding: 20px;
                padding-left: 30px;
                font-size: 12px;
                color: #666;
            }

            .footer {
                display: flex;
                justify-content: flex-end;
            }
        }

        .bar {
            width: 100%;
            position: fixed;
            bottom: 0;
            left: 0;

            .btn {
                width: 100%;
                height: 50px;
                border: none;
                font-size: 15px;
                color: #fff;
                background-color: #000;

                &.btn-scan {
                    background-color: #4b0;
                }

                &.btn-manual {
                    background-color: #ff976a;
                }
            }
        }

        .refresh {
            animation: myfirst 1s infinite;
        }

        .list {
            display: flex;
            justify-content: flex-start;
            margin: 10px 10px 0 10px;
            background-color: #161616;
            align-items: center;
            border-radius: 5px;
            .imgs {
                width: 80px;
                height: 100px;
                padding: 10px;
                align-items: center;
                img {
                    width: 100%;
                    // height: 100%;
                }
            }
            .con {
                padding: 10px 0;
                margin-left: 10%;
                flex: 1;
                h5 {
                    padding-bottom: 10px;
                    font-weight: 400;
                    font-size: .3rem;
                    color: #fff;
                }
                p {
                    font-size: 14px;
                    line-height: 20px;
                    color: #ababab;
                }
            }
            .status {
                align-items: center;
                padding: 5px;
                margin-right: 1%;
            }

        }
        .none {
            padding: 10px;
            margin-top: 20px;
            background-color: #000;
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
