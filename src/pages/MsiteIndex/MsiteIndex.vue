<template>
    <div id="Msite">
        <div class="miste-conent">
            <!--轮播图 开始-->
            <div class="slide">
                <div class="swiper-container" style="width:90%;height:200px;margin:20px auto;border-radius: 20px;">
                    <div class="swiper-wrapper" style="width:80%">
                        <img :src="item.img" alt="" v-for="(item,index) in banner" :key="index"
                             class="swiper-slide">
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <!--轮播图 结束-->
            <!--推荐币 开始-->
            <div class="centBalance">
                <div class="Balance" v-for="(item,index) in polline" :key="index">
                    <p>
                        <a>
                            <span class="title">{{item.pairs}}</span>
                            <span class="price" :class="Number(item.gain)>0?'up':'down'">{{item.highest_price}}</span>
                            <span class="total" :class="Number(item.gain)>0?'up':'down'">{{item.lower_price}}</span>
                            <span class="state" :class="Number(item.gain)>0?'up':'down'">{{item.gain}}</span>
                        </a>
                    </p>
                </div>
            </div>
            <!--推荐币 结束-->

            <!--新闻提示 开始-->
            <div class="swiper-notice">
                <div class="swiper-wrapper">
                    <a class="swiper-slide" v-for="(item,index) in notice" :key="index">
                        <img src="../../common/images/icon_msite_balance.png">
                        <span>{{item.title}}</span>
                    </a>
                </div>
                <div class="btn-more" @click="goTo('/systemnotice')">更多</div>
            </div>
            <!--新闻提示 结束-->

            <!-- 折线图 开始 -->

            <!-- <div class="myEchart" ref='myEchart' style="width:100%;height:230px"></div> -->
            <!-- 折线图 结束 -->

            <!-- 官方公告 -->
            <!-- <div class="readme">
                <div class="left-box">
                    <p style="font-weight: bold; font-size: 15px">提示</p>
                    <p>快速入门 带你玩转矿机</p>
                </div>
                <div class="right-box"></div>
            </div> -->


            <!--排行榜列表 开始-->
            <div class="ranking-box">
                <div class="top-title">
                    <img src="../../common/images/icon_msite_ranking.png" alt="">
                    <span>币币行情</span>
                </div>
                <!--排行列表 开始-->
                <!-- <div class="ranking-market-list">
                    <div class="market-item" v-for="(item,index) in coin_rank" :key="index">
                        <p class="name">
                            <span class="num">{{index + 1}}</span>
                            <img v-if="false" src="../../common/images/icon_msite_ranking.png" alt="">
                            <span class="name">{{item.name.replace('_','/')}}456</span>
                        </p>
                        <p class="total">{{getVolume(item.volume)}}123</p>
                        <p class="state">
                        <span :class="{down: item.zhang < 0}">
                        {{item.zhang > 0 ? '+'+item.zhang:item.zhang}}2%
                    </span></p>
                    </div>
                </div> -->
                <!--排行列表 结束-->
                <div class="coin_tit">
                    <div>币种/成交</div>
                    <div style="flex:1;text-align:right;padding-right:5%">最新价</div>
                    <div style="width:25%;text-align:right">24h涨跌</div>
                </div>
                <div class="coin"  v-for="(item,index) in bbmarket" :key="index">
                    <div class="coin_type">
                        <div class="coin_img">
                            <img :src="item.img" alt="">
                        </div>
                        <div>
                            <p class="coin_f">{{item.molecule}} <span style="color:#B8D0E6;font-size:14px">{{item.denominator}}</span></p>
                            <p style="color:#B8D0E6">{{item.volume}}</p>
                        </div>
                    </div>
                    <div class="coin_price">
                        <p class="coin_f">{{Number(item.cny).toFixed(2)}}CNY</p>
                        <p style="color:#B8D0E6">{{Number(item.usd).toFixed(2)}}</p>
                    </div>
                    <div class="coin_rise" :class="Number(item.gain)>0?'float_up':'float_down'">
                        {{Number(item.gain)>0?'+'+item.gain:item.gain}}%
                    </div>
                </div>
            </div>
            <!--排行榜列表 结束-->
        </div>

    </div>
