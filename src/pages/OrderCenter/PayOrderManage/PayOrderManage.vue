<template>
    <div id="payOrderManage">
        <!-- <HeaderTop title="交易管理">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop> -->
        <div class="content">
            <div class="order-item" v-if="order.length < 1">暂无内容</div>
            <template v-else>
            <div class="order-item" v-for="(item,index) in order" :key="index">

                <!--<p>挂单编号：{{item.guaorder_id}}</p>-->
                <!--<p>订单编号：{{item.order_id}}</p>-->
                <!--<p>买家编号：{{item.buyer}}</p>-->
                <!--<p>卖出数量：{{item.points}}</p>-->
                <!--<p>支付方式：{{ getPayType(item.pay_type) }}</p>-->
                <!--<p>订单状态：{{getOrderStatus(item.status)}}</p>-->
                <!--<p>交易时间：{{item.created_at}}</p>-->


                <p style="display: flex; justify-content: space-between">
                    <span class="item-left">挂单编号</span>
                    <span class="item-right">{{item.guaorder_id}}</span>
                </p>
                <p style="display: flex; justify-content: space-between">
                    <span class="item-left">订单编号</span>
                    <span class="item-right">{{item.order_id}}</span>
                </p>
                <!-- <p style="display: flex; justify-content: space-between">
                    <span class="item-left">卖家编号</span>
                    <span class="item-right">{{item.seller}}</span>
                </p> -->
                <p style="display: flex; justify-content: space-between">
                    <span class="item-left">买家编号</span>
                    <span class="item-right">{{item.buyer}}</span>
                </p>
                <p style="display: flex; justify-content: space-between" v-if="item.status == 2 || item.status == 1">
                    <span class="item-left">买家电话</span>
                    <span class="item-right">{{item.bphone}}</span>
                </p>
                <p style="display: flex; justify-content: space-between">
                    <span class="item-left">卖出数量</span>
                    <span class="item-right">{{item.points}}</span>
                </p>
                <p style="display: flex; justify-content: space-between">
                    <span class="item-left">卖出金额</span>
                    <span class="item-right">￥{{item.cny}}</span>
                </p>
                <p style="display: flex; justify-content: space-between" v-if="item.usd">
                    <span class="item-left">卖出金额</span>
                    <span class="item-right">${{item.usd}}</span>
                </p>
                <p style="display: flex; justify-content: space-between" v-if="item.status == 2 || item.status == 3">
                    <span class="item-left">支付时间</span>
                    <span class="item-right">{{item.paytime}}</span>
                </p>
                <p style="display: flex; justify-content: space-between">
                    <span class="item-left">订单状态</span>
                    <span class="item-right">{{getOrderStatus(item.status)}}</span>
                </p>
                <p style="display: flex; justify-content: space-between">
                    <span class="item-left">交易时间</span>
                    <span class="item-right">{{item.created_at}}</span>
                </p>


                <button v-if="item.status == 2||item.status == 3 ? true : false" @click="showImg(item.image)">查看支付凭证
                </button>
                <button :disabled="disable" v-if="item.status == 2 ?true:false" @click="affirm(item.order_id)">确认收款
                </button>
                <button v-if="item.status < 3" @click="goTo('/Complaint')">投诉
                </button>
            </div>
            </template>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import HeaderTop from '../../../components/HeaderTop/HeaderTop.vue'
    // import {reqCtcOrder, reqSellConfirm} from '../../api'
    import {Toast} from 'vant'
    Vue.use(Toast)

    import {ImagePreview} from 'vant'

    export default {

        data () {
            return {
                order: [],
                ImagePreview: [],
                disable: false,
            }
        },

        components: {
            HeaderTop
        },
        mounted () {
            // this.getOrder()
        },
        methods: {
            goTo (path) {
                this.$router.push({path:path})
            },
            showImg (image) {
                this.ImagePreview = []

                const imgUrl = image
                this.ImagePreview.push(imgUrl)

                ImagePreview(this.ImagePreview)
            },

            // async getOrder () {
            //     const result = await reqCtcOrder()
            //     this.order = result
            // },

            // async affirm (id) {
            //     this.disable = 'disabled'
            //     const order_id = id
            //     const result = await reqSellConfirm({order_id})
            //     Toast(result.msg)

            //     this.disable = false

            //     this.getOrder()
            // },

            getPayType (status) {
                let type = ''

                switch (status) {
                    case 1:
                        type = '银行卡'
                        break
                    case 2:
                        type = '微信'
                        break
                    case 3:
                        type = '支付宝'
                        break
                }
                return type
            },

            getOrderStatus (status) {
                let type = ''

                switch (status) {
                    case 1:
                        type = '未付款'
                        break
                    case 2:
                        type = '已付款'
                        break
                    case 3:
                        type = '已完成'
                        break
                    case 4:
                        type = '买家撤单'
                        break
                    case 5:
                        type = '管理员撤单'
                        break
                    case 6:
                        type = '系统确认'
                        break   
                    case 10:
                        type = '管理员撤单'
                        break
                    case 11:
                        type = '管理员完成匹配订单'
                        break
                    case  12:
                        type = '买家撤单'
                        break
                    case 13:
                        type = '卖家撤单'
                }
                return type
            }
        }
    }
</script>

<style scoped lang="less">
    #payOrderManage {
        color: #666;
        font-size: 14px;
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
            background-color: #f8f8f8;

            .order-item {
                margin-top: 5px;
                background-color: #fff;
                padding: 10px;
                border-bottom: 1px solid #eee;

                > p {
                    padding: 5px;
                }
            }
        }
    }

</style>
