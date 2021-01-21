<template>
    <div :style="{width: '100%', height: '100pv'}">
        <div id="eheader">
            <h2>{{ header }}</h2>
            <p>{{ headerDesc }}</p>
            <span :class="color" style="font-size: 25px;font-weight: 700;">{{price}}</span>
        </div>
        <div id="echarts" :style="{width: '100%', height: '130px'}"></div>
    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'zrender/lib/svg/svg'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/candlestick'

export default {
    name: 'hello',
    props: [
        'header', 'headerDesc', 'data', 'price'
    ],
    watch: {
        price: function (newVal, oldVal) {
            if (newVal < oldVal) {
                this.color = 'price_red'
            } else if (newVal > oldVal) {
                this.color = 'price_green'
            } else {
                this.color = 'price_white'
            }
        },
        data: function (newVal, oldVal) { // data 数据发生变化
            this.randerChart(newVal)
        }
    },
    data () {
        return {
            chart: null,
            color: 'price_red',
            option: {
                grid: {
                    top: 10,
                    bottom: 20,
                    left: 10,
                    right: 10
                },
                xAxis: {
                    data: undefined,
                    scale: true,
                    axisLabel: {
                        color: '#A0A0A0',
                        fontSize: 10
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#A0A0A0'
                        }
                    }
                },
                yAxis: {
                    show: false,
                    scale: true,
                    position: 'right',
                    axisLabel: {
                        color: '#A0A0A0',
                        fontSize: 10,
                        inside: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#A0A0A0'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#EEEEEE'
                        }
                    }
                },
                series: undefined
            },
            lineSeries: [ // 面积图 图表设置
                {
                    type: 'line',
                    data: null,
                    smooth: true,
                    itemStyle: {
                        color: '#354162',
                        opacity: 0.1
                    },
                    lineStyle: {
                        width: 1,
                        color: '#354162'
                    },
                    areaStyle: {
                        color: 'rgb(241,156,56)'
                    }
                }
            ]
        }
    },

    mounted () {
        this.initChart()
    },
    beforeDestroy () {
        if (!this.chart) { return }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart () {
            this.chart = echarts.init(document.getElementById('echarts'), 'light', {renderer: 'svg'})
            this.randerChart(this.data)
        },
        sliceLineData (data) {
            let categoryData = []
            let values = []
            for (let i = 0; i < data.length; i++) {
                categoryData.push(data[i].slice(0, 1)[0])
                values.push(data[i].slice(1, 2)[0])
            }
            return {
                categoryData: categoryData,
                values: values
            }
        },
        randerChart (data) {
            let lineData = this.sliceLineData(data)
            this.lineSeries[0].data = lineData.values
            this.option.xAxis.data = lineData.categoryData
            this.option.series = this.lineSeries
            this.chart.setOption(this.option)
        }
    }
}
</script>

<style scoped lang="less">
    #eheader{
        padding: 1em;
        p{color: #999;}
    }
    .price_red{color: #FF3B44;}
    .price_green{color: #379B2D;}
    .price_white{color: #F5F5F5;}
</style>
