<template>
    <div id="mill">

        <div style="width: 100%;height:40px; background-color: #000" class="top">
            <div class="left-icon">
                <!-- <a class="iconfont icon-shuaxin" :class="refresh" @click="doRefresh();"></a> -->
                <!-- <a class="iconfont icon-jindutiaoshouyidaozhang1" @click="goTo('/earningslogtwo')"></a> -->
                <!-- <a class="iconfont icon-tianjia1" @click="goTo('/addmill')"></a> -->
                <a class="iconfont icon-yun" @click="goTo('/BuyMill')"></a>
            </div>
        </div>
        <div class="mills">
            <template v-if="millList.length < 1">
                <div class="none">
                    暂无矿机运行
                </div>
            </template>

            <template v-else>
                <div class="list" @click="goTo('/MillDetail?id='+item.id)" v-for="(item,index) in millList" :key="item.id">
                    <div class="imgs">
                        <img src="../../common/images/mill.png" alt="">
                    </div>
                    <div class="con">
                        <h5>矿机</h5>
                        <p>运行周期：{{item.days}}/{{item.cycle}}天</p>
                        <p>矿机编号： {{item.sign}} </p>
                        <p>矿机状态：{{item.status == 0?'运行中':'已结束'}}</p>
                    </div>
                    <!-- <div class="status" >查看</div> -->
                </div>

            </template>

        </div>
<!--        <van-tabs type="card" color="#406089" class="tab" background="#000" title-inactive-color="#ccc">-->
<!--            <van-tab title="在线">-->
<!--                <div class="mills">-->
<!--                    <template v-if="millList.length < 1">-->
<!--                        <div class="none">-->
<!--                            暂无矿机运行-->
<!--                        </div>-->
<!--                    </template>-->

<!--                    <template v-else>-->
<!--                        <div class="list" @click="goTo('/MillDetail?id='+item.id)" v-for="(item,index) in millList" :key="item.id">-->
<!--                            <div class="imgs">-->
<!--                                <img src="../../common/images/mill.png" alt="">-->
<!--                            </div>-->
<!--                            <div class="con">-->
<!--                                <h5>矿机</h5>-->
<!--                                <p>运行周期：{{item.days}}/{{item.cycle}}天</p>-->
<!--                                <p>矿机编号： {{item.sign}} </p>-->
<!--                                <p>矿机状态：{{item.status == 0?'运行中':'已结束'}}</p>-->
<!--                            </div>-->
<!--                            &lt;!&ndash; <div class="status" >查看</div> &ndash;&gt;-->
<!--                        </div>-->

<!--                    </template>-->

<!--                </div>-->
<!--            </van-tab>-->
<!--            <van-tab title="全部">-->
<!--                <div class="mills">-->
<!--                            &lt;!&ndash; <template v-if="allOrder.length < 1">-->
<!--                                <div class="none">-->
<!--                                    暂无矿机运行-->
<!--                                </div>-->
<!--                            </template> &ndash;&gt;-->

<!--                            <template>-->
<!--                                <div class="list">-->
<!--                                    <div class="imgs">-->
<!--                                        <img src="../../common/images/wa.png" alt="">-->
<!--                                    </div>-->
<!--                                    <div class="con">-->
<!--                                        <h5>2级云矿机</h5>-->
<!--                                        <p>运行周期：9/30天（1200）</p>-->
<!--                                        <p>矿机编号： Sbgj2512532655  </p>-->
<!--                                        <p>矿机状态：运行中</p>-->
<!--                                    </div>-->
<!--                                    <div class="status">查看</div>-->
<!--                                </div>-->
<!--                            </template>-->

<!--                        </div>-->

<!--            </van-tab>-->
<!--        </van-tabs>-->


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
                    }
                })
            },


            //refresh mills
            async doRefresh() {
                const result = await reqUserServer();
                if (result) {
                    Toast.success("刷新成功");
                    this.mills = result;
                }
            },
            //删除矿机

            showDelMill(mac){
                this.mac = mac;
                const that = this;


                Dialog.confirm({
                    title: "提示",
                    message: "确定要解绑矿机吗？"
                })
                    .then(() => {
                        this.delMillItem(that.mac)
                    })
                    .catch(() => {

                    });

            },

            async delMillItem(mac) {
                const result = await reqDelMill({ mac });
                if (result) {

                    if (result.code == 1) {
                        Toast.success(result.msg);

                        setTimeout(()=>{
                            this.doRefresh();
                        },1000)


                    }else{
                        Toast.fail(result.msg)
                    }
                }
            },

            async getOrders() {
                const res = await reqorders({})
                if(res.code == 0) {
                    this.order = res.data.online
                    this.allOrder = res.data.all
                }
            }
        },

        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },


    };
</script>

<style lang="less">
    #mill {

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
                    font-size: 28px;
                    color: #48CED7;
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
            background-color: #1A1B26;
            align-items: center;
            border-radius: 5px;
            .imgs {
                width: 100px;
                height: 100px;
                padding: 10px;
                align-items: center;
                img {
                    width: 100%;
                    height: 100%;
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
                }
                p {
                    font-size: 14px;
                    line-height: 20px;
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
