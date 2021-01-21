<template>
  <div id="Kline">
    <HeaderTop :title="coinPa">
      <a class="back" @click="$router.go(-1)" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>
    <div class="tab">
        <div :class="['list',{active:interval=='1'}]" @click="interval='1'">1min</div>
        <div :class="['list',{active:interval=='5'}]" @click="interval='5'">5min</div>
        <div :class="['list',{active:interval=='15'}]" @click="interval='15'">15min</div>
        <div :class="['list',{active:interval=='30'}]" @click="interval='30'">30min</div>
        <div :class="['list',{active:interval=='60'}]" @click="interval='60'">60min</div>
        <div :class="['list',{active:interval=='1440'}]" @click="interval='1440'">1day</div>
    </div>
    <div class="content">
      <!-- <div class="tradingview-widget-container" style="width:100%;height:400px;">
        <div id="tradingview_con" style="width:100%;height:200px;text-align:right"></div>
      </div> -->
      <!-- TradingView Widget END -->
        <div id='myChart'
             ref="myChart" :style="{width: '100%', height: '500px'}">
        </div>
        <div class="conPay">
            <span @click="goBili(0)">买入</span>
            <span @click="goBili(1)">卖出</span>
        </div>
    </div>
  </div>
</template>

<script>
//引入头部
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Vue from "vue";
import {ws} from '../../common/apigo.js'
const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
const labelFont = 'bold 12px Sans-serif'
import echarts from "echarts";
import { setTimeout, clearTimeout } from 'timers';
export default {
    components: {
        HeaderTop
    },

    data() {
        return {
        // title: "BTC/USDT",
            coinPa: this.$route.query.market,
            coinPaPic: null,
            dates: [],
            data: [],
            volumes: [],
            market: this.$route.query.market.split("/").join('_').toLowerCase(),
            timer: null,
            type: this.$route.query.type ? this.$route.query.type : '1day',
            flag: 0,
            socket:'',
            copyData:'',
            lockReconnect: false, //是否真正建立连接
            timeoutnum: null, //断开 重连倒计时
            interval:'1'
        };
    },
    computed: {
        echartsOption () {
            return {
                xAxis: [{
                    type: 'category',
                    data: this.dates,
                    
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    data: this.dates,
                }],
                series: [{
                    
                    data: this.volumes
                },
                 {
                    type: 'candlestick',
                    name: '日K',
                    data: this.data,
                }]
            }
        },
    },
    watch:{
        dates(newVal){
            if(this.flag == 1) {
                return
            }
            this.flag++
        },
        interval(newNal){
            if(this.socket) {
                this.socket.close()
            }
            this.init()
        }
    },

    mounted() {
        // this.coinPa = this.$route.query.coinPa.toUpperCase();
        this.coinPaPic = this.coinPa.split("/");
        let str = this.coinPaPic[0] + this.coinPaPic[1];
        this.myChart = echarts.init(document.getElementById('myChart'))
        // this.setEchartOption()
        this.init()

    },

    methods: {
        //路由跳转方法
        goBili(index) {
        this.$router.push({
            path: "/BiLi",
            query: { coinPa: this.coinPa, active: index }
        });
        },
        goBack() {
        this.$router.replace("/Treaty");
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
        // 链接webscoket
        init(){
            let path = ws+'/kline/kline'
            let protoaol = this.GLOBAL.getStorage("user_token");
            if (typeof WebSocket === "undefined") {
                alert("您的浏览器不支持socket");
            } else {
                // 实例化socket
                this.socket = new WebSocket(path,protoaol);
                // 监听socket连接
                this.socket.onopen = this.open;
                // 监听socket错误信息
                this.socket.onerror = this.error;
                // 监听socket消息
                this.socket.onmessage = this.getMessage;
            }
        },
        open(){
            // console.log('链接成功')
            this.send()
        },
        error(){
            // console.log('连接失败')
            this.reconnect()
        },
        calculateMA(dayCount, data) {
            var result = [];
            for (var i = 0, len = data.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += data[i - j][1];
                }
                result.push((sum / dayCount).toFixed(2));
            }
            return result;
        },
        getMessage(msg){
            let data = JSON.parse(msg.data).klines
            if(data) {
                this.copyData = data
            }
            let categoryData = []
            let values = []
            let volums = []
            this.copyData.forEach(item => {
                categoryData.push(this.GLOBAL.timeToDate(item.Time / 1000))
                values.push([item.Opening,item.Closing,item.Low,item.High])
                volums.push(item.Vol)
            })
            this.dates = categoryData
            this.data = values
            this.volumes = volums
            let option = {
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
                dataZoom: [
                    {
                    type: 'slider',
                    xAxisIndex: [0, 1],
                    realtime: false,
                    start: 50,
                    end: 100,
                    top: 65,
                    height: 20,
                    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '120%'
                },
                    {
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
                            show: false,
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
                            color: (params) => {
                                //柱状图颜色与K线的颜色一致
                                var colorList;
                                if (this.data[params.dataIndex][1]>this.data[params.dataIndex][0]) {
                                    colorList = '#C23531';
                                } else {
                                    colorList = '#13E9EC';
                                }
                                return colorList;
                            },
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
                            color: '#C23531', //红色
                            color0: '#13E9EC', //蓝色
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
                },{
                    name: 'MA5',
                    type: 'line',
                    data: this.calculateMA(5,this.data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    }
                }, {
                    name: 'MA10',
                    type: 'line',
                    data: this.calculateMA(10,this.data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1
                        }
                    }
                }, {
                    name: 'MA20',
                    type: 'line',
                    data: this.calculateMA(20,this.data),
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
            if(this.flag == 0) {
                this.myChart.setOption(option)
            }else {
                this.myChart.setOption(this.echartsOption)
            }

        },
        send(){
            // console.log('发送数据')
             let params = {
                pair:this.market,
                interval:Number(this.interval),
                limit:50
            }

            this.socket.send(JSON.stringify(params));
        },
        reconnect() {
            //重新连接
            var that = this;
            if (that.lockReconnect) {
                return;
            }
            that.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum);
            that.timeoutnum = setTimeout(function() {
                //新连接
                that.init();
                that.lockReconnect = false;
            }, 5000);
        }
    },
    destroyed() {
        // 销毁监听,关闭连接
        this.socket.close()

    },
};
</script>

<style  lang="less" scoped>
#Kline {
    padding-bottom: 70px;
    // background-color: #000;
    height: 100%;
    padding-top: 50px;
    #header {
        height: 51px;
    }
    #myChart{
        width: 70%;
        height: 500px;
        margin: 0 auto;
    }
    .back {
        padding: 0 10px;
        i {
        font-size: 15px;
        color: #fff;
        line-height: 50px;
        }
    }
    .content {
        color: #a8b5c8;
        .conTit {
        padding: 10px 15px;
        > p {
            height: 40px;
            .pSize {
            font-size: 24px;
            color: #4bbd82;
            }
        }
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            > p {
            width: 50%;
            display: flex;
            align-items: center;
            height: 30px;
            }
        }
        }
        .conPay {
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
        }
    }
    .tab {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        .list {
            width: 15%;
            text-align: center;
            padding: 10px 0;
            background-color: #161616;
        }
        .active {
            color: red;
            border: 1px solid #fff;
        }
    }
}
</style>
