<template>
    <div id="bank">
        <HeaderTop title="支付方式认证">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>

        </HeaderTop>

        <div class="cards" v-if="true">
           
            <div class="card-item">
                <div class="card">
                    <div class="avatar">
                        <img src="../../common/images/zhifubao.png" alt="">
                    </div>
                    <div class="content">
                        <p class="name">支付宝支付</p>
                        <p class="code">{{!aiPayType?'未添加':'已添加'}}</p>
                    </div>
                </div>
                <div class="card-menu">
                   
                    <a v-show="!aiPayType" @click="goTo('/addaipay')">添加</a>
                    <a @click="goTo('/ExaminePaytype/'+ zhifubao)" v-show="aiPayType">查看</a>
                     <a v-show="aiPayType" @click="goTo('/editpay/'+ zhifubao)">修改</a>
                    <!--<a >删除</a>-->
                </div>
            </div>
            <div class="card-item">
                <div class="card">
                    <div class="avatar">
                        <img src="../../common/images/weixin.png" alt="">
                    </div>
                    <div class="content">
                        <p class="name">微信支付</p>
                        <p class="code">{{!wePayType?'未添加':'已添加'}}</p>
                    </div>
                </div>
                <div class="card-menu">
                    <!-- <a v-if="wePayType.pay_type" @click="goTo('/editpay/'+ wePayType.id)">修改</a>
                    <a v-if="!wePayType.pay_type" @click="goTo('/addwechat')">添加</a> -->
                    <a @click="goTo('/addwechat')" v-show="!wePayType">添加</a>
                    <a @click="goTo('/ExaminePaytype/'+ weixin)" v-show="wePayType">查看</a>
                    <a @click="goTo('/editpay/'+ weixin)" v-show="wePayType">修改</a>
                    
                </div>
            </div>
            <div class="card-item">
                <div class="card">
                    <div class="avatar">
                        <img src="../../common/images/yinlian.png" alt="">
                    </div>
                    <div class="content" v-if="banksCards.length < 1">
                        <p class="name">银行卡支付</p>
                        <p class="code">{{!bank?'未添加':'已添加'}}</p>
                    </div>
                    <!-- <div class="content" v-else  v-for="(item,index) in banksCards" :key="index">
                        <span class="name">银行: {{item.cid}}</span>
                        <span class="name">收款人: {{item.name}}</span>
                        <span class="code">卡号: {{item.card}}</span>
                    </div> -->
                </div>
                <div class="card-menu">
                    <a @click="goTo('/addBank')" v-show="!bank" >添加</a>
                    <a @click="goTo('/ExamineBank/'+ 1)" v-show="bank">查看</a>
                    <a @click="goTo('/editBank/'+ 1)" v-show="bank">修改</a>
                </div>
            </div>
            <!-- <div class="card">
                <div class="icons">
                    <span class="iconfont">微信</span>
                </div>
                <div class="content">
                    <p class="code">{{wePayType ? "已添加":"未添加" }}</p>
                </div>
                <div class="menu">
                    <button @click="goTo('/addwechat')" v-show="!wePayType">添加</button>
                    <button @click="goTo('/ExaminePaytype/'+ weixin)" v-show="wePayType">查看</button>
                    <button @click="goTo('/editpay/'+ weixin)" v-show="wePayType">修改</button>
                </div>
            </div> -->
            <!-- <div class="card">
                <div class="icons">
                    <span class="iconfont">银行卡</span>
                </div>
                <div class="content">
                    <p class="code">{{bank ? "已添加":"未添加"}}</p>
                </div>
                <div class="menu">
                    <button @click="goTo('/addBank')" v-show="!bank" >添加</button>
                    <button @click="goTo('/ExamineBank/'+ 1)" v-show="bank">查看</button>
                    <button @click="goTo('/editBank/'+ 1)" v-show="bank">修改</button>
                </div>
            </div> -->
        </div>


    </div>
</template>

<script>

    import Vue from 'vue'
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

    import {reqDelUserBank, reqPayType, regAllPayType,Url} from '../../common/apigo'

    import {Dialog} from 'vant'
    Vue.use(Dialog)
    import axios from 'axios'
