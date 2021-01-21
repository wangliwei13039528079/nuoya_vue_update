<template>
    <div id="earnings">
        <HeaderTop title="持币生息">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div class="top">
            <div class="info">
                <div class="title">可投资产</div>
                <div class="num">{{num}}</div>
            </div>
            <!-- <div class="left">
                <a class="iconfont icon-jilu" @click="goTo('/investlog')"></a>
            </div> -->
        </div>
        <div class="buy-aminy">
            <van-cell-group>
                <van-field v-model="fmoney" label="数额" placeholder="请输入投资数额" />
            </van-cell-group>
        </div>
        <!-- <div class="list-box">
            <div class="item" v-for="(item,index) in list" @click="select(item.ratio);" :key="index"
                 :class="currentIndex == item.ratio ? 'active':''">
                <div class="title" :style=" item.rate == '' ? 'font-weight: bold':''" @click="getType(item.types)">{{item.name}}</div>
                <div class="rate" v-if="parseFloat(item.ratio) == 0 ? false: true" >{{parseFloat(item.ratio) * 100}}%</div>
            </div>
        </div> -->


        <!--悬浮层-->
        <div class="pwd-keyboard" v-show="showKeyboard">
            <!-- 密码输入框 -->
            <!-- 密码输入框 -->
            <van-password-input
                :value="value"
                info="密码为 6 位数字"
                @focus="showKeyboard = true"
            />

            <!-- 数字键盘 -->
            <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false;flag = true"
            />
        </div>
        <!--悬浮层-->

        <div class="btn-group">
            <button class="btn-submit" @click="showKey">确定</button>
        </div>
    </div>
</template>

<script>
    // import {reqInvestment} from "../../api";
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import Vue from 'vue'
    import {
        Field
    } from 'vant'
    import {
        RadioGroup,
        Radio
    } from 'vant'
    import {
        Toast
    } from 'vant'

    Vue.use(RadioGroup)
    Vue.use(Radio)
    Vue.use(Field)

    // import {
    //     reqChibi, reqGetChibi, reqCheckScPassword
    // } from '../../api'

    import {PasswordInput, NumberKeyboard} from 'vant'

    Vue.use(PasswordInput).use(NumberKeyboard)

    export default {

        data () {
            return {
                radio: '1',
                list: [{
                    time: '1个月',
                    rate: '2%'
                },
                    // {
                    //     time: 'A代专属',
                    //     rate: '8%'
                    // },
                    {
                        time: '蜗牛盛典',
                        rate: ''
                    },
                ],
                moneyList: [
                    100, 1000, 3000, 5000, 10000, 30000
                ],
                fmoney: '',
                currentIndex: '',
                num: 0,
                showKeyboard: false,
                value: '',
                ymd:'',
                types:1,
                flag:true
            }
        },

        mounted () {
            // this.getChibi()

            // this.getPro()

            // this.getType(1)
        },

        methods: {
            goTo (path) {
                this.$router.replace({
                    path: path
                })
            },

            // getType(type){
            //     this.types = type
            // },
            // async getPro(){
            //     const res = await reqInvestment();
            //     this.list = res
            //     this.currentIndex = this.list[0].ratio
            //     this.ymd = this.list[0].ymd;
                
            // },

            showKey () {
                if(!this.flag) return

                if(this.fmoney / 100 > 10000) {
                    Toast('投入数额小于100W');
                    this.fmoney = ''
                    return false
                }

                if (this.fmoney % 100 != 0) {
                    Toast('请输入100的倍数')
                    this.fmoney = ''
                    return false
                }

                if(Number(this.num) < Number(this.fmoney)) {
                     Toast('金额不足')
                     this.fmoney = ''
                     return
                }

                if (this.fmoney.length != 0) {
                    this.showKeyboard = true
                    this.flag = false
                }else{
                     Toast('请输入投资数额')
                }
                
                
                
                

            },

            select (index) {
                this.currentIndex = index
            },

            // async getChibi () {
            //     const num = await reqGetChibi()
            //     if(num.code == -21) {
            //         this.num = ''
            //     }else {
            //         this.num = num
            //     }
            // },

            // async chibi () {
            //     let ftypes = '7'
            //     let fmoney = this.fmoney
            //     let types = '2'
            //     if (this.fmoney.length == 0) {
            //         Toast('请输入数额')
            //         return false
            //     }
            //     const result = await reqChibi({ftypes, fmoney,types})
            //     if(result){
            //         this.flag = true
            //     }
            //     this.getChibi()
            //     Toast(result.msg)
            //     this.fmoney = ''
            // },

            onInput (key) {
                this.value = (this.value + key).slice(0, 6)
                if (this.value.length == 6) {
                    this.showKeyboard = false
                    let erjipwd = this.value
                    this.value = ''
                    reqCheckScPassword({erjipwd})
                        .then((res) => {
                            if (res.code == 1) {
                                this.chibi()
                                this.showKeyboard = false
                            } else {
                                this.fmoney = ''
                                Toast(res.msg)
                            }
                            if(res) {
                                this.flag = true
                            }
                        })
                }
            },
            onDelete () {
                this.value = this.value.slice(0, this.value.length - 1)
            },

            // query () {

            //     if(this.fmoney / 100 > 10000) {
            //         Toast('投入数额小于100W');
            //         this.fmoney = ''
            //         return false
            //     }

            //     if (this.fmoney % 100 != 0) {
            //         Toast('请输入100的倍数')
            //         this.fmoney = ''
            //         return false
            //     }
            // }

        }
        ,

        components: {
            HeaderTop
        }
        ,
    }
