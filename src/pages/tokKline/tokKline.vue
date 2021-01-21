<template style="height: 100%">
  <div id="tokkline">
    <HeaderTop :title="name">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>

    <div class="content-wrapper">
      <div class="content">
      <div style="height: 400px;">
          <nav class="trade-nav">
              <div class="tags">
                  <span class="trade-chart-type Kxian active">K线</span>
                  <span class="trade-chart-type zoushi">走势</span>
              </div>
              <section class="trade-chart-period 1M" :class="{'active': dayCont == '1min'}" data-dayCont="1min" @click="handleDayCount">1M</section>
              <section class="trade-chart-period 5M" :class="{'active': dayCont == '5min'}" data-dayCont="5min" @click="handleDayCount">5M</section>
              <section class="trade-chart-period 15M" :class="{'active': dayCont == '15min'}" data-dayCont="15min" @click="handleDayCount">15M</section>
              <section class="trade-chart-period 30M" :class="{'active': dayCont == '30min'}" data-dayCont="30min" @click="handleDayCount">30M</section>
              <section class="trade-chart-period 1H" :class="{'active': dayCont == 'hour'}" data-dayCont="hour" @click="handleDayCount">1H</section>
              <section class="trade-chart-period 1D" :class="{'active': dayCont == 'day'}" data-dayCont="day" @click="handleDayCount">1D</section>
          </nav>
          <div class="echarts-box">
              <v-chart :options="options" />
          </div>
      </div>

        <van-tabs
          background="rgb(71,85,100)"
          title-active-color="rgb(46,57,76)"
          title-inactive-color="#fff"
          lazy-render
          swipeable
          v-model="activegg"
        >
          <van-tab title="交易">
            <div class="dialog-info" title="订单确认">
              <div class="choose">
                <div style="padding-top: 0.5rem">
                  <label class="lab">
                    <span style="margin:7px 5px 0 0; color:#fff" @click="reduce">-</span>
                    <input
                      type="number"
                      v-model="quantity"
                      placeholder="预测数量"
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                      @mousewheel.prevent
                      @blur="query()"
                      style="width: 80%; font-size:12px;"
                    />
                    <span style="margin:7px 0 0 5px; color:#fff" @click="append">+</span>
                  </label>
                  <ul class="ordernum">
                    <template v-for="(item,index) in numList">
                      <li
                        class="liMenu"
                        :class="index==idx ?'active':''"
                        @click="sendNum(item,index)"
                        :key="index"
                      >{{item}}</li>
                    </template>
                  </ul>
                </div>
                <div class="balance">可用余额：{{balance}}&nbsp;{{balanceCoin}} &nbsp;&nbsp; 手续费{{fee}}%</div>
                <div
                  class="timebtn"
                  style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: space-between;"
                >
                  <div v-for="(time,index) in selectTime" :key="index">
                    <button
                      v-model="nowTime"
                      @click="pushNowtime(time,index)"
                      :class="index == i ?'active':''"
                    >{{time}}</button>
                  </div>
                </div>
              </div>
              <div style="text-align: center;" class="money">预期收益：{{expect}}</div>

              <div class="btn-group">
                <button :disabled="disabled" @click="forecastRise">预测涨</button>
                <button
                  :disabled="disabled"
                  style="background-color:#F5A623;"
                  @click="forecastFall"
                >预测跌</button>
              </div>
            </div>
          </van-tab>
          <van-tab title="预测明细">
            <!-- <cube-tab-panels>
            <cube-tab-panel>-->
            <p v-show="false">{{auxiliary}}</p>
            <!-- 辅助作用 -->
            <div class="bibi-item" v-for="(item,index) in oneorder" :key="index" v-show="flag">
              <div>
                <p>
                  <span style="font-weight: bold;margin-right:5px">{{item.Ptitle}}</span>
                  <template>
                    <span
                      style="font-weight:400; font-size:12px;color:red"
                    >{{item.Wish == '0'?'预测涨':'预测跌'}}</span>
                  </template>
                </p>
                <p v-for="(it,ind) in bibiList" v-show="it.Pid == item.Pid" :key="ind">
                  <span>{{buyPrice(item.Buyprice)}}</span>-
                  <span>{{sellPrice(bibiList[0].RMBPrice)}}</span>
                </p>
                <p>
                  <span style="color:#c1c1c1">{{getTimes(item.Selltime)}}</span>
                </p>
              </div>

              <div class="fuduo" v-if="item.Wish == 0">
                {{Number(price_current)-Number(item.Buyprice)>0?`+${item.Amount * item.WinRatio/100 + item.Amount}`:`-${item.Amount}`}}
                <!-- <div>{{Djs_timeList(item.Selltime,item.Buytime)}}</div> -->
                <div style="color:#f00"><van-count-down
  :time="item.Selltime*1000-nowshishitime*1000"
  format="mm 分 ss 秒"
  @finish="finished"
/></div>
              </div>

              <div class="fuduo" v-else>
                {{Number(price_current)-Number(item.Buyprice) < 0 ?`+${item.Amount * item.WinRatio/100 + item.Amount}`:`-${item.Amount}`}}
                <!-- <div style="padding-top: 1rem">{{Djs_timeList(item.Selltime,item.Buytime)}}</div> -->
                <div style="color:#f00"><van-count-down
  :time="item.Selltime*1000-nowshishitime*1000"
  format="mm 分 ss 秒"
  @finish="finished"
