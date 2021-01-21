<template>
    <div id="main">
        <div style="margin-top: 10px;">
            <a class="back" @click="$route.go(-1)" slot="left" style="margin-top: 20px;margin-left: 1em;">
                <i class="iconfont iconfanhui">&nbsp;</i>
                <span style="display: inline-block;width: 80%;text-align: center;">{{coinPa}} 市场</span>
            </a>
        </div>
        <div id='myChart'
             ref="myChart" :style="{width: '100%', height: '500px'}">
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'

const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
const labelFont = 'bold 12px Sans-serif'

export default {
    name: 'echarts',
    data () {
        return {
            dates: [],
            data: [],
            volumes: [],
            coinPa: this.$route.query.market,
            timer: null,
            type: this.$route.query.type ? this.$route.query.type : '1day'
        }
    },
    computed: {
        echartsOption () {
            return {
                animation: false,
                color: colorList,
                title: {
                    left: 'center',
                    text: ''
                },
                legend: {
                    top: 30,
                    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
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
                        let obj = {
                            top: 60
                        }
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
                        return obj
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 1]
                    }]
                },
                dataZoom: [{
                    type: 'slider',
                    xAxisIndex: [0, 1],
                    realtime: false,
                    start: 20,
                    end: 70,
                    top: 65,
                    height: 20,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '120%'
                }, {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 40,
                    end: 70,
                    top: 30,
                    height: 20
                }],
                xAxis: [{
                    type: 'category',
                    data: this.dates,
                    boundaryGap: false,
                    axisLine: { lineStyle: { color: '#777' } },
                    axisLabel: {
                        formatter: function (value) {
                            return echarts.format.formatTime('MM-dd hh:mm', value)
                        }
                    },
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        show: true
                    }
                }, {
                    type: 'category',
                    gridIndex: 1,
                    data: this.dates,
                    scale: true,
                    boundaryGap: false,
                    splitLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    axisLine: { lineStyle: { color: '#777' } },
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        type: 'shadow',
                        label: {show: false},
                        triggerTooltip: true,
                        handle: {
                            show: true,
                            margin: 30,
                            color: '#B80C00'
                        }
                    }
                }],
                yAxis: [{
                    scale: true,
                    splitNumber: 2,
                    axisLine: { lineStyle: { color: '#777' } },
                    splitLine: { show: true },
                    axisTick: { show: false },
                    axisLabel: {
                        inside: true,
                        formatter: '{value}\n'
                    }
                }, {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: {show: false},
                    axisLine: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false}
                }],
                grid: [{
                    left: 20,
                    right: 20,
                    top: 110,
                    height: 250
                }, {
                    left: 20,
                    right: 20,
                    height: 40,
                    top: 390
                }],
                graphic: [{
                    type: 'group',
                    left: 'center',
                    top: 70,
                    width: 300,
                    bounding: 'raw',
                    children: [{
                        id: 'MA5',
                        type: 'text',
                        style: {fill: colorList[1], font: labelFont},
                        left: 0
                    }, {
                        id: 'MA10',
                        type: 'text',
                        style: {fill: colorList[2], font: labelFont},
                        left: 'center'
                    }, {
                        id: 'MA20',
                        type: 'text',
                        style: {fill: colorList[3], font: labelFont},
                        right: 0
                    }]
                }],
                series: [{
                    name: 'Volume',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: '#7fbe9e'
                        },
                        emphasis: {
                            color: '#140'
                        }
                    },
                    data: this.volumes
                }, {
                    type: 'candlestick',
                    name: '日K',
                    data: this.data,
                    itemStyle: {
                        normal: {
                            color: '#ef232a',
                            color0: '#14b143',
                            borderColor: '#ef232a',
                            borderColor0: '#14b143'
                        },
                        emphasis: {
                            color: 'black',
                            color0: '#444',
                            borderColor: 'black',
                            borderColor0: '#444'
                        }
                    }
                }]
            }
        }
    },
    created () {
        // this.setEchartOption()
    },
    mounted () {
        this.myChart = echarts.init(document.getElementById('myChart'))
        this.setEchartOption()
    },
    methods: {
        setEchartOption () {
        // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
            this.$http.get(process.env.JAVA_API + '/api/kline/' + this.coinPa + '/' + this.type, []).then(function (response) {
                const rawData = response.data.data
                let categoryData = []
                let values = []
                let volums = []
                let copyData = JSON.parse(JSON.stringify(rawData))
                for (var i = 0; i < rawData.length; i++) {
                    categoryData.push(rawData[i].splice(0, 1)[0])
                    values.push(rawData[i])
                    volums.push(copyData[i].splice(5, 1)[0])
                }
                this.dates = categoryData
                this.data = values
                this.volumes = volums
                this.myChart.setOption(this.echartsOption)
            // 响应成功回调
            }, function (response) {
            // 响应错误回调
            })
            if (!this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(this.setEchartOption, 60000)
        },
        calculateMA (dayCount) {
            let result = []
            for (let i = 0, len = this.resData.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-')
                    continue
                }
                let sum = 0
                for (let j = 0; j < dayCount; j++) {
                    sum += this.resData.values[i - j][1]
                }
                result.push(sum / dayCount)
            }
            console.log(result)
            return result
        },
        goBack () {
            this.$router.replace('/Treaty')
        }
    }
}
</script>
<style scoped>
    #myChart{
        width: 70%;
        height: 500px;
        margin: 0 auto;
    }

</style>
