<template>
    <div class="robBuy">
        <HeaderTop :title="$i18n.t('rob')">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont icon-fanhui"></i>
            </a>

        </HeaderTop>
        <!-- <div class="tit">
            <img src="../../../static/image/rub.png" alt="">
        </div> -->
        <div class="countDown" v-show="show">
            {{countDown}}
        </div>
        <!-- 折线图 开始 -->
        <div class="myEchart" ref='myEchart' style="width:100%;height:230px"></div>
        <!-- 折线图 结束 -->
        <div class="content">
            <div class="imgs">
                <img src="../../../static/image/eosv.png" alt="">
                <p>EOSV</p>
            </div>
            <div class="list">
                <p style="font-size:18px;color:red">{{$t('laveToday')}}：{{rob.eosv_num < 0 ? '0' : rob.eosv_num}}</p>
                <p>{{$t('priceToday')}}：${{rob.eosv_rnc}}</p>
                <p>{{$t('caught')}}：{{rob.user_num}}</p>
            </div>
        </div>
        <div class="content">
            <div class="imgs">
                <img src="../../../static/image/rnc.png" alt="">
                <p>rnc</p>
            </div>
            <div class="list">
                <p>{{$t('exchange')}} EOSV：{{rob.set_rnc}}</p>
                <p> {{$t('lave')}}：{{rob.rnc}}</p>
            </div>
        </div>
        <div class="rob">
            <label for="" style="font-size:16px">{{$t('robNum')}}：</label>
            <input type="number" :placeholder="$i18n.t('robNum')" v-model="number" @input="changeRnc">
            <span>EOSV</span>
            <div>
                ≈ {{rnc}} rnc
            </div>
            <div class="btn" @click="confirm" v-if="!flag">
                {{$t('robClick')}}
            </div>
            <div class="loading" v-if="flag">
                <van-loading type="spinner" />
                <p>{{$t('rightNowRob')}}</p>

            </div>
        </div>
        <div class="log" @click="goTo('/RobLog')">
            {{$t('robLog')}}
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
import { Loading } from 'vant'
Vue.use(Loading)
import { PasswordInput, NumberKeyboard } from 'vant';
Vue.use(PasswordInput).use(NumberKeyboard);
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import echarts from 'echarts'
// import { setInterval, setTimeout, clearTimeout } from 'timers';
// Vue.prototype.$echarts = echarts
export default {
    data() {
        return {
            number:'',
            rob:{},
            flag:false,
            value: '',
            showKeyboard: false,
            rnc:0,
            lineList:[],
            dayList:[],
            countDown:'',
            endTime:'',
            diffTime:'',
            nowTime:'',
            diffDay:'',
            timer:null,
            show:false,
            end1:'',
            end2:'',
            over1:'',
            over2:'',
            dayFlag:false

        };
    },
    created() {},
    mounted() {
        this.getNum()
        // this.sellTime()
       
    },
    methods: {
        goTo(path){
            this.$router.push({path:path})
        },
        changeRnc(){
            if(Number(this.number) < 0) {
                this.number = 1
            }
            this.rnc = this.number * this.rob.eosv_rnc
        },
        confirm(){
            
            let number = this.number
            if(number.length < 1) {
                this.$dialog.toast({mes:'请输入数量',timeout:1000})
                return
            }
            // if(Number(number) > Number(this.rob.set_rnc)) {
            //     this.$dialog.toast({mes:'抢购数量过大',timeout:1000})
            //     return
            // }
            let reg = /^[0-9]*[1-9][0-9]*$/
            if(!reg.test(number)){
                this.$dialog.toast({mes:'抢购数量只能是整数',timeout:1000})
                return
            }
            this.flag = true
            this.$api.RobBuy({number},res=>{
                if(res.status){
                    setTimeout(()=>{
                        this.flag = false
                        this.$dialog.toast({mes:res.msg,timeout:1000})
                         if(res.status){
                            this.number = ''
                            this.rnc = 0
                            this.getNum()
                        }
                    },2000)
                }else {
                    this.flag = false
                    this.number = ''
                    this.rnc = 0
                }
               
            })
        },
        getNum () {
            this.$api.eosvNum({},res=>{
                this.rob = res.data
                let line = res.data.zxt
                this.dayList = []
                this.lineList = []
                line.forEach(item => {
                    this.dayList.push(item.ctime)
                    this.lineList.push(item.value)
                })
                 this.$nextTick(()=>{
                    this.initChart();
                    this.sellTime()
                })
            })
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if(this.value.length == 6) {
                this.showKeyboard = false
                this.confirm()
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
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
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
                },
                grid:{
                    height:180,
                    top:20,
                    left:'15%',
                    right:'15%'
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
        sellTime(){
            let time = new Date()
            let day = time.getDay()
            let week
            if(day == 0) {
                week = 7
            }else {
                week = day
            }
            // let week = 3  //今天是星期几
            let realWeek = this.rob.week //抢购时间是星期几
            if(week>realWeek){
                this.diffDay = 7 + (week-realWeek)
            }
            if(week == realWeek && this.dayFlag) {
                this.diffDay = 7 + (week-realWeek)
            }
            else {
                this.diffDay = realWeek - week
            }
            // let time = new Date()
            time.setDate(time.getDate() + this.diffDay)
            let Y = time.getFullYear() + '/'
            let M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '/'
            let D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()) + ' '
            let h1 = this.rob.datetime_one
            let start1 =h1.substr(0,8)
            this.end1 = Y + M + D + start1
            let h2 = this.rob.datetime_two
            let start2 =h2.substr(0,8)
            this.end2 = Y + M + D + start2
            let end1 = h1.substr(11)
            let end2 = h2.substr(11)
            this.over1 = Y + M + D + end1
            this.over2 = Y + M + D + end2
            // this.endTime = new Date(end)
            let a = new Date(this.end1).getTime()   // 第一波开始倒计时
            let b = new Date(this.end2).getTime()    // 第二波开始倒计时
            let c = new Date(this.over1).getTime()   // 第一波结束倒计时
            let d = new Date(this.over2).getTime()   // 第二波结束倒计时
            // this.show = true
            if(a - this.nowTime > 1100 || c-this.nowTime > 1100) {
                if(a - this.nowTime > 1100) {
                    this.startTime(this.end1)
                }else {
                    this.overTime(this.over1)
                }
            }else if(b - this.nowTime > 1100 || d - this.nowTime > 1100) {
                if(b - this.nowTime > 1100) {
                    this.startTime(this.end2)
                }else {
                    this.overTime(this.over2)
                }
            }
            else {
                // this.getNum()
                this.dayFlag = true
                // clearTimeout(this.timer)
                // this.timer = null
                // return
            }
            // this.nowTime = new Date()
            // this.diffTime = this.endTime - this.nowTime
            // let d =  Math.floor(this.diffTime / 1000 / 24 / 60 /60).toString().padStart(2,'0')
            // let h = Math.floor((this.diffTime / 1000 / 60 /60) % 24).toString().padStart(2,'0')
            // let m = Math.floor((this.diffTime / 1000 / 60) % 60).toString().padStart(2,'0')
            // let s = Math.floor((this.diffTime / 1000 ) % 60).toString().padStart(2,'0')
            // this.countDown = `${d}天${h}时${m}分${s}秒`

            this.timer = setTimeout(()=>{
                this.sellTime()
            },1000)
        },
        overTime(times){
            this.endTime = new Date(times)
            this.nowTime = new Date()
            this.diffTime = this.endTime - this.nowTime
            if(this.diffTime > 0) {
                this.show = true
            }
            let d =  Math.floor(this.diffTime / 1000 / 24 / 60 /60)
            let h = Math.floor((this.diffTime / 1000 / 60 /60) % 24)
            let m = Math.floor((this.diffTime / 1000 / 60) % 60) 
            let s = Math.floor((this.diffTime / 1000 ) % 60)
            let dd = d < 10 ? '0' + d : d
            let hh = h < 10 ? '0' + h : h
            let mm = m < 10 ? '0' + m : m
            let ss = s < 10 ? '0' + s : s
            this.countDown = `距离抢购结束还有：${dd}天${hh}时${mm}分${ss}秒`
        },
        startTime(times){
            this.endTime = new Date(times)
            this.nowTime = new Date()
            this.diffTime = this.endTime - this.nowTime
            if(this.diffTime > 0) {
                this.show = true
            }
            
            let d =  Math.floor(this.diffTime / 1000 / 24 / 60 /60)
            let h = Math.floor((this.diffTime / 1000 / 60 /60) % 24)
            let m = Math.floor((this.diffTime / 1000 / 60) % 60)
            let s = Math.floor((this.diffTime / 1000 ) % 60)
            let dd = d < 10 ? '0' + d : d
            let hh = h < 10 ? '0' + h : h
            let mm = m < 10 ? '0' + m : m
            let ss = s < 10 ? '0' + s : s
            this.countDown = `距离抢购开始还有：${dd}天${hh}时${mm}分${ss}秒`
        }
    },
    components: {
        HeaderTop
    },
    beforeDestroy(){
        clearTimeout(this.timer)
        this.timer = null
    }
};
</script>

<style lang="less" scoped>
.robBuy {
    padding: 0 20px;
    font-size: 14px;
    padding-top: 50px;
    .back {
        padding: 0 10px;
        i {
            font-size: 15px;
            color: #f0deba;
            line-height: 50px;
        }
    }
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
            color: #f0deba;
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
            color: #f0deba;
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
        background-color: #f0deba;
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
    .countDown {
        text-align: center;
        font-size: 0.3rem;
        color: red;
    }
}
</style>
