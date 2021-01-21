<template>
  <div id="orderBuys">
    <div class="content">
      <div class="order-item" v-for="(item,index) in allOrders" :key="index">
        <p style="display: flex; justify-content: space-between">
          <span class="item-left">挂单编号</span>
          <span class="item-right">{{item.Ordernum}}</span>
        </p>
        <p style="display: flex; justify-content: space-between">
          <span class="item-left">币种类型</span>
          <span class="item-right">{{coin(item.Mid).toUpperCase()}}</span>
        </p>
        <p style="display: flex; justify-content: space-between">
          <span class="item-left">挂单数量</span>
          <span class="item-right">{{Number(item.Amount)}}</span>
        </p>
        <p style="display: flex; justify-content: space-between" v-if="item.Status !=3">
          <span class="item-left">未卖出数量</span>
          <span class="item-right">{{Number(item.SurplusAmount)}}</span>
        </p>
        <p style="display: flex; justify-content: space-between">
          <span class="item-left">单价</span>
          <span class="item-right">{{item.Price}}CNY</span>
        </p>
         <p style="display: flex; justify-content: space-between">
          <span class="item-left">匹配金额</span>
          <span class="item-right">{{item.MatchPrice}}CNY</span>
        </p>
        <p style="display: flex; justify-content: space-between">
          <span class="item-left">挂单时间</span>
          <span class="item-right">{{getTime(item.Ctime)}}</span>
        </p>
        <p style="display: flex; justify-content: flex-end">
          <span
            class="item-right cancel"
            v-if="item.Status == 0 || item.Status == 1"
            @click="cancel(item.Ordernum)"
          >撤单</span>
          <span
            :class="item.Status==0 ||item.Status==1? 'item-right statu':'item-right statutwo'"
            v-else
          >{{getStatus(item.Status)}}</span>
        </p>
      </div>
      <div class="more" @click="upload" v-if="moreShow">点击加载更多</div>
      <div class="more" v-else>没有更多数据了</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import {
  reqOTCUserOrder,
  reqOTCucancel,
  reqCoin,
  cancelOrder
} from "../../../../common/apigo";

export default {
  name: "MountOrderBuy",
  data() {
    return {
      uid: "",
      order: [],
      coins: [],
      start: -10,
      allOrders: [],
      moreShow: true,
      flag: true
    };
  },
  mounted() {
    this.userOnline();
    // this.getBuyOrders()
    this.getCoin();
  },
  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.getBuyOrders();
      });
    },
    upload() {
      this.loading = true;
      this.getBuyOrders();
    },
    async getBuyOrders() {
      let uid = this.uid;
      let types = "2";
      let limit = "10";
      this.start = this.start + 10;
      let res = await reqOTCUserOrder({ uid, types, limit, start: this.start });
      this.order = res.orders;
      if (this.order.length < 10) {
        this.moreShow = false;
      }
      this.allOrders = this.allOrders.concat(this.order);
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
    async cancel(id) {
      let uid = this.uid;
      let types = "2";
      let oid = id;
      if (!this.flag) {
        return;
      }
      let res = await cancelOrder({ uid, oid, types });
      if (res.errcode == 0) {
        Toast("撤单成功");
        this.allOrders = [];
        (this.start = -10), this.getBuyOrders();
      } else {
        Toast(res.msg);
      }

      this.flag = false;
    },
    async getCoin() {
      let res = await reqCoin();
      this.coins = res.coin;
      if (res.errcode == -1) {
        Toast("获取币种失败");
      }
    },
    coin(mid) {
      let coin = "";
      this.coins.forEach(item => {
        if (mid == item.CoinId) {
          coin = item.CoinName;
        }
      });
      return coin;
    },
    getStatus(statu) {
      let state = "";
      switch (statu) {
        case 0:
          state = "未匹配";
          break;
        case 1:
          state = "已匹配";
          break;
        case 2:
          state = "订单结束";
          break;
        case 3:
          state = "已撤单";
          break;
        default:
          state = "系统撤单";
          break;
      }
      return state;
    }
  }
};
</script>

<style scoped lang="less">
#orderBuys {
  font-size: 14px;
  .more {
    padding: 5px;
    text-align: center;
  }
  .content {
    .order-item {
      margin-top: 5px;
      padding: 10px;
      margin: 10px 20px;
      box-shadow: 0 0 9px 1px #ddd;
      border-radius: 5px;

      > p {
        padding: 5px;
      }
    }
    .cancel {
      padding: 5px;
      background-color: #e9a44e;
      color: #fff;
    }
    .statutwo {
      color: #e9a44e;
    }
    .statu {
      color: #e9a44e;
    }
  }
}
</style>
