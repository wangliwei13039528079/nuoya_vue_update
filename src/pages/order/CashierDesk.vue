<template>
    <div class="cashierdesk">
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
        <!-- <div class="point">
            <p>是否使用激活钱包</p>
            <p>激活钱包余额：{{activate_money}}</p>
            <van-radio-group v-model="radio">
                <van-radio name="1" @click="activate"></van-radio>
            </van-radio-group>
        </div> -->
        <button class="btn-add" :payments="payments" @click="usdtpay" :user="userInfo" :balance="balance">立即支付</button>
        <yd-popup class="payresult"
                  v-model="popShow"
                  position="center"
                  width="70%"
                  :close-on-masker="false"
        >
            <div>
                <div class="payresult-i">请确认 {{ payname }} 是否已完成</div>
                <div class="payresult-i" @click="completed">已完成支付</div>
                <div class="payresult-i" @click="heavyLoad">支付遇到问题,重新支付</div>
            </div>
        </yd-popup>
    </div>
</template>

<script>
import payment from '../../components/Payment.vue'
import Vue from 'vue'
import {RadioGroup, Radio} from 'vant';
import {Dialog} from 'vant';

Vue.use(Dialog);

Vue.use(RadioGroup);
Vue.use(Radio);
import {req2Coinlist} from "../../common/apigo";

