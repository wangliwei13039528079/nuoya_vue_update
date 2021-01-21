<template>
    <section class="billDetail">

        <header-top title="账单详情">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>

        </header-top>
        <div class="content-wrap">
            <van-cell-group>
                <div class="money-info">
                    <div>
                        <!-- <p class="label">{{query.type2}}</p> -->
                        <p class="value">{{query.value>0?'+'+query.value:query.value}} {{query.coin.toUpperCase()}}</p>
                    </div>
                </div>
                <!--<van-cell title="账户余额" value="内容" />-->
                <van-cell title="账单余额" :value="query.after"/>
                <van-cell title="账单时间" :value="query.date"/>
                <van-cell title="账单详情" :value="query.memo"/>
                <!-- <van-cell title="账单类型" :value="getStatus(type)"/> -->
                <van-cell title="账单状态" :value="query.statu | status" />
               
            </van-cell-group>

        </div>

    </section>
</template>

<script>

    import Vue from 'vue'
    import { Cell, CellGroup } from 'vant';
    import HeaderTop from "../../components/HeaderTop/HeaderTop";

    Vue.use(Cell).use(CellGroup);

    Vue.filter('status', function (value) {
        if(value==0){
            return "未签到"
        }else if(value==1){
            return "已完成"
        }else if(value==2){
            return "已拒绝"
        }
    })
    Vue.filter('type', function (value) {
        if(value==1){
            return "网络转入"
        }else if(value==2){
            return "网络转出"
        }else if(value==3){
            return "划转"
        }else if(value==4){
            return "交易买入"
        }else if(value==5){
            return `交易卖出`
        }else if(value==6){
            return `交易卖出`
        }else if(value==7){
            return `撤销出售订单`
        }else if(value==8){
            return `买家撤单`
        }else if(value==9){
            return "系统撤单"
        }else if(value == 10) {
            return `交易买入`
        }else if(value == 11) {
            return '购买节点'
        }else if(value == 12) {
            return '节点释放'
        }else if(value == 13) {
            return '币币买入'
        }else if(value == 14) {
            return '币币卖出'
        }else if(value == 15) {
            return '币币交易撤销'
        }
    })
    export default {
        name: "BillDetail",
        components: {HeaderTop},
        data(){

            return{
                query:{},
                type:''
            }
        },

        mounted(){
            this.query = this.$route.query
            this.type =  Number(this.$route.query.type)
            this.coin = this.query.type
            console.log(this.query)
        },
        methods:{
            getStatus(status){
                let state = ''
                let from = this.$route.query.from
                let value = this.$route.query.value
                let to = this.$route.query.to
                switch(status){
                    case 1:
                        state = '网络转入'
                        break
                    case 2:
                        state = '网络转出'
                        break
                    case 3:
                        value>0?state = from+'划转':state = '划转到'+to
                        break
                    case 4:
                        state = '交易买入'
                        break
                    case 5:
                        state = '交易卖出'
                        break
                    case 6:
                        state = '交易卖出'
                        break
                    case 7:
                        state = '撤销出售订单'
                        break
                    case 8:
                        state = '买家撤单'
                        break
                    case 9:
                        state = '系统撤单'
                        break
                    case 10:
                        state = '交易买入'
                        break
                    case 11:
                        state = '购买节点'
                        break
                    case 12:
                        state = '节点释放'
                        break
                }
                return state
            }
        }
      

    }
</script>

<style scoped lang="less">

    .billDetail{
        height: 100%;
        background-color: #000;
        padding: 0 10px;
        padding-top: 50px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .van-cell-group {
            background-color: #000;
        }
        .van-cell {
            background-color: #000;
            color: #fff;
            border-bottom: 1px solid #232121;
        }
        .van-hairline--top-bottom::after {
            border-width: 0;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        .van-cell__value {
            color: #ababab;
        }

        .money-info{
            padding-left: 15px;
            // background-color: #000;
            color: #fff;
            >div{
                padding: 10px 0;
                // border-bottom: 1px solid #eee;
                p{
                    padding: 5px 0 ;
                }

                .label{
                    font-size: 14px;
                }

                .value{
                    font-size: 25px;
                    color: #fff;
                }
            }
        }
    }

</style>
