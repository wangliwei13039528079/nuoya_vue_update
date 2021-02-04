<template>
    <div id="finance">
        <!-- <HeaderTop :title="$t('mine')"></HeaderTop>  -->
        <div class="top-info" v-if="userinfo"  @click="goToT('/SettingsUser')">
            <img v-if="!userinfo.avatar" :src="userMsg.avatar" class="avatar">
            <img v-else :src="userinfo.avatar" class="avatar">
            <div class="info-box">
                <p v-show="userinfo.nickname">

                    <span style="" >{{userinfo.nickname}}</span>
                </p>


                <!-- <div class="info-box1"     >
                   <p><span>级别：{{userinfo.level2}}  {{ $t('StarStar') }}  </span></p>
                </div> -->
                 <!-- <div class="info-box1" v-if="!userinfo.level2"   >
                   <p><span> {{ $t('ordinary') }}  </span></p>

                </div> -->

                  <!-- <p>级别：<span>{{userMsg.vip}}钻 （{{dealer}}）</span></p>  -->
                <!-- <p style="font-weight: normal">
                  <span>登录账号: {{userInfo.account}}</span>
                </p> -->
            </div>
            <button @click="goToT('login')"  v-show="!userinfo.nickname"> {{ $t('clickLogin') }}</button>
        </div>
        <div class="top-info" v-else>
            <img class="avatar">
            <div class="info-box">
                <span>{{ $t('clickLogin') }}</span>
            </div>
            <button @click="goToT('/login')">{{ $t('noLogin') }}</button>
        </div>
        <!-- 头部用户信息 结束 -->

        <div class="content">

<ul class="my_assets clearfix">
<li>
<h3>${{asset.total_money}}</h3>
<p>{{ $t('totalAssets') }}</p>
</li>
<li>
<h3>${{asset.true_money}}</h3>
<p>{{ $t('netAssets') }}</p>
</li>
</ul>



            <div class="charts">
                <div class="right">
                    <div class="myEchart" ref='myEchart' style="width:100%;height:180px"></div>
                </div>
            </div>
            <div></div>
            <div class="menu-box">
                <!-- <div class="menu-item" @click="goTo('/CashAssets')">
                    <img src="../../common/images/menu_wallet.png">
                    <span>钱包</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/TDTDC')">
                    <img src="../../common/images/atom.png">
                    <span></span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/invest')">
                    <img src="../../common/images/hammer.png">
                    <span>投资理财</span>
                </div> -->
                 <!-- <div class="menu-item" @click="goTo('/investK')">
                    <img src="../../common/images/kuang.png">
                    <span>矿池</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/investC')">
                    <img src="../../common/images/chibi.png">
                    <span>持币生息</span>
                </div> -->
                <div class="menu-item"  @click="goTo('/Security')">
                    <img src="../../common/images/security.png">
                    <span>{{ $t('security') }}</span>
                </div>
                <!-- <div class="menu-item" @click="goToT('/out')">
                    <img src="../../common/images/menu_transfer.png">
                    <span>转账</span>
                </div> -->

                 <!-- <div class="menu-item">
                    <img src="../../common/images/flow.png" @click="goTo('/transferBill')">
                    <span>充币</span>
                </div> -->
                <!-- <div class="menu-item" @click="goToT('/transfer')">
                    <img src="../../common/images/change.png">
                    <span>资金转换</span>
                </div> -->
                 <!-- <div class="menu-item" @click="goToT('/transfer')">
                    <img src="../../common/images/change.png">
                    <span>现货资产</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/breed')">
                    <img src="../../common/images/help.png">
                    <span>KLP矿机</span>
                </div> -->
                <div class="menu-item" @click="goTo('/key')">
                    <img src="../../common/images/key.png">
                    <span>{{ $t('ethkey') }}</span>
                </div>
                <!-- <div class="menu-item" @click="goTo('/ExportHelpWord')">
                    <img src="../../common/images/terms.png">
                    <span>{{ $t('mnemonic') }}</span>
                </div> -->
                  <!-- <div class="menu-item" @click="goTo('/addresslist')">
                    <img src="../../common/images/help.png">
                    <span>地址管理</span>
                </div>   -->

                <!-- <div class="menu-item" @click="goTo('/identityAuth')">
                    <img src="../../common/images/help.png">
                    <span>实名认证</span>
                </div>  -->
                <!-- <div class="menu-item" @click="selfSignIn">
                    <img src="../../common/images/qiandao.png">
                     <span>{{ $t('SignIn') }}</span>
                </div> -->  <!--  签到   -->

                   <div class="menu-item" @click="goTo('/Share')">
                    <img src="../../common/images/share.png">
                    <span>{{ $t('share') }}</span>
                </div>
                <!-- <div class="menu-item" @click="goTo('/Shareb')">
                    <img src="../../common/images/share.png">
                    <span>{{ $t('shareb') }}</span>
                </div> -->       <!--  分享b区   -->
                <!-- <div class="menu-item" @click="goTo('/OTCDeal/OTCBuy')">
                    <img src="../../common/images/up.png">
                    <span>OTC</span>
                </div> -->

                <div class="menu-item" @click="goTo('/Service')">
                    <img src="../../common/images/service.png">
                    <span>{{ $t('service') }}</span>
                </div>
                 <div class="menu-item" @click="goTo('/recommendlist')">
                  <img src="../../common/images/icon_msite_ranking.png">
                    <span>{{ $t('recommend') }}</span>
                </div>

             <!-- <div class="menu-item" @click="goTo('/robBuy')">
                  <img src="../../common/images/icon_msite_ranking.png">
                    <span>理财宝</span>
                </div> -->