</script>

<style scoped lang="less">
    #earnings {
        padding-top: 50px;


        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }


        .top {
            background-color: #37434f;
            height: 100px;
            position: relative;

            .left {
                position: absolute;
                right: 10px;
                top: 27px;

                > a {
                    padding: 10px;
                    display: block;
                    font-size: 28px;
                    color: #fff;

                }

            }


            .title {
                padding-top: 20px;
                padding-left: 20px;
                color: #fff;
                display: inline-block;
                font-size: 30px;
                margin-bottom: 5px;
            }

            .num {
                color: #fff;
                font-size: 18px;
                padding-top: 10px;
                padding-left: 20px;
            }
        }


        .btn-group {
            padding: 5px;


            .btn-submit {
                width: 100%;
                height: 50px;
                color: #000;
                background-color: #fff;
                box-shadow: 1px 1px 20px #eee;
                border: none;

                &:active {
                    background-color: #eee;
                }
            }
        }


        .time {
            display: flex;
        }


        .list-box {
            margin-top: 5px;
            width: 100%;
            display: flex;


            > div:nth-child(2) {
                border-right: 1px solid #eee;
                border-left: 1px solid #eee;
            }

            .item {
                padding: 20px 10px;
                text-align: center;
                flex: 1;
                background-color: #fff;

                .title {
                    font-size: 13px;
                    padding: 5px;
                }

                .rate {
                    margin-top: 5px;
                    color: red;
                    font-size: 1rem;
                    font-weight: bold;
                }

                &.active {
                    background-color: #eee;
                }
            }
        }

        .buy-aminy {
            background-color: #fff;

            p {
                padding: 15px;
                size: 14px;
                color: #000;
                border-bottom: 1px solid #eee;
            }

            .list {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-content: space-between;
                justify-content: space-around;
                padding-bottom: 10px;
            }

            span {
                margin-top: 10px;
                text-align: center;
                line-height: 15px;
                width: 25%;
                height: 15px;
                border-radius: 5px;
                display: block;
                border: 1px solid #60ADF5;
                padding: 10px 5px;
                color: #60ADF5;

                &.active {
                    background-color: #60ADF5;
                    color: #fff;
                }
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
    }
</style>
