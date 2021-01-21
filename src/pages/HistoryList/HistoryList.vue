<template>
  <div id="HistoryList" @click.stop="goHide()">
    <div>
      <HeaderTop title="历史委托">
        <a class="back" @click="$router.back()" slot="left">
          <i class="iconfont iconfanhui"></i>
        </a>
      </HeaderTop>
      <div class="content">
        <div class="contentTit">
          <div>
            <van-switch v-model="checked" active-color="#f44" inactive-color="#243859" size="16px"/>
            <span>隐藏已撤销</span>
          </div>
          <div @click.stop="goShow()">
            <span>筛选</span>
            <van-icon name="filter-o" info/>
          </div>
        </div>
        <div class="HistoryList">
          <div style="font-size:14px;">历史委托</div>
          <!-- <div class="HistoryListTit">
          <span>价格</span>
          <span>数量</span>
          <span>金额</span>
          <span>交易状态</span>
          </div>-->
          <div class="HistoryListCon" v-for="(item,index) in coinHistory">
            <p style="display:flex;justify-content: space-between;">
              <span style="font-size:16px;">
                <span
                  :class="item.Type==2?'sell':'buy'"
                >{{item.Type==2?"卖出":"买入"}}{{item.CoinPair.toUpperCase()}}</span>
                <span
                  style="padding-left:5px;font-size:12px;"
                >{{item.Utime.substr(0,19).replace(/T/g," ").substr(5,11)}}</span>
              </span>
              <span>{{item.Status | OrderStatus}}</span>
            </p>
            <p style="display:flex;justify-content: space-between;">
              <span>
                委托数量：
                <span>{{item.Amount}}</span>
              </span>
              <span>
                剩余数量：
                <span>{{item.AmountRemain}}</span>
              </span>
            </p>
            <p>
              价格({{item.CoinPair.split("/")[1].toUpperCase()}})：
              <span>{{item.DealPrice}}</span>
            </p>

            <!-- <span v-show="item.Status==0" @click="goCancel(item.OrderId)">点击撤单</span> -->
          </div>
        </div>
      </div>
    </div>
    <div id="scrollViewH" :class="isShow==0?'scrollViewHide':'scrollViewShow'" @click.stop="stop()">
      <div class="scrollTit">筛选</div>
      <!-- <div class="scrollStore">
        <div class="scrollStoreTit">市场</div>
        <div class="scrollStoreCon">
          <input type="text" v-model="CoinName" placeholder="币种">/
          <span @click="coinSelect()">{{coinList[coinListNum]}}</span>
        </div>
      </div> -->
      <div class="scrollType">
        <div class="scrollTypeTit">类型</div>
        <div class="scrollTypeCon">
          <span
            class="scrollTypeConSpan"
            style="color:rgb(89, 147, 255)"
            @click="goActiveType(0)"
          >买&买</span>
          <span class="scrollTypeConSpan" @click="goActiveType(1)">买</span>
          <span class="scrollTypeConSpan" @click="goActiveType(2)">卖</span>
        </div>
      </div>
      <div class="scrollBtn">
        <!-- <span class="scrollBtnspan" @click.stop="goReset()">重置</span> -->
        <span class="scrollBtnspan" @click.stop="goTrue()">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { reqCoinTradeHistory, reqCancelTrade } from "../../common/apigo";
