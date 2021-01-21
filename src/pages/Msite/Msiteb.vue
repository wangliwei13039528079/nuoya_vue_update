<template>
    <div id="MsiteIndex">
        <header>{{ $t('home') }}</header>
        <div class="header_zw"></div>

        <div class="ind_profit">

            <div class="top_rvc clearfix">
                <div class="rvc">
                    <p>累计收益（EOT)</p>
                    <h3>{{ ljsy }}</h3>
                </div>
                <!-- <div class="signin" v-if="!qfdays">
                    <p><span> {{ $t('SignInno') }}  </span></p>

                </div> -->
                <!-- <div class="signin" v-if="qfdays">
                    <p><span> {{ $t('SignInok') }}  </span></p>

                </div> -->
                <div class="yest_rvc">
                    <p>昨日收益:</p>
                    <h3>{{ zrsy }}</h3>


                </div>

            </div>

            <ul class="clearfix">
                <li>
                    <p>账号余额(EOT)</p>
                    <h4>{{ eot }}</h4>
                </li>

                <!-- <li>
                    <p>账号余额(CNY)</p>
                    <h4>{{ ausdt }}</h4>
                </li> -->

                <li>
                    <p>账号余额(USDT)</p>
                    <h4>{{ usdt }}</h4>
                </li>
            </ul>

        </div>

        <ul class="ind_list clearfix">
            <!-- <li>
                <a @click="selfSignIn">
                    <div class="icon"><img src="../../../static/image/ind_icon1.png"></div>
                    <p>{{ $t('SignIn') }}</p>
                </a>
            </li> -->

            <li>
                <a @click="goTo('BiBiC?type=usdt')">
                    <div class="icon"><img src="../../../static/image/ind_icon2.png"></div>
                    <p> {{ $t('recharge') }} USDT</p>
                </a>
            </li>


            <li>
                <a @click="goTo('ArticleList?type_id=3')">
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
                <a @click="goTo('BiBizzz?type=7&name=usdt')">
                    <img src="../../../static/image/ind_pic1.png">
                    <div class="word">
                        <h3>合作社区</h3>
                        <p>HBTT WASD NUC Hong</p>
                        <span> 互转USDT</span>
                    </div>
                </a>
            </li>

            <li>
                <a @click="goTo('Share')">
                    <img src="../../../static/image/ind_pic2.png">
                    <div class="word">
                        <h3>推广好友加入</h3>
                        <p>EUR Player</p>
                    </div>
                </a>
            </li>
        </ul>

        <h3 class="ind_tit">
            EOT价格(USDT)<br/><br/>
            <input type="radio" name="ty" checked value="1" v-on:click="setDate('1M')"> 1M &nbsp;
            <input type="radio" name="ty" value="2" v-on:click="setDate('15M')"> 5M &nbsp;
            <input type="radio" name="ty" value="3" v-on:click="setDate('15M')"> 15M &nbsp;
            <input type="radio" name="ty" value="4" v-on:click="setDate('30M')"> 30M &nbsp;
            <input type="radio" name="ty" value="5" v-on:click="setDate('1H')"> 1H &nbsp;
            <input type="radio" name="ty" value="6" v-on:click="setDate('1D')"> 1D
            <br/>
        </h3>

        <div id="myChart" ref='myChart' class="echart" style="width: 100%; height:4rem;"></div>
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
    import axios from 'axios'

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
        data() {
            return {
                lineList: [],
                dayList: [],
                ljsy: 0,
                zrsy: 0,
                rvc: 0,
                interval: "1min",
                qfdays: '',
                ausdt: 0,
                usdt: 0,
                eot: 0,
                resData: '',
                echartsOption: {
                    backgroundColor: 'black',
                    title: {
                        text: '',
                        left: 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                    },
                    grid: {
                        left: '15%',
                        right: '10%',
                        bottom: '20%'
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        scale: true,
                        boundaryGap: false,
                        axisTick: {show: false},
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        splitLine: {show: false},
                        min: 'dataMin',
                        max: 'dataMax'
                    },
                    yAxis: {
                        scale: true,
                        splitArea: {
                            show: false
                        },
                        boundaryGap: false,
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#ece4a7'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ece4a7'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            formatter: function (value, index) {
                                return value.toFixed(2)
                            }
                        },
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        },
                        {
                            show: false,
                            type: 'slider',
                            y: '90%',
                            start: 0,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'k',
                            data: [],
                            itemStyle: {
                                normal: {
                                    color: '#ec0000',
                                    color0: '#00da3c',
                                    borderColor: '#8A0000',
                                    borderColor0: '#008F28'
                                }
                            },
                            // markPoint: {
                            //     label: {
                            //         normal: {
                            //             formatter: function (param) {
                            //                 return param != null ? Math.round(param.value) : ''
                            //             }
                            //         }
                            //     },
                            //     data: [
                            //         {
                            //             name: 'highest value',
                            //             type: 'max',
                            //             valueDim: 'highest'
                            //         },
                            //         {
                            //             name: 'lowest value',
                            //             type: 'min',
                            //             valueDim: 'lowest'
                            //         },
                            //         {
                            //             name: 'average value on close',
                            //             type: 'average',
                            //             valueDim: 'close'
                            //         }
                            //     ],
                            //     tooltip: {
                            //         formatter: function (param) {
                            //             return param.name + '<br>' + (param.data.coord || '')
                            //         }
                            //     }
                            // },
                            // markLine: {
                            //     symbol: ['none', 'none'],
                            //     data: [
                            //         [
                            //             {
                            //                 name: 'from lowest to highest',
                            //                 type: 'min',
                            //                 valueDim: 'lowest',
                            //                 symbol: 'circle',
                            //                 symbolSize: 10,
                            //                 label: {
                            //                     normal: { show: false },
                            //                     emphasis: { show: false }
                            //                 }
                            //             },
                            //             {
                            //                 type: 'max',
                            //                 valueDim: 'highest',
                            //                 symbol: 'circle',
                            //                 symbolSize: 10,
                            //                 label: {
                            //                     normal: { show: false },
                            //                     emphasis: { show: false }
                            //                 }
                            //             }
                            //         ]
                            //     ]
                            // }
                        },
                        // {
                        //     name: 'MA5',
                        //     type: 'line',
                        //     data: [],
                        //     smooth: true,
                        //     lineStyle: {
                        //         normal: {opacity: 1}
                        //     },
                        //     animationDuration:0,
                        //     itemStyle:{
                        //         normal:{
                        //             opacity:0,
                        //
                        //         }
                        //     }
                        // },
                        // {
                        //     name: 'MA10',
                        //     type: 'line',
                        //     data: [],
                        //     smooth: true,
                        //     lineStyle: {
                        //         normal: {opacity: 1}
                        //     },
                        //     animationDuration:0,
                        //     itemStyle:{
                        //         normal:{
                        //             opacity:0
                        //         }
                        //     }
                        // },
                        // {
                        //     name: 'MA20',
                        //     type: 'line',
                        //     data: [],
                        //     smooth: true,
                        //     lineStyle: {
                        //         normal: {opacity: 1}
                        //     },
                        //     animationDuration:0,
                        //     itemStyle:{
                        //         normal:{
                        //             opacity:0
                        //         }
                        //     }
                        // },
                        // {
                        //     name: 'MA30',
                        //     type: 'line',
                        //     data: [],
                        //     smooth: true,
                        //     lineStyle: {
                        //         normal: {opacity: 1}
                        //     },
                        //     animationDuration:0,
                        //     itemStyle:{
                        //         normal:{
                        //             opacity:0
                        //         }
                        //     }
                        // },
                    ]
                }
            }
        },

        mounted() {
            // this.$nextTick(() => {
            //     this.getLineData()
            //     this.getHoneIndex()
            // })
            this.timer = setInterval(() => {
                // console.log(1)
                this.getKLine()
            }, 1000)

            this.myChart = echarts.init(document.getElementById('myChart'))
            this.myChart.setOption(this.echartsOption)
        },
        destroyed() {
            clearInterval(this.timer)
        },
        methods: {
            getKLine() {
                this.$api.getKline('/market/history/kline?size=100&symbol=ethusdt&period=' + this.interval).then(response => {
                    console.log(response)
                    let rawData = response.data.data
                    let categoryData = []
                    let values = []
                    for (var i = 0; i < rawData.length; i++) {
                        if (this.interval === "1day") {
                            let tmstr = rawData[i]["id"].toString()
                            if (tmstr.length === 10) {
                                tmstr = tmstr + "000"
                            }
                            let date = new Date(parseInt(tmstr));
                            let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                            let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

                            categoryData.push(MM+DD)
                        } else {
                            categoryData.push(this.getDateHM(rawData[i]["id"]))
                        }
                        let r = [rawData[i]["open"], rawData[i]["close"], rawData[i]["low"], rawData[i]["high"]]
                        values.push(r)
                    }
                    this.echartsOption.xAxis.data = categoryData
                    this.echartsOption.series[0].data = values
                    this.myChart.setOption(this.echartsOption)
                })

                // axios.get('https://preproduction.bipay.downloadapp.club/market/history/kline?size=100&symbol=ethusdt&period=' + this.interval)
                //     .then(function (response) {
                //
                // // let response = '{"ch":"market.ethusdt.kline.1min","status":"ok","ts":1605454129858,"data":[{"id":1605454080,"open":456.73,"close":456.78,"low":456.57,"high":456.79,"amount":73.0608,"vol":33367.558675,"count":75},{"id":1605454020,"open":456.71,"close":456.73,"low":456.69,"high":456.79,"amount":74.8573980641165,"vol":34191.15238602283,"count":73},{"id":1605453960,"open":456.72,"close":456.78,"low":456.58,"high":456.84,"amount":104.47209007082029,"vol":47716.70357145,"count":111},{"id":1605453900,"open":456.63,"close":456.73,"low":456.63,"high":456.83,"amount":96.17774064351339,"vol":43924.73370943,"count":102},{"id":1605453840,"open":456.87,"close":456.63,"low":456.54,"high":456.87,"amount":246.14402883391037,"vol":112405.65071902,"count":192},{"id":1605453780,"open":456.93,"close":456.94,"low":456.82,"high":457.08,"amount":314.3286650154225,"vol":143617.85203327,"count":128},{"id":1605453720,"open":457.13,"close":456.93,"low":456.85,"high":457.18,"amount":199.12004093330097,"vol":91000.679686,"count":199},{"id":1605453660,"open":457.39,"close":457.19,"low":457.19,"high":457.5,"amount":61.594118667073495,"vol":28170.31177866,"count":72},{"id":1605453600,"open":457.58,"close":457.4,"low":457.39,"high":457.58,"amount":15.101732644333811,"vol":6909.05361609,"count":47},{"id":1605453540,"open":457.66,"close":457.58,"low":457.58,"high":457.8,"amount":74.25824504852199,"vol":33986.718743,"count":67},{"id":1605453480,"open":457.67,"close":457.67,"low":457.59,"high":457.67,"amount":19.16940594751677,"vol":8772.874284,"count":52},{"id":1605453420,"open":457.73,"close":457.67,"low":457.67,"high":457.82,"amount":33.565739698492465,"vol":15363.57326,"count":78},{"id":1605453360,"open":457.87,"close":457.74,"low":457.55,"high":457.9,"amount":66.88887483852048,"vol":30615.60267963,"count":74},{"id":1605453300,"open":457.62,"close":457.83,"low":457.61,"high":457.83,"amount":20.314580357161585,"vol":9298.66040108,"count":55},{"id":1605453240,"open":457.42,"close":457.57,"low":457.42,"high":457.86,"amount":127.98297497688613,"vol":58570.522566,"count":110},{"id":1605453180,"open":457.42,"close":457.42,"low":457.41,"high":457.76,"amount":113.69952404045331,"vol":52027.65933524,"count":114},{"id":1605453120,"open":457.97,"close":457.42,"low":457.41,"high":457.98,"amount":270.1254,"vol":123666.640909,"count":109},{"id":1605453060,"open":457.89,"close":457.98,"low":457.88,"high":457.98,"amount":20.69206107690292,"vol":9475.311505,"count":40},{"id":1605453000,"open":457.98,"close":457.9,"low":457.73,"high":458.0,"amount":92.14,"vol":42189.780336,"count":89},{"id":1605452940,"open":457.61,"close":457.96,"low":457.51,"high":457.97,"amount":114.16170960340872,"vol":52251.08363,"count":125},{"id":1605452880,"open":457.63,"close":457.62,"low":457.56,"high":457.83,"amount":333.93274316122506,"vol":152832.926639,"count":216},{"id":1605452820,"open":457.74,"close":457.62,"low":457.59,"high":457.79,"amount":120.84316361908091,"vol":55305.731948,"count":115},{"id":1605452760,"open":457.55,"close":457.74,"low":457.55,"high":457.74,"amount":127.30810206244128,"vol":58263.211336,"count":119},{"id":1605452700,"open":457.58,"close":457.55,"low":457.55,"high":457.75,"amount":197.11040633533588,"vol":90208.47375,"count":126},{"id":1605452640,"open":457.77,"close":457.57,"low":457.45,"high":457.77,"amount":181.07039123985055,"vol":82854.01642183,"count":110},{"id":1605452580,"open":457.57,"close":457.78,"low":457.52,"high":457.78,"amount":165.67315900459664,"vol":75814.856829,"count":92},{"id":1605452520,"open":457.28,"close":457.57,"low":457.28,"high":457.73,"amount":221.4136639843512,"vol":101294.45094440317,"count":130},{"id":1605452460,"open":457.38,"close":457.24,"low":457.2,"high":457.41,"amount":66.70297504757497,"vol":30505.71453771,"count":104},{"id":1605452400,"open":457.48,"close":457.38,"low":457.19,"high":457.51,"amount":153.69510284695951,"vol":70301.819992,"count":136},{"id":1605452340,"open":457.57,"close":457.48,"low":457.48,"high":457.63,"amount":103.32665247333684,"vol":47275.2274197,"count":114},{"id":1605452280,"open":457.58,"close":457.58,"low":457.51,"high":457.82,"amount":173.7214,"vol":79518.639737,"count":96},{"id":1605452220,"open":457.58,"close":457.45,"low":457.43,"high":457.8,"amount":112.01960361435327,"vol":51262.14519650006,"count":106},{"id":1605452160,"open":457.49,"close":457.58,"low":457.32,"high":457.79,"amount":280.068,"vol":128152.854546,"count":163},{"id":1605452100,"open":457.23,"close":457.5,"low":457.04,"high":457.5,"amount":437.0905365162644,"vol":199908.740962,"count":217},{"id":1605452040,"open":457.53,"close":457.24,"low":457.07,"high":457.63,"amount":190.40439237628956,"vol":87067.644705,"count":171},{"id":1605451980,"open":457.53,"close":457.49,"low":457.38,"high":457.74,"amount":111.8736,"vol":51190.925801,"count":134},{"id":1605451920,"open":457.83,"close":457.49,"low":457.46,"high":457.83,"amount":46.58200352056471,"vol":21316.88392994,"count":86},{"id":1605451860,"open":457.29,"close":457.74,"low":457.25,"high":457.82,"amount":544.0175,"vol":248929.658501,"count":215},{"id":1605451800,"open":457.22,"close":457.33,"low":457.03,"high":457.78,"amount":260.8625058113075,"vol":119317.330674,"count":233},{"id":1605451740,"open":457.83,"close":457.24,"low":457.22,"high":457.83,"amount":148.9193875235055,"vol":68120.147769,"count":163},{"id":1605451680,"open":458.06,"close":457.84,"low":457.81,"high":458.09,"amount":67.1063,"vol":30730.914281,"count":84},{"id":1605451620,"open":458.26,"close":458.07,"low":458.06,"high":458.47,"amount":176.7540149230084,"vol":81000.51129468,"count":132},{"id":1605451560,"open":458.4,"close":458.15,"low":458.12,"high":458.85,"amount":118.9735436538627,"vol":54557.50166644,"count":118},{"id":1605451500,"open":458.4,"close":458.42,"low":458.37,"high":458.62,"amount":75.3989,"vol":34567.824423,"count":156},{"id":1605451440,"open":458.07,"close":458.39,"low":458.07,"high":458.4,"amount":40.15842661227363,"vol":18400.23810955,"count":74},{"id":1605451380,"open":458.02,"close":458.07,"low":458.0,"high":458.25,"amount":143.21157927653869,"vol":65614.07406398,"count":65},{"id":1605451320,"open":458.08,"close":458.01,"low":457.99,"high":458.25,"amount":46.448090884876535,"vol":21279.996746,"count":71},{"id":1605451260,"open":458.1,"close":458.11,"low":457.97,"high":458.39,"amount":83.12278370732734,"vol":38087.447749,"count":111},{"id":1605451200,"open":458.23,"close":458.09,"low":457.96,"high":458.25,"amount":104.47852428421788,"vol":47863.709272,"count":135},{"id":1605451140,"open":458.09,"close":458.28,"low":457.96,"high":458.4,"amount":81.6131828381181,"vol":37394.763886,"count":121},{"id":1605451080,"open":458.21,"close":458.09,"low":457.89,"high":458.21,"amount":169.56419280928944,"vol":77662.53866344,"count":101},{"id":1605451020,"open":458.21,"close":458.2,"low":458.04,"high":458.38,"amount":64.14355223085654,"vol":29390.438312,"count":86},{"id":1605450960,"open":458.03,"close":458.18,"low":458.02,"high":458.39,"amount":73.928,"vol":33871.636124,"count":99},{"id":1605450900,"open":458.17,"close":458.07,"low":458.07,"high":458.35,"amount":135.1894074528199,"vol":61949.320647,"count":90},{"id":1605450840,"open":458.2,"close":458.16,"low":458.16,"high":458.44,"amount":95.4786,"vol":43757.783877,"count":79},{"id":1605450780,"open":458.26,"close":458.21,"low":458.15,"high":458.44,"amount":308.6439451730043,"vol":141447.79898283439,"count":148},{"id":1605450720,"open":458.27,"close":458.27,"low":458.15,"high":458.34,"amount":80.37585014884975,"vol":36830.172248,"count":84},{"id":1605450660,"open":458.43,"close":458.28,"low":458.25,"high":458.51,"amount":274.08575413318505,"vol":125650.94634446438,"count":120},{"id":1605450600,"open":458.61,"close":458.38,"low":458.38,"high":458.79,"amount":235.3223746158094,"vol":107936.866874,"count":123},{"id":1605450540,"open":458.75,"close":458.62,"low":458.62,"high":458.76,"amount":36.157883673720804,"vol":16585.92392231,"count":41},{"id":1605450480,"open":458.8,"close":458.76,"low":458.56,"high":458.83,"amount":217.00794131971804,"vol":99550.457699,"count":130},{"id":1605450420,"open":458.75,"close":458.81,"low":458.73,"high":458.9,"amount":131.011557185794,"vol":60112.08241781,"count":89},{"id":1605450360,"open":458.9,"close":458.77,"low":458.66,"high":458.95,"amount":212.58071486149453,"vol":97530.3746732,"count":167},{"id":1605450300,"open":458.4,"close":458.9,"low":458.38,"high":459.17,"amount":782.7094844602274,"vol":359146.0861201,"count":395},{"id":1605450240,"open":458.98,"close":458.41,"low":458.27,"high":458.98,"amount":400.7629844213879,"vol":183787.742592,"count":313},{"id":1605450180,"open":459.33,"close":459.0,"low":459.0,"high":459.5,"amount":644.7571605053407,"vol":296136.46432212,"count":343},{"id":1605450120,"open":458.51,"close":459.35,"low":458.5,"high":459.48,"amount":600.2100930644915,"vol":275419.165813,"count":343},{"id":1605450060,"open":457.99,"close":458.58,"low":457.99,"high":458.7,"amount":707.1825995635761,"vol":324307.766,"count":276},{"id":1605450000,"open":457.38,"close":458.0,"low":457.38,"high":458.0,"amount":153.95786749421373,"vol":70471.762535,"count":131},{"id":1605449940,"open":457.45,"close":457.39,"low":457.27,"high":457.46,"amount":58.7344,"vol":26863.736295,"count":67},{"id":1605449880,"open":457.47,"close":457.46,"low":457.33,"high":457.56,"amount":51.7614336400341,"vol":23678.80432597,"count":77},{"id":1605449820,"open":457.25,"close":457.49,"low":457.25,"high":457.49,"amount":59.58460300857093,"vol":27252.069819,"count":86},{"id":1605449760,"open":457.34,"close":457.22,"low":457.15,"high":457.52,"amount":127.4893156726357,"vol":58305.38959485,"count":94},{"id":1605449700,"open":457.71,"close":457.34,"low":457.34,"high":457.77,"amount":219.50930608530666,"vol":100442.47867023,"count":126},{"id":1605449640,"open":457.51,"close":457.66,"low":457.49,"high":457.89,"amount":248.3098676636338,"vol":113654.85965187,"count":132},{"id":1605449580,"open":457.35,"close":457.49,"low":457.28,"high":457.69,"amount":159.48986982485295,"vol":72970.886869,"count":106},{"id":1605449520,"open":457.22,"close":457.36,"low":457.04,"high":457.36,"amount":45.650807487040396,"vol":20871.342972,"count":82},{"id":1605449460,"open":457.16,"close":457.17,"low":457.01,"high":457.35,"amount":64.84946900231816,"vol":29650.803783,"count":136},{"id":1605449400,"open":457.65,"close":457.18,"low":457.18,"high":457.65,"amount":101.18884550898204,"vol":46296.235448,"count":116},{"id":1605449340,"open":457.39,"close":457.65,"low":457.34,"high":457.7,"amount":167.57921331888468,"vol":76670.773812,"count":141},{"id":1605449280,"open":457.07,"close":457.39,"low":457.06,"high":457.48,"amount":380.49835807726413,"vol":173961.85934212,"count":196},{"id":1605449220,"open":457.05,"close":457.08,"low":456.95,"high":457.16,"amount":237.0354451456124,"vol":108337.93566501963,"count":177},{"id":1605449160,"open":457.12,"close":457.06,"low":456.79,"high":457.12,"amount":187.57258378270257,"vol":85712.98766642,"count":145},{"id":1605449100,"open":456.75,"close":457.11,"low":456.74,"high":457.11,"amount":185.3061,"vol":84666.529539,"count":155},{"id":1605449040,"open":457.38,"close":456.79,"low":456.79,"high":457.38,"amount":266.57140456124324,"vol":121859.04433401,"count":161},{"id":1605448980,"open":457.7,"close":457.38,"low":457.36,"high":457.78,"amount":174.3589466522395,"vol":79774.170401,"count":142},{"id":1605448920,"open":457.58,"close":457.7,"low":457.53,"high":457.78,"amount":188.64189969401582,"vol":86325.521985,"count":127},{"id":1605448860,"open":457.48,"close":457.53,"low":457.43,"high":457.7,"amount":164.8243149517793,"vol":75407.20039604,"count":110},{"id":1605448800,"open":457.92,"close":457.49,"low":457.35,"high":457.92,"amount":207.67161305083374,"vol":95021.001475,"count":165},{"id":1605448740,"open":458.02,"close":457.85,"low":457.8,"high":458.12,"amount":368.6240997816403,"vol":168796.072517,"count":101},{"id":1605448680,"open":458.11,"close":458.03,"low":457.93,"high":458.11,"amount":89.2988,"vol":40899.2843,"count":79},{"id":1605448620,"open":458.03,"close":458.11,"low":458.03,"high":458.39,"amount":319.5104025543483,"vol":146397.28388076,"count":162},{"id":1605448560,"open":457.79,"close":458.04,"low":457.63,"high":458.04,"amount":289.5803134072845,"vol":132563.996302,"count":150},{"id":1605448500,"open":457.83,"close":457.79,"low":457.29,"high":458.11,"amount":391.9012548022024,"vol":179364.13151831,"count":234},{"id":1605448440,"open":458.38,"close":457.84,"low":457.83,"high":458.38,"amount":363.2852759175415,"vol":166403.00581914,"count":198},{"id":1605448380,"open":458.47,"close":458.38,"low":458.22,"high":458.49,"amount":206.8936,"vol":94834.51848,"count":119},{"id":1605448320,"open":458.47,"close":458.48,"low":458.29,"high":458.48,"amount":279.1023633013894,"vol":127940.08685877,"count":159},{"id":1605448260,"open":458.49,"close":458.48,"low":458.3,"high":458.6,"amount":127.0685,"vol":58260.487649,"count":94},{"id":1605448200,"open":458.25,"close":458.49,"low":458.25,"high":458.69,"amount":404.46253870313114,"vol":185461.25142903,"count":204},{"id":1605448140,"open":458.4,"close":458.25,"low":458.22,"high":458.41,"amount":57.20348078194753,"vol":26215.42273489,"count":91}]}'
                // //         let data = JSON.parse(response)
                // //         let data = response
                // // console.log(data)
                //         let rawData = response.data
                //         let categoryData = []
                //         let values = []
                //         for (var i = 0; i < rawData.length; i++) {
                //             if (this.interval === "1day") {
                //                 let tmstr = rawData[i]["id"].toString()
                //                 if (tmstr.length === 10) {
                //                     tmstr = tmstr + "000"
                //                 }
                //                 let date = new Date(parseInt(tmstr));
                //                 let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                //                 let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
                //
                //                 categoryData.push(MM+DD)
                //             } else {
                //                 categoryData.push(this.getDateHM(rawData[i]["id"]))
                //             }
                //             let r = [rawData[i]["open"], rawData[i]["close"], rawData[i]["low"], rawData[i]["high"]]
                //             values.push(r)
                //         }
                //         this.echartsOption.xAxis.data = categoryData
                //         this.echartsOption.series[0].data = values
                //       this.myChart.setOption(this.echartsOption)
                //     })
                //     .catch(function (error) {
                //         console.log(error)
                //     })
            },
            setDate(Vtype) {
                console.log(Vtype)
                switch (Vtype) {
                    case "1M":
                        this.interval = "1min"
                        break
                    case "5M":
                        this.interval = "5min"
                        break
                    case "15M":
                        this.interval = "15min"
                        break
                    case "30M":
                        this.interval = "30min"
                        break
                    case "1H":
                        this.interval = "60min"
                        break
                    case "1D":
                        this.interval = "1day"
                        break
                }
            },
            add0(m) {
                return m < 10 ? '0' + m : m
            },
            getDateHM(tm) {
                let tmstr = tm.toString()
                if (tmstr.length === 10) {
                    tmstr = tmstr + "000"
                }
                let time = new Date(parseInt(tmstr))
                var h = time.getHours()
                var mm = time.getMinutes()
                return this.add0(h) + ':' + this.add0(mm)
                // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
                // NWh=new Date(parseInt(tm)).getHours(tm);
                // NWm=new Date(parseInt(tm)).getMinutes(tm);
                // console.log(NWh)
                // console.log(NWm)
                // if(NWh<10){
                //     NWh="0"+NWh;
                // }
                // if(NWm<10){
                //     NWm="0"+NWm;
                // }
                // var tt=NWh+":"+NWm
                // // console.log(tt)
                // return tt;
            },
            setEchartOption(val) {
                // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
                // this.resData = splitData(val)
                // this.resData = splitData([
                //     ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
                //     ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
                //     ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
                //     ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
                //     ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
                //     ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
                //     ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
                //     ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
                //     ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
                //     ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
                //     ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
                //     ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
                //     ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
                //     ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
                //     ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
                //     ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
                //     ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
                //     ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
                //     ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
                //     ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
                //     ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
                //     ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
                //     ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
                //     ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
                //     ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44],
                //     ['2013/3/7', 2340.44, 2324.29, 2304.27, 2352.02],
                //     ['2013/3/8', 2326.42, 2318.61, 2314.59, 2333.67],
                //     ['2013/3/11', 2314.68, 2310.59, 2296.58, 2320.96],
                //     ['2013/3/12', 2309.16, 2286.6, 2264.83, 2333.29],
                //     ['2013/3/13', 2282.17, 2263.97, 2253.25, 2286.33],
                //     ['2013/3/14', 2255.77, 2270.28, 2253.31, 2276.22],
                //     ['2013/3/15', 2269.31, 2278.4, 2250, 2312.08],
                //     ['2013/3/18', 2267.29, 2240.02, 2239.21, 2276.05],
                //     ['2013/3/19', 2244.26, 2257.43, 2232.02, 2261.31],
                //     ['2013/3/20', 2257.74, 2317.37, 2257.42, 2317.86],
                //     ['2013/3/21', 2318.21, 2324.24, 2311.6, 2330.81],
                //     ['2013/3/22', 2321.4, 2328.28, 2314.97, 2332],
                //     ['2013/3/25', 2334.74, 2326.72, 2319.91, 2344.89],
                //     ['2013/3/26', 2318.58, 2297.67, 2281.12, 2319.99],
                //     ['2013/3/27', 2299.38, 2301.26, 2289, 2323.48],
                //     ['2013/3/28', 2273.55, 2236.3, 2232.91, 2273.55],
                //     ['2013/3/29', 2238.49, 2236.62, 2228.81, 2246.87],
                //     ['2013/4/1', 2229.46, 2234.4, 2227.31, 2243.95],
                //     ['2013/4/2', 2234.9, 2227.74, 2220.44, 2253.42],
                //     ['2013/4/3', 2232.69, 2225.29, 2217.25, 2241.34],
                //     ['2013/4/8', 2196.24, 2211.59, 2180.67, 2212.59],
                //     ['2013/4/9', 2215.47, 2225.77, 2215.47, 2234.73],
                //     ['2013/4/10', 2224.93, 2226.13, 2212.56, 2233.04],
                //     ['2013/4/11', 2236.98, 2219.55, 2217.26, 2242.48],
                //     ['2013/4/12', 2218.09, 2206.78, 2204.44, 2226.26],
                //     ['2013/4/15', 2199.91, 2181.94, 2177.39, 2204.99],
                //     ['2013/4/16', 2169.63, 2194.85, 2165.78, 2196.43],
                //     ['2013/4/17', 2195.03, 2193.8, 2178.47, 2197.51],
                //     ['2013/4/18', 2181.82, 2197.6, 2175.44, 2206.03],
                //     ['2013/4/19', 2201.12, 2244.64, 2200.58, 2250.11],
                //     ['2013/4/22', 2236.4, 2242.17, 2232.26, 2245.12],
                //     ['2013/4/23', 2242.62, 2184.54, 2182.81, 2242.62],
                //     ['2013/4/24', 2187.35, 2218.32, 2184.11, 2226.12],
                //     ['2013/4/25', 2213.19, 2199.31, 2191.85, 2224.63],
                //     ['2013/4/26', 2203.89, 2177.91, 2173.86, 2210.58],
                //     ['2013/5/2', 2170.78, 2174.12, 2161.14, 2179.65],
                //     ['2013/5/3', 2179.05, 2205.5, 2179.05, 2222.81],
                //     ['2013/5/6', 2212.5, 2231.17, 2212.5, 2236.07],
                //     ['2013/5/7', 2227.86, 2235.57, 2219.44, 2240.26],
                //     ['2013/5/8', 2242.39, 2246.3, 2235.42, 2255.21],
                //     ['2013/5/9', 2246.96, 2232.97, 2221.38, 2247.86],
                //     ['2013/5/10', 2228.82, 2246.83, 2225.81, 2247.67],
                //     ['2013/5/13', 2247.68, 2241.92, 2231.36, 2250.85],
                //     ['2013/5/14', 2238.9, 2217.01, 2205.87, 2239.93],
                //     ['2013/5/15', 2217.09, 2224.8, 2213.58, 2225.19],
                //     ['2013/5/16', 2221.34, 2251.81, 2210.77, 2252.87],
                //     ['2013/5/17', 2249.81, 2282.87, 2248.41, 2288.09],
                //     ['2013/5/20', 2286.33, 2299.99, 2281.9, 2309.39],
                //     ['2013/5/21', 2297.11, 2305.11, 2290.12, 2305.3],
                //     ['2013/5/22', 2303.75, 2302.4, 2292.43, 2314.18],
                //     ['2013/5/23', 2293.81, 2275.67, 2274.1, 2304.95],
                //     ['2013/5/24', 2281.45, 2288.53, 2270.25, 2292.59],
                //     ['2013/5/27', 2286.66, 2293.08, 2283.94, 2301.7],
                //     ['2013/5/28', 2293.4, 2321.32, 2281.47, 2322.1],
                //     ['2013/5/29', 2323.54, 2324.02, 2321.17, 2334.33],
                //     ['2013/5/30', 2316.25, 2317.75, 2310.49, 2325.72],
                //     ['2013/5/31', 2320.74, 2300.59, 2299.37, 2325.53],
                //     ['2013/6/3', 2300.21, 2299.25, 2294.11, 2313.43],
                //     ['2013/6/4', 2297.1, 2272.42, 2264.76, 2297.1],
                //     ['2013/6/5', 2270.71, 2270.93, 2260.87, 2276.86],
                //     ['2013/6/6', 2264.43, 2242.11, 2240.07, 2266.69],
                //     ['2013/6/7', 2242.26, 2210.9, 2205.07, 2250.63],
                //     ['2013/6/13', 2190.1, 2148.35, 2126.22, 2190.1]
                // ])
                this.echartsOption.xAxis.data = this.resData.categoryData
                this.echartsOption.series[0].data = this.resData.values
                // console.log(this.echartsOption.xAxis.data)
                // console.log(this.echartsOption.series[0].data)

                function splitData(rawData) {
                    var categoryData = []
                    var values = []
                    for (var i = 0; i < rawData.length; i++) {
                        categoryData.push(rawData[i].splice(0, 1)[0])
                        values.push(rawData[i])
                        // console.log(categoryData)
                        // console.log(values)
                    }
                    return {
                        categoryData: categoryData,
                        values: values
                    }
                }
            },
            getLineData() {
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

            getFloat(number, n) {
                n = n ? parseInt(n) : 0
                if (n <= 0) {
                    return Math.round(number)
                }
                number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n) //四舍五入
                number = Number(number).toFixed(n) //补足位数
                return number
            },

            getHoneIndex() {
                this.$api.homeIndex({}, res => {
                    if (res.status) {
                        this.ljsy = res.data.user.bonusall
                        this.zrsy = res.data.user.daybonus
                        this.qfdays = res.data.user.qfdays
                        res.data.coins.forEach(coin => {
                            if (coin.mid === 1) {
                                this.usdt = this.getFloat(coin.num, 4)
                            }
                            if (coin.mid === 8) {
                                this.eot = this.getFloat(coin.num, 4)
                            }
                            if (coin.mid === 7) {
                                this.ausdt = coin.num
                            }
                        })
                    }
                })
            },
            initChart() {
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
            selfSignIn() {
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
            goTo(path) {
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
        width: 50%;
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
