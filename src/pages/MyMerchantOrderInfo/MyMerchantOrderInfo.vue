<template>
    <div class="orderdetail">
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
                <h3>售后单</h3>
            </div>
            <div class="" v-else>
                <h3>交易成功</h3>
            </div>
        </div>
        <div class="orderadd" >
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
        <!-- <div class="orderadd" v-if="order.status != 1 && order.status != 4">
            <img class="orderadd-gps" src="../../../static/image/car-green.png"/>
            
            <div class="orderadd-content">
                <div class="orderadd-top">
                    <span>物流公司：{{ order.addr_name }}</span>
                </div>
                <div class="orderadd-bottom">
                    <p style="color:#fff;font-size:.25rem">物流单号：{{ order.addr_code }}</p>
                </div>
            </div>
        </div> -->
        <div class="orderlist">
            <yd-list theme="4">
                <yd-list-item>
                    <img slot="img" :src="order.image">
                    <h3 class="goodsname" slot="title">{{ order.name }}</h3>
                    <p class="goods" slot="title">{{  }}</p>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price"><em></em>{{ order.price }} QEEC</span>
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
            <span slot="right" class="demo-list-price">{{ this.GLOBAL.formatMoney(order.points, 2, '') }} QEEC</span>
        </yd-cell-item>
        <div class="footer">
            <yd-button type="hollow" class="right-btn" v-if="order.status == 0" @click.native="pay">立即付款</yd-button>
            <!-- <yd-button type="hollow" class="right-btn" v-if="order.status == 1 || order.status == 2" @click.native="afterService()">申请售后</yd-button> -->
            <yd-button type="hollow" class="right-btn" v-if="order.status == 2" @click.native="showKeyboard=true;isshow=true">确认收货</yd-button>
            <yd-button type="hollow" class="right-btn" v-if="order.status >= 2" @click.native="goTo('/express')">查看物流</yd-button>
        </div>
         <!-- 密码输入框 -->
        <van-password-input
        :value="value"
        info="请输入支付密码"
        @focus="showKeyboard = true"
        v-if="isshow"
        />

        <!-- 数字键盘 -->
        <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false;isshow = false"
        />
       
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
            logisticsInfo: [], // 物流信息
            isshow:false,
            showKeyboard:false,
            value:''
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
        afterService(){
            this.$router.push({path:'/Replacement',query:{order_id:this.order.id}})
        },
        
        
        // 确认收货
        confirm () {
            let orderId = this.order_id
            this.$api.receivingGoods({
                order_id: orderId
            }, res => {
                if (res.status) {
                    this.$dialog.toast({
                        mes: res.msg,
                        icon: 'success',
                        timeout: 1000
                    })
                    this.orderDetail()
                }
            })
        },
        pay () {
            this.$router.push({path: '/MerchantPayOrder', query: {id: this.order.id, orderId: this.order.order_num,total:this.order.points}})
        },
        // 输入密码
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if(this.value.length == 6) {
                this.$api.retailPayPwd({pay_pwd:this.value},res=>{
                    if(!res.status) {
                        this.$dialog.toast({mes:res.msg,timeout:1000})
                    }
                    if(res.status){
                        this.confirm()
                    }
                })
                this.isshow = false
                this.showKeyboard = false
                this.value = ''
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        goTo(path){
            this.$router.push({path:path,query:{order_id:this.order_id}})       }
    }
}
</script>

<style scoped>
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
    .right-btn {
        padding: 0 .3rem;
        height: .55rem;
        border-radius: 0;
        border: 1px solid #FF3B44;
        background-color: #000;
        color: #FF3B44;
        
    }
    .footer {
        position: fixed;
        bottom: 10px;
        right: 10px;
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
    .orderadd{
        background-color: #000;
    }
    .orderlist,
    .orderlist .yd-list-theme4 {
        background-color: #000;
    }
    .orderdetail .orderlist .yd-list-item {
        background-color: #000;
    }
    .orderlist .yd-list-mes {
        background-color: #000 !important;
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
    .orderdetail .van-password-input {
        position: fixed;
        top: 50%;
        transform: translateY(-50px);
        margin: 0 3%;
        width: 94%;
    
    }
    .orderdetail .van-number-keyboard__body {
        color: #000;
    }
</style>
