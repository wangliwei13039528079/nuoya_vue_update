<template>
    <div id="orderBuy">
        <div class="content">
            <div class="order-item" v-if="order.length < 1">暂无内容</div>
            <template v-else>
                <div class="order-item" v-for="(item,index) in order" :key="index">

                    <p style="display: flex; justify-content: space-between">
                        <span class="item-left">挂单编号</span>
                        <span class="item-right">{{item.order_id}}</span>
                    </p>
                    <p style="display: flex; justify-content: space-between">
                        <span class="item-left">挂单数量</span>
                        <span class="item-right">{{Number(item.rpoints).toFixed(2)}}</span>
                    </p>
                    <p style="display: flex; justify-content: space-between">
                        <span class="item-left">已匹配数量</span>
                        <span class="item-right">{{Number(item.rpoints - item.points).toFixed(2)}}</span>
                    </p>
                    <p style="display: flex; justify-content: space-between">
                        <span class="item-left">未匹配数量</span>
                        <span class="item-right">{{Number(item.points).toFixed(2)}}</span>
                    </p>
                    <p style="display: flex; justify-content: space-between">
                        <span class="item-left">挂单时间</span>
                        <span class="item-right">{{getTime(item.created_at)}}</span>
                    </p>
                    <p style="display: flex; justify-content: flex-end;" v-if="item.status == 0"><span class="item-right cancel" @click="cancel(item.id)">撤销</span></p>
                    <p style="display: flex; justify-content: flex-end;" v-else><span class="item-right statu">{{getOrderState(item.status)}}</span></p>
                    
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    // import {reqBuyOrders,reqCTCBuyCabcel} from '../../../api'
import { Toast } from 'vant';

    export default {
        name: "MountOrderBuy",
        data(){
            return {
                order:[]
            }
        },
        mounted(){
            // this.getBuyOrders()
        },
        methods:{
            // async getBuyOrders () {
            //     let res = await reqBuyOrders()
            //     this.order = res.data
            // },
            // async cancel (id) {
            //     let buy_id = id
            //     let res = await reqCTCBuyCabcel({buy_id})
            //     Toast(res.msg)
            //     this.getBuyOrders()
            // },
            getTime(time){
                let times = new Date(Number(time) * 1000);
                let Y = times.getFullYear();
                let M = (times.getMonth() + 1 < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1).toString().padStart(2,'0');
                let D = times.getDate().toString().padStart(2,'0');
                let h = times.getHours().toString().padStart(2,'0');
                let m = times.getMinutes().toString().padStart(2,'0');
                let s = times.getSeconds().toString().padStart(2,'0');
                // console.log(Y+M+D+h+m+s);
                return `${Y}-${M}-${D} ${h}:${m}:${s}`
            },
            getOrderState(status) {
                let state = ''
                switch (status) {
                    case 0:
                        state = '撤销'
                        break
                    case 1:
                        state = '已完成'
                        break
                    case 2:
                        state = '已撤单'
                        break
                    case 3:
                        state = '已完成'
                        break
                }
                return state
            },
        }
    }
</script>

<style scoped lang="less">

    #orderBuy {
        color: #666;
        font-size: 14px;
        .content {
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
        .cancel {
            padding: 7px;
            background-color: #37434f;
            color: #fff;
        }
        .statu {
            color: red;
        }
    }

</style>
