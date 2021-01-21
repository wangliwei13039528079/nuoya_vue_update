<template>
    <div id="operation">
        <div class="con">
            <div class="title">
                我的总收益：{{produce.all_bonus}}
            </div>
            <div class="circle">
                <div class="inside">运行中</div>

                <div class="demo"></div>

            </div>

            <!-- <div style="color:#fff;margin:20px 0 0 20px;">个人算力：{{level}}</div>
            <div style="color:#fff;margin:10px 0 0 20px;">全网算力：{{allLevel}}</div> -->
            <div class="power">
                <div class="top">
                    <p>算力  {{produce.my_power}}</p>
                    <!-- <p @click="show=true">算力说明</p> -->
                </div>
                <div class="con">
                    <div class="proportion">
                        <p class="left">主</p>
                        <div class="bar">
                            <div class="solid" ref="main"></div>
                        </div>
                        <p style="width:15%">
                            {{produce.my_power}}
                        </p>
                    </div>
                    <div class="proportion">
                        <p class="left">协</p>
                        <div class="bar">
                            <div class="solid" ref="cooperation"></div>
                        </div>
                        <p style="width:15%">{{produce.user_power}}</p>
                    </div>
                    <div class="proportion">
                        <p class="left">群</p>
                        <div class="bar">
                            <div class="solid" ref="team"></div>
                        </div>
                        <p style="width:15%">{{produce.all_power}}</p>
                    </div>
                </div>
            </div>
            <div class="picTab">
                <ul>
                    <li v-for="(item,index) in earningArr">
                        <span>收益：{{item.num}}</span>
                        <span>时间：{{item.ctime}}</span>
                    </li>
                    <li v-for="(item,index) in earningArr">
                        <span>收益：{{item.num}}</span>
                        <span>时间：{{item.ctime}}</span>
                    </li>
                </ul>
            </div>
            <van-popup v-model="show">
                <p>算力是Yui的姐姐hi爱神的箭卡萨快乐东方航空节流阀if我哦UI哦啊撒UI哦</p>
            </van-popup>

        </div>
        <canvas id="matrix" style="position:absolute;z-index:-1;width: 100%;height: 100%;top:0;left:0" height="640" width="360"></canvas>

    </div>
</template>
<script>

import Vue from 'vue'
import {Toast} from 'vant'
Vue.use(Toast)
import { Popup } from 'vant';
Vue.use(Popup);
import Swiper from 'swiper'
import BScroll from 'better-scroll'
import 'swiper/dist/css/swiper.min.css'
export default {
    data() {
        return {
            title:'',
            id:this.$route.query.id,
            total:'',
            earningArr:[],
            earning:'',
            level:'',
            allLevel:'',
            timer:'',
            earningList:[],
            timers:null,
            show:false,
            produce:{},
            main:0,
            cooperation:0,
            team:0,
            status:this.$route.query.status


        };
    },
    mounted() {
        // this.can()
        // this.getInfo()
        this.earnings()
        this.initSwiper()

    },
    methods:{
        goTo(path) {
            this.$router.push({ path: path });
        },
        earnings(){
            let mid = this.id
            this.$api.userLicai_list({},res=>{

            // })
            // this.$api.millProfit({mid},res=>{
               if(res.status) {
                    this.earningArr = res.data.licai_list
                    this.produce = res.data
                    this.main = this.produce.my_power
                    this.cooperation = this.produce.user_power
                    this.team = this.produce.all_power
                    let h = this.earningArr.length * 30
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    var keyFrames = '\
                        @keyframes move {\
                            0% {\
                                transform: translateY(0px);\
                            }\
                            100% {\
                                transform: translateY(A_DYNAMIC_VALUE);\
                            }\
                        }';
                        style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g,'-'+h+'px' );
                        document.getElementsByTagName('head')[0].appendChild(style);
                    let total = 10000
                    let main = 200/10000*this.main
                    let cooperation = 200 / 10000 * this.cooperation
                    let team = 200/10000*this.team
                    if(main>200) {
                        main = 200
                    }
                    if(cooperation>200) {
                        cooperation = 200
                    }
                    if(team>200) {
                        team = 200
                    }
                    this.$refs.main.style.width = main+'px'
                    this.$refs.cooperation.style.width = cooperation+'px'
                    this.$refs.team.style.width = team+'px'
                }
           })
           
        },

     
        initSwiper(){
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
            // new BScroll('#Msite', {
            //     click: true,
            //     momentum: false
            // })
            })
        }

    },
    beforeDestroy(){
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>
<style lang="less">
    // #app {
    //     background-color: transparent;
    // }
    #operation {
        padding-bottom: 50px;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        .van-popup {
            width: 100%;
            height: 50%;
            color: #000;
            p {
                padding: 10px;
                line-height: 20px;
            }
        }
        .power {
            padding: 0 30px;
            .top {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #1A202E;
                font-size: .25rem;
                padding: 10px 0;
            }
            .proportion {
                display: flex;
                justify-content: space-between;
                font-size: .25rem;
                padding: 10px 0;
                align-items: center;
                .left {
                    color: #8186E1;
                }
                .bar {
                    width: 200px;
                    height: 12px;
                    border-radius: 10px;
                    background-color: #585D57;
                    position: relative;

                }
                .solid {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100px;
                    background-color: yellow;
                    border-radius: 10px;
                    // border: 1px solid yellow;
                }
            }
        }
        .title {
            // margin-top: 10px;
            margin-left: 20px;
            color: #fff;
        }
        .circle {
            position: relative;
            height: 150px;
        }
        .inside {
            width: 80px;
            height: 80px;
            line-height: 80px;
            border-radius: 50%;
            background-color: #15410D;
            color: #fff;
            text-align: center;
            position: absolute;
            bottom: 25%;
            left: 50%;
            transform: translateX(-50%);
        }
        .item {
            p {
                display: flex;
                justify-content: space-around;
            }
        }
        @-webkit-keyframes circle{
            0% {transform:rotate(0deg);}
            100% {transform:rotate(-360deg);}
        }
        @keyframes circle{
            0% {transform:rotate(0deg);}
            100% {transform:rotate(-360deg);}
        }
        .demo{
            width:150px;
            height:150px;
            border:5px solid #D8602C;
            border-left-color:#814C35;
            border-right-color:#303739;
            border-top-color:#303739;
            margin:50px auto 0;
            border-radius: 50%;/*圆角*/
            -webkit-animation:circle 1s infinite linear;
            animation:circle 1s infinite linear;
        }
        .swiper-notice {
            margin-top: 5px;
            height: 40px;
            display: flex;
            // background-color: #fff;
            overflow: hidden;


            .swiper-slide {

                display: flex;
                align-items: center;


                > span {
                    margin-left: 20px;
                }

            }

            a {
                // padding-left: 10px;
                display: block;
                font-size: 14px;
                color: #fff;
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

        @keyframes move {
            0% {
                transform:translateY(0px);
            }
            100% {
                transform:translateY(-180px);
            }
        }
        .picTab{
            width:100%;
            height:150px;
            margin:20px auto 0;
            overflow:hidden;
        }
        .picTab ul{
            width:100%;
            // height:100%;
            margin-left: 20px;
            animation:move 5s linear infinite;
        }
        .picTab li{
            width:90%;
            height:30px;
            color:#fff;
            display: flex;
            justify-content: space-between;
        }



    }
</style>