/></div>
              </div>
            </div>
          </van-tab>
          <van-tab title="预测历史">
            <!-- <cube-tab-panels> -->
            <div v-model="Allorder" class="history">
              <div class="bibi-item" v-for="(item,index) in Allorder" :key="index">
                <div>
                  <p>
                    <span style="font-weight: bold;margin-right:5px">{{item.Ptitle}}</span>
                    <template>
                      <span
                        style="font-weight:400; font-size:12px;color:red"
                      >{{item.Wish == '0'?'预测涨':'预测跌'}}</span>
                    </template>
                    <!--<span style="font-weight:400; font-size:12px;color:red">-->
                    <!--{{(item.Buyprice)}}-->
                    <!--</span>-->
                  </p>
                  <p>
                    <span>{{buyPrice(item.Buyprice)}}</span>-
                    <span>{{sellPrice(item.Sellprice)}}</span>
                  </p>
                  <p>
                    <span style="color:#c1c1c1">{{item.Selltime}}</span>
                  </p>
                </div>

                <div class="profit" v-if="item.Result == 0">交割中</div>
                <!--<div class="profit" v-else>-->
                <!--{{item.Result == 1 ? `+${item.Profit+item.Amount}` : '+' + getProfit(item.Profit)}}-->
                <!--<div style="font-size: 0.8rem;text-align: right;margin-top: 17%">-->
                <!--订单号:{{item.OrderNumber}}-->
                <!--</div>-->
                <!--</div>-->
                <div class="profit" v-else>
                  <p
                    :class="item.Profit > 0 ? 'rise' : 'fall'"
                  >{{item.Result == 1 ? `${item.Profit+item.Amount}` : getProfit(item.Profit)}}</p>
                  <div style="text-align: left">订单号:{{item.OrderNumber}}</div>
                </div>
              </div>
            </div>
            <!-- </cube-tab-panels> -->
          </van-tab>
          <van-tab title="已交割" class="pro">
            <div class="delivery">
              <div class="deliveryTop">
                <p>时间</p>
                <p>下单金额</p>
                <p>已交割金额</p>
                <p>状态</p>
              </div>
              <div class="deliveryMain" v-for="item in deliverys">
                <p>{{deliveryTime(item.CreateAt)}}</p>
                <p>{{item.Predict}}</p>
                <p>{{item.Delivery}}</p>
                <p>{{item.Comment}}</p>
              </div>
            </div>
          </van-tab>
          <!-- <van-tab title="未交割" class="pro">
            <div></div>
          </van-tab> -->
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VCharts from 'v-charts'
// 导入组件
import { Popup, Tab, Tabs, Progress } from 'vant'
// 引入头部
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
// 请求api
import {
    reqBiBiKline,
    reqAllorder,
    reqCoinprice,
    reqOrdernum,
    reqOrderconfig,
    reqPresentorder,
    // req2Coinlist,
    reqyetDelivery,
    reqBiBiCategory,
    // reqUnfreeze
    reqCoincoinName
} from '../../common/apigo'

// Toast组件
import { Toast } from 'vant'

import { Stepper } from 'vant'

import { Dialog } from 'vant'

import { PasswordInput, NumberKeyboard } from 'vant'
//    Vue.use(TabBar).use(TabPanels)

import echarts from 'echarts'
import { setInterval, clearInterval, setTimeout, clearTimeout } from 'timers'
import { CountDown } from 'vant'

// import {TabBar, TabPanels} from 'cube-ui'

Vue.use(VCharts)

Vue.use(Popup)
    .use(Tab)
    .use(Tabs)

Vue.use(Toast)

Vue.use(Stepper)

Vue.use(Dialog)

Vue.use(PasswordInput)
    .use(NumberKeyboard)
    .use(Progress)
Vue.prototype.$echarts = echarts