</template>
<script>

    import Vue from 'vue'
    import {mapState} from 'vuex'
    import Swiper from 'swiper'
    import BScroll from 'better-scroll'
    import {Row, Col, Swipe, SwipeItem, NoticeBar, Toast} from 'vant'
    // import { Dialog } from 'vant'
    // Vue.use(Dialog)
    Vue.use(Toast)
    import 'swiper/dist/css/swiper.min.css'
    import 'vant/lib/index.css'

    import {Dialog} from 'vant'
import { setInterval } from 'timers';

    Vue.use(Dialog)

    // import {reqMarket} from '../../api'

    Vue.use(Row).use(Col).use(Swipe).use(SwipeItem).use(NoticeBar)

    // import echarts from 'echarts'
    // Vue.prototype.$echarts = echarts

    export default {

        data() {
            return {
                market: null,
                timer: null,
                coin: [],
                coin_rank: [],
                status:0,
                lineList:[],
                dayList:[],
                biList:['ETH','BTC','USDT','EOS'],
                buytype:'ETH',
                selltype:'ETH',
                buyPrice:'',
                sellNum:'',
                polline:{},
                notice:[],
                banner:[],
                info:[],
                bbmarket:[],
                
            }
        },

        mounted() {
            // this.getUserInfo()
            // this.getMarket()
            // this.getStatus()
            // this.getLine()
            this.getHomePage()
            // this.timer = setInterval(()=>{
            //     this.getHomePage()
            // },5000)
            
            
        },

        methods: {
            getStatus(){
                this.status = localStorage.getItem('status')
            },
            //切换路由
            goTo(path) {
                if (path == '/') {
                    Toast('待开放')
                    return false
                }

                if (path == '/call') {
                    Dialog.alert({
                        message: '客服QQ：1001000'
                    }).then(() => {
                        // on close
                    })
                    return false
                }

                if (path == '/sellnew') {
                    if (this.userAllInfo.usermoney[0].sell_status == 2) {
                        this.$router.push('/sell')
                        return false
                    }
                }
                this.$router.push({path: path})
            },

            async getUserInfo() {
                let apiauth = localStorage.getItem('apiauth')
                
                this.status = localStorage.getItem('status')
                
                if (apiauth) {
                    let info = await reqUserAllInfo()
                    let key = info.userInfo.account
                    let state = localStorage.getItem(key)
                    if (info) {
                        //写入用户的数据
                        //this.$store.dispatch('recordApiAuth', apiauth)
                        this.$store.dispatch('recordUserAllInfo', info)

                        this.coin_rank = info.coin_rank;
                        
                        if(state == 1) return
                        if(info.userInfo.is_real == 0) {
                            Dialog.confirm({
                                title: '提示',
                                message: '您还未实名认证，请先去实名认证'
                                }).then(() => {
                                    this.$router.replace({path:'/Identity'})
                                }).catch(() => {
                                  //取消实名认证，记录状态，下次来此不再提示
                                // var status = info.userInfo.account
                                // console.log(status)
                                localStorage.setItem(key,1)
                            });
                        }
                    }
                } else {
                    this.$router.replace({path: '/login'})
                }
            },

            async getMarket() {
                const res = await reqcoin();
                this.coin = res;
            },

            async getLine(){
                let res = await reqLine()
                this.dayList = res.time
                this.lineList = res.value
                this.$nextTick(()=>{
                    this.initChart();
                })
            },

            initChart() {
                this.myChart = this.$echarts.init(this.$refs.myEchart);
                this.myChart.setOption({
                    xAxis: {
                        type: 'category',
                        data: this.dayList,
                        axisLabel: {
                            interval:'auto',
                            formatter: function (value) {
                                return echarts.format.formatTime('M-d', value);
                            }
                        },
                    },
                    yAxis: {
                        type: 'value'
                    },
                    grid:{
                        height:180,
                        top:20
                    },
                    series: [{
                        data: this.lineList,
                        type: 'line',
                        smooth: true,
                        markLine: {//图表标线 显示实时价格
                                data: [
                                    {yAxis:this.lineList[this.lineList.length - 1]}
                                ],
                                symbol:'',
                                precision:3,
                                lineStyle:{
                                    normal:{
                                        color:'#c23531',
                                    }

                                },
                                label:{

                                    normal:{
                                        position:'end',
                                        formatter: '{c}'
                                    }
                                },
                                animationDuration:0
                            },
                    }]
                })
            },


            getVolume(value){
                let volume = parseInt(value);
                if(volume <= 10000){
                    return volume
                }else {
                    volume = (volume / 10000).toFixed(2) + '万'
                }

                return volume;

            },



            getHomePage(){
                this.$api.reqHomePage({},res=>{
                    this.info = res.data
                    this.banner = res.data.banner
                    this.notice = res.data.notice
                    this.polline = res.data.market
                    this.bbmarket = res.data.bbmarket
                })
            }

        },

        destroyed() {
            clearInterval(this.timer)
            this.timer = null
        },

        computed: {
            ...mapState(['userAllInfo']),
        },
        watch: {
            info(value) {
                this.$nextTick(() => {
                    var mySwiper = new Swiper('.swiper-container', {
                        autoplay: true, //可选选项，自动滑动
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    })
                    var swiper_notice = new Swiper('.swiper-notice', {
                        direction: 'vertical',
                        loop: true,
                        speed: 1000,
                        autoplay: true,
                        allowTouchMove: false,
                    })
                    new BScroll('#Msite', {
                        click: true,
                        momentum: false
                    })

                })
            }
        }

    }
