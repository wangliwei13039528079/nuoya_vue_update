<template>
    <div id="MsiteIndex">
        <header>{{ $t('home') }}</header>
        <div class="header_zw"></div>

        <div class="ind_profit">

            <div class="top_rvc clearfix">
                <div class="rvc">
                    <p>累计收益（NEBC)</p>
                    <h3>{{ ljsy }}</h3>
                </div>
                <div class="signin" v-if="!qfdays">
                    <p><span> {{ $t('SignInno') }}  </span></p>

                </div>
                <div class="signin" v-if="qfdays">
                    <p><span> {{ $t('SignInok') }}  </span></p>

                </div>
                <div class="yest_rvc">
                    <p>昨日收益:</p>
                    <h3>{{ zrsy }}NEBC</h3>


                </div>

            </div>

            <ul class="clearfix">
                <li>
                    <p>账号余额(NEBC)</p>
                    <h4>{{ rvc }}</h4>
                </li>

                <li>
                    <p>账号余额(积分)</p>
                    <h4>{{ ausdt }}</h4>
                </li>

                <li>
                    <p>账号余额(USDT)</p>
                    <h4>{{ usdt }}</h4>
                </li>
            </ul>

        </div>

        <ul class="ind_list clearfix">
            <li>
                <a @click="selfSignIn">
                    <div class="icon"><img src="../../../static/image/ind_icon1.png"></div>
                    <p>{{ $t('SignIn') }}</p>
                </a>
            </li>

            <li>
                <a @click="goTo('BiBiC?type=usdt')">
                    <div class="icon"><img src="../../../static/image/ind_icon2.png"></div>
                    <p> {{ $t('recharge') }} USDT</p>
                </a>
            </li>

            <li>
                <a @click="goTo('ArticleList?type_id=1')">
                    <div class="icon"><img src="../../../static/image/ind_icon3.png"></div>
                    <p>{{ $t('projectIntroduct') }}</p>
                </a>
            </li>

            <li>
                <a @click="goTo('ArticleList?type_id=2')">
                    <div class="icon"><img src="../../../static/image/ind_icon4.png"></div>
                    <p>{{ $t('help') }}</p>
                </a>
            </li>

            <li>
                <a @click="goTo('Service')">
                    <div class="icon"><img src="../../../static/image/ind_icon5.png"></div>
                    <p>{{ $t('service') }}</p>
                </a>
            </li>
        </ul>

        <ul class="ind_list2 clearfix">
            <li>
                <a @click="goTo('BiBizzz?type=7&name=ausd')">
                    <img src="../../../static/image/ind_pic1.png">
                    <div class="word">
                        <h3>合作社区</h3>
                        <p>HBTT WASD NUC Hong</p>
                        <span>闪兑AUSDT</span>
                    </div>
                </a>
            </li>

            <li>
                <a @click="goTo('Share')">
                    <img src="../../../static/image/ind_pic2.png">
                    <div class="word">
                        <h3>推广好友加入</h3>
                        <p>Max Player</p>
                    </div>
                </a>
            </li>
        </ul>

        <h3 class="ind_tit">NEBC一周价格(USDT)</h3>
        <div id="echart_a1" ref='myEchart' class="echart" style="width: 100%; height:4rem;"></div>
        <div style="padding:0 0 1.5rem 0"></div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import {Row, Col, Swipe, SwipeItem, NoticeBar, Toast, Dialog} from 'vant'
    import 'swiper/dist/css/swiper.min.css'
    import 'vant/lib/index.css'
    import echarts from 'echarts'

    var colors = ['#ece4a7', '#999']
    var option
    Vue.use(Toast)
    Vue.use(Dialog)
    Vue.use(Row)
        .use(Col)
        .use(Swipe)
        .use(SwipeItem)
        .use(NoticeBar)
    export default {
        data () {
            return {
                lineList: [],
                dayList: [],
                ljsy: 0,
                zrsy: 0,
                rvc: 0,
                qfdays: '',
                ausdt: 0,
                usdt: 0
            }
        },

        mounted () {
            this.$nextTick(() => {
                this.getLineData()
                this.getHoneIndex()
            })
        },

        methods: {
            getLineData () {
                const coin = 'rvc'
                this.$api.zxline({coin}, res => {
                    if (res.status) {
                        this.lineList = []
                        this.dayList = []
                        res.data.forEach(item => {
                            this.lineList.push(item.price)
                            this.dayList.push(item.created_at)
                        })
                        this.initChart()
                    }
                })
            },
            getHoneIndex () {
                this.$api.homeIndex({}, res => {
                    if (res.status) {
                        this.ljsy = res.data.user.bonusall
                        this.zrsy = res.data.user.daybonus
                        this.qfdays = res.data.user.qfdays
                        res.data.coins.forEach(coin => {
                            if (coin.mid === 1) {
                                this.usdt = coin.num
                            }
                            if (coin.mid === 8) {
                                this.rvc = coin.num
                            }
                            if (coin.mid === 7) {
                                this.ausdt = coin.num
                            }
                        })
                    }
                })
            },
            initChart () {
                var myChart = echarts.init(document.getElementById('echart_a1'))
                option = {
                    color: colors,
                    grid: {
                        left: 20,
                        right: 20,
                        bottom: 20,
                        top: 50,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                                color: colors[1] // x轴字体颜色
                            }

                        },

                        data: this.dayList
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    yAxis: {
                        name: '价格',
                        type: 'value',
                        axisTick: {show: false},
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            // formatter: '{value}.00',
                                formatter: '{value}',
                            textStyle: {
                                color: colors[1] // x轴字体颜色
                            }

                        },
                        max: function (value) {
                            return (value.max + 0.01 * (value.min)).toFixed(4)
                        },

                        min: function (value) {
                            return (value.min - 0.01 * (value.min)).toFixed(4)
                        },
                        splitLine: {
                            show: true, // 是否显示x轴的线
                            lineStyle: {
                                color: '#000'
                            }
                        }

                    },
                    series: [{
                        data: this.lineList,
                        type: 'line',
                        lineStyle: {
                            width: 2,
                            color: '#eec57e'
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(92,74,63,0.1)'
                            }, {
                                offset: 1,
                                color: 'rgba(230,201,154,0.1)'
                            }])
                        },
                        symbolSize: 10,
                        itemStyle: {
                            borderWidth: 3,
                            borderColor: '#eec57e',
                            color: '#fff'
                        }

                    }]
                }
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option)
                window.addEventListener('resize', function () {
                    myChart.resize()
                })
            },
            selfSignIn () {
                this.$dialog.confirm({
                    mes: '确认签到?',
                    opts: [
                        {
                            txt: '取消',
                            color: false
                        },
                        {
                            txt: '确定',
                            color: true,
                            callback: () => {
                                this.$api.signIn({}, res => {
                                    if (res.status) {
                                        Toast('签到成功')
                                    } else {
                                        Toast(res.msg)
                                    }

                                    this.getLineData()
                                    this.getHoneIndex()

                                    // location.reload();

                                })
                            }
                        }
                    ]
                })
            },
            goTo (path) {
                this.$router.push({path: path})
            }
        },
        computed: {
            ...mapState(['userAllInfo'])
        },
        watch: {}
    }
