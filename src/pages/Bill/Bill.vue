<template>
    <div class="bill">

        <header-top title="记录">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </header-top>

        <div class="content-wrap">
            <div class="orders">
                <!-- <div class="order-item" v-for="(item,index) in allOrders" :key="index"
                    @click="goPage('/BillDetail?date=' + item.Ctime   + '&value=' + item.Value + '&type=' + item.Type +'&type2=' + item.Utime + '&statu=' + item.Status + '&after=' + item.After + '&coin=' + types)"
                >
                    <div class="left">
                        <div class="info">
                            <p> <span style="font-size: 16px;">{{item.Type | type}}   {{item.Value >0 ?'+'+item.Value:item.Value}} {{types}}</span> <span style="font-size: 14px">{{item.Utime}}</span></p>
                            
                        </div>
                        <div class="date">
                            {{item.time}}
                            
                        </div>
                        <i data-v-6dab60ef="" class="iconfont icon-youjiantou"></i>
                    </div>
                </div> -->
                <!-- <ul class="tit">
                    <li style="width:50px;height:50px;border-radius:50%;border:1px solid rgb(230,196,150);margin-right:10px"><img src="" alt="" srcset=""></li>
                    <li style="text-center:left;flex:1">
                        <div>描述</div>
                        <div>07-12 12:09</div>
                    </li>
                    <li style="width:80px;height:30px;line-height:30px;border-radius:15px;background:rgb(230,196,150);color:#fff;text-align:center">+1.90</li>
                </ul> -->
                <ul class="tit"  v-for="(item,index) in allOrders"  @click="goPage('/BillDetail?date=' + item.Ctime   + '&value=' + item.Value + '&type=' + item.Type +'&type2=' + item.Utime + '&statu=' + item.Status + '&after=' + item.After + '&coin=' + types + '&from='+ item.From + '&to=' + item.To+ '&memo=' + item.Memo)">
                    <li style="width:50px;height:50px;border-radius:50%;border:1px solid rgb(230,196,150);margin-right:10px"><img style="    width: 50px;
    height: 50px;" src="../../../static/image/billBall.png" alt="" srcset=""></li>
                    <li style="text-center:left;flex:1">
                        <!-- <div>{{item.Type | type}}</div> -->
                        <div>{{item.Memo}}</div>

                        <div>{{item.Ctime}}</div>
                    </li>
                    <li style="width:80px;height:30px;line-height:30px;border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;background:rgb(230,196,150);color:#fff;text-align:center">{{item.Value >0 ?'+'+item.Value:item.Value}}</li>
                </ul>
                <!-- <ul class="tit">
                    <li style="width:35%">时间</li>
                    <li style="text-center:left;flex:1">类型</li>
                    <li>数量</li>
                </ul> -->
                <!-- <div class="con" v-for="(item,index) in allOrders"  @click="goPage('/BillDetail?date=' + item.Ctime   + '&value=' + item.Value + '&type=' + item.Type +'&type2=' + item.Utime + '&statu=' + item.Status + '&after=' + item.After + '&coin=' + types + '&from='+ item.From + '&to=' + item.To)">
                    <p style="width:35%">{{item.Ctime}}</p>
                    <p style="text-center:left;flex:1" v-if="item.Type != 3">{{item.Type | type}}</p>
                    <p style="text-center:left;flex:1" v-if="item.Value > 0 && item.Type == 3">{{item.From}}{{item.Type | type}}</p>
                    <p style="text-center:left;flex:1" v-if="item.Value < 0 && item.Type == 3">{{item.Type | type}}到{{item.To}}</p>
                    <p>{{item.Value >0 ?'+'+item.Value:item.Value}} {{types}}<i data-v-6dab60ef="" class="iconfont icon-youjiantou"></i></p>
                </div> -->
                <div class="more" @click="upload" v-if="moreShow">
                    点击加载更多
                </div>
                    <div class="more" v-else>
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
                orders: [],
                uid:null,
                allOrders:[],
                start: -50,
                moreShow: true
            }
        },


        mounted() {
            this.types = this.$route.query.type.replace(',', '_')
            // this.getBill()
            this.userOnline()
        },

        methods: {
            userOnline() {

                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getTransaction()

                })
            },
            //加载更多
            upload() {
                // this.loading = true;
                this.getTransaction()
            },
            async getTransaction() {
                let uid=this.uid;
                this.start = this.start + 50
                let limit=50;
                let coin = this.$route.query.type
                const res = await reqTransaction({uid,offset:this.start,limit,coin})
                if(res.errcode == 0) {
                    this.orders = res.transaction
                    if(this.orders.length< 50) {
                        this.moreShow = false
                    }
                    this.allOrders = this.allOrders.concat(this.orders)
                    this.orders.map((item)=>{
                        item.Ctime=item.Ctime.substr(5,11).replace(/T/g," ")
                        item.Utime=item.Utime.substr(5,11).replace(/T/g," ")
                    })

                }else if(res.errcode == -1) {
                    Toast(res.msg)
                }else if(res.errcode == -2) {
                    Toast("没有记录")
                }
                
            },


            goPage(path) {
                this.$router.push({path: path})
            }
        }
    }
</script>

<style scoped lang="less">

    .bill {
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
