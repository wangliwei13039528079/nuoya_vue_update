<template>
    <div class="container">
        <header class="header">
            <section class="ng-binding rise data-price">{{ parseFloat(topdata.now).toFixed(3) }}</section>
            <section>
                <p class="kaipan">开盘</p>
                <p class="ng-binding rise data-open">{{parseFloat(topdata.sell).toFixed(3)}}</p>
            </section>
            <section>
                <p class="zuidi">最低</p>
                <p class="ng-binding rise data-low">{{parseFloat(topdata.lowest).toFixed(3)}}</p>
            </section>
            <section>
                <p class="zuigao">最高</p>
                <p class="ng-binding rise data-high">{{parseFloat(topdata.highest).toFixed(3)}}</p>
            </section>
        </header>
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
        <div class="conPays">
            <span @click="goBili(0)">买入</span>
            <span @click="goBili(1)">卖出</span>
        </div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            dayCont: '1min',
            kdata: '',
            data0: '',
            topdata: '',
            options: {},
            macd: ''
        }
    },

    mounted () {
        this.getKdata()
    },

    methods: {

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
                    scale: true,
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

    }

}
</script>

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
