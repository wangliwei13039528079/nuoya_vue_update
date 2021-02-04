<template>
    <div class="merchantPayOrder">
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">订单编号</span>
                <span slot="right">{{ orderId }}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">订单金额</span>
                <span slot="right">{{ order_amount }} USDT</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="payment" v-for="(item,index) in pays" @click="isshow=true,showKeyboard=true,type=item.type" :key="index">
            <div class="payment-left">
                <h3>{{item.name}}支付</h3>
                <p>当前余额:{{balance[item.name]}}</p>
            </div>
            <img class="right-img" src="../../../static/image/right.png"/>
        </div>

        <!-- <payment :payments="payments" @pay="pay" :user="userInfo"></payment> -->
        <!-- <div class="btn" @click="isshow=true,showKeyboard=true">
            确认支付
        </div> -->
        <!-- 密码输入框 -->
        <van-password-input
        :value="value"
        info="密码为 6 位数字"
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
import payment from '../../components/Payment.vue'
import { setTimeout } from 'timers';
import { PasswordInput, NumberKeyboard } from 'vant';

Vue.use(PasswordInput).use(NumberKeyboard);
export default {
    components: {
        payment
    },
    inject: ['reload'],
    data () {
        return {
            orderId: this.$route.query.orderId,
            order_amount: this.$route.query.total,// 订单总价
            oid:this.$route.query.id,
            payments: [], // 商户可支付的方式列表
            userInfo: {}, // 用户信息
            popShow: false,
            pay_type:this.$route.query.pay_type, //支付方式
            payname: '',
            timer: '',
            radio:'',
            activate_money:'',
            points:0,
            isshow:false,
            showKeyboard:false,
            value:'',
            flag:true,
            pays:[{name:'现货资产',type:'balance'},{name:'余额钱包',type:'points'}],
            type:'',
            balance:{}
        }
    },
    created () {
        // this.orderDetail()
        // this.getPaymentType()
        // this.getUserInfo()
        // this.timer = setInterval(() => {
        //     this.getOrderInfo()
        // },1000)
        this.getUserMoney()
    },
    methods: {

        // 获取订单详情
        orderDetail () {
            this.$api.selfSupportGoodsDetail({goods_id: this.id}, res => {
                if(res.status) {
                    this.orderId = res.data.order_num
                    this.order_amount = res.data.wholesale_price * res.data.num
                }
            })
        },
        // 获取支付方式列表
        getPaymentType () {
            this.$api.paymentList({}, res => {
                let data = res.data
                for (let k in data) {
                    data[k].img = './static/image/' + data[k].code + '.png'
                }
                this.payments = data
            })
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
                        this.pay()
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
        // 支付
        pay(){
            if(!this.flag) {
                return this.$dialog.toast({mes:'正在支付，请稍候',timeout:1000})
            }
            this.flag = false
            this.$api.merchantPayOrder({order_id:this.oid,type:this.type},res=>{
                if(res) {
                    this.$dialog.toast({
                        mes: res.msg,
                        timeout: 1000
                    })
                    this.flag = true
                }

                if(res.status) {
                    setTimeout(()=>{
                        this.$router.replace({path:'/MerchantAllOrder',query:{tab:2}})
                    },1000)
                }
            })
        },

        // 获取用户资产
        getUserMoney(){
            this.$api.userWallet({},res=>{
                this.balance = res.data.money
            })
        },



        // 支付完后点击跳转
        completed () {
            this.popShow = false // 关闭弹窗
            this.$router.replace({path: '/payresult', query: {order_id: this.orderId}})
        },
        // 支付遇到问题重新刷新页面
        heavyLoad () {
            this.popShow = false // 关闭弹窗
            this.$router.replace({path: '/cashierdesk', query: {order_id: this.orderId}})
        }
    },

}
</script>

<style lang="less" scoped>
    .merchantPayOrder .yd-popup-center .yd-popup-content{
        text-align: center;
        /* padding: 20px 0; */
        background-color: #fff;
        border-radius: 5px;
    }
    .payresult-i{
        border-bottom: 1px solid #e8e8e8;
        padding: 15px
    }
    .payresult-i:nth-child(2){
        color: #ff3b44;
    }
    .payresult-i:last-child{
        border: none;
        color: #999;
    }
    .merchantPayOrder .point {
        display: flex;
        justify-content: space-between;
        padding-left: 12px;
        font-size: 14px;
    }
    /deep/.yd-cell {
        background-color: #000 !important;
    }
    .merchantPayOrder .btn {
        background-color: #ef4f4f;
        color: #fff;
        padding: 10px 15px;
        text-align: center;
        width: 80%;
        margin: auto;
    }
    /deep/.merchantPayOrder .yd-cell-left {
        color: #fff !important;
    }
    /deep/ .merchantPayOrder .yd-cell:after {
        width: 0;
    }
    /deep/.yd-cell-right {
        color: #fff !important;
    }
    /deep/.van-number-keyboard__body {
        color: #000;
    }
    .payment{
        /* background-color: #fff; */
        text-align: left;
        padding: .35rem .2rem;
        position: relative;
        margin-bottom: 1px;
    }
    .payment-img{
        width: 1rem;
        height: auto;
        padding-right: .15rem;
    }
    .payment-left{
        display: inline-block;
        padding-left: .2rem;
        color: #fff;
    }
    .payment p {
        color:#fff;
    }
    .payment-left h3{
        margin-bottom: .15rem;
        font-size: .28rem;
    }
    .payment .right-img{
        right: .2rem;
    }
</style>
