<template>
    <div id="buyOrderCenter">
        <!-- <HeaderTop title="买入订单中心">
            <a class="back" @click="goTo('/OrderCenter')" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop> -->

        <div class="content">
            <div class="order-box">
                <div class="order-item" v-if="order.length < 1">暂无内容</div>
                <template>
                
                    <div class="order-item" v-for="(item,index) in order" :key="index">
                        <p>订单编号：{{item.order_id}}</p>
                        <p>购买数量：{{item.c_points}}</p>
                        <!--<p>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：{{item.trade_price}}</p>-->
                        <p>订单状态：{{getOrderState(item.status)}}</p>
                        <p>创建时间：{{item.create_time}}</p>
                        <div class="btn-group">
                            <button v-if="item.status == 1" @click="goPay(item.id)">去付款</button>
                            <button v-if="item.status== 1"
                                    @click="showCloseOrderDialog(item.id)">撤销
                            </button>
                            <button v-if="item.status == 2" @click="goDetail(item.id)">查看</button>                           
                            <button @click="goTo('/Complaint')" v-if="item.status < 3">投诉</button>                           
                        </div>

                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">


    import Vue from 'vue'
    // import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    // import {reqCloseBuyOrder} from "../../api";
    // import {requOrder} from "../../api";
    import {Dialog, Toast} from 'vant'
// import { setInterval } from 'timers';

    Vue.use(Dialog, Toast)

    export default {

        data() {
            return {
                order: [],
                Countdown:{},
                state:0,
                time:[],
                timer:null
            }
        },

        mounted() {
            // this.getOrder();
        },
        methods: {
            //获取订单
            // async getOrder() {
            //     const result = await requOrder();
            //     this.order = result;
            // },
            goTo(path){
                this.$router.push({path:path})
            },
            
            // 订单状态
            getOrderState(status) {
                let state = ''
                switch (status) {
                    case 1:
                        state = '未付款'
                        break
                    case 2:
                        state = '已付款'
                        break
                    case 3:
                        state = '已完成'
                        break
                    case 4:
                        state = '买家撤单'
                        break
                    case 5:
                        state = '系统撤单'
                        break
                    case 6:
                        state = '系统确认'
                        break
                    case 11:
                        state = '管理员完成匹配订单'
                        break
                    case  12:
                        state = '买家撤单'
                        break;
                    case 13:
                        state = '卖家撤单'
                        break;
                    case 14:
                        state = '超时自动撤单'
                        break
                }
                return state
            },
            goPay(id) {
                this.$router.push({path: '/orderpay', query: {order_id: id}});
            },
            goDetail(order_id) {
                this.$router.push({path: '/buyOrderDetail', query: {order_id: order_id}});
            },

            showCloseOrderDialog(guaorder_id, order_id) {
                Dialog.confirm({
                    title: '提示',
                    message: '确认要撤销订单'
                }).then(() => {
                    this.closeOrder(guaorder_id, order_id);
                }).catch(() => {
                    // on cancel
                });
            },

            // async closeOrder(order_id) {
            //     const result = await reqCloseBuyOrder({order_id});
            //     Toast(result.msg);
            //     if (result.code == 1) {
            //         this.getOrder();
            //     }
            // }
        },

        components: {
            HeaderTop
        }
    }
</script>

<style lang="less">
    #buyOrderCenter {
        height: 100%;
        background-color: #edf1f4;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .content {
            // padding-top: 50px;

            .order-box {

                .order-item {
                    position: relative;
                    padding: 10px;
                    font-size: 14px;
                    color: #666;
                    background-color: #fff;
                    border-bottom: 1px solid #eee;

                    > p {
                        padding: 5px;
                    }
                }

            }
        }
        .btn-group{
            position: absolute;
            right: 10px;
            bottom: 14px;
        }
    }

</style>