Vue.use(CountDown)
export default {
    data () {
        this.chartSettings = {
            showMA: true,
            showVol: false
        }
        return {
            uid: '',
            pid: '',
            moneyname: '',
            forecastrise: 0,
            forecastfall: 1,
            quantity: '100',
            quantitynum: '',
            expect: 0,
            wish: '未选择',
            Wish: 3,
            last: '',
            selectTime: [],
            nowTime: '',
            ordernum: [],
            countdown: '',
            idx: null,
            Allorder: [],
            orderRecord: [],
            bibiList: [],
            activegg: 0,
            timer: null,
            cycle: 1, // 周期
            numList: [], // 购买数量列表
            timeList: ['1M', '5M', '15M', '30M', '1H', '1D'],
            numberList: ['1', '5', '15', '30', '60', '1440'],

            num: 100,
            show: false,
            state: 0,
            temp: 8,
            KlineData: [],
            chartData: {
                columns: ['times', 'open', 'close', 'lowest', 'highest', 'vol'],
                rows: []
            },
            show_jiaoyi: false,
            mid: 3, // 不完善，目前固定传入3
            buy_num: 100,
            sell_num: 100,
            trade_price_buy: 0,
            trade_price_sell: 0,
            dataArr: [],
            hightprice: 0, // 最高价
            loprice: 0, // 最低价
            oldprice_current: 0,
            Buytime: 0,
            lowest: 0, // 最高价
            highest: 0, // 最低价
            kaipan: 0, // 开盘价
            showKeyboard: false,
            type: 1,
            value: '',
            name: '',
            goldname: '',
            getklinetime: '1',
            ordernumber: '',
            oneorder: [],
            timIng: '',
            timeStr: '',
            times: null,
            proscale: '',
            flag: true,
            percentage: 100,
            data1: [],
            date1: [],
            flags: 0,
            balance: '',
            time: 0,
            volumes: '',
            i: null,
            buyprice: '',
            market: '',
            arr: [],
            ttt: 'hh:mm',
            price: '',
            deliverys: [],
            auxiliary: '',
            aaa: '',
            timeout: null,
            dayHight: '',
            dayLow: '',
            stopbusiness: true,
            timeIng: null,
            // 下单时间
            placetime: [],
            // 下单比例
            placeproportion: [],
            placetime1: '',
            placetime2: '',
            placetime3: '',
            proportion1: '',
            proportion2: '',
            proportion3: '',
            max_num: 0,
            min_num: 0,
            disabled: false,
            nowshishitime: 0,
            balanceCoin: '',
            fee: '',
            price_current: 0,
            dayCont: '1min',
            kdata: '',
            data0: '',
            topdata: '',
            options: {},
            macd: ''
        }
    },
    created () {
        this.pid = this.$route.query.coin_item
        this.currentPrice()
        this.$api.userInfo({}, res => {
            if (res.status) {
                this.uid = res.data.id
                this.orderConfig()
                this.getAllorder()
                this.presentOrder()
            }
        })
    },
    mounted () {
        this.delivery()
        this.getKdata()
    },

    methods: {
    // Userinfo(){
    //     if (!JSON.parse(localStorage.getItem('user_token'))){
    //         Dialog.alert({
    //             title: '提示',
    //             message: '请您先登录'
    //         }).then(() => {
    //             // on close
    //             this.$router.replace("/login")
    //         });
    //     }
    // },
    // 路由跳转方法
        goTo (path) {
            this.$router.push({
                path: path,
                query: { type: this.$route.params.type }
            })
        },

        add () {
            this.temp++
            // this.chartData.rows.push({``日期': '1/7', '访问用户': 8798, '下单用户': 777, '下单率': 0.33})
        },

        userOnline () {
            this.$api.userInfo({}, res => {
                // console.log(res)
                if (res.status) {
                    this.uid = res.data.id
                }
                // console.log(this.uid)
            })
            // console.log(res)
            this.orderConfig()
            // this.userInfo = useronline
            // this.uid = useronline.uid
        },
        async getKData () {
            let pid = this.pid
            let limit = '50'
            let interval = this.numberList[this.time]
            if (interval == 1440) {
                this.ttt = 'M-d'
            } else {
                this.ttt = 'hh:mm'
            }
            let myecharts = this.$echarts.init(document.getElementById('echarts'))
            const result = await reqBiBiKline({ pid, limit, interval })
            this.dayHight = result.high
            this.dayLow = result.low
            let str = result.kline[0].Moneytype
            this.moneyname = str
            let reg = /_QC/g
            this.name = str.replace(reg, '/USDT')
            // console.log(result.kline[result.kline.length - 1].Closing,506)
            this.price_current = result.kline[result.kline.length - 1].Closing
            function getDates (date) {
                let times = new Date(date)
                let Y = times.getFullYear()
                let M = (times.getMonth() + 1).toString().padStart(2, '0')
                let D = times
                    .getDate()
                    .toString()
                    .padStart(2, '0')
                let hh = times
                    .getHours()
                    .toString()
                    .padStart(2, '0')
                let mm = times
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')
                let ss = times
                    .getSeconds()
                    .toString()
                    .padStart(2, '0')
                return `${Y}-${M}-${D} ${hh}:${mm}:${ss}`
            }

            let date = []
            let dataArr = []
            let vol = []
            result.kline.forEach(item => {
                date.push(getDates(item.Receivetime))
                dataArr.push([item.Opening, item.Closing, item.Low, item.High])
                vol.push(item.Vol)
            })
            this.data1 = dataArr
            this.date1 = date
            this.volumes = vol
            this.get()
        },
        async currentPrice () {
            let coinname = 'USDT'
            const result = await reqBiBiCategory({ coinname })
            if (result.errcode) {
                this.bibiList = result.USDT
            }
        },
        getIndex (index) {
            this.time = index
        },
        get () {
            this.flags += 1
            if (this.flags == 1) {
                this.initEcharts()
            } else {

            }
        },
        // 初始化K线
        initEcharts () {
            // 初始化echarts
            let that = this
            let myecharts = this.$echarts.init(document.getElementById('echarts'))
            var colorList = [
                '#c23531',
                '#2f4554',
                '#61a0a8',
                '#d48265',
                '#91c7ae',
                '#749f83',
                '#ca8622',
                '#bda29a',
                '#6e7074',
                '#546570',
                '#c4ccd3'
            ]
            var labelFont = 'bold 12px Sans-serif'

            function calculateMA (dayCount, data) {
                var result = []
                for (var i = 0, len = data.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-')
                        continue
                    }
                    var sum = 0
                    for (var j = 0; j < dayCount; j++) {
                        sum += data[i - j][1]
                    }
                    result.push((sum / dayCount).toFixed(2))
                }
                return result
            }

            let option = {
                animation: false,
                color: colorList,
                // title: {//标题
                //     left: 'center',
                //     text: '移动端 K线图'
                // },
                legend: {
                    top: 0,
                    data: ['日'],
                    textStyle: {
                        color: 'wirte'
                    },
                    type: 'plain'
                },
                tooltip: {
                    triggerOn: 'none',
                    transitionDuration: 0,
                    confine: true,
                    bordeRadius: 4,
                    borderWidth: 1,
                    borderColor: '#333',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    textStyle: {
                        fontSize: 12,
                        color: '#333'
                    },
                    position: function (pos, params, el, elRect, size) {
                        var obj = {
                            top: 60
                        }
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                        return obj
                    }
                },
                axisPointer: {
                    link: [
                        {
                            xAxisIndex: [0, 1]
                        }
                    ]
                },
                dataZoom: [
                    // {//区域滑动
                    //     type: 'slider',
                    //     xAxisIndex: [0, 1],
                    //     realtime: false,
                    //     start: 0,
                    //     end: 70,
                    //     top: 65,
                    //     height: 20,
                    //     handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    //     handleSize: '120%'
                    // },
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        start: 100,
                        end: 70,
                        top: 0,
                        height: 20
                        // filterMode:'weakFilter'
                    }
                ],
                xAxis: [
                    {
                        // 图表显示日期
                        type: 'category',
                        data: this.date1,
                        boundaryGap: false,
                        // axisLine: { lineStyle: { color: '#777' } },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#5f5f5f'
                            }
                        },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        axisLabel: {
                            interval: 'auto',
                            formatter: function (value) {
                                return echarts.format.formatTime('hh:mm', value)
                            }
                        },
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            show: true
                        }
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: this.date1,
                        scale: true,
                        boundaryGap: false,
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        axisTick: { show: false },
                        axisLine: { lineStyle: { color: '#777' } },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            type: 'shadow',
                            label: { show: false },
                            triggerTooltip: true,
                            handle: {
                                show: false,
                                margin: 30,
                                color: '#B80C00'
                            }
                        }
                    }
                ],

                yAxis: [
                    {
                        type: 'value',
                        position: 'right',
                        scale: true,
                        splitNumber: 6,
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#5f5f5f'
                            }
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#5f5f5f'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            formatter: function (value, index) {
                                return value.toFixed(5)
                            }
                        },
                        max: 'dataMax',
                        min: 'dataMin'
                    },
                    {
                        gridIndex: 1,
                        show: false,
                        scale: true,
                        splitNumber: 3,
                        boundaryGap: false,
                        splitLine: { show: false }
                    }
                ],
                grid: [
                    {
                        left: 20,
                        right: 70,
                        top: 30,
                        height: 200
                    },
                    {
                        left: 20,
                        right: 70,
                        height: 40,
                        top: 260
                    }
                ],
                graphic: [
                    {
                        type: 'group',
                        left: 'center',
                        top: 40,
                        width: 300,
                        bounding: 'raw',
                        children: [
                            {
                                id: 'MA5',
                                type: 'text',
                                style: { fill: colorList[1], font: labelFont },
                                left: 0
                            },
                            {
                                id: 'MA10',
                                type: 'text',
                                style: { fill: colorList[2], font: labelFont },
                                left: 'center'
                            },
                            {
                                id: 'MA20',
                                type: 'text',
                                style: { fill: colorList[3], font: labelFont },
                                right: 0
                            }
                        ]
                    }
                ],
                series: [
                    {
                        // 数据渲染
                        name: 'Volume',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: params => {
                                    // 柱状图颜色与K线的颜色一致
                                    var colorList
                                    if (that.data1[params.dataIndex]) {
                                        // console.log(params.dataIndex)
                                        let d1 = that.data1[params.dataIndex]
                                        if (d1[1] > d1[0]) {
                                            colorList = '#C23531'
                                        } else {
                                            colorList = '#13E9EC'
                                        }
                                    } else {
                                    }
                                    return colorList
                                }
                            },
                            emphasis: {
                                color: '#140'
                            }
                        },
                        data: this.volumes
                    },

                    {
                        type: 'candlestick',
                        name: '日K',
                        data: this.data1,
                        markLine: {
                            // 图表标线 显示实时价格
                            data: [{ yAxis: this.price_current }],
                            symbol: '',
                            precision: 3,
                            lineStyle: {
                                normal: {
                                    color: '#c23531'
                                }
                            },
                            label: {
                                normal: {
                                    position: 'end',
                                    formatter: '{c}'
                                }
                            },
                            animationDuration: 0
                        },
                        itemStyle: {
                            normal: {
                                color: '#C23531', // 红色
                                color0: '#13E9EC', // 蓝色
                                borderColor: '#C23531',
                                borderColor0: '#13E9EC'
                            },
                            emphasis: {
                                color: 'black',
                                color0: '#444',
                                borderColor: 'black',
                                borderColor0: '#444'
                            }
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: calculateMA(5, this.data1),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: calculateMA(10, this.data1),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: calculateMA(20, this.data1),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        }
                    }
                ]
            }

            myecharts.setOption(option)
            setInterval(() => {
                if (this.ttt == 'M-d') {
                    myecharts.setOption({
                        xAxis: [
                            {
                                axisLabel: {
                                    interval: 'auto',
                                    formatter: function (value) {
                                        return echarts.format.formatTime('M-d', value)
                                    }
                                }
                            }
                        ]
                    })
                } else {
                    myecharts.setOption({
                        xAxis: [
                            {
                                axisLabel: {
                                    interval: 'auto',
                                    formatter: function (value) {
                                        return echarts.format.formatTime('hh:mm', value)
                                    }
                                }
                            }
                        ]
                    })
                }
                myecharts.setOption({
                    xAxis: [{ data: this.date1 }],

                    series: [
                        {
                            name: 'Volume',
                            data: this.volumes
                            //     itemStyle: {
                            //     normal: {
                            //         color: (params) => {
                            //         //柱状图颜色与K线的颜色一致
                            //         var colorList;
                            //         if (this.data1[params.dataIndex][1]>this.data1[params.dataIndex][0]) {
                            //             colorList = '#ef232a';
                            //         } else {
                            //             colorList = '#14b143';
                            //         }
                            //         return colorList;
                            //         },
                            //     },
                            //     emphasis: {
                            //         color: '#140'
                            //     }
                            // },
                        },
                        {
                            name: '日K',
                            data: this.data1,
                            markLine: {
                                data: [{ yAxis: this.price_current }]
                            }
                        },
                        {
                            name: 'MA5',
                            data: calculateMA(5, this.data1)
                        },
                        {
                            name: 'MA10',
                            data: calculateMA(10, this.data1)
                        },
                        {
                            name: 'MA20',
                            data: calculateMA(20, this.data1)
                        }
                    ]
                })
            }, 1000)
        },

        // 下单配置
        async orderConfig () {
            let pid = this.pid
            let uid = this.uid
            let result = await reqOrderconfig({ pid, uid })
            // console.log(result)
            this.balance = result.money

            this.balanceCoin = result.coin.toUpperCase()
            this.fee = result.fee
            if (result.errcode != 0) {
                Toast(result.msg)
            }

            this.numList = result.order_amount
            this.max_num = result.max_amount
            this.min_num = result.min_amount
            let arr1 = result.interval
            let arr2 = result.proscale
            let ggg = []
            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < arr2.length; j++) {
                    if (i == j) {
                        let arr3 = arr1[i] + 's' + '/' + arr2[j] + '%'
                        ggg.push(arr3)
                    }
                }
            }
            this.selectTime = ggg
            // console.log(this.placeproportion)
            // 预测时间
            this.placetime1 = result.interval[0]
            this.placetime2 = result.interval[1]
            this.placetime3 = result.interval[2]
            // 盈亏比例
            this.proportion1 = parseInt(result.proscale[0]) / 100
            this.proportion2 = parseInt(result.proscale[1]) / 100
            this.proportion3 = parseInt(result.proscale[2]) / 100
        },
        // 选择下单数量
        sendNum (item, index) {
            this.idx = index
            this.quantity = parseInt(item)
            if (this.nowTime == this.placetime1) {
                this.expect = this.quantity * this.proportion1 + this.quantity
            }
            if (this.nowTime == this.placetime2) {
                this.expect = this.quantity * this.proportion2 + this.quantity
            }
            if (this.nowTime == this.placetime3) {
                this.expect = this.quantity * this.proportion3 + this.quantity
            }
        },
        append () {
            this.quantity = Number(this.quantity) + this.min_num
            if (this.quantity > this.max_num) {
                Toast('下单金额超过最大限制')
                this.quantity = this.min_num
                return
            }
            if (this.nowTime == this.placetime1) {
                this.expect = this.quantity * this.proportion1 + this.quantity
            }
            if (this.nowTime == this.placetime2) {
                this.expect = this.quantity * this.proportion2 + this.quantity
            }
            if (this.nowTime == this.placetime3) {
                this.expect = this.quantity * this.proportion3 + this.quantity
            }
        },
        reduce () {
            if (this.quantity == this.min_num) {
                this.quantity = this.min_num
                return
            }
            this.quantity = Number(this.quantity) - this.min_num
            // console.log(this.quantity)
            if (this.nowTime == this.placetime1) {
                this.expect = this.quantity * this.proportion1 + this.quantity
            }
            if (this.nowTime == this.placetime2) {
                this.expect = this.quantity * this.proportion1 + this.quantity
            }
            if (this.nowTime == this.placetime3) {
                this.expect = this.quantity * this.proportion1 + this.quantity
            }
        },

        // 预测时间倒计时
        pushNowtime (time, index) {
            this.i = index
            if (!this.quantity) {
                this.quantity = 0
            }
            let num = parseInt(this.quantity)
            if (index == 0) {
                this.nowTime = this.placetime1
                this.proscale = this.proportion1
                this.expect = num * this.proportion1 + num
            } else if (index == 1) {
                this.nowTime = this.placetime2
                this.proscale = this.proportion2
                this.expect = num * this.proportion2 + num
            } else {
                this.nowTime = this.placetime3
                this.proscale = this.proportion3
                this.expect = num * this.proportion3 + num
            }
        },

        // 获取所有预测订单
        async getAllorder () {
            let uid = this.uid
            let result = await reqAllorder({ uid })
            this.Allorder = result.order

            let item
            for (item in result.order) {
                let times = new Date(result.order[item].Selltime * 1000)
                let Y, M, D, h, m, s
                Y = times.getFullYear()
                M = (times.getMonth() + 1 < 10
                    ? '0' + (times.getMonth() + 1)
                    : times.getMonth() + 1
                )
                    .toString()
                    .padStart(2, '0')
                D = times
                    .getDate()
                    .toString()
                    .padStart(2, '0')
                h = times
                    .getHours()
                    .toString()
                    .padStart(2, '0')
                m = times
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')
                s = times
                    .getSeconds()
                    .toString()
                    .padStart(2, '0')
                result.order[item].Selltime = `${Y}-${M}-${D} ${h}:${m}:${s}`

                let time = new Date(result.order[item].Buytime * 1000)
                Y = time.getFullYear()
                M = (time.getMonth() + 1 < 10
                    ? '0' + (time.getMonth() + 1)
                    : time.getMonth() + 1
                )
                    .toString()
                    .padStart(2, '0')
                D = time
                    .getDate()
                    .toString()
                    .padStart(2, '0')
                h = time
                    .getHours()
                    .toString()
                    .padStart(2, '0')
                m = time
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')
                s = time
                    .getSeconds()
                    .toString()
                    .padStart(2, '0')
                result.order[item].Buytime = `${Y}-${M}-${D} ${h}:${m}:${s}`

                if (result.order[item].Wish == 0) {
                    this.Wish = '预测涨'
                } else {
                    this.Wish = '预测跌'
                }
            }
        },
        sellPrice (data) {
            let price = parseFloat(data).toFixed(3)
            return price
        },
        buyPrice (data) {
            let price = parseFloat(data).toFixed(3)
            return price
        },
        // 盈亏
        getProfit (data) {
            let item = data
            if (item < 0) {
            }
            return item
        },

        // 预测涨下单
        async forecastRise () {
            let uid = this.uid
            let pid = this.pid
            let ptitle = this.name
            // console.log(ptitle)
            let amount = this.quantity
            let wish = this.forecastrise
            let interval = this.nowTime
            let buyprice = this.price_current
            let buytime = +new Date().getTime()
            let winratio = this.proscale * 100
            this.wish = '预测涨'
            if (amount > this.max_num) {
                return Toast('下单金额超过最大限制')
            }
            // console.log(this.stopbusiness)
            let result = await reqOrdernum({
                uid,
                pid,
                ptitle,
                amount,
                wish,
                interval,
                buyprice,
                buytime,
                winratio
            })

            let asset = result.orderNumber
            this.ordernumber = asset
            if (result.errcode == 0) {
                Toast(result.msg)
                this.activegg = 1
                this.presentOrder()
                this.getAllorder()
                // this.getBalance()
                this.orderConfig()
            } else {
                Toast(result.msg)
            }
        },

        // 预测跌下单
        async forecastFall () {
            let uid = this.uid
            let pid = this.pid
            let ptitle = this.name
            let amount = this.quantity
            let wish = this.forecastfall
            let interval = this.nowTime
            let buyprice = this.price_current
            // let buytime = +new Date().getTime()
            let winratio = this.proscale * 100
            this.wish = '预测跌'
            if (amount > this.max_num) {
                return Toast('下单金额超过最大限制')
            }
            // let result = await reqOrdernum({uid, pid, ptitle, amount, wish, interval, buyprice, buytime,winratio})
            let result = await reqOrdernum({
                uid,
                pid,
                ptitle,
                amount,
                wish,
                interval,
                buyprice,
                winratio
            })

            let asset = result.orderNumber
            this.ordernumber = asset
            if (result.errcode == 0) {
                Toast(result.msg)
                this.activegg = 1
                this.presentOrder()
                // this.getBalance()
                this.getAllorder()
                this.orderConfig()
            } else {
                Toast(result.msg)
            }
        },

        // 预测明细倒计时
        async presentOrder () {
            let uid = this.uid
            let result = await reqPresentorder({ uid })
            console.log(result)
            this.oneorder = result.order
            this.nowshishitime = result.time
            // this.Djs_time()    // 单个倒计时
            this.auxiliary_time() // 辅助列表倒计时
            this.timeout = setTimeout(this.Djs_timeList, 1000) // 倒计时列表，多个
            this.flag = true
        },
        auxiliary_time () {
            // 辅助倒计时的方法
            if (this.times) {
                clearInterval(this.times)
                this.times = null
            }
            this.times = setInterval(() => {
                let presentTime = new Date().getTime()
                this.auxiliary = presentTime
            }, 1000)
        },
        Djs_timeList (itemEnd, itemStart) {
            var endItem = itemEnd * 1000
            var nowItem = itemStart * 1000
            var rightTime = endItem - nowItem
            if (rightTime > 1000) {
                var mm = Math.floor((rightTime / 1000 / 60) % 60)
                var ss = Math.floor((rightTime / 1000) % 60)
                var showTime = mm + '分' + ss + '秒'
            } else if (rightTime < 1000 && rightTime > 0) {
                this.flag = false
                this.presentOrder()
                setTimeout(() => {
                    // this.getBalance()
                    this.getAllorder()
                    this.orderConfig()
                }, 2500)
            }
            return showTime
        },
        query () {
            if (this.quantity < this.min_num) {
                this.quantity = ''
                Toast('下单金额低于最小限制')
                return false
            }

            if (this.quantity % 100 != 0) {
                this.quantity = ''
                Toast('请输入100的倍数')
                return false
            }

            if (this.quantity > this.max_num) {
                this.quantity = ''
                Toast('下单金额超过最大限制')
                return false
            }

            // this.num < 500 ? this.num = 500 : this.num = this.num
            // this.trade_max = this.num
        },
        getState (status) {
            let state = ''
            switch (status) {
            case 0:
                state = '正在进行'
                break
            case 1:
                state = '预测完成'
                break

                return state
            }
        },
        getTimes (date) {
            let times = new Date(date * 1000)

            let Y = times.getFullYear()
            let M = (times.getMonth() + 1).toString().padStart(2, '0')

            let D = times
                .getDate()
                .toString()
                .padStart(2, '0')
            let hh = times
                .getHours()
                .toString()
                .padStart(2, '0')
            let mm = times
                .getMinutes()
                .toString()
                .padStart(2, '0')
            let ss = times
                .getSeconds()
                .toString()
                .padStart(2, '0')
            return `${Y}/${M}/${D} ${hh}:${mm}:${ss}`
        },
        onDelete () {
            this.value = this.value.slice(0, this.value.length - 1)
        },
        // 获取用户余额
        // async getBalance(){
        //     let uid = '548'
        //     const res = await req2Coinlist({uid})
        //     this.balance = res.data[1].total
        // },
        async delivery () {
            let limit = '50'
            let offset = '0'
            const result = await reqyetDelivery({ limit, offset })
            this.deliverys = result.logs
        },
        deliveryTime (time) {
            let times = new Date(time * 1000)

            let Y = times.getFullYear()
            let M = (times.getMonth() + 1).toString().padStart(2, '0')

            let D = times
                .getDate()
                .toString()
                .padStart(2, '0')
            let hh = times
                .getHours()
                .toString()
                .padStart(2, '0')
            let mm = times
                .getMinutes()
                .toString()
                .padStart(2, '0')
            let ss = times
                .getSeconds()
                .toString()
                .padStart(2, '0')
            return `${Y}/${M}/${D} ${hh}:${mm}:${ss}`.substr(10, 11)
        },
        finished () {
            this.flag = false
            this.presentOrder()
            this.activegg = 2
            setTimeout(() => {
                // this.getBalance()
                this.getAllorder()
                this.orderConfig()
            }, 1000)
        },
        handleDayCount (event) {
            this.dayCont = event.target.dataset.daycont

            this.getKdata(this.dayCont)
        },

        getKdata (dayCont = this.dayCont) {
            let data = {
                pid: 4,
                num: dayCont
            }
            this.$api.reqKdata(data, res => {
                this.kdata = res
                this.topdata = res.topdata
                this.setData0()
            })
        },

        getKdataItem (dayCont = this.dayCont) {
            let data = {
                'pid': 4,
                'num': dayCont,
                'rand': Math.random().toFixed(4) * 10000
            }

            console.log(data)

            this.$api.reqKdataItem(data, res => {
                let item = []
                this.data0.categoryData.push(getDateHM(res[0]))
                item = res.splice(1, 4)
                this.data0.values.push(item)
            })
        },

        setData0 () {
            this.data0 = this.splitData(this.kdata.items)
            this.setOptions()
        },

        setOptions () {
            let diff = this.build_diff_data(12, 26, this.kdata.items)
            let dea = this.build_dea_data(9, diff)
            let macd = this.build_macd_data(this.kdata.items, diff, dea)
            this.options = {
                grid: [{
                    left: 20,
                    right: 70,
                    top: '5%',
                    bottom: 180
                },
                {
                    left: 20,
                    right: 70,
                    bottom: '9%',
                    height: 60
                }
                ],
                xAxis: [{
                    type: 'category',
                    data: this.data0.categoryData,
                    scale: true,
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#5f5f5f'
                        }
                    },
                    min: 'dataMin',
                    max: 'dataMax'
                    // show:false
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    data: this.data0.categoryData,
                    scale: true,
                    boundaryGap: true,
                    // axisLine: {onZero: false},
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    min: 'dataMin',
                    max: 'dataMax',
                    show: false
                }

                ],
                yAxis: [{
                    type: 'value',
                    position: 'right',
                    scale: true,
                    splitNumber: 6,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#292929'
                        }
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#5f5f5f'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        formatter: function (value, index) {
                            return value.toFixed(5)
                        }
                    },
                    max: 'dataMax',
                    min: 'dataMin'

                },
                {
                    gridIndex: 1,
                    position: 'right',
                    scale: false,
                    splitNumber: 3,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        onZero: true,
                        lineStyle: {
                            color: '#5f5f5f'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        formatter: function (value, index) {
                            if (value > 0) {
                                return '+' + value.toFixed(5)
                            }
                            if (value < 0) {
                                return value.toFixed(5)
                            }
                            if (value == 0) {
                                return '-' + value.toFixed(5)
                            }
                        }
                    },
                    max: 'dataMax',
                    min: 'dataMin'
                }
                ],
                dataZoom: [{
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 0,
                    end: 100
                },
                {
                    show: false,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    top: '1%',
                    start: 0,
                    end: 50
                }
                ],
                series: [{
                    name: '日K',
                    type: 'candlestick',
                    data: this.data0.values,
                    markLine: {
                        data: [{
                            yAxis: this.kdata.topdata.now
                        }],
                        symbol: '',
                        lineStyle: {
                            normal: {
                                color: '#c23531'
                            }

                        },
                        label: {
                            normal: {
                                formatter: '{c}'
                            }
                        },
                        animationDuration: 0
                    },
                    itemStyle: {
                        normal: {
                            color: '#c23531',
                            color0: 'rgba(19,233,236,1)',
                            borderColor: '#c23531',
                            borderColor0: 'rgba(19,233,236,1)'
                        }
                    },
                    animationDuration: 0
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: this.calculateMA(5, this.data0),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 1
                        }
                    },
                    animationDuration: 0,
                    itemStyle: {
                        normal: {
                            opacity: 0

                        }
                    }
                },

                {
                    name: 'MA10',
                    type: 'line',
                    data: this.calculateMA(10, this.data0),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 1
                        }
                    },
                    animationDuration: 0,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        }
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: this.calculateMA(20, this.data0),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 1
                        }
                    },
                    animationDuration: 0,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        }
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: this.calculateMA(30, this.data0),
                    smooth: true,
                    lineStyle: {
                        normal: {
                            opacity: 1
                        }
                    },
                    animationDuration: 0,
                    itemStyle: {
                        normal: {
                            opacity: 0
                        }
                    }
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    name: 'MACD',
                    type: 'bar',
                    data: macd, //
                    smooth: true,
                    symbolSize: 1,
                    animationDuration: 0,
                    itemStyle: {
                        normal: {
                            color: 'rgba(31,198,98,1)'
                        }
                    }
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    name: 'diff', // 快
                    type: 'line',
                    data: diff,
                    smooth: true,
                    animationDuration: 0,
                    symbolSize: 1,
                    lineStyle: {
                        normal: {
                            color: '#0fa58c'
                        }
                    }
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    name: 'dea',
                    type: 'line',
                    data: dea, // 慢
                    smooth: true,
                    animationDuration: 0,
                    symbolSize: 1,
                    lineStyle: {
                        normal: {
                            color: '#f51630'
                        }
                    }
                }
                ]
            }

            this.getKdataItem()
        },

        splitData (rawData) {
            var categoryData = []
            var values = []
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(this.getDateHM(rawData[i][0]))
                values.push(rawData[i].splice(1, 4))
            }
            return {
                categoryData: categoryData,
                values: values
            }
        },

        getDateHM (tm) {
            let NWh = new Date(parseInt(tm) * 1000).getHours(tm)
            let NWm = new Date(parseInt(tm) * 1000).getMinutes(tm)
            if (NWh < 10) {
                NWh = '0' + NWh
            }
            if (NWm < 10) {
                NWm = '0' + NWm
            }
            var tt = NWh + ':' + NWm
            return tt
        },

        calculateMA (dayCount, data0) {
            var result = []
            for (var i = 0, len = data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-')
                    continue
                }
                var sum = 0
                for (var j = 0; j < dayCount; j++) {
                    sum += Number(data0.values[i - j][1])
                }
                result.push(sum / dayCount)
            }
            // alert(result)
            return result
        },

        build_diff_data (m_short, m_long, data) {
            var result = []
            var pre_emashort = 0
            var pre_emalong = 0
            for (var i = 0, len = data.length; i < len; i++) {
                var ema_short = data[i][1]
                var ema_long = data[i][1]

                if (i != 0) {
                    ema_short = (1.0 / m_short) * data[i][1] + (1 - 1.0 / m_short) * pre_emashort
                    ema_long = (1.0 / m_long) * data[i][1] + (1 - 1.0 / m_long) * pre_emalong
                }

                pre_emashort = ema_short
                pre_emalong = ema_long
                var diff = ema_short - ema_long

                result.push(diff)
            }

            return result
        },

        build_dea_data (m, diff) {
            var result = []
            var pre_ema_diff = 0
            for (var i = 0, len = diff.length; i < len; i++) {
                var ema_diff = diff[i]

                if (i != 0) {
                    ema_diff = (1.0 / m) * diff[i] + (1 - 1.0 / m) * pre_ema_diff
                }
                pre_ema_diff = ema_diff

                result.push(ema_diff)
            }

            return result
        },

        build_macd_data (data, diff, dea) {
            var result = []

            for (var i = 0, len = data.length; i < len; i++) {
                var macd = 2 * (diff[i] - dea[i])
                result.push(macd)
            }
            return result
        },
        goBili (index) {
            this.$router.push({
                path: '/BiLi',
                query: { coinPa: this.coinPa, active: index }
            })
        }
    },
    components: {
        HeaderTop
    },

    beforeDestroy () {
        clearInterval(this.timer)
        this.timer = null
        clearInterval(this.times)
        this.times = null
    },
    watch: {
        activegg (newVal, oldVal) {
            switch (newVal) {
            case 0:
                this.orderConfig()
                break

            case 1:
                this.presentOrder()
                break
            case 2:
                this.getAllorder()
                break
            case 3:
                this.delivery()
                break
            case 4:
                break
            }
        }
    }
}
</script>

