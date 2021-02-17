<template>
    <div id="dapp">
        <HeaderTop title="首页"></HeaderTop>
        <!--轮播图 开始-->
        <div class="slide">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <img src="../../../static/image/dapp1.png" alt=""
                         class="swiper-slide">
                    <img src="../../../static/image/dapp2.png" alt=""
                         class="swiper-slide">
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!--轮播图 结束-->
        <div class="modular">
            <div class="tit">
                   <img src="../../../static/image/lingdang.png" alt="" class="lingdang">
            </div>
            <div class="menu">
                <div class="menu_item" @click="goToShop('/goodslist',8)">
                    <img src="../../../static/image/insurance.png" alt="">
                    <span>关于</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',13)">
                    <img src="../../../static/image/jiedai.png" alt="">
                    <span>Q&A</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',18)">
                    <img src="../../../static/image/insurance.png" alt="">
                    <span>交易所</span>
                </div>
                 <div class="menu_item" @click="goToShop('/goodslist',8)">
                     <img src="../../../static/image/insurance.png" alt="">
                     <span>生态</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',13)">
                     <img src="../../../static/image/jiedai.png" alt="">
                     <span>链上查询</span>
                     </div>
                <div class="menu_item" @click="goToShop('/goodslist',18)">
                     <img src="../../../static/image/insurance.png" alt="">
                          <span>我的</span>
                     </div>
                 <div class="menu_item" @click="goToShop('/goodslist',8)">
                     <img src="../../../static/image/insurance.png" alt="">
                     <span>客服</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',13)">
                    <img src="../../../static/image/jiedai.png" alt="">
                     <span>快捷充币</span>
                  </div>
                <div class="menu_item" @click="goToShop('/goodslist',18)">
                    <img src="../../../static/image/insurance.png" alt="">
                    <span>节点邀请</span>
                    </div>
            </div>
            <div class="tit1">
               <table style="width:100%;">
                       <thead>
                           <tr>
                               <th >名称</th>
                               <th >最新价</th>
                               <th >涨跌幅</th>
                           </tr>
                           <div style="border-bottom:1px;width:100%"></div>
                           <tr>
                               <th >BTC</th>
                               <th >132u</th>
                               <th>+1%</th>
                           </tr>
                           <tr>
                               <th >BTC</th>
                               <th >132u</th>
                               <th>+1%</th>
                           </tr>
                           <tr>
                               <th >BTC</th>
                               <th >132u</th>
                               <th>+1%</th>
                           </tr>
                       </thead>
                   </table>
             </div>
        </div>

    </div>
</template>

<script>


import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Vue from 'vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'




