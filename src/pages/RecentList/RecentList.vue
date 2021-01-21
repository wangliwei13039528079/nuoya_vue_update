<template>
  <div id="RecentList">
    <HeaderTop title="最近委托">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>
    <div>最近委托</div>
    <div class="HistoryListCon" v-for="(item,index) in coinHistory" :key="index">
      <p style="display:flex;justify-content: space-between;">
        <span
          style="font-size:16px;width:200px;text-align:left"
          :class="item.Type==2?'sell':'buy'"
        >限时{{item.Type==2?"卖出":"买入"}}{{item.CoinPair.toUpperCase()}}</span>
        <span class="cancelBtn" @click="goCancel(item.OrderId)">撤单</span>
      </p>
      <div style="display:flex;justify-content: space-between;">
        <p style="display: flex;flex-direction: column;">
          <span>价格</span>
          <span>{{item.Price}}</span>
        </p>
        <p style="display: flex;flex-direction: column;">
          <span>数量</span>
          <span>{{item.Amount}}</span>
        </p>
        <p style="display: flex;flex-direction: column;">
          <span>实际成交</span>
          <span>{{(item.Amount-item.AmountRemain).toFixed(4)}}</span>
        </p>
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
      coinHistory: [],
      offset: 0,
      coinPa: null
    };
  },
  mounted() {
    this.coinPa = this.$route.query.coinPa;
    this.userInfo();
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    //获取信息
    userInfo() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.getCoinTradeHistory();
      });
    },
    handleScroll(e) {
      var scrollTop = e.target.scrollTop;
      var windowHeight = e.target.clientHeight;
      var scrollHeight = e.target.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        // console.log(
        //   "距顶部" +
        //     scrollTop +
        //     "可视区高度" +
        //     windowHeight +
        //     "滚动条总高度" +
        //     scrollHeight
        // );
        this.offset++;
        this.getCoinTradeHistory();
      }
    },
    //获取交易历史
    async getCoinTradeHistory() {
      let uid = this.uid;
      let offset = this.offset;
      let limit = "10";
      let coinPair = this.coinPa.toLowerCase();
      let type = "";
      let status = "0";
      let res = await reqCoinTradeHistory({
        uid,
        offset,
        limit,
        coinPair,
        type,
        status
      });
      if (res.errcode == 0) {
        if(res.tradeHistory.length<10){          
          window.removeEventListener("scroll", this.handleScroll, true);
          this.handleScroll=null;
        }
        this.coinHistory = this.coinHistory.concat(res.tradeHistory);
        // console.log(this.coinHistory)
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
    //撤单
    async goCancel(OrderId) {
      let uid = this.uid;
      let orderId = OrderId;
      let res = await reqCancelTrade({ uid, orderId });
      switch (res.errcode) {
        case 0:
          Toast("撤单成功");
          this.coinHistory = this.coinHistory.filter((item, index) => {
            return item.OrderId != orderId;
          });
          break;
        case -1:
          Toast("uid为空");
          break;
        case -2:
          Toast("订单号为空");
          break;
        case -3:
          Toast("获取交易失败");
          break;
        case -4:
          Toast("匹配中，请刷新");
          break;
        case -7:
          Toast("更新用户余额失败");
          break;
        default:
          Toast("撤单失败");
      }
    }
  }
};
</script>

<style  lang="less">
#RecentList {
  background-color: #000;
  height: 100%;
  color: #999;
  padding: 50px 15px 70px;
  .back {
    padding: 0 10px;
    i {
      font-size: 15px;
      color: #bdc1cc;
      line-height: 50px;
    }
  }
  .sell {
    color: #cc6954;
  }
  .buy {
    color: #4bbd82;
  }
  .cancelBtn {
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    border: 1px #333 solid;
  }
  .HistoryListCon {
    padding: 5px;
    border-bottom: 1px solid #333;
    line-height: 30px;
    p {
      text-align: center;
      span {
        width: 60px;
        height: 26px;
        text-align: center;
        line-height: 26px;
      }
    }
  }
}
</style>