<style scoped lang="less">
html {
  height: 100%;
}

.content-wrapper {
  /*position: fixed;*/
  /*top: 50px;*/
  /*bottom: 0;*/
  width: 100%;
  height: 100%;
  background-color: rgb(71, 85, 100);
  /*background-color: #152532;*/
}

#tokkline {
  height: 100%;
  // padding-bottom: 50px;
  // padding-top: 50px;
  .header {
    z-index: 9999;
  }
  .back {
            padding: 0 10px;
            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
  .ve-candle {
    background-color: #283142;
  }
  .header .right {
    position: absolute;
    right: 5px;
    line-height: 50px;
    // color: #000;
  }

  .info {
    width: 100%;
    display: flex;
    height: 40px;
    background-color: #37434f;
    color: #fff;
    position: fixed;
    z-index: 9999;
    .left {
      flex: 2;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;

      .price {
        font-size: 24px;
      }
      .up {
        color: red;
      }
      .down {
        color: green;
      }
    }

    .right {
      flex: 4;
      display: flex;
      flex-direction: column;

      .top {
        flex: 1;
        display: flex;
        align-items: center;
        // font-size: 0.8rem;

        .item {
          flex: 1;
          div {
            margin-bottom: 5px;
          }
        }
      }

      .bottom {
        flex: 1;
        display: flex;
        align-items: center;

        .item {
          flex: 1;
        }
      }
    }
  }

  .nav {
    padding: 5px;
    background-color: #37434f;
    display: flex;
    color: #fff;
    font-size: 12px;
    position: relative;
    top: 40px;
    .switch {
      border-radius: 40px;
      display: flex;
      flex: 1;
      position: relative;

      .switch-type-group {
        z-index: 999;
        width: auto;
        display: flex;
        background-color: #5b6c7d;
        border-radius: 40px;

        > button {
          height: 24px;
          border: none;
          padding: 0 5px;
          font-size: 14px;
          margin: 0;
          background-color: transparent;

          &.active {
            color: #fff;

            padding: 0 20px;
            background-color: #2e394c;
          }

          &:nth-child(1) {
            border-radius: 40px;
          }

          &:nth-child(2) {
            border-radius: 40px;
          }
        }
      }

      .switch-timer-group {
        margin-left: 10px;
        background-color: #475564;
        display: -webkit-flex;
        // display: flex;
        flex: 1;
        justify-content: space-around;
        // border: 40px;
        text-align: center;
        box-sizing: border-box;

        > button {
          border: none;
          text-align: center;
          justify-content: center;
          /*border-radius: 40px;*/
          flex: 1;
          // width: 16.5%;
          background-color: transparent;
          color: #fff;

          &.active {
            color: rgb(245, 166, 35);
            background-color: #2e394c;
          }
        }
      }
    }
  }

  .timebtn button {
    background-color: #2e394c;
    color: #fff;
    border: none;
  }

  .btn-group {
    width: 83%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    box-sizing: border-box;
    margin: 0 auto;
    justify-content: space-between;
    > button {
      width: 100%;
      color: #fff;
      height: 32px;
      border: none;
      background-color: #629ae9;
      border-radius: 25px;
      margin: 5px;
      font-size: 14px;
    }

    .content-box {
      width: 100%;
      display: flex;

      .num-box {
        margin-top: 10px;
      }

      .price {
        width: 50px;
        margin-top: 10px;
        border: 1px solid #ccc;
      }

      .left-box,
      .right-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        background-color: #37434f;
        border-left: 1px solid #f6f6f6;

        > h3 {
          margin-top: 15px;
          font-size: 24px;
        }

        > button {
          margin-top: 10px;
          height: 30px;
          width: 75px;
          background-color: #ee655f;
          color: #fff;
          border: none;
          margin-bottom: 10px;
        }
      }
    }
  }
  .order {
    margin-top: 20px;

    .title {
      padding: 15px 5px;
      color: #666;
      border-bottom: 1px solid #eee;
    }

    .cycle {
      background-color: #fff;

      .list {
        display: flex;
        justify-content: space-between;

        .item {
          flex: 1;
          padding: 20px 0px;
          text-align: center;
          border: 1px solid #fafafa;
          position: absolute;
          bottom: 0;

          > p {
            padding: 3px 0;

            &:nth-child(2) {
              font-size: 13px;
            }

            &:nth-child(3) {
              font-weight: bold;
              color: #ee655f;
            }
          }

          &:nth-child(2) {
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
          }

          &.active {
            background-color: #0baae4;
            color: #fff;
          }
        }
      }
    }

    .num {
      margin-top: 10px;
      background-color: #fff;

      .list {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 25%;
          padding: 10px 0px;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          box-sizing: border-box;
          text-align: center;

          &.active {
            color: #fff;
            background-color: #ee655f;
          }
        }
      }

      .other {
        margin-top: 10px;
      }
    }
  }
  .wrapper {
    // position: fixed;
    // top: 50px;
    // bottom: 68px;
    // height: 80px;
    // width: 100%;
  }
  .dialog-info {
    height: 100%;
    background-color: rgb(71, 85, 100);
    margin-bottom: 0;

    /*.title {*/
    /*display: flex;*/
    /*padding: 10px 0;*/
    /*border-bottom: 1px solid #ccc;*/

    /*> p {*/
    /*text-align: center;*/
    /*flex: 1;*/
    /*}*/
    /*}*/

    /*.item {*/
    /*display: flex;*/
    /*padding: 10px 0;*/

    /*> p {*/
    /*text-align: center;*/
    /*flex: 1;*/
    /*}*/
    /*}*/
    .Countdown ul li {
      display: inline-block;
      width: 20%;
      height: 85px;
      text-align: center;
      border-radius: 10px;
      border: solid 1px red;
    }

    .Countdown ul li p {
      font-size: 12px;
      color: #fff;
    }

    .Countdown ul li div {
      position: relative;
      top: 15px;
    }

    .Countdown ul li .time {
      font-size: 28px;
      font-weight: bold;
      color: #fdbe19;
    }

    .Countdown ul li div .second {
      font-size: 15px;
      color: #e1ab32;
    }

    .Countdown ul li .income {
      font-size: 14px;
      color: #fa2e42;
      position: relative;
      top: 28px;
    }

    .choose ul {
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      width: 83%;
      margin: 0 auto;
    }

    .choose ul li {
      /*display: inline-block;*/
      flex-direction: row;
      color: #fff;
      font-size: 12px;
      background-color: #2e394c;
      border: solid #38373e 1px;
      width: 39px;
      height: 23px;
      line-height: 23px;
      border-radius: 15px;
      text-align: center;
      &.active {
        color: red;
      }
    }
    .choose label {
      padding-bottom: 0.5rem;
      display: flex;
      justify-content: center;
    }
    .liMenu {
      cursor: pointer;
    }

    .title,
    .item {
      color: #fff;
    }
    .timebtn {
      margin: 10px auto;
      width: 83%;
      display: flex;
      button {
        padding: 8px;
        color: #fff;
        border-radius: 18px;
        font-size: 14px;
        border: 1px solid #595c6c;
        &.active {
          color: red;
        }
      }
    }
  }
  // .cube-tab-bar {
  //     padding: 5px 0px;
  //     font-weight: bold;
  //     background-color: #fff;

  //     &, .cube-tab_active {
  //         color: #37434f;
  //     }

  //     .cube-tab {
  //         div {
  //             font-weight: bold !important;
  //         }
  //     }
  // }

  .bibi-item {
    // margin: 5px;
    padding: 10px;
    padding-bottom: 0px;
    background-color: #475564;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    color: #fff;
    justify-content: space-between;
    border: none;

    > div {
      color: #fff;
      font-size: 14px;
      // flex: 1;
      margin-bottom: 10px;

      > p {
        flex-wrap: nowrap;
        padding: 5px 0;
      }
    }
    .con {
      width: 50%;
    }

    .fuduo {
      width: 52%;
      text-align: right;

      > span {
        width: 80px;
        height: 23px;
        line-height: 23px;
        padding: 5px 7px;
        border-radius: 5px;
        color: #fff;
        display: inline-block;
        background-color: #2db249;

        &.up {
          background-color: #fa5856;
        }
      }
    }
    .profit {
      // width: 52%;
      text-align: right;

      > span {
        width: 80px;
        height: 23px;
        line-height: 23px;
        padding: 5px 7px;
        border-radius: 5px;
        color: #fff;
        display: inline-block;
        background-color: #2db249;

        &.up {
          background-color: #fa5856;
        }
      }
    }
  }
  // .pro {
  //     background-color: #475564;
  //     height: 300px;
  // }

  .hide {
    position: absolute;
    right: 0;

    > a {
      display: block;
      padding: 20px;
      font-size: 16px;
    }
  }

  .pwd-keyboard {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);

    .van-password-input {
      margin-top: 30%;
    }
  }
  .lab {
    position: relative;
    span {
      position: absolute;
      top: 0;
      background-color: #3b485f;
      // padding: 0 10px;
      width: 30px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border-radius: 10px;
    }
    span:nth-of-type(1) {
      left: 12%;
    }
    span:nth-of-type(2) {
      right: 12%;
    }
  }
  .lab input {
    text-align: center;
    background-color: #2e394c;
    border-radius: 15px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #3e6ca4;
    color: #fff;
    padding: 0 35px;
    box-sizing: border-box;
  }
  .ordernum li {
    border-radius: 15px;
  }
  .money {
    width: 83%;
    padding: 8px 0;
    border-radius: 20px;
    background-color: #2e394c;
    margin: 3px auto;
    color: #fff;
    border: 1px solid #3e6ca4;
    font-size: 14px;
    font-weight: 400;
  }
  .balance {
    margin-left: 10%;
    margin-top: 10px;
    color: #fff;
    font-size: 12px;
  }
  .history {
    background: rgb(71, 85, 100);
    height: 280px;
    overflow: scroll;
  }
  .delivery {
    background: rgb(71, 85, 100);
    height: 280px;
    overflow: scroll;
    .deliveryTop {
      color: #fff;
      padding: 5px 0;
      // font-size: 0.5rem;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
    }
    .deliveryMain {
      // height: 100%;
      color: #fff;
      padding: 0.6rem 0;
      // font-size: 0.7rem;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
    }
  }
  .rise {
    /*border-radius: 15px;*/
    color: red;
  }
  .fall {
    /*border-radius: 15px;*/
    color: rgb(8, 186, 82);
  }
  /deep/ .van-count-down{
    color: #f00;
  }
}
</style>