<!--
                    <div class="menu-item">
                    <img src="../../common/images/zhuce.png" @click="goRegister()">
                    <span>{{ $t('reg') }}</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/index')">
                    <img src="../../common/images/shop.png">
                    <span>商城</span>
                </div> -->

         <div class="menu-item" @click="applyStore()">
        <img src="../../common/images/up.png">
        <span>申请商家</span>
      </div>
                <!-- <div class="menu-item" v-if="userinfo && (userinfo.merchant == 0 || userinfo.merchant == 3)" @click="applyStore()">
                    <img src="../../common/images/up.png">
                    <span>申请商家</span>
                </div>
                <div class="menu-item" v-if="userinfo && userinfo.merchant == 1">
                    <img src="../../common/images/up.png">
                    <span>审核中</span>
                </div>
                <div class="menu-item"  @click="goTo('/MerchantManage')"   v-if="userinfo && userinfo.merchant == 2">
                    <img src="../../common/images/shop.png">
                    <span>商户管理</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/OTCDeal/OTCBuy')">
                    <img src="../../common/images/f.png">
                    <span>OTC交易</span>
                </div> -->
                <div class="menu-item" @click="goTo('/kjpage')">
                    <img src="../../common/images/f.png">
                    <span>NEBC认购</span>
                </div>
                <!-- <div class="menu-item" @click="goToT('/key')">
                    <i class="iconfont iconicon-chakansiyue"></i>
                    <span>ETH私钥</span>
                </div>
                <div class="menu-item" @click="goToT('/ExportHelpWord')">
                    <i class="iconfont icondaochu"></i>
                    <span>导出助记词</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/sharecode')">
                    <img src="../../common/images/star.png">
                    <span>分享</span>
                </div> -->

                 <div class="menu-item" @click="logout">

                  <img src="../../common/images/recommend.png">
                    <span>{{ $t('loginOut') }}</span>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
// import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {Dialog, Toast} from 'vant'
import Vue from 'vue'
import {mapState} from 'vuex'

import {
    applyDealer
} from '../../common/apigo'

Vue.use(Dialog)
Vue.use(Toast)

