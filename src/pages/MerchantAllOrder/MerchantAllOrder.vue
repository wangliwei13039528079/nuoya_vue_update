<template>
    <div class="ordertab">
        <yd-tab v-model="intTab" :prevent-default="false" :item-click="itemClick">
            <yd-tab-panel v-for="(tab, index) in items" :key="index" :label="tab.label">
                <yd-infinitescroll :callback="loadMore" :scroll-top="false" ref="infinitescrollDemo">
                    <div class="order-content" v-for="(item, key) in tab.list" :key="key" slot="list">
                        <div class="order-content-header">
                            <p class="header-left">订单号：{{ item.order_num }}</p>
                            <p class="header-right" v-if="item.status === 0">待付款</p>
                            <p class="header-right" v-if="item.status === 1">待发货</p>
                            <p class="header-right" v-if="item.status === 2">待收货</p>
                            <p class="header-right" style="color: #379B2D;" v-if="item.status === 3">已完成</p>
                        </div>
                        <yd-list theme="4" @click.native="showDetail(item.id)">
                            <yd-list-item>
                                <img slot="img" v-lazy="item.image">
                                <h3 class="goodsname" slot="title">{{ item.name }}</h3>
                                <!-- <p class="goods" slot="title">{{ 7777}}</p> -->
                                <yd-list-other slot="other">
                                    <div>
                                        <span class="demo-list-price"><em></em>{{ item.price }} USDT</span>
                                    </div>
                                    <div>x{{ item.number }}</div>
                                </yd-list-other>
                            </yd-list-item>
                        </yd-list>
                        <div class="order-content-footer">
                            <div class="footer-top">
                                <p class="footer-top-left">共计 {{item.number }} 件商品</p>
                                <p class="footer-top-right">合计：{{ item.points }} USDT</p>
                            </div>
                            <div class="footer-bottom" v-if="item.status === 0">
                                <yd-button type="hollow" shape="circle" class="right-btn" @click.native="pay(item.id,item.order_num,item.points)">立即付款</yd-button>
                            </div>
                            <!-- <div class="footer-bottom" v-if="item.status === 1">
                                <yd-button type="hollow" shape="circle" class="right-btn" @click.native="afterService(item.id)">申请售后</yd-button>
                            </div> -->
                            <div class="footer-bottom" v-else-if="item.status === 2">
                                <yd-button type="hollow" shape="circle" class="right-btn" @click.native="showKeyboard=true;isshow=true;orderId=item.id">确认收货</yd-button>
                                <!-- <yd-button type="hollow" shape="circle" class="right-btn" @click.native="afterService(item.id)">申请售后</yd-button> -->
                            </div>
                            <!-- <div class="footer-bottom" v-if="item.status === 4">
                                <yd-button type="hollow" shape="circle" class="right-btn" @click.native="afterServiceDetail(item.id)">售后单详情</yd-button>
                            </div> -->
                        </div>
                    </div>
                </yd-infinitescroll>
            </yd-tab-panel>
            <yd-backtop></yd-backtop>
        </yd-tab>
        <yd-popup v-model="showLogistics" width="80%" height="80%">
            <div class="express-info">
                <div class="express-num">{{ logisticsInfo.company }}：{{ logisticsInfo.no }}</div>
                <yd-timeline>
                    <yd-timeline-item v-for="(item, index) in logisticsInfo.list" :key="index">
                        <p>{{ item.context }}</p>
                        <p style="margin-top: 10px;">{{ item.time }}</p>
                    </yd-timeline-item>
                </yd-timeline>
            </div>
        </yd-popup>
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
import Vue from 'vue'
import { PasswordInput, NumberKeyboard } from 'vant';
import { setTimeout } from 'timers';

