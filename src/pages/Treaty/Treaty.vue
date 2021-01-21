<template>
  <div id="Treaty">
    <HeaderTop title="行情">
      <!-- <a class="back" @click="gocoinSearch()" slot="right">
        <van-icon name="search" info size="24px"/>
      </a> -->
    </HeaderTop>

    <div class="content">
      <!-- <van-tabs v-model="activeOne">
        <van-tab v-for="index in conList" :title="index">
      <div v-show="activeOne==2">-->
      <van-tabs v-model="active" swipeable>
        <van-tab v-for="(item,index) in listArr" :title="item" :key="index">
          <div class="contentTit" v-show="active==0">
            <div class="listOrder">币种</div>
            <div class="contentTitRight">
              <div
                class="listOrder"
                style="width:80px;text-align:right;"
              >最新价</div>
              <div class="listOrder">24h涨跌</div>
            </div>
          </div>
          <div class="contentTit" v-show="active==1">
            <div class="listOrder">币种</div>
            <div class="contentTitRight">
              <div
                class="listOrder"
                style="width:80px;text-align:right;"
              >最新价</div>
              <div class="listOrder">24h涨跌</div>
            </div>
          </div>
          <!-- <div class="contentTit" v-show="active==1">
            <div class="listOrder" @click="goActiveListOrder(0)">币种</div>
            <div class="contentTitRight">
              <div
                class="listOrder"
                @click="goActiveListOrder(1)"
                style="width:80px;text-align:right;"
              >最新价</div>
              <div class="listOrder" @click="goActiveListOrder(2)">24h涨跌</div>
            </div>
          </div> -->
          <div class="contentList" v-show="active==0" style="background: #567ca6;">
            <!-- <div class="contentListLeft">
                    <div class="conLLTop">
                      <img src="http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg" alt>
                    </div>
                    <div class="conLLBottom">
                      <span class="conLLBottomTop">BTC</span>
                      <span>usdt</span>
                      <div>
                        <span style="padding-right:4px">4398900</span>张
                      </div>
                    </div>
                  </div>

                  <div class="contentTitRight">
                    <div class="conRLeft">
                      <span class="conLLBottomTop">7711.77</span>
                      <span>5326.44CNy</span>
                    </div>
                    <div class="conRRight">-3.24%</div>
            </div>-->

            <!-- TradingView Widget BEGIN -->
            <!-- <div class="tradingview-widget-container">
              <div class="tradingview-widget-container__widget"></div>
              <div class="tradingview-widget-copyright">
                <a
                  href="https://cn.tradingview.com/markets/futures/"
                  rel="noopener"
                  target="_blank"
                >
                  <span class="blue-text">商品</span>
                </a>由TradingView提供
              </div>
            </div> -->
            <iframe src="../../../static/text.html" frameborder="0" width="100%" id="myrame" scrolling="no" height="80px"></iframe>
            <div class="floatView">
              <div @click="goKline('eos/eth','eos_eth')"></div>

            </div>
            
            
          </div>
            <div class="contentList" v-show="active==1" style="background: #567ca6;">
                <iframe src="../../../static/ETHUSDT.html" frameborder="0" width="100%" id="myrame" scrolling="no" height="80px"></iframe>
                <div class="floatView">
                    <div @click="goKline('eth/usdt','eth_usdt')"></div>
                </div>
            </div>
            <div class="contentList" v-show="active==0" style="background: #567ca6;">
                <iframe src="../../../static/EOSUSDT.html" frameborder="0" width="100%" id="myrame" scrolling="no" height="80px"></iframe>
                <div class="floatView">
                    <div @click="goKline('eos/usdt','eos_usdt')"></div>
                </div>
            </div>
            <div class="contentList" v-show="active==2" style="background: #567ca6;">
                <iframe src="../../../static/BTCUSDT.html" frameborder="0" width="100%" id="myrame" scrolling="no" height="80px"></iframe>
                <div class="floatView">
                <div @click="goKline('btc/usdt','btc_usdt')"></div>
                </div>
            </div>
        </van-tab>
      </van-tabs>
      <!-- </div>
        </van-tab>
      </van-tabs>-->
    </div>
  </div>
</template>


<script>
          
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import {reqCoinPairs} from "../../common/apigo"
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);

