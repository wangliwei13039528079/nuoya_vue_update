<template>
    <div class="robBuy">
        <HeaderTop :title="$i18n.t('rob')">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont icon-fanhui"></i>
            </a>

        </HeaderTop>
        <!-- 折线图 开始 -->
        <div class="myEchart" ref='myEchart' style="width:100%;height:230px"></div>
        <div class="tit">
            <img src="../../../static/image/rub.png" alt="">
        </div>
        <div class="content">
            <div class="imgs">
                <img src="../../../static/image/PLC.png" alt="">
                <p>FINA</p>
            </div>
            <div class="list">
                <p style="font-size:18px;color:red">今日剩余数量：{{rob.eosv_num < 0 ? '0' : rob.eosv_num}}</p>
                <p>已抢购数量：{{rob.user_num}}</p>
            </div>
        </div>
        <div class="content">
            <div class="imgs">
                <img src="../../../static/image/usdt.png" alt="">
                <p>RVC</p>
            </div>
            <div class="list">
                <p>可抢购FINA：{{rob.set_rnc}}</p>
                <p> 剩余数量：{{rob.rvc}}</p>
            </div>
        </div>
        <div class="rob">
            <label for="" style="font-size:16px">抢购数量：</label>
            <input type="number" placeholder="请输入抢购数量" v-model="number" @input="changeRnc">
            <span>FINA</span>
            <!-- <div>
                ≈ {{rvc}} USDT
            </div> -->
            <div class="btn" @click="confirm" v-if="!flag">
                点击抢购
            </div>
            <div class="loading" v-if="flag">
                <van-loading type="spinner" />
                <p>正在抢购...</p>

            </div>
        </div>
        <div class="log" @click="goTo('/RobLog')">
            抢购记录
        </div>
        <!-- 密码输入框 -->
        <van-password-input
        v-if="showKeyboard"
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
        />

        <!-- 数字键盘 -->
        <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
        />
    </div>
</template>

<script>
import Vue from 'vue'
import { Loading, PasswordInput, NumberKeyboard } from 'vant'

import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import echarts from 'echarts'
Vue.use(Loading)
Vue.use(PasswordInput).use(NumberKeyboard)
// import { setInterval, setTimeout, clearTimeout } from 'timers';
// Vue.prototype.$echarts = echarts
export default {
    data () {
        return {
            number: '',
            rob: {},
            flag: false,
            value: '',
            showKeyboard: false,
            rnc: 0,
            lineList: [],
            dayList: [],
            countDown: '',
            endTime: '',
            diffTime: '',
            nowTime: '',
            diffDay: '',
            timer: null,
            show: false,
            end1: '',
            end2: '',
            over1: '',
            over2: '',
            dayFlag: false

        }
    },
    created () {},
    mounted () {
        this.getLineData()
    },
    methods: {
        getLineData () {
            const coin = this.$route.query.coin
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
        goTo (path) {
            this.$router.push({path: path})
        },
        initChart () {
            this.myChart = this.$echarts.init(this.$refs.myEchart)
            this.myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: this.dayList,
                    axisLabel: {
                        interval: 'auto',
                        formatter: function (value) {
                            return echarts.format.formatTime('M-d', value)
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                grid: {
                    height: 180,
                    top: 20,
                    left: '15%',
                    right: '15%'
                },
                series: [{
                    data: this.lineList,
                    type: 'line',
                    smooth: true,
                    markLine: {// 图表标线 显示实时价格
                        data: [
                            {yAxis: this.lineList[this.lineList.length - 1]}
                        ],
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
                    }
                }]
            })
        }
    },
    components: {
        HeaderTop
    },
    beforeDestroy () {
        clearTimeout(this.timer)
        this.timer = null
    }
}
</script>

<style lang="less" scoped>
.robBuy {
    padding: 0 20px;
    font-size: 14px;
    .loading {
        text-align: center;
    }
    .van-loading {
        width: 100%;
    }
    .tit {
        height: 180px;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .content {
        padding: 15px;
        background-color: #161616;
        border-radius: 5px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .imgs {
            width: 40px;
            height: 60px;
            margin-right: 20px;
            text-align: center;
            img {
                width: 40px;
                height: 40px;
            }
            p {
                margin-top: 5px;
            }
        }
        .list {
            p {
                padding: 5px 0;
            }
        }
    }
    .con {
        width: 60%;
        margin: auto;
        background-color: #161616;
        padding: 20px 0;
        border-radius: 5px;
        margin-bottom: 50px;
        h3 {
            text-align: center;
            font-size: 16px;
            color: #fff;
            margin-bottom: 10px;
        }
        .list {
            padding-top: 10px;
            text-align: center;
        }
    }
    .rob {
        // width: 60%;
        margin: auto;
        background-color: #161616;
        padding: 20px 0;
        border-radius: 5px;
        text-align: center;
        h3 {
            font-size: 16px;
            color: #fff;
            margin-bottom: 20px;
        }

        input {
            margin-bottom: 10px;
            border: none;
            text-align: center;
            width: 50%;
        }
    }
    .log {
        text-align: right;
        color: #10AEFF;
        padding: 10px 0;
    }
    .btn {
        margin-top: 10px;
        background-color: #fff;
        padding: 10px 0;
        width: 40%;
        margin: 10px auto 0;
        border-radius: 5px;
        color: #000;
    }
    .van-password-input {
        position: fixed;
        width: 100%;
        top: 40%;
        left: 0;
        margin: 0;
        padding: 0 10px;
    }
    .van-number-keyboard__body {
        color: #000;
    }
}
</style>