export default {
    components: {
        payment
    },
    inject: ['reload'],
    data() {
        return {
            orderId: this.$route.query.order_id,
            order_amount: '', // 订单总价
            payments: [], // 商户可支付的方式列表
            userInfo: {}, // 用户信息
            popShow: false,
            pay_type: this.$route.query.pay_type, //支付方式
            payname: '',
            timer: '',
            radio: '',
            activate_money: '',
            points: 0,
            uid: '',
            balance: ''
        }
    },
    created() {
        this.orderDetail()
        this.getPaymentType()
        this.getUserInfo()
        if (this.pay_type != '') {
            if (this.pay_type == 'weixin') {
                this.payname = '微信支付'
                this.paymentedHandle()
            } else if (this.pay_type == 'alipay') {
                this.payname = '支付宝支付'
                this.paymentedHandle()
            }

        } else {
            if (this.popShow) {
                this.popShow = false
            }
        }
        // this.timer = setInterval(() => {
        //     this.getOrderInfo()
        // },1000)
    },
    methods: {
        activate() {
            if (this.activate_money > 0) {
                Dialog.confirm({
                    title: '提示',
                    message: '使用激活钱包付款优先扣取激活钱包金额，是否使用?'
                }).then(() => {
                    this.points = 1
                }).catch(() => {
                    this.radio = ''
                });
            } else {
                this.radio = ""
                this.$dialog.toast({
                    mes: '激活钱包余额不足',
                    timeout: 1000
                })

            }


        },
        // 获取订单详情
        orderDetail() {
            this.$api.orderDetail({order_id: this.orderId}, res => {
                this.order_amount = res.data.order_amount
                this.activate_money = res.data.user.points
            })
        },
        // 获取支付方式列表
        getPaymentType() {
            this.$api.paymentList({}, res => {
                let data = res.data
                for (let k in data) {
                    data[k].img = './static/image/' + data[k].code + '.png'
                }
                this.payments = data
            })
        },
        getUserInfo() {
            this.$api.userInfo({}, res => {
                if (res.status) {
                    this.userInfo = res.data
                    this.uid = res.data.id
                    this.getCoin()
                }
            })
        },
        async getCoin() {
            let uid = this.uid;
            let mid = ''
            const result = await req2Coinlist({uid, mid});
            if (result.errcode == 0) {
                let coins = result.Balance
                coins.forEach(item => {
                    if (item.CoinName == 'USDT') {
                        this.balance = item.Num
                    }
                })

            }
        },
        usdtpay(code) {
            let data = {
                ids: this.orderId,
                payment_code: 'usdt',
                payment_type: 1,
                paypwd: code[1],
                points: this.points
            }
            this.$api.pay(data, res => {
                // Toast(res.msg)
                this.$dialog.toast({mes: res.msg, timeout: 1000})
                if (res.status) {
                    this.$router.replace({path: '/payresult', query: {order_id: this.orderId}})
                }

            })
        },
        // 根据code 区分支付方式
        pay(code) {
            console.log(code)
            //let paypwd="123456";
            if (code === 'wechatpay') {
                let isWeiXin = this.GLOBAL.isWeiXinBrowser()
                if (isWeiXin) {
                    // 公众号支付参数
                    let data = {
                        ids: this.orderId,
                        payment_code: code[0],
                        payment_type: 1,
                        params: {
                            trade_type: 'JSAPI_OFFICIAL'
                        },
                        paypwd: code[1]
                    }
                    // 微信jsapi支付
                    this.$api.pay(data, res => {
                        if (res.status) {
                            const data = res.data
                            let _this = this
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    'appId': data.appid, // 公众号名称，由商户传入
                                    'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
                                    'nonceStr': data.nonceStr, // 随机串
                                    'package': data.package,
                                    'signType': data.signType, // 微信签名方式：
                                    'paySign': data.paySign // 微信签名
                                },
                                function (res) {
                                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                                        _this.$router.replace({path: '/payresult', query: {order_id: _this.orderId}})
                                        // _this.$dialog.alert({
                                        //     mes: '支付成功',
                                        //     callback () {
                                        //         _this.$router.replace({path: '/payresult', query: {order_id: _this.orderId}})
                                        //     }
                                        // })
                                        // 使用以上方式判断前端返回,微信团队郑重提示：
                                        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                    }
                                })
                        }
                    })
                } else {
                    // h5端支付参数
                    let data = {
                        ids: this.orderId,
                        payment_code: code[0],
                        payment_type: 1,
                        params: {
                            trade_type: 'MWEB',
                            return_url: this.GLOBAL.locationHost() + '/#/cashierdesk?order_id=' + this.orderId + '&pay_type=weixin'
                        },
                        paypwd: code[1]
                    }
                    // 微信h5支付
                    this.$api.pay(data, res => {
                        if (res.status) {
                            this.pay_type = 'weixin';
                            location.href = res.data.mweb_url
                        } else {
                            this.$dialog.alert({mes: res.msg})
                        }
                    })
                }
            } else if (code === 'alipay') {
                let data = {
                    ids: this.orderId,
                    payment_code: code[0],
                    payment_type: 1,
                    params: {
                        trade_type: 'WAP',
                        return_url: this.GLOBAL.locationHost() + '/#/cashierdesk?order_id=' + this.orderId + '&pay_type=alipay'
                    },
                    paypwd: code[1]
                }
                this.$api.pay(data, res => {
                    if (res.status) {
                        this.StandardPost(res.data.url, res.data.data)
                    }
                })
            } else if (code[0] === 'balancepay') {
                let data = {
                    ids: this.orderId,
                    payment_code: code[0],
                    payment_type: 1,
                    paypwd: code[1],
                    points: this.points
                }
                this.$api.pay(data, res => {
                    // Toast(res.msg)
                    this.$dialog.toast({mes: res.msg, timeout: 1000})
                    if (res.status) {
                        this.$router.replace({path: '/payresult', query: {order_id: this.orderId}})
                    }

                })
            } else if (code[0] === 'offline') {
                this.$dialog.confirm({
                    title: '线下支付说明',
                    mes: '请联系客服进行线下支付',
                    opts: [
                        {
                            txt: '订单详情',
                            color: false,
                            callback: () => {
                                this.$router.push({path: '/orderdetail', query: {order_id: this.orderId}})
                            }
                        },
                        {
                            txt: '继续购物',
                            color: true,
                            callback: () => {
                                this.$router.push('/index')
                            }
                        }
                    ]

                })
            }
        },
        // 查询订单详情 获取订单支付状态
        getOrderInfo() {
            let data = {
                order_id: this.orderId
            }
            this.$api.orderDetail(data, res => {
                this.orderInfo = res.data
                if (this.orderInfo.pay_status === 2) {
                    clearInterval(this.timer)
                    this.$router.replace({path: '/payresult', query: {order_id: this.orderId}})
                }
            })
        },
        // alipay 模拟get提交
        StandardPost(url, data) {
            let tempForm = document.createElement('form')
            tempForm.id = 'aliPay'
            tempForm.methods = 'post'
            tempForm.action = url
            tempForm.target = '_self'
            let input = []
            for (let k in data) {
                input[k] = document.createElement('input')
                input[k].type = 'hidden'
                input[k].name = k
                input[k].value = data[k]
                tempForm.appendChild(input[k])
            }
            tempForm.addEventListener('submit', function () {
            }, false)
            document.body.appendChild(tempForm)
            tempForm.dispatchEvent(new Event('submit'))
            tempForm.submit()
            document.body.removeChild(tempForm)
        },
        // 微信H5支付完成后触发的弹窗事件
        paymentedHandle() {
            this.popShow = true
        },
        // 支付完后点击跳转
        completed() {
            this.popShow = false // 关闭弹窗
            this.$router.replace({path: '/payresult', query: {order_id: this.orderId}})
        },
        // 支付遇到问题重新刷新页面
        heavyLoad() {
            this.popShow = false // 关闭弹窗
            this.$router.replace({path: '/cashierdesk', query: {order_id: this.orderId}})
        }
    },
    watch: {
        pay_type() {
            if (pay_type === 'weixin') {
                this.payname = '微信支付'
            }

            if (pay_type === 'alipay') {
                this.payname = '支付宝支付'
            }
            this.paymentedHandle()
        }
    }
}
</script>

<style>
.payresult .yd-popup-center .yd-popup-content {
    text-align: center;
    /* padding: 20px 0; */
    background-color: #fff;
    border-radius: 5px;
}

.payresult-i {
    border-bottom: 1px solid #e8e8e8;
    padding: 15px
}

.payresult-i:nth-child(2) {
    color: #ff3b44;
}

.payresult-i:last-child {
    border: none;
    color: #fff;
}

.cashierdesk .point {
    display: flex;
    justify-content: space-between;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 14px;
}

.cashierdesk .yd-cell {
    background-color: #000 !important;
}

.cashierdesk .yd-cell-right {
    color: #fff !important;
}

.cashierdesk .yd-cell:after {
    width: 0;
}

.btn-add {
    background: #393941;
    border-radius: 0.2rem;
    color: #fff;
    border: none;
    width: 90%;
    margin: 0 auto;
    display: block;
    height: 45px;
}
</style>