export default {
  components: {
    HeaderTop
  },

  data() {
    return {
      active: 0,
      activeOne: 0,
      conList: ["OANDA:SPX500USD","OANDA:USDCAD"],
      listArr: [
        // "ETH",
        "EOS",
        "ETH",
        "BTC",
        // "ETH",
        // "EOS",
        // "ETH",
        // "EOS",
        // "ETH",
        // "EOS",
        // "ETH",
        // "EOS",
        // "ETH",
        // "EOS",
        // "ETH",
        // "EOS"
      ],
    };
  },

  mounted() {
    this.getCoinPairs()
  },

  methods: {
    //获取交易对
    async getCoinPairs(){
      let res= await reqCoinPairs({})
      this.conList=res.coinPairs;
    },
    goActiveListOrder(index) {
      let that = this;
      let arrBtn = document.getElementsByClassName("listOrder");
      let arrBtnLen = arrBtn.length;
          for (var j = 0; j < arrBtnLen; j++) {
            arrBtn[j].style.color = "#737f8d";
            if(arrBtn[j].innerText.indexOf("↓")>0){
              arrBtn[j].innerHTML=arrBtn[j].innerText.substring(0,arrBtn[j].innerText.indexOf("↓"))
            }
          }
          if(index>-1){
            arrBtn[index].style.color = "#5993ff";
            arrBtn[index].innerHTML=arrBtn[index].innerText+"↓"
          }
    },
    gocoinSearch(){
      this.$router.replace("/coinSearch");
    },
    goKline(item,coin) {
    //   this.$router.push({path:'/ekline',query:{market:coin,type:'1day'}}); //`/Kline/${item.Matchnum}`
      this.$router.push({path:'/Kline',query:{coinPa:item,market:coin,type:'1day'}}); //`/Kline/${item.Matchnum}`

      // this.$router.push({
      //     path:'second',
      //     query: {
      //         queryId:'20180822',
      //         queryName: 'query'
      //     }
      // })
    },   
  },
};
</script>

<style  lang="less">
#Treaty {
  padding-bottom: 70px;
  background-color: #000;
  height: 100%;
  padding-top: 49px;
  position: relative;
  #myrame{
    // padding-top: 50px;
  }
  #header {
    height: 51px;
  }
  .back {
    padding: 0 10px;
    position: absolute;
    right: 15px;
    top: 0px;
    // font-size: 20px;
    i {
      font-size: 15px;
      color: #bdc1cc;
      line-height: 50px;
    }
  }
  .content {
    color: #a8b5c8;
  }
  .van-tabs__nav,
  .van-tabs__nav--card {
    border: none;
  }
  .van-tabs__line {
    background-color: #6896e4;
  }
  .van-tabs__wrap,
  .van-hairline--top-bottom {
    background: #000;
    border-top: none;
  }
  .van-tabs__nav,
  .van-tabs__nav--line {
    background: #000;
    border-top: none;
  }
  .van-tab {
    color: #a4b5c9;
  }
  .van-tab--active {
    color: #6896e4;
  }

  .contentTit {
    height: 30px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    color: #7a8797;
    font-size: 12px;
  }
  .contentTitRight {
    display: flex;
    justify-content: space-between;
    width: 200px;
    align-items: center;
  }
  .contentList {
    // height: 80px;
    // padding: 10px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #9eaebd;
    position: relative;
    border-bottom:1px solid #58595a;
  }
  .contentListLeft {
    display: flex;
  }
  .contentListRight {
    align-items: center;
  }
  .conLLTop {
    display: flex;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    span {
      height: 20px;
      line-height: 20px;
    }
  }
  .conLLBottom {
    height: 40px;
    padding-left: 5px;
    font-size: 14px;
  }
  .conLLBottomTop {
    font-size: 18px;
    color: #fff;
  }
  .conRRight {
    background: #bb502c;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    line-height: 30px;
  }
  .conRLeft {
    text-align: right;
    margin-right: 20px;
    font-size: 14px;
  }
  .floatView{
    width: 100%;
    height: 80px;
    background: rgba(0, 0, 0, 0);
    // background: #f00;
    position: absolute;
    left: 0;
    top: -2px;
    >div{
      height: 80px;
    }
  }
  .listOrder{
    font-size: 14px;
  }
}
</style>
