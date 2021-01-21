<template>
    <div class="transferBill">

        <header-top title="流水账单">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </header-top>

        <div class="content-wrap">
            <div class="orders">
                <div class="title">
                            <div class="time">时间</div>
                            <div class="amount">收益</div>
                            <div class="status">来源</div>
                        </div>
                        <div class="item" v-if="data.length < 1">暂无记录</div>
                        <template v-else>
                            <div class="item" v-for="(item,index) in data" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>   
                <!-- <van-tabs v-model="active" background="#000" title-active-color="#fff" title-inactive-color="#ababab">
                    <van-tab title="注册钱包">
                            <div class="title">
                                <div class="time">时间</div>
                                <div class="amount">收益</div>
                                <div class="status">来源</div>
                            </div>
                        <div class="item" v-if="!register">暂无记录</div>
                        <template v-else>
                            <div class="item" v-for="(item,index) in register" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>
                        
                    </van-tab>
                    <van-tab title="激活钱包">
                        <div class="title">
                            <div class="time">时间</div>
                            <div class="amount">收益</div>
                            <div class="status">来源</div>
                        </div>
                         <div class="item" v-if="!activation">暂无记录</div>
                        <template v-else>                       
                            <div class="item" v-for="(item,index) in activation" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>
                       

                    </van-tab>
                    <van-tab title="锁仓钱包">
                        <div class="title">
                            <div class="time">时间</div>
                            <div class="amount">收益</div>
                            <div class="status">来源</div>
                        </div>
                        <div class="item" v-if="!lock">暂无记录</div>
                        <template v-else>
                            <div class="item" v-for="(item,index) in lock" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>
                    </van-tab>
                    <van-tab title="静态释放">
                        <div class="title">
                            <div class="time">时间</div>
                            <div class="amount">收益</div>
                            <div class="status">来源</div>
                        </div>
                        <div class="item" v-if="!static">暂无记录</div>
                        <template v-else>
                            <div class="item" v-for="(item,index) in static" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>
                    </van-tab>
                    <van-tab title="分享加速">
                        <div class="title">
                            <div class="time">时间</div>
                            <div class="amount">收益</div>
                            <div class="status">来源</div>
                        </div>
                        <div class="item" v-if="!share">暂无记录</div>
                        <template v-else>
                            <div class="item" v-for="(item,index) in share" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>   
                    </van-tab>
                    <van-tab title="共享加速">
                        <div class="title">
                            <div class="time">时间</div>
                            <div class="amount">收益</div>
                            <div class="status">来源</div>
                        </div>
                        <div class="item" v-if="!allShare">暂无记录</div>
                        <template v-else>
                            <div class="item" v-for="(item,index) in allShare" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>   
                    </van-tab>
                    <van-tab title="其他">
                        <div class="title">
                            <div class="time">时间</div>
                            <div class="amount">收益</div>
                            <div class="status">来源</div>
                        </div>
                        <div class="item" v-if="!rest">暂无记录</div>
                        <template v-else>
                            <div class="item" v-for="(item,index) in rest" :key="index">
                                <div class="time">{{item.ctime}}</div>
                                <div class="amount"> {{ item.direction == 1 ? '-' + item.money : '+' + item.money}} </div>
                                <div class="status">{{item.memo}}</div>
                            </div>
                        </template>   
                    </van-tab>
                </van-tabs> -->
        
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    // import {reqUserflow} from "../../api";
    import {Cell, CellGroup} from 'vant';
    import { Tab, Tabs } from 'vant';
    import HeaderTop from "../../components/HeaderTop/HeaderTop";
    Vue.use(Cell).use(CellGroup);
    Vue.use(Tab).use(Tabs);

    export default {
        name: "Bill",
        components: {HeaderTop},
        data() {
            return {
                type: '',
                orders: [],
                active:0,
                register:[], // 注册钱包
                activation:[], // 激活钱包
                lock:[], // 锁仓钱包
                static:[], // 静态释放
                share:[], // 分享加速
                allShare:[],  // 共享加速
                rest:[],  // 其他
                data:[]
            }
        },


        mounted() {
            // this.type = this.$route.query.type.replace(',', '_')
            this.getBill()
        },

        methods: {
            getBill() {
                this.$api.transferBill({},res=>{
                    if(res.status) {
                        this.register = res.data.balance
                        this.activation = res.data.points
                        this.lock = res.data.freeze
                        this.static = res.data.day_point
                        this.share = res.data.share_point
                        this.allShare = res.data.shared_point
                        this.rest = res.data.qita
                        this.data = res.data
                    }
                })
                
                
            },


            goPage(path) {
                this.$router.push({path: path})
            }
        }
    }
</script>

<style lang="less">
    // body {
    //     background-color: #edf1f4;
    // }
    
    .transferBill {
        font-size: 14px;
        color: #666;

        padding-top: 60px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
       
        .orders {
            padding-left: 10px;
            padding-right: 10px;
            // background-color: #fff;
            .order-item {
                position: relative;

                p {
                    padding: 5px 0;
                }

                padding: 10px;
                border-bottom: 1px solid #eee;

                .left {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;


                    .info{
                        margin-left: 10px;
                    }
                }

                .img-box {
                    margin-left: 10px;
                    width: 35px;
                    height: 35px;

                    img {
                        width: 35px;
                        height: 35px;
                    }
                }

                .date {
                    margin-left: 10px;
                }

                .icon-youjiantou{
                    position: absolute;
                    top: 15px;
                    right: 6px;
                }
            }
        }
        .van-hairline--top-bottom::after {
            width: 0;
        }
        .item {
            border-bottom: 1px solid #232121;
            color: #ababab;
        }
        .item,
        .title {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            // background-color: #fff;
            // border-bottom: 1px solid #edf1f4;
        
            .time {
                width: 40%;
                text-align: center;
            }
            .amount {
                width: 20%;
                text-align: center;
            }
            .status {
                width: 41%;
                text-align: center;
            }
        }
        .title {
            text-align: center;
            color: #fff;
            
        }
        
    }

</style>
