<template>
    <div class="firmorder">
        <orderadd
            :ship="shipInfo"
            @shipHandler="shipHandler"
        ></orderadd>
        <orderlist
            :name="resData.name"
            :image_url="resData.image_id"
            :price="resData.price"
            :nums="num"
        ></orderlist>
        
        <!-- <orderfooter
            :amount="products.price"
            @payment="payment"
        ></orderfooter> -->
        <div class="orderfooter">
            <div class="orderfooter-left">
                <p>需付：</p><span>{{ Number(resData.price).toFixed(2)*this.num }} QEEC</span>
            </div>
            <div class="orderfooter-right">
                <yd-button type="danger" @click.native="pay">立即支付</yd-button>
            </div>
        </div>
    </div>
</template>

<script>
import orderlist from '../../components/Retail/OrderList.vue'
import orderfooter from '../../components/OrderFooter.vue'
import orderadd from '../../components/OrderAdd.vue'
import {mapGetters} from 'vuex'
export default {
    components: {
        orderlist, orderfooter,orderadd
    },
    data () {
        return {
            id: this.$route.query.id ? this.$route.query.id : '',
            num: this.$route.query.num ? this.$route.query.num : '',
            resData:{},
            flag:true,
            shipInfo:{},
            area_id:''
        }
    },
    mounted () {
        // this.params.ids = this.rgid
        this.getCartList()
        this.userDefaultShip()
    },
   
    methods: {
       
        // 获取商品信息
        getCartList () {

            this.$api.selfSupportGoodsDetail({goods_id:this.id}, res => {
                if (res.status) {
                    this.resData = res.data
                } 
            })
        },
        // 获取用户的默认收货地址
        userDefaultShip () {
            this.$api.userDefaultShip({}, res => {
                if (res.status) {
                    if (res.data) {
                        this.shipInfo = res.data
                        this.area_id = res.data.id
                    }
                }
            })
        },
        // 用户的选中的收货地址
        shipHandler (val) {
            this.shipInfo = val
            this.area_id = val.id
        },
        
        
        //  创建订单
       pay() {
           if(!this.flag) {
                this.$dialog.toast({
                    mes: '正在提交，请稍候',
                    timeout: 1000
                })
                return
           }
           this.flag = false
           this.$api.merchantCreatedOrder({mgid:this.resData.id, number: this.num,address:this.area_id}, res => {
               if(res) {
                   this.flag = true
               }
                if (res.status) {
                    this.$router.replace({path:'/MerchantPayOrder',query:{orderId:res.data.order_num,total:res.data.points,id:res.data.id}})
                }
            })
           
       }
    },
    watch: {
        // 监听数据状态(切换收货地址, 是否使用优惠券, 是否使用积分) 重新请求订单数据
        params: {
            handler () {
                this.getCartList()
            },
            deep: true
        },
        // 监听是否使用积分
        use_point () {
            if (this.use_point) {
                this.params.point = this.usable_point
            } else {
                this.params.point = 0
            }
        }
    }
}
</script>

<style scoped>
	.yd-popup{
		max-width: 750px;
		left: auto;
		right: auto;
	}
	.yd-popup .yd-tab-nav:after{
		background-image: none;
	}
    
    .ordercoupon-content {
        background-color: #000;
    }
    .yd-popup-content {
        background-color: #000;
    }
    .yd-tab-box {
        background-color: #000 !important;
    }
	.ordercoupon .yd-cell-item:not(:last-child):after{
		border-bottom: 1px solid #e9e9e9 !important;
		margin: 0;
	}
    .ordercoupon-content .yd-btn{
        width: 100%;
        background-color: #FF3B44;
        position: fixed;
        bottom: 0;
        left: 0;
        margin: 0 !important;
        color: #fff;
        border-radius: 0;
        height: .7rem;
		max-width: 750px;
		box-sizing: border-box;
    }
    .ordercoupon-content .yd-cell .demo-list-price img{
        width: .35rem;
        height: .35rem;
    }
    .coupon-input{
        padding: .24rem;
        box-sizing: border-box;
        height: 1rem;
        overflow: hidden;
    }
    .coupon-input input{
        height: 100%;
        padding: 0 .2rem;
        border: 1px solid #eee;
        float: left;
        width: 75%;
    }
    .coupon-input button{
        height: 100%;
        /*width: 1rem;*/
        border: 1px solid #FF3B44;
        background-color: #ff3b44;
        float: left;
        width: 20%;
        margin-left: 4%;
        color: #fff;
    }
	.pop-cell .yd-cell:after{
		background-image: none !important;
		border-bottom: none !important;
	}
    .orderadd {
        background-color: #000 !important;
    }
    .yd-cell {
        background-color: #000;
    }
    .yd-cell-left {
        color: #fff !important;
    }
    .yd-cell-right input {
        color: #fff !important;
    }
    .orderfooter {
        background-color: #000;
        border-top: none;
    }
    .firmorder .yd-list-title {
        color: #fff !important;
    }
</style>