export default {
    components: {
        // HeaderTop
    },

    data () {
        return {
            dataList: [
                {value: 1, name: '0-20分'}
            ],
            myChart: null,
            money: {},
            zichan: [],
            tit: '',
            text: '',
            userInfo: '',
            asset: {},
            rob: {}
        }
    },
    mounted: function () {
        const userInfo = this.GLOBAL.getStorage('userinfo')
        if (userInfo == null) {
            this.goTo('/login')
        }
        this.userinfo = JSON.parse(userInfo)
        window.onresize = () => {
            this.myChart.resize()
        }

        this.getTotal()
        this.getNum()
    },
    methods: {
        selfSignIn () {
            this.$dialog.confirm({
                mes:  this.$t('isSignIn')+'?',
                opts: [
                    {
                        txt:this.$t('cancel'),
                        color: false
                    },
                    {
                        txt: this.$t('confirm'),
                        color: true,
                        callback: () => {
                            this.$api.signIn({}, res => {
                                if (res.status) {
                                    Toast(this.$t('SignIn')+this.$t('success'))
                                } else {
                                    Toast(res.msg)
                                }
                            })
                        }
                    }
                ]
            })
        },
        logout () {
            this.$dialog.confirm({
                mes: this.$t('loginOut')+'?',
                opts: [
                    {
                        txt: this.$t('cancel'),
                        color: false
                    },
                    {
                        txt: this.$t('confirm'),
                        color: true,
                        callback: () => {
                            this.$api.logout({}, res => {
                                if (res.status) {
                                    this.GLOBAL.removeStorage('user_token')
                                    this.GLOBAL.removeStorage('login-type')
                                    this.GLOBAL.removeStorage('helpout')
                                    this.$router.replace('/')
                                }
                            })
                        }
                    }
                ]
            })
        },

        applyStore () {
            let that = this
            Dialog.confirm({
                title: '标题',
                message: '申请成为商家'
            })
                .then(() => {
                    that.getapplyDealer()
                })
                .catch(() => {
                    // on cancel
                })
        },
        async getapplyDealer () {
            let uid = this.uid
            let res = await applyDealer({ uid })
            if (res.errcode == 0) {
                Toast('申请成功')
            } else if (res.errcode == -1) {
                Toast('请重新登录')
            } else if (res.errcode == -2) {
                Toast('请重新登录')
            } else if (res.errcode == -3) {
                Toast('不符合申请条件')
            } else if (res.errcode == -4) {
                Toast('审核中')
            } else if (res.errcode == -5) {
                Toast('已是商户')
            } else if (res.errcode == -6) {
                Toast('申请失败')
            }
        },
        initChart () {
            this.myChart = this.$echarts.init(this.$refs.myEchart)
            this.myChart.setOption({
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    itemWidth: 10,
                    itemHeight: 6,
                    align: 'left',
                    top: 10,
                    left: 10,
                    data: this.dataList,
                    textStyle: {
                        color: '#F2F1F7',
                        fontSize: 12
                    },
                    formatter: (name) => { // 用来格式化图例文本，支持字符串模板和回调函数两种形式。模板变量为图例名称 {name}
                        return name
                    }

                },
                color:['#eec67f','#00857c','#49a6ff','#bae0e3','#cc9299','#7a3db2'],

                title: [{
                    text: this.text,
                    left: '73%',
                    top: '48%',
                    textAlign: 'center',
                    textBaseline: 'middle'
                }],

                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ['75%', '50%'],

                        label: {
                            normal: {
                                show: false
                            }

                        },

                        data: this.dataList
                    }
                ]
            })
        },

        showD () {
            Dialog.alert({
                message: '客服QQ：8800001'
            }).then(() => {
                // on close
            })
        },
        goRegister () {
            this.$router.push({path: '/register/' + this.userinfo.id})
        },
        getNum () {
            this.$api.eosvNum({}, res => {
                this.rob = res.data
            })
        },
        getTotal () {
            this.$api.userWallet({}, res => {
                if (res) {
                    this.asset = res.data
                    let type = res.data.money
                    let arrs = []
                    for (let key in type) {
                        let item = type[key]
                        arrs.push({name: key, value: Number(type[key]).toFixed(2)})
                    }
                    this.dataList = arrs
                    for (let i = 0; i < this.dataList.length; i++) {
                        this.dataList[i].name += `  (${this.dataList[i].value})`
                    }

                    // this.initChart()
                    this.$nextTick(() => {
                        this.initChart()
                    })
                }
            })
        },

        go () {
            this.$dialog.toast({mes: '您的级别不够', timeout: 1000})
        },

        goTo (path) {
            if (this.rob.status == 0) {
                this.$dialog.toast({mes: this.rob.eosv_msg, timeout: 2000})
                return
            }
            this.$router.push({path: path})
        },
        goToT (path) {
            // if(this.userInfo.is_real != 2) {
            //     return Toast('请先去实名认证')
            // }
            this.$router.push({path: path})
        }
    }
}
</script>