Vue.use(PasswordInput).use(NumberKeyboard);
export default {
    data () {
        return {
            intTab: this.$route.query.tab ? parseInt(this.$route.query.tab) : 0,
            page: 1,
            pageSize: 10,
            items: [
                {
                    label: '全部',
                    list: [],
                    page: 1,
                    status: 0
                },
                {
                    label: '待付款',
                    list: [],
                    page: 1,
                    status: 1
                },
                {
                    label: '待发货',
                    list: [],
                    page: 1,
                    status: 2
                },
                {
                    label: '待收货',
                    list: [],
                    page: 1,
                    status: 3
                },
                {
                    label: '已完成',
                    list: [],
                    page: 1,
                    status: 4
                }

            ],
            showLogistics: false, // 是否显示物流窗口
            logisticsInfo: [], // 物流信息
            value:'',
            isshow:false,
            showKeyboard:false,
            orderId:''

        }
    },
    created () {
        this.orderList(this.items[this.intTab].page, this.items[this.intTab].status)
    },
    methods: {
        // tab切换请求数据
        itemClick (key) {
            this.intTab = key
            this.$refs.infinitescrollDemo[this.intTab].$emit('ydui.infinitescroll.reInit');
            this.items[key].page = 1
            this.orderList(this.items[key].page, this.items[key].status)
        },
        afterServiceDetail(id){
            this.$router.push({path:'/afterSale',query:{order_id:id}})
        },
        // 订单列表
        orderList (page, status) {
            this.$api.merchantOrders({
                page: page,
                limit:this.pageSize,
                type: status
            }, res => {
                const _list = res.data
                this.items[this.intTab].list = [..._list]
                if (_list.length < this.pageSize) {
                    this.$refs.infinitescrollDemo[this.intTab].$emit('ydui.infinitescroll.loadedDone')
                    return false
                }
                // if (res.data[0].status == this.intTab) {
                //     this.items[this.intTab].list = [..._list]
                //     if (_list.length < this.pageSize) {
                //         this.$refs.infinitescrollDemo[this.intTab].$emit('ydui.infinitescroll.loadedDone')
                //         return false
                //     }
                // }
            })
        },
        // 加载更多
        loadMore () {
            this.$api.merchantOrders({
                page: ++this.items[this.intTab].page,
                type: this.items[this.intTab].status
            }, res => {
                const _list = res.data
                this.items[this.intTab].list = [...this.items[this.intTab].list, ..._list]
                if (_list.length < this.pageSize) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo[this.intTab].$emit('ydui.infinitescroll.loadedDone')
                    return false
                }

                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo[this.intTab].$emit('ydui.infinitescroll.finishLoad')
            })
        },
        // 查看订单详情
        showDetail (id) {
            this.$router.push({path: '/MyMerchantOrderInfo', query: {order_id: id}})
        },
        // 立即付款
        pay (id,orderId,total) {
            this.$router.push({path: '/MerchantPayOrder', query: {id: id,orderId:orderId,total:total}})
        },
        // 确认收货
        confirm () {
            let orderId = this.orderId
            this.$api.receivingGoods({
                order_id: orderId
            }, res => {
                if (res.status) {
                    this.$dialog.toast({
                        mes: res.msg,
                        icon: 'success',
                        timeout: 1000
                    })
                    this.orderList(1,3)
                }
            })
        },
        // 申请售后
        afterService(id){
            this.$router.push({path:'/Replacement',query:{order_id:id}})
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

    },
    watch: {
        intTab () {
            this.$router.replace({path: '/MerchantAllOrder', query: {tab: this.intTab}})
        }
    }
}
</script>

<style>
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
    .yd-tab-box {
        background-color: #000 !important;

    }
    .yd-tab-box li {
        color: #fff !important;
    }
    .yd-tab-box .yd-tab-active {
        color: rgb(255, 94, 83) !important;
    }
    .order-content {
        background-color: #000;
        margin-bottom: 0;
    }
    .ordertab .order-content .yd-list,
    .ordertab .order-content .yd-list .yd-list-mes {
        background-color: #000;
        color: #fff;
    }
    .yd-list-title {
        color: #fff !important;
    }
    .order-content-footer .footer-top {
        border-bottom: 0 !important;
    }
    .order-content-footer .footer-top>p {
        color: #fff !important;
    }
    .yd-list-donetip {
        /* background-color: #423F52; */
        color: #ccc;
    }
    .yd-tab-nav:after {
        width: 0 !important;
    }
    .order-content-footer .footer-bottom .left-btn {
        background-color: #000;
        color: #fff !important;
    }
    .order-content-footer .footer-bottom .right-btn {
        background-color: #000;
    }
    .ordertab .order-content {
        background-color: #000 !important;
    }
    .order-content-header .header-left {
        color: #fff !important;
    }
    .ordertab .yd-tab-panel {
        background-color: #000;
        color: #fff;
    }
    /* .yd-tab-nav:after {
        width: 0;
    } */
     .ordertab .van-password-input {
        position: fixed;
        top: 50%;
        transform: translateY(-50px);
        margin: 0 3%;
        width: 94%;

    }
    .ordertab .van-number-keyboard__body {
        color: #000;
    }
    .ordertab .admin {
        margin-left: 5px;
        color: #0489C9;

    }
    .van-number-keyboard {
        color: #000;
    }
</style>
