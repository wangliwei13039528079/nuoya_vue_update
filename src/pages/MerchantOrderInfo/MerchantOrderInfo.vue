<template>
    <div class="merchantOrderInfo">
        <div class="orderdetailheader">
            <div class="" v-if="order.status === 0">
                <h3>待付款</h3>
            </div>
            <div class="" v-else-if="order.status === 1">
                <h3>待发货</h3>
            </div>
            <div class="" v-else-if="order.status === 2">
                <h3>待签收</h3>
            </div>
            <div class="" v-else-if="order.status === 3">
                <h3>交易完成</h3>
            </div>
            <div class="" v-else-if="order.status === 4">
                <h3>申请售后</h3>
            </div>
            <div class="" v-else>
                <h3>交易成功</h3>
            </div>
        </div>
        <div class="orderadd">
            <img class="orderadd-gps" src="../../../static/image/gps.png"/>
            
            <div class="orderadd-content">
                <div class="orderadd-top">
                    <span>收货人：{{ order.user_name }}</span>
                    <p>{{ order.user_mobile }}</p>
                </div>
                <div class="orderadd-bottom">
                    <p>收货地址：{{ order.address }}</p>
                </div>
            </div>
        </div>
        <div class="orderadd" v-if="order.status == 2 || order.status == 3">
            <img class="orderadd-gps" src="../../../static/image/car-green.png"/>
            
            <div class="orderadd-content">
                <div class="orderadd-top">
                    <span>物流公司：{{ order.addr_name }}</span>
                </div>
                <div class="orderadd-bottom">
                    <p style="color:#fff;font-size:.25rem">物流单号：{{ order.addr_code }}</p>
                </div>
            </div>
        </div>
        <div class="orderlist">
            <yd-list theme="4">
                <yd-list-item>
                    <img slot="img" :src="order.image">
                    <h3 class="goodsname" slot="title">{{ order.name }}</h3>
                    <!-- <p class="goods" slot="title">{{  }}</p> -->
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price"><em>¥</em>{{ order.price }}</span>
                        </div>
                        <div>x{{ order.number }}</div>
                    </yd-list-other>
                    <!-- <yd-list-other slot="other">
                        <div class="goods-order-tip" v-if="promotion_list">
                            <div v-for="(val, key) in toObj(item.promotion_list)" :key="key">
                                <yd-badge shape="square" type="danger">{{ val }}</yd-badge>
                            </div>
                        </div>
                    </yd-list-other> -->
                </yd-list-item>
            </yd-list>
        </div>
        <yd-cell-item>
            <span slot="left">订单价格</span>
            <span slot="right" class="demo-list-price">￥{{ this.GLOBAL.formatMoney(order.points, 2, '') }}</span>
        </yd-cell-item>
        
        <div class="footer">
            <yd-button type="hollow" class="right-btn" v-if="order.status == 1" @click.native="deliver">发货</yd-button>
        </div>
    </div>
</template>

<script>
import orderdetailheader from '../../components/OrderDetailHeader.vue'
import deliveryinformation from '../../components/DeliveryInformation.vue'
import ordercell from '../../components/OrderCell.vue'

export default {
    components: {
        orderdetailheader, deliveryinformation, ordercell
    },
    data () {
        return {
            order_id: this.$route.query.order_id, // 传过来的order_id
            order: [], // 订单详情
            express: {}, // 订单详情物流信息显示最后一条信息
            showLogistics: false, // 是否显示物流信息窗口
            logisticsInfo: [] // 物流信息
        }
    },
    created () {
        if (!this.$route.query.order_id) {
            this.$dialog.alert({
                mes: '订单参数丢失',
                callback: () => {
                    this.$router.go(-1)
                }
            })
        }
        this.orderDetail()
    },
    methods: {
        // json str to obj
        toObj (str) {
            let obj = {}
            obj = JSON.parse(str)
            return obj
        },
        // 查看订单详情
        orderDetail () {
            this.$api.merchantOrderInfo({order_id: this.order_id}, res => {
                if (res.status) {
                    this.order = res.data[0]
                    // console.log(this.order.delivery)
                    if (this.order.hasOwnProperty('express_delivery')) {
                        this.express = this.order.express_delivery
                    }
                } else {
                    this.$dialog.alert({
                        mes: '未查询到该订单信息',
                        callback: () => {
                            this.$router.go(-1)
                        }
                    })
                }
            })
        },
        // 查看商品详情
        goodsDetail (id) {
            this.$router.push({path: '/goodsDetail', query: {goods_id: id}})
        },
        // 去发货
        deliver(){
            this.$router.push({path:'/DeliverGoods',query:{order_id:this.order_id}})
        }
    }
}
</script>

<style scoped lang="less">
.merchantOrderInfo {
    .express-info{
        /* background-color: #fff; */
        position: relative;
    }
    .express-num{
        position: fixed;
        top: -1px;
        /* background-color: #e5e5e5; */
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        z-index: 10086;
    }
    .express-info .yd-timeline{
        margin-top: calc(.5rem - 1px);
        font-size: .1rem;
    }
	.goods-order-tip{
		overflow: hidden;
	}
	.goods-order-tip>div{
		display: inline-block;
		margin-right: .1rem;
		margin-bottom: .1rem;
    }
    .right-btn {
        padding: 0 .3rem;
        height: .55rem;
        border-radius: 0;
        border: 1px solid #FF3B44;
        background-color: #000;
        color: #FF3B44;
        
    }
    .orderadd{
        background-color: #000;
    }
    /deep/.orderlist,
    /deep/.orderlist .yd-list-theme4 {
        background-color: #000;
    }
    .orderdetail .orderlist .yd-list-item {
        background-color: #000;
    }
    /deep/.orderlist .yd-list-mes {
        background-color: #000 !important;
    }
    .orderlist .yd-list-item {
        background-color: #000;
    }
    /deep/.yd-list-title {
        color: #fff;
    }
    // .yd-list-img img {
    //     background-color: #000;
    // }
    /deep/.yd-cell-left {
        color: #fff !important;
    }
    .yd-list-mes {
        background-color: #000 !important;
    }
    .orderdetailheader{
        width: 100%;
        height: 2.3rem;
        background: url(../../../static/image/backimg.png) no-repeat;
        background-size: 100% 100%;
    }
    .orderdetailheader>div{
        width: 70%;
        margin: 0 auto;
        text-align: left;
        color: #fff;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
    .orderdetailheader h3{
        font-size: .3rem;
        margin-bottom: .2rem;
    }
    .footer {
        position: fixed;
        bottom: 10px;
        right: 10px;
    }
}
    
</style>
