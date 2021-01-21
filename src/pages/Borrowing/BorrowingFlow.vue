<template>
    <div class="BorrowingFlow">

        <header-top title="记录">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </header-top>

        <div class="content-wrap">
            <div style='display:flex;justify-content: center;'>
                <div style='    width: 100px;
    height: 30px;
    line-height: 30px;
    background: rgb(76, 190, 131);
    text-align: center;
    border-radius: 5px; ' @click='userBorrow_list(1)' ref='jieBtn'>借款</div>
                <div style='    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;background: #000;' @click='userBorrow_list(2)' ref='huanBtn'>还款</div>
            </div>
            <div class="orders">

                <ul class="tit"  v-for="(item,index) in allOrders"  v-show="allOrders.length>0">
                    <li style="width:50px;height:50px;border-radius:50%;border:1px solid rgb(230,196,150);margin-right:10px；display: flex;
    justify-content: center;
    align-items: center;display: flex;"><img style="    width: 30px;
    height: 30px;" src="../../../static/image/browFlow.png" alt="" srcset=""></li>
                    <li style="text-center:left;flex:1;margin-left:10px">
                        <div>{{item.memo}}</div>
                        <div>{{item.ctime}}</div>
                    </li>
                    <li style="width:130px;height:30px;line-height:30px;border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;background:rgb(230,196,150);color:#fff;text-align:center">{{parseFloat(item.num).toFixed(2)}}</li>
                </ul>
                    <div class="more" v-show="allOrders.length<=0">
                    没有更多数据了
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import {reqTransaction} from "../../common/apigo";
    import {Cell, CellGroup} from 'vant';
    import HeaderTop from "../../components/HeaderTop/HeaderTop";

    Vue.use(Cell).use(CellGroup);

    import { Toast } from 'vant';

    Vue.use(Toast);
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
            return '节点收益'
        }else if(value == 13) {
            return '币币买入'
        }else if(value == 14) {
            return '币币卖出'
        }else if(value == 15) {
            return '币币交易撤销'
        }
    }) 
    export default {
        name: "Bill",
        components: {HeaderTop},
        data() {
            return {
                types: '',

                allOrders:[],

            }
        },


        mounted() {

            this.userBorrow_list()
        },

        methods: {
            
            userBorrow_list(idx){
                let type
                if(idx){
                    type=idx
                    if(idx==1){
                        this.$refs.jieBtn.style.backgroundColor="rgb(76, 190, 131)"
                        this.$refs.huanBtn.style.backgroundColor="#000"
                    }else{
this.$refs.jieBtn.style.backgroundColor="#000"
                        this.$refs.huanBtn.style.backgroundColor="rgb(76, 190, 131)"
                    }
                }else{
                    type=1
                }
                
                this.$api.userBorrow_list({type},res=>{
                    this.allOrders=res.data
                })
            }
            
        }
    }
</script>

<style scoped lang="less">

    .BorrowingFlow {
        font-size: 14px;
        color: #fff;
        height: 100%;
        // background-color: #edf1f4;
        padding-top: 50px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .more {
            text-align: center;
            padding: 5px;
            color: #ccc;
        }
        .tit {
            font-size: 16px;
            color: #abc2e2;
        }
        .tit,
        .con {
            display: flex;
            justify-content: space-between;
            padding: 10px 0px 10px 10px;
            // border-bottom: 1px solid #728bd9;
            align-items: center;
        }
        .con {
            color: #ababab;
        }
        .orders {
            // padding-left: 10px;
            // background-color: #fff;

            .order-item {
                position: relative;

                p {
                    padding: 5px 0;
                }

                padding: 10px;
                // border-bottom: 1px solid #eee;

                .left {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;


                    .info{
                        // margin-left: 10px;
                    }
                }

                .img-box {
                    margin-left: 10px;
                    width: 35px;
                    height: 35px;

                    img {
                        width: 35px;
                        height: 35px;
                    }
                }

                .date {
                    margin-left: 10px;
                }

                .icon-youjiantou{
                    position: absolute;
                    top: 15px;
                    right: 6px;
                }
            }
        }
    }

</style>