import Vue from "vue";
import { Switch } from "vant";
Vue.use(Switch);
import { Toast } from "vant";
Vue.use(Toast);
Vue.filter("OrderStatus", function(value) {
  if (value == 0) {
    return "未匹配";
  } else if (value == 1) {
    return "已成交";
  } else if (value == 2) {
    return "已撤单";
  }
});
export default {
  components: {
    HeaderTop
  },

  data() {
    return {
      checked: null,
      isShow: 0,
      CoinName: "",
      SbType: 0,
      coinList: ["全部", "ETH", "EOS"],
      coinListNum: 0,
      coinHistory: [],
      coinHistoryY: [],
      coinHistoryX: [],
      coinHistoryType: [],
      coinPa: null,
      offset: 0
    };
  },

  mounted() {
    this.userInfo();
    this.coinPa = this.$route.query.coinPa;
    window.addEventListener("scroll", this.handleScroll, true);
  },

  methods: {
    handleScroll(e) {
      var scrollTop = e.target.scrollTop;
      var windowHeight = e.target.clientHeight;
      var scrollHeight = e.target.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        if (this.SbType == 0) {
          this.offset++;
          this.getCoinTradeHistory();
        } else {
          this.offset++;
          this.getCoinTradeHistoryDress();
        }
      }
    },
    userInfo() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.getCoinTradeHistory();
      });
    },
    //获取交易历史
    async getCoinTradeHistory() {
      let uid = this.uid;
      let offset = this.offset;
      let limit = "10";
      let coinPair = this.coinPa.toLowerCase();
      let type = "";
      if (this.checked) {
        let status = "1";
        let res = await reqCoinTradeHistory({
          uid,
          offset,
          limit,
          coinPair,
          type,
          status
        });
        if (res.errcode == 0) {
          if (res.tradeHistory.length < 10) {
            window.removeEventListener("scroll", this.handleScroll, true);
          }
          this.coinHistoryY = this.coinHistoryY.concat(res.tradeHistory);
          this.coinHistory = this.coinHistoryY;
        } else if (res.errcode == -1) {
          Toast("请重新登录");
        }
      } else {
        let status = "1,2";
        let res = await reqCoinTradeHistory({
          uid,
          offset,
          limit,
          coinPair,
          type,
          status
        });
        if (res.errcode == 0) {
          if (res.tradeHistory.length < 10) {
            window.removeEventListener("scroll", this.handleScroll, true);
          }
          this.coinHistoryX = this.coinHistoryX.concat(res.tradeHistory);
          this.coinHistory = this.coinHistoryX;
        } else if (res.errcode == -1) {
          Toast("请重新登录");
        }
      }
    },
    async getCoinTradeHistoryDress() {
      let that = this;
      let uid = this.uid;
      let offset = this.offset;
      let limit = "10";
      let coinPair = this.coinPa.toLowerCase();
      let type = this.SbType;
      let status = "1,2";
      let res = await reqCoinTradeHistory({
        uid,
        offset,
        limit,
        coinPair,
        type,
        status
      });
      if (res.errcode == 0) {
        if (res.tradeHistory.length < 10) {
            window.removeEventListener("scroll", this.handleScroll, true);
          }
        this.coinHistoryType = this.coinHistoryType.concat(res.tradeHistory);
        this.coinHistory = this.coinHistoryType;
      } else if (res.errcode == -1) {
        Toast("请重新登录");
      }
    },
    goBili() {
      this.$router.push({
        path: "/Bili",
        query: {
          coinPa: this.coinPa
        }
      });
    },
    goShow() {
      this.isShow = "1";
    },
    goHide() {
      this.isShow = "0";
    },
    goActiveType(index) {
      let that = this;
      let arrBtn = document.getElementsByClassName("scrollTypeConSpan");
      let arrBtnLen = arrBtn.length;
      for (var j = 0; j < arrBtnLen; j++) {
        arrBtn[j].style.color = "#737f8d";
      }
      arrBtn[index].style.color = "#5993ff";
      that.SbType = index;
    },
    goTrue() {
      let coinName = this.CoinName;
      let coinLast = this.coinList[this.coinListNum];
      let SbType = this.SbType;
      this.isShow = 0;
      if (SbType == 0) {
        this.offset = 0;
        this.coinHistory = [];
        this.coinHistoryX = [];
        this.coinHistoryY = [];
        this.getCoinTradeHistory();
        window.addEventListener("scroll", this.handleScroll, true);
      } else {
        this.offset = 0;
        this.coinHistory = [];
        this.coinHistoryType = [];
        this.getCoinTradeHistoryDress();
        window.addEventListener("scroll", this.handleScroll, true);
      }
    },
    goReset() {
      (this.CoinName = ""), (this.coinListNum = 0);
      this.SbType = 0;
    },
    stop() {},
    coinSelect() {
      this.coinListNum++;
      if (this.coinListNum > 2) {
        this.coinListNum = 0;
      }
    }
  },
  watch: {
    SbType(newVal, oldVal) {
      // console.log(newVal, oldVal);
    },
    checked(newVal, oldVal) {
      if (newVal != oldVal) {
        this.SbType=''
        this.offset = 0;
        this.coinHistory = [];
        this.coinHistoryX = [];
        this.coinHistoryY = [];
        this.coinHistoryType = [];
        this.getCoinTradeHistory();
        window.addEventListener("scroll", this.handleScroll, true);
      }
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll, true);
    this.handleScroll = null;
  }
};
</script>

<style  lang="less">
#HistoryList {
  padding-bottom: 70px;
  background-color: #000;
  height: 100%;
  padding-top: 50px;
  .scrollViewShow {
    position: absolute;
    right: -230px;
    top: 0px;
    z-index: 100;
    background: #242831;
    height: 100%;
    width: 230px;
    transform: translateX(-230px);
    transition-delay: 100ms;
    // transition-property: background-color,color,padding,font-size,border;
    transition-duration: 500ms;
  }
  .scrollViewHide {
    position: absolute;
    right: -230px;
    top: 0px;
    z-index: 100;
    background: #242831;
    height: 100%;
    width: 230px;
    transform: translateX(230px);
    transition-delay: 100ms;
    // transition-property: background-color,color,padding,font-size,border;
    transition-duration: 500ms;
  }
  .back {
    padding: 0 10px;
    i {
      font-size: 15px;
      color: #bdc1cc;
      line-height: 50px;
    }
  }
  .content {
    color: #a8b5c8;
    padding: 10px 15px;
    .contentTit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        > span {
          padding: 0 5px;
        }
      }
    }
  }
  .scrollTit {
    height: 50px;
    line-height: 50px;
    padding-left: 15px;
    font-size: 16px;
    color: #f1f4fb;
  }
  .scrollStore {
  }
  .scrollStoreTit {
    height: 30px;
    padding: 5px 15px;
    color: #606978;
    font-size: 14px;
  }
  .scrollStoreCon {
    width: 200px;
    height: 40px;
    border: 1px solid #606978;
    border-radius: 5px;
    margin: 5px 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > input {
      width: 80px;
      border: none;
      background: none;
    }
  }
  .scrollTypeTit {
    height: 20px;
    padding: 5px 15px;
    color: #606978;
    font-size: 14px;
  }
  .scrollTypeCon {
    width: 200px;
    height: 40px;
    border-bottom: 1px solid #606978;
    margin: 5px 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #737f8d;
  }
  .scrollBtn {
    height: 40px;
    padding: 5px 15px;
    color: #5d96db;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    > span {
      width: 40%;
      display: block;
      height: 30px;
      border: 1px solid #606978;
      border-radius: 5px;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
      background: #fff;
    }
    :nth-child(2) {
      background: #569afd;
      color: #fff;
    }
  }
  .HistoryList {
    margin-top: 10px;
    line-height: 20px;
    color: #6d879e;
    span {
      text-align: center;
    }
  }
  .HistoryListTit {
    display: flex;
    justify-content: space-around;
  }
  .HistoryListCon {
    // display: flex;
    // justify-content: space-around;
    padding: 5px;
    border-bottom: 1px solid #333;
  }
  .sell {
    color: #cc6954;
  }
  .buy {
    color: #4bbd82;
  }
}
</style>
