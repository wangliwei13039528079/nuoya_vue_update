<template>
    <div class="">
        <div class="address-context">收货地址：{{ order.address }}</div>
        <!-- <yd-timeline>
            <yd-timeline-item v-for="(item, index) in logisticsInfo.data" :key="index">
                <p>{{ item.context }}</p>
                <p style="margin-top: 10px;">{{ item.time }}</p>
            </yd-timeline-item>
        </yd-timeline> -->
        <p style="padding-left: 15px;">快递公司：{{ order.addr_name }}</p>
        <p style="margin-top: 10px;padding-left: 15px;">快递单号：{{ order.addr_code}}</p>
    </div>
</template>

<script>
export default {
    data () {
            return {
                express: {}, // 订单详情物流信息显示最后一条信息
                showLogistics: false, // 是否显示物流信息窗口
                logisticsInfo: [], // 物流信息
                code: this.$route.query.code, // 传过来的code
                no: this.$route.query.no, // 传过来的no
                address: this.$route.query.address, //传过来的收货地址
                order:{}
            }
        },
    created () {
        //console.log(this.$route.query.code,this.$route.query.no)
        // if (!this.$route.query.code ||!this.$route.query.no ) {
        //         this.$dialog.alert({
        //             mes: '参数丢失',
        //             callback: () => {
        //                 this.$router.go(-1)
        //             }
        //         })
        //     }
            // this.logistics()
        this.orderDetail()
    },
    methods: {
            // 查看物流信息详情
            // logistics () {
            //     this.$api.logistics({code: this.code, no: this.no}, res => {
            //         if (res.status) {
            //             this.showLogistics = true
            //             this.logisticsInfo = res.data.info
            //         }
            //     })
            // }
        // 查看订单详情
        orderDetail () {
            this.$api.merchantOrderInfo({order_id: this.order_id}, res => {
                if (res.status) {
                    this.order = res.data[0]
                    // console.log(this.order.delivery)
                    // if (this.order.hasOwnProperty('express_delivery')) {
                    //     this.express = this.order.express_delivery
                    // }
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
    }
}
</script>

<style>
.yd-timeline-content{
text-align: left;
}
.address-context{
    padding: .25rem;
    text-align: left;
}
</style>