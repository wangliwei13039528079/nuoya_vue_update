<template>
  <div id="BuyOrder">
    <div
      class="box"
      @click="goTo(`/OTCBuyOrderDetail/${item.Matchnum}`)"
      v-for="(item,index) in allOrders"
      :key="index"
    >
      <div class="list">
        <div class="listP">
          <p>
            <span
              style="padding: 8px 3px;font-size: 12px;font-weight: 900;color: #e9a44e;line-height:26px"
            >购买{{getCoinName(item.Mid)}}</span>
          </p>
          <p
            :class="item.Status==2 || item.Status==3? 'statuTwo':'statu'"
          >{{getStatus(item.Status)}}</p>
        </div>
        <div>
          <p>交易数量:{{item.Amount}}</p>
          <p v-show="item.Paytype=='5'">付款USDT:价值{{item.TotalPrice}}CNY</p>
          <p v-show="item.Paytype!='5'">交易金额:{{item.TotalPrice}}CNY</p>
          <p>订单编号：{{item.Matchnum}}</p>
        </div>
      </div>
      <div>时间:{{getTime(item.Mtime)}}</div>
    </div>
    <div class="more" @click="upload" v-if="moreShow">点击加载更多</div>
    <div class="more" v-else>没有更多数据了</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import {
  reqOTCUserOrder,
  reqCoin,
  reqChatLists
} from "../../../../common/apigo";
import { setInterval } from "timers";
export default {
  data() {
    return {
      uid: "",
      orderList: [],
      coinList: [],
      allOrders: [],
      start: -10,
      moreShow: true
    };
  },

  mounted() {
    this.userOnline();
    this.getCoin();
  },

  methods: {
    goTo(path) {
      this.$router.push({ path: path });
    },
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.getOrder();
      });
    },
    //加载更多
    upload() {
      // this.loading = true;
      this.getOrder();
    },
    async getOrder() {
      let uid = this.uid;
      let types = "1";
      let limit = "10";
      this.start = this.start + 10;
      const result = await reqChatLists({
        uid,
        types,
        limit,
        start: this.start
      });
      this.orderList = result.matchs;
      if (this.orderList.length < 10) {
        this.moreShow = false;
      }
      this.allOrders = this.allOrders.concat(this.orderList);
      if (result.errcode == -1) {
        Toast("系统错误");
      }
      if (result.errcode == -2) {
        Toast("系统错误");
      }
      if (result.errcode == -3) {
        Toast("系统错误");
      }
    },
    async getCoin() {
      const result = await reqCoin();
      if (result.errcode == 0) {
        this.coinList = result.coin;
        this.pid = this.coinList[0].CoinId;
        this.coinType = this.coinList[0].CoinName;
        this.price = Number(this.coinList[0].CoinPrice);
      }
      if (result.errcode == -1) {
        Toast("获取币种失败");
      }
    },
    getTime(time) {
      let times = new Date(Number(time) * 1000);
      let Y = times.getFullYear();
      let M =
        times.getMonth() + 1 < 10
          ? "0" + (times.getMonth() + 1)
          : times.getMonth() + 1;

      let D = times.getDate() < 10 ? "0" + times.getDate() : times.getDate();

      let h = times.getHours() < 10 ? "0" + times.getHours() : times.getHours();

      let m =
        times.getMinutes() < 10 ? "0" + times.getMinutes() : times.getMinutes();

      let s =
        times.getSeconds() < 10 ? "0" + times.getSeconds() : times.getSeconds();

      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    },
    getStatus(statu) {
      let state = "";
      switch (statu) {
        case 0:
          state = "待付款";
          break;
        case 1:
          state = "待释放";
          break;
        case 2:
          state = "已完成";
          break;
        case 3:
          state = "已撤单";
          break;
          case 4:
          state = "过期撤单";
          break;
      }
      return state;
    },
    getCoinName(Mid) {
      let coinname = "";
      this.coinList.forEach(item => {
        if (item.CoinId == Mid) {
          coinname = item.CoinName;
        }
      });
      return coinname.toUpperCase();
    }
  }
};
</script>
<style scoped lang="less">
#BuyOrder {
  height: 100%;
  overflow: auto;
  .box {
    padding: 10px;
    margin: 10px 20px;
    line-height: 26px;
    box-shadow: 0 0 9px 1px #ddd;
    border-radius: 5px;
  }
  .lists {
    padding: 10px;
  }
  .more {
    padding: 5px;
    text-align: center;
  }
  .list {
    .listP {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .statu {
      text-align: right;
      color:#e9a44e;
    }
    .statuTwo {
      text-align: right;
    }
    .user {
      p:nth-of-type(1) {
        font-weight: 700;
        span {
          padding: 2px 3px;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