import common from '../../common/common';

    export default {

        data() {
            return {
                uid:'',
                PayType:[],
                wePayType: '',
                aiPayType: '',
                banksCards: [],
                bank:'',
                weixin:'2',
                zhifubao:'3'
            }
        },
        mounted() {
            // this.Userinfo()
            this.userOnline()
            // this.getPayType();
        },

        computed: {},

        methods: {
            goBack(){
                this.$router.push('/OTCRelease')
            },
            userOnline() {
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getPayType();

                })
            },

            //路由跳转
            goTo(path) {
                this.$router.push({path: path})
            },
            //获取支付方式
            async getPayType() {
                let uid = this.uid
                let type=''
                
                const result = await regAllPayType({uid,type});
                
                console.log(result.PayMethod)
                if(result.PayMethod){
                    this.PayType = result.PayMethod
                    this.PayType.forEach(item => {

                        if(item.PayType == '1'){
                            this.bank = "1"
                        }
                        if(item.PayType == '2'){
                            this.wePayType = "2"
                        }
                        if(item.PayType == '3') {
                            this.aiPayType = "3"
                        }
                    })
                }
                const userbank = result.userbank;

                // 将银行卡数据赋值给data中的banksCards对象
                // this.banksCards = userbank
                // console.log(this.banksCards)
                //  userpaytype.forEach((item, index) => {
                //     //pay_type 3 支付宝支付
                //     if (item.pay_type == 3) {
                //         this.aiPayType = item;
                //     }
                //     //pay_type 2 微信支付
                //     if (item.pay_type == 2) {
                //         this.wePayType = item;
                //     }
                // })
            }
        },
        components: {
            HeaderTop
        }
    }

</script>

<style scoped lang="less">
    #bank {
        padding-top: 50px;

        color: #666;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .add {
            color: #fff;
            font-size: 15px;
            position: absolute;
            right: 0px;
            line-height: 50px;
            padding: 0 15px;
        }

        .other-pay-box {
            background-color: #fff;
        }

       
        .cards {
            width: 100%;
            .card-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 14px;
                color: #fff;
                margin: 0 0 10px  0;
            }

            .menu {
                color: #000;
                button {
                    padding: 5px;
                }
                
            }

            .card {
                width: 92%;
                padding: 20px;
                height: 75px;
                margin:auto;
                margin-top: 5px;
                margin-left: 5px;
                margin-right: 5px;
                border-radius: 7px;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                display: flex;
                justify-content: space-between;
                justify-items: end;
                align-items: center;
                position: relative;
                 background: rgb(61,62,70);
                border-bottom: 1px solid rgb(53,54,62);
                color: #fff;
                box-sizing:border-box;
               -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
                box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
                .avatar {
                    width: 60px;
                    height: 60px;
                    margin-left: 15px;

                    > img {
                        width: 41px;
                        height: 40px;
                        display: block;
                        margin:.23rem 0 0 0;
                    }
                }

                .content {
                    text-align: center;
                    margin-right: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    // position: relative;
                    // right:3rem;

                    p {
                        padding: 2px;
                    }
                    
                    > span {
                        display: block;
                        padding: 2px;
                    }
                    .code{
                        color: rgb(142,144,148)
                    }
                }
            }

            .card-menu {
                background: rgb(61,62,70);
                height: 40px;
                width: 92%;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: #000;
                 border-radius: 7px;
                border-top-right-radius: 0;
                border-top-left-radius: 0;
                 -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
                box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
                > a {
                    background: rgb(238,198,127);
                    border-radius: 5px;
                    height: 25px;
                    line-height: 25px;
                    padding: 0 15px;
                    font-size: 12px;
                    margin:.1rem .4rem .1rem 0 
                }
            }
        }

    }
    // 字体图标
        // @font-face {
        //     font-family: 'iconfont';
        //     src: url('../../common/fonts/iconfont.eot');
        //     src: url('../../common/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
        //         url('../../common/fonts/iconfont.woff2') format('woff2'),
        //         url('../../common/fonts/iconfont.woff') format('woff'),
        //         url('../../common/fonts/iconfont.ttf') format('truetype'),
        //         url('../../common/fonts/iconfont.svg#iconfont') format('svg');
        // }
        // .iconfont {
        //     font-family: "iconfont" !important;
        //     font-size: 16px;
        //     font-style: normal;
        //     -webkit-font-smoothing: antialiased;
        //     -moz-osx-font-smoothing: grayscale;
        // }
</style>