</script>
<style lang="less">
    #Msite {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 17vw;
        overflow: hidden;
        // background-color: #edf1f4;

        .header {
            background-color: #60adf5;
            height: 50px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .info {
                position: absolute;
                left: 15px;
            }

            .settings {
                position: absolute;
                right: 15px;
            }
        }
        .miste-conent {
            max-width: 750px;
            margin: 0 auto;
        }

        .centBalance {
            // color: #666;
            // background-color: #fff;
            border-top: 1px solid #423F52;
            border-bottom: 1px solid #423F52;
            display: flex;
            padding: 15px 0px;
            

            .Balance {

                span {
                    padding: 2px;
                }

                .title {
                    // color: #000;
                    font-weight: bold;
                    font-size: 14px;
                }

                .price {
                    font-weight: bold;
                }

                .price, .total, .state {
                    // color: red;
                    font-size: 12px;
                }
                .down {
                    color: #2db249;
                }
                .up {
                    color: #B84F36;
                }


                border-right: 1px solid #eee;
                width: 50%;
                height: 16vw;
                display: flex;
                align-items: center;
                justify-content: center;

                a {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                span {
                    padding: 2px;
                    font-size: 3.7vw;
                }
            }
        }

        .slide {
            width: 100%;
            height: 61vw;
            .swiper-container {
                width: 100%;
                height: 100%;

                .swiper-slide {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .coin_tit {
           padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px; 
            color: #7F8C9D;
        }

        .coin {
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            .coin_type {
                display: flex;
                justify-content: space-around;
            }
            .coin_f {
                font-size: 18px;
                line-height: 28px;
            }
            .coin_img {
                width: 26px;
                height: 26px;
                padding-right: 5px;
                img {
                    width: 100%;
                    padding-top: 3px;
                }
            }
            .coin_rise {
                // padding: 10px 15px;
                width: 25%;
                height: 40px;
                text-align: center;
                line-height: 40px;
                background-color: #B84F36;
                border-radius: 3px;
            }
            .float_up {
                background-color: #B84F36;
            }
            .float_down {
                background-color: #2db249;
            }
            .coin_price {
                flex: 1;
                text-align: right;
                padding-right: 5%;
            }
        }

        .ranking-box {
            font-size: 14px;
            margin-top: 5px;
            // background-color: #fff;

            .top-title {
                height: 40px;
                display: flex;
                align-items: center;
                // border-bottom: 1px solid #eee;

                > img {
                    margin-left: 10px;
                    height: 25px;
                    width: 25px;
                }

                > span {
                    margin-left: 10px;
                }
            }

            .ranking-market-list {

                .market-item {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;


                    &:nth-child(1) {
                        .num{
                            background:#2b3a51 !important;
                        }
                    }


                    &:nth-child(2) {
                        .num{
                            background-color:#4a6389 !important;
                        }
                    }

                    &:nth-child(3) {
                        .num{
                            background-color:#6e8dbe !important;
                        }
                    }


                    > p {
                        flex: 1;
                    }

                    .name {
                        display: flex;
                        align-items: center;

                        > span {
                            margin-left: 3px;
                            font-weight: bold;
                        }

                        .num {
                            color: #fff;
                            display: block;
                            width: 20px;
                            height: 20px;
                            font-size: 12px;
                            line-height: 20px;
                            border-radius: 3px;
                            text-align: center;
                            background-color: #c3c3c3;

                        }

                        > img {
                            margin-left: 5px;
                            width: 25px;
                            height: 25px;
                        }
                    }

                    .state {
                        > span {
                            display: inline-block;
                            padding: 5px 10px;
                            background-color: #fa5856;
                            color: #fff;
                            width: 60px;
                            border-radius: 5px;

                            &.down {
                                background-color: #2db249;
                            }
                        }


                    }
                }


            }
        }

        .menu {
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            justify-content: start;
            background-color: #fff;
            overflow: hidden;
            /*margin-top: 5px;*/
            border-bottom: 1px solid #eee;

            .menu-item {
                width: 33.3333%;
                border: 3px solid #FaFaFa;
                box-sizing: border-box;

                > a {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    > img {
                        width: 50px;
                        height: 50px;
                    }

                    > span {
                        margin-top: 10px;
                        padding-top: 3px;
                        color: #666;
                        font-size: 15px;
                    }
                }
            }
        }

        .cen-icon {
            .van-col {
                padding: 8px;
                display: flex;
                margin-bottom: 10px;
                background-color: #fff;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .balance {
                color: #CDCDCD;
            }
        }

        .swiper-notice {
            margin-top: 5px;
            height: 40px;
            display: flex;
            // background-color: #fff;
            border-bottom: 1px solid #423F52;
            overflow: hidden;


            .swiper-slide {

                display: flex;
                align-items: center;

                > img {
                    width: 25px;
                    height: 25px;
                }

                > span {
                    padding-left: 10px;
                    overflow: hidden;
                    white-space:nowrap;
                }

            }

            a {
                padding-left: 10px;
                display: block;
                font-size: 14px;
                // color: #000;
                height: 40px;
                line-height: 40px;
            }

            .btn-more {
                font-size: 14px;
                width: 50px;
                height: 40px;
                line-height: 40px;
            }
        }

        .market {
            margin-top: 5px;

            .item {
                width: 100%;
                border-bottom: 1px solid #eee;
                padding: 5px 0px;
                display: flex;
                background-color: #fff;
                //justify-content: space-around;
                align-items: center;


                > p {
                    text-align: center;
                    flex: 1;
                }

                .title {
                    padding: 10px 0;
                }

                .name {
                    font-weight: bold;
                    font-size: 15px;
                    color: #000;
                }

                .money {
                    font-weight: bold;
                    font-size: 15px;
                    color: #ee655f;
                }

                .num {
                    text-align: center;
                    display: block;
                    width: 80px;
                    line-height: 28px;
                    border-radius: 3px;
                    height: 28px;
                    font-weight: bold;
                    color: #fff;
                    background-color: #ee655f;
                }
            }
        }

        .readme {
            margin: 5px 0;
            padding: 10px;
            // background-color: #fff;

            .left-box {
                padding: 10px;

                > p {
                    font-size: 14px;
                    margin: 5px 0;
                }
            }
        }

        .buy {
            padding: 10px;
            font-size: 14px;
            background-color: #fff;
            margin-bottom: 5px;
            h1 {
                margin-bottom: 20px;
                font-size: 20px;
                font-weight: 400;
            }
            ul {
                display: flex;
                justify-content: space-between;
                li {
                    padding: 7px 0px;
                    width: 20%;
                    text-align: center;
                    border:1px solid #ccc;
                    border-radius: 20px;
                    &.active {
                        border: 1px solid #3B53C6;
                        color: #3B53C6;
                    }
                }
            }
            >p {
                padding: 20px 0 10px;
            }
            .affirm {
                display: flex;
                height: 40px;
                align-items: center;
                position: relative;
                input {
                    height: 100%;
                    width: 70%;
                    padding-left: 5px;
                    border: 1px solid #ccc;
                }
                .btn {
                    width: 30%;
                    // padding: 0 30px;
                    height: 100%;
                    line-height: 40px;
                    text-align: center;
                    background-color: #009589;
                    color: #fff;
                }
                p {
                    position: absolute;
                    top: 0;
                    left: 60%;
                    line-height: 40px;
                    
                }
            }
        }
    }
</style>