<style scoped lang="less">
.info-box1{
    // width: 1.4rem;
    // height: 0.45rem;
      padding:  0 0.13rem;
    margin-top: 0.25rem;
    box-sizing: border-box;
    line-height: 0.45rem;
    text-align: center;
    border: 1px solid #b7967f;
    background: #36373f;
    color: #fff;
    display: inline-block;
    float: right;
    font-size: 0.22rem;
    color: #eec67f;
    border-radius: 0.06rem;
    box-shadow: 0.04rem 0.04rem 0.04rem rgba(0,0,0,.2);
    position: absolute;
    right:.3rem;
    top:.4rem;
}

.clearfix::after {
	content: "";
	display: block;
	clear: both;
}
.my_assets {
	padding:0.1rem 0.35rem;
}
.my_assets li {
	float:left;
	width:3.2rem;
	height:1.2rem;
	border-radius:0.1rem;
	box-shadow: 0rem 0.04rem 0.04rem rgba(0,0,0,.2);
	border:1px solid #b7967f;
	text-align:center;
}
.my_assets li:nth-child(2) {
	float:right;
}
.my_assets li h3 {
	padding-top:0.15rem;
	color:#fff;
	font-size:0.34rem;
}
.my_assets li p {
	font-size:0.22rem;
	color:#9fa7b3;
	margin-top:0.1rem;
}
    .top-info {
        display: flex;
        align-items: center;
        padding: 10px;
        // background-color: #37434f;
        // border: 1px solid #4c6581;
        margin: 0 10px ;
        border-radius: 10px;
        color: #fff;

        .right {
            position: absolute;
            right: 30px;

            i {
                width: 23px;
                height: 23px;
                font-size: 23px;
                line-height: 23px;
                display: block;
                color: #fff;
            }
        }

        .avatar {
       width: 0.96rem;
    height: 0.96rem;

    overflow: hidden;

            border-radius: 50%;
            box-sizing: border-box;
            margin-right: 10px;
            // background-color: #fff;
            color: #999;
        }

        .info-box {

            color: #fff;
            font-size: 0.3rem
        }

        > button {
            margin-left: 10px;
            background-color: #60adf5;
            border: none;
            color: #fff;
            border-radius: 3px;
            font-size: 13px;
            display: block;
            padding: 2px 10px;
        }
    }
    #finance {
        padding-top: 10px;
        padding-bottom: 70px;
        background-color: #474953;
        // height: 100%;
        .back {
            padding: 0 10px;
            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .content {

            .property-box {
                // background-color: #fff;
                padding: 10px;

                > p {
                    font-size: 14px
                }

                .content-box {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin-top: 10px;

                    .left-box, .right-box {
                        flex: 1;
                        height: 70px;
                        color: #fff;
                        padding: 10px;
                        border-radius: 6px;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        width: 50%;
                        word-wrap: break-word;

                        > p {
                            padding: 2px;
                        }

                    }

                    .left-box {

    width: 3.2rem;
    height: 1.2rem;
    border-radius: 0.1rem;
    box-shadow: 0rem 0.04rem 0.04rem rgba(0,0,0,.2);
    border: 1px solid #b7967f;
    text-align: center;

                    }

                    .right-box {

    width: 3.2rem;
    height: 1.2rem;
    border-radius: 0.1rem;
    box-shadow: 0rem 0.04rem 0.04rem rgba(0,0,0,.2);
    border: 1px solid #b7967f;
    text-align: center;
                    }
                }
            }

            .charts {
                margin-top: 5px;
            }

            .myEchart {
                // background-color: #fff;
            }

            .menu-box {
                margin-top: 15px;
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                padding: 0.1rem;
                // background-color: #fff;
                width: 100%;
                box-sizing: border-box;

                .menu-item {
width: 1.9rem;
    height: 1.9rem;
    margin: 0 0.26rem;
    float: left;
    background: #3d3e46;
    border-radius: 0.1rem;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 0.05rem 0.05rem rgba(0,0,0,.5);
    margin-bottom: 0.4rem;


                    i {
                        font-size: 31px;
                        margin-bottom: 10px;
                    }
          >span{
              font-size: 0.26rem;
    color: #fff;
          }
                    > img {
    width: 100%;
    height: 100%;
    display: block;
                       width: 0.85rem;
    height: 0.85rem;
    margin: 0.3rem auto 0.2rem;
                    }

                    @keyframes myfirst
                    {
                        from {transform: rotateZ(0deg);}
                        to {transform: rotateZ(60deg);}
                    }
                }
            }
        }
    }
</style>