<style scoped lang="scss">
    .header {
        height: 80px;
        width: 100%;
        display: flex;
        align-items: center;
        border-top: 1px solid black;
        background-color: #19191a;
    }

    .header section:nth-of-type(1) {
        padding: 0;
        flex-basis: 40%;
        font-size: 30px;
        text-align: center;
        font-weight: 800;
    }

    .header section {
        flex-basis: 20%;
        padding-top: 10px;
    }

    .header section p {
        margin: 0;
        font-size: 13px;
        width: 100%;
        text-align: left;
        color: #737373;
        padding-bottom: 5px;
    }

    .header section p:nth-of-type(2) {
        font-size: 18px;
        font-weight: 700;
    }

    .rise {
        color: #fa2e42 !important;
    }

    .trade-nav {
        height: 40px;
        background: #252529;
        display: flex;

        align-items: center;
        width: 100%;
        padding: 10px;
        position: fixed;
        top: 50px;
        z-index: 9999;
    }

    .trade-nav .tags {
        flex: 2;
        height: 33px;
        display: flex;
        border-radius: 10px;
        background: #17171a;
        color: white;
        padding: 0 3px;
        align-items: center;
    }

    .trade-nav .tags span {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        flex: 1;
        text-align: center;
        font-weight: 700;

        &.active {
            color: #fdbe19;
            background: #323237;
            border-radius: 5px;
            box-shadow: 0 0 2px #3e3c42;
        }

    }

    .trade-nav section {
        flex: 1;
        color: #737373;
        height: 39px;
        line-height: 39px;
        text-align: center;
        font-size: 14px;

        &.active {
            color: #fdbe19;
            border-bottom: 1px solid #fdbe19;
        }
    }

    .echarts {
        width: 100%;
        height: 500px;
    }

    .echarts-box {
        background-color: #19191a;
        height: 500px;

    }

    .conPays {
        height: 30px;
        display: flex;
        justify-content: space-around;
        margin: 10px 0;
        span {
            display: block;
            width: 150px;
            height: 40px;
            color: #fff;
            border-radius: 5px;
            text-align: center;
            line-height: 40px;
        }
        :nth-child(1) {
            background: #4cbe83;
        }
        :nth-child(2) {
            background: #cb572e;
        }
        position: relative;
        bottom: 100px;
    }
</style>