export default {
    data() {
         return {
         };
       },
    created(){
      if(this.GLOBAL.getStorage("user_token")){
                  this.getCoin();
                }else{
                  this.$router.push('/login')
                }
    },
    mounted() {
        this.initSwiper()
    },
    methods: {
               initSwiper () {
                   this.$nextTick(() => {
                       var mySwiper = new Swiper('.swiper-container', {
                           autoplay: 2000, // 可选选项，自动滑动
                           loop: true,
                           pagination: '.swiper-pagination'
                       })
                       // new BScroll('#Msite', {
                       //     click: true,
                       //     momentum: false
                       // })
                   })
               },
               getStatus () {
                   this.status = localStorage.getItem('status')
               },
               // 切换路由
               goTo (path) {
                   if (path == '/') {
                       Toast('待开放')
                       return false
                   }

                   if (path == '/call') {
                       Dialog.alert({
                           message: '客服QQ：621001'
                       }).then(() => {
                           // on close
                       })
                       return false
                   }

                   if (path == '/sellnew') {
                       if (this.userAllInfo.usermoney[0].sell_status == 2) {
                           this.$router.push('/sell')
                           return false
                       }
                   }
                   this.$router.push({ path: path })
               },

               async getUserInfo () {
                   let apiauth = localStorage.getItem('apiauth')

                   this.status = localStorage.getItem('status')

                   if (apiauth) {
                       let info = await reqUserAllInfo()
                       let key = info.userInfo.account
                       let state = localStorage.getItem(key)
                       if (info) {
                           // 写入用户的数据
                           // this.$store.dispatch('recordApiAuth', apiauth)
                           this.$store.dispatch('recordUserAllInfo', info)

                           this.coin_rank = info.coin_rank

                           if (state == 1) return
                           if (info.userInfo.is_real == 0) {
                               Dialog.confirm({
                                   title: '提示',
                                   message: '您还未实名认证，请先去实名认证'
                               })
                                   .then(() => {
                                       this.$router.replace({ path: '/Identity' })
                                   })
                                   .catch(() => {
                                       // 取消实名认证，记录状态，下次来此不再提示
                                       // var status = info.userInfo.account
                                       // console.log(status)
                                       localStorage.setItem(key, 1)
                                   })
                           }
                       }
                   } else {
                       this.$router.replace({ path: '/login' })
                   }
               },

               // async getMarket() {
               //     const res = await reqcoin();
               //     this.coin = res;
               // },

               // async getLine(){
               //     let res = await reqLine()
               //     this.dayList = res.time
               //     this.lineList = res.value
               //     this.$nextTick(()=>{
               //         this.initChart();
               //     })
               // },

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
                           }
                       },
                       yAxis: {
                           type: 'value'
                       },
                       grid: {
                           height: 180,
                           top: 20
                       },
                       series: [
                           {
                               data: this.lineList,
                               type: 'line',
                               smooth: true,
                               markLine: {
                                   // 图表标线 显示实时价格
                                   data: [{ yAxis: this.lineList[this.lineList.length - 1] }],
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
                           }
                       ]
                   })
               },

               getVolume (value) {
                   let volume = parseInt(value)
                   if (volume <= 10000) {
                       return volume
                   } else {
                       volume = (volume / 10000).toFixed(2) + '万'
                   }

                   return volume
               },
               getHomePage () {
                   this.$api.reqHomePage({}, res => {
                       this.info = res.data
                       this.banner = res.data.banner
                       this.bannerMenu = res.data.bannerer
                       this.notice = res.data.notice
                   })
               },
               getBBMarket () {
                   let limit = 15
                   this.$api.bbmarketList({ limit }, res => {
                       if (res.status) {
                           this.bbmarket = res.data.bbmarket
                           this.polline = res.data.market
                       }
                   })
               },
               goKline (item) {
                   if (item.coinstatus === 0) {
                       Toast('暂未开放交易')
                       return
                   }
                   if (this.GLOBAL.getStorage('user_token')) {
                       const coinit = item.molecule + '/' + item.denominator
                       this.$router.push({ path: '/bili', query: { coinPa: coinit, active: true } })
                   } else {
                       this.$router.push('/login')
                   }
               }
           },
    components: {
        HeaderTop
    },
};
</script>

<style lang="less" scoped>
#dapp {
    padding: 50px 10px 60px;
     background-color: #F6F7FC;
    .tit {
            height: 5vw;
            background-color: white;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            border-bottom-left-radius: 50px;
            width: 100%;
            font-size: 16px;
            margin: 10px 0;
            color: #808596;
    }
    .lingdang{
      width:4vw;
      height:4.5vw;
      margin-left:2vw;
    }
    .menu {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;

        .menu_item {
            padding: 20px 0;
            box-sizing: border-box;
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            // background-color: #fff;


            img {
                width: 35px;
                height: 35px;
                margin-bottom: 10px;
            }

            span {
                text-align: center;
                color:red;
            }

            i {
                font-size: 31px;
                margin-bottom: 10px;
            }
        }
    }

    .slide {
        width: 100%;
        height: 30vw;

        .swiper-container {
            width: 100%;
            height: 100%;

            img {
                border-radius: 5px;
            }

            .swiper-slide {
                width: 100%;
                height: 100%;
            }
        }
    }
     .tit1 {
                height: 20vw;
                background-color: white;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                border-bottom-left-radius: 20px;
                width: 100%;
                font-size: 16px;
                margin: 10px 0;
                color: #808596;
        }
      .th{
                  padding: 20px 0;
                  box-sizing: border-box;
                  width: 30%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-between;
                  font-size: 12px;
                  // background-color: #fff;
      }
      .tr{
            margin-bottom:10vw;

            }

}
</style>