</script>
<style scoped>

    div.clear {
        font: 0px Arial;
        line-height: 0;
        height: 0;
        overflow: hidden;
        clear: both;
    }

    .clearfix::after {
        content: "";
        display: block;
        clear: both;
    }

    /*兼容老设备的rem-px基准*/
    html {
        font-size: 42.6667px;
    }

    @media screen and (max-width: 320px) {
        html {
            font-size: 42.6667px;
        }
    }

    @media screen and (min-width: 321px) and (max-width: 360px) {
        html {
            font-size: 48px;
        }
    }

    @media screen and (min-width: 361px) and (max-width: 375px) {
        html {
            font-size: 50px;
        }
    }

    @media screen and (min-width: 376px) and (max-width: 414px) {
        html {
            font-size: 55px;
        }
    }

    @media screen and (min-width: 415px) and (max-width: 484px) {
        html {
            font-size: 64px;
        }
    }

    @media screen and (min-width: 485px) and (max-width: 720px) {
        html {
            font-size: 96px;
        }
    }

    @media screen and (min-width: 721px) and (max-width: 768px) {
        html {
            font-size: 102px;
        }
    }

    @media screen and (min-width: 769px) and (max-width: 1080px) {
        html {
            font-size: 144px;
        }
    }

    @media screen and (min-width: 1080px) {
        html {
            font-size: 144px;
        }
    }

    /*新设备的rem-vw标准*/
    /*公用*/
    .show {
        display: block !important;
    }

    /*头部*/
    header {
        width: 100%;
        height: 1.05rem;
        line-height: 1.05rem;
        text-align: center;
        background: #474953;
        position: fixed;
        left: 0;
        top: 0;
        font-size: 0.34rem;
        z-index: 99;
        color: #fff;
    }

    header .host {
        position: absolute;
        left: 0.34rem;
        top: 0;
        width: 0.34rem;
        height: 1.05rem;
        background: url(../../../static/image/host.png) no-repeat center left;
        background-size: 0.34rem 0.34rem;
        color: #666;
    }

    .header_zw {
        height: 1.05rem;
        clear: both;
    }

    /*首页*/
    .ind_profit {
        background: url(../../../static/image/ind_profit.png) no-repeat center;
        width: 6.8rem;
        height: 3.75rem;
        border-radius: 0.1rem;
        overflow: hidden;
        background-size: 100%;
        margin: 0.1rem auto 0;
    }

    .ind_profit .top_rvc {
        padding: 0.34rem;
        height: 2.75rem;
        overflow: hidden
    }

    .top_rvc .rvc {
        float: left;
        width: 4.4rem;
    }

    .top_rvc .rvc p {
        font-size: 0.3rem;
        color: #fff;
    }

    .top_rvc .rvc h3 {
        font-size: 0.76rem;
        color: #eec67f;
        margin-top: 0.1rem;
        font-weight: 500
    }

    .top_rvc .yest_rvc {
        float: right;
        width: 1.65rem;
        text-align: right;
    }

    .top_rvc .signin {
        float: right;
        color: #fafbfc;
        width: 1.65rem;
        text-align: right;
    }

    .top_rvc .yest_rvc p {
        font-size: 0.24rem;
        color: #9fa7b3;
    }

    .top_rvc .yest_rvc h3 {
        font-size: 0.30rem;
        color: #eec67f;
        margin-top: 0.1rem;
        font-weight: 500
    }

    .ind_profit li {
        text-align: center;
        width: 33.3%;
        float: left;
        border-right: 1px solid #484a53;
        box-sizing: border-box;
    }

    .ind_profit li:nth-child(3) {
        border: none;
    }

    .ind_profit li p {
        color: #9fa7b3;
        font-size: 0.2rem;
        line-height: 0.43rem;
    }

    .ind_profit li h3 {
        color: #fff;
        font-size: 0.3rem;
        line-height: 0.45rem;
    }

    .ind_profit li h4 {
        color: #fff;
    }

    .ind_list {
        padding: 0.65rem 0.3rem;
    }

    .ind_list li {
        width: 20%;
        float: left;
        text-align: center;
    }

    .ind_list .icon {
        width: 0.55rem;
        height: 0.55rem;
        margin: 0 auto;
    }

    .ind_list .icon img {
        width: 100%;
        height: 100%;
    }

    .ind_list li p {
        font-size: 0.24rem;
        color: #9fa7b3;
        margin-top: 0.25rem;
    }

    .ind_list2 {
        padding: 0 0.35rem 0.55rem;
    }

    .ind_list2 li {
        width: 3.19rem;
        height: 1.65rem;
        position: relative;
        float: left;
        border-radius: 0.15rem;
        overflow: hidden;
        box-shadow: 0.04rem 0.04rem 0.04rem rgba(0, 0, 0, .2);
    }

    .ind_list2 li:nth-child(2) {
        float: right;
    }

    .ind_list2 li img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .ind_list2 li .word {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.25rem;
        top: 0;
        left: 0;
        color: #333;
    }

    .ind_list2 li .word h3 {
        font-size: 0.26rem;
        padding-top: 0.2rem;
    }

    .ind_list2 li .word p {
        font-size: 0.2rem;
        margin-top: 0.1rem;
        height: 0.4rem;
    }

    .ind_list2 li .word span {
        font-size: 0.17rem;
        padding: 0 0.08rem;
        height: 0.32rem;
        line-height: 0.32rem;
        display: inline-block;
        color: #fff;
        background: #36373f;
        border-radius: 0.04rem;
    }

    .ind_tit {
        font-size: 0.3rem;
        color: #fff;
        padding: 0 0.35rem;
    }

    /*我的*/
    .my_info {
        padding: 0.3rem 0.35rem;
    }

    .my_info .tx {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 0.96rem;
        overflow: hidden;
        float: left;
    }

    .my_info .tx img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .my_info .name {
        line-height: 0.96rem;
        float: left;
        margin-left: 0.4rem;
        font-size: 0.3rem;
        color: #fff;
    }

    .my_info .btn {
        width: 1.4rem;
        height: 0.45rem;
        margin-top: 0.25rem;
        box-sizing: border-box;
        line-height: 0.45rem;
        text-align: center;
        border: 1px solid #b7967f;
        background: #36373f;
        color: #fff;
        display: inline-block;
        float: right;
        font-size: 0.22rem;
        color: #eec67f;
        border-radius: 0.06rem;
        box-shadow: 0.04rem 0.04rem 0.04rem rgba(0, 0, 0, .2);
    }

    .my_assets {
        padding: 0.1rem 0.35rem;
    }

    .my_assets li {
        float: left;
        width: 3.2rem;
        height: 1.2rem;
        border-radius: 0.1rem;
        box-shadow: 0rem 0.04rem 0.04rem rgba(0, 0, 0, .2);
        border: 1px solid #b7967f;
        text-align: center;
    }

    .my_assets li:nth-child(2) {
        float: right;
    }

    .my_assets li h3 {
        padding-top: 0.15rem;
        color: #fff;
        font-size: 0.34rem;
    }

    .my_assets li p {
        font-size: 0.22rem;
        color: #9fa7b3;
        margin-top: 0.1rem;
    }

    .my_list {
        padding: 0.1rem;
    }

    .my_list li {
        width: 1.9rem;
        height: 1.9rem;
        margin: 0 0.26rem;
        float: left;
        background: #3d3e46;
        border-radius: 0.1rem;
        overflow: hidden;
        text-align: center;
        box-shadow: 0 0.05rem 0.05rem rgba(0, 0, 0, .5);
        margin-bottom: 0.4rem;
    }

    .my_list .icon {
        width: 0.85rem;
        height: 0.85rem;
        margin: 0.3rem auto 0.2rem;
    }

    .my_list .icon img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .my_list li p {
        font-size: 0.26rem;
        color: #fff;
    }

    .alert_flog {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        background: rgba(0, 0, 0, 0.3);
        display: none;
    }

    .alert_tips {
        display: none;
        position: fixed;
        width: 5.76rem;
        height: 2.38rem;
        left: 50%;
        top: 50%;
        z-index: 11;
        margin-top: -1.19rem;
        margin-left: -2.88rem;
        background: #40414a;
        border-radius: 0.1rem;
        overflow: hidden;
        text-align: center;
    }

    .alert_tips .text {
        padding: 0.45rem 0.2rem;
        color: #fff;
        font-size: 0.34rem;
    }

    .alert_tips .bt {
        border-top: 1px solid #33333c;
    }

    .alert_tips .bt .btn {
        width: 50%;
        height: 1rem;
        line-height: 1rem;
        box-sizing: border-box;
        font-size: 0.28rem;
        color: #9fa7b3;
        border-right: 1px solid #33333c;
        float: left;
        background: none;
    }

    .alert_tips .bt button.btn {
        border: none;
        color: #fff;
    }
</style>
