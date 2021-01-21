<template>
  <div id="OTCSell">
    <van-tabs v-model="active">
      <van-tab
        :title="items.CoinName.toUpperCase()"
        v-for="(items,index) in coinList"
        :key="index"
        @click="getOrder(items.CoinId)"
      >
        <div v-if="allOrders == null" class="tip">暂无内容</div>
        <div
          class="content"
          v-for="(item,index) in allOrders"
          :key="index"
          v-show="item.Mid==items.CoinId"
        >
          <div class="user">
            <p
              style="color:#e9a44e"
            >{{item.Account.substr(0,3)}}******{{item.Account.substr(item.Account.length-2,item.Account.length)}}</p>
            <!-- <div class="ratio">
              <!--<span>成交量{{item.Tradenum}}</span>-->
            </div>
          </div> -->

          <div class="num">
            <p>剩余数量:{{item.SurplusAmount}}</p>
            <p>单价</p>
          </div>
          <div class="limit">
            <p>限量:{{Number(item.Min)}}-{{Number(item.Max)}}</p>
            <p style="color:#e9a44e" class="cny">￥{{toDecimal2(item.Price)}}</p>
          </div>
          <!-- <div class="user">
            <p style="font-size:14px"
            >手续费<span style="color:#f00">5%</span></p>
          </div> -->
          <div class="confirm">
            <div class="pay">
              <van-icon v-if="item.Paytype.indexOf('3') != -1" color="#06B4FD" name="alipay" />
              <van-icon v-if="item.Paytype.indexOf('2') != -1" color="#50B674" name="wechat" />
              <van-icon v-if="item.Paytype.indexOf('1') != -1" color="#F4EA2A" name="card" />
              <!-- <img style="width:24px;height:24px;" v-if="item.Paytype.indexOf('4') != -1" src="../../../../../static/image/usdt.png" alt="" srcset=""> -->
            </div>
            <button
              :disabled="disabled"
              class="affirm_btn"
              @click="goBuy(item.Price,item.Ordernum,item.Account,item.Max,item.Min,item.Paytype)"
              style="text-align:center;"
            >出售</button>
          </div>
        </div>
        <div class="more" @click="upload" v-if="moreShow">点击加载更多</div>
        <div class="more" v-else>没有更多数据了</div>
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" position="bottom">
      <div class="popup">
        <h3>出售{{coinname}}</h3>
        <p>买家:&nbsp;{{user}}</p>
        <div style="display:flex;justify-content:space-between">
          <p>限量:{{min}}-{{max}}</p>
          <p>
            单价
            <span>￥{{price}}</span>
          </p>
        </div>
        <div v-show="coinType!='USDT' && isFive"  style="display:flex;align-items: center;">
          <p>场内USDT支付：</p>
          <p>
            <van-checkbox v-model="radio">usdt</van-checkbox>
            <!-- <van-radio-group v-model="radio">  :disabled='usdtFlag'
  <van-radio name="2" :disabled='usdtFlag'>usdt</van-radio>
</van-radio-group> -->
          </p>

        </div>
        <div class="number" style="padding-bottom:0">
          <label for>数量</label>
          <input type="number" placeholder="请输入出售数量" @input="inputNum" v-model="account" />
        </div>
        <div v-show="!radio" style="padding-left:5px;">
          <i class="iconfont icon-xianghujiaohuan-shangxia" style="font-size:20px;"></i>
        </div>
        <div v-show="!radio" class="number" style="padding-top:0">
          <label for>金额</label>
          <input type="number" @input="inputFun" v-model="num" disabled style="border:none" />
        </div>
        <div class="pwd">
          <label for>密码</label>
          <input type="password" placeholder="请输入支付密码" v-model="pwd" @input="change" />
        </div>
        <div class="btn" @click="confirm">确定</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import Swiper from "swiper";
import { Toast } from "vant";
Vue.use(Toast);
import { Icon } from "vant";
import { Loading } from "vant";
Vue.use(Loading);
import { RadioGroup, Radio } from 'vant';

Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Icon);
import { Popup } from "vant";
Vue.use(Popup);
import { Dialog } from "vant";
Vue.use(Dialog);
import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Checkbox).use(CheckboxGroup);
import {
  reqCoin,
  reqOTCOrder,
  reqcmatch,
  reqO2cPayType,
  createMatch,
  matchCancelCount,
  req2Coinlist
} from "../../../../common/apigo";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      uid: "",
      coinList: [],
      disabled: false,
      flag: true,
      show: false,
      coinname: "",
      pwd: "",
      pid: "",
      orderList: [],
      price: "",
      oid: "",
      num: "",
      user: "",
      min: "",
      max: "",
      bank: false,
      wepay: false,
      aipay: false,
      value: 0,
      paytypeNum: null,
      active: 0,
      account: 0,
      start: -10,
      allOrders: [],
      moreShow: true,
      loading: false,
      selfPhone: "",
      isStore: "",
      usdtFlag:true,
      radio:false,
      coinType:'',
      isFive:false
    };
  },
  mounted() {
    this.userOnline();
  },

  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.selfPhone = res.data.mobile;
        this.isStore = res.data.dealer;
        this.getmatchCancelCount();
        this.getPay();
        this.getCoin();
      });
    },
    goTo(path) {
      this.$router.push(path);
    },
    toDecimal2(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return false;
      }
      var f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + 2) {
        s += "0";
      }
      return s;
    },
    async getmatchCancelCount() {
      let uid = this.uid;
      let types = "1";
      const result = await matchCancelCount({ uid, types });
      if (result.count < 3) {
        this.disabled = false;
      }
      if (result.count == 3) {
        this.disabled = true;
      }
      if (result.errcode == -1) {
        Toast("系统错误");
      }
      if (result.errcode == -2) {
        Toast("系统错误");
      }
    },
    async getCoin() {
      const res = await reqCoin();
      this.coinList = res.coin;
      this.pid = this.coinList[0].CoinId;
      this.coinType = this.coinList[0].CoinName;
      this.getOrder(this.pid, this.coinname);
      this.$nextTick(() => {
        this.initSwiper();
      });
      if (res.errcode == -1) {
        Toast("获取币种失败");
      }
    },
    async getOrder(id) {
      let mid = id;
      let types = "1";
      let limit = "10";
      this.start = this.start + 10;
      const result = await reqOTCOrder({
        mid,
        types,
        limit,
        start: this.start
      });
      this.orderList = result.orders;
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
        Toast("获取交易单失败");
      }
    },
    async getOrderrefs() {
      let mid = this.pid;
      let types = "1";
      let limit = "10";
      this.start = 0;
      const result = await reqOTCOrder({
        mid,
        types,
        limit,
        start: this.start
      });
      this.orderList = result.orders;
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
        Toast("获取交易单失败");
      }
    },
    upload() {
      this.loading = true;
      this.getOrder(this.pid);
    },

    async getPay() {
      let uid = this.uid;
      let res = await reqO2cPayType({ uid });
      res.PayMethod.forEach(item => {
        if (item.PayType == 1) {
          this.bank = 1;
        } else if (item.PayType == 2) {
          this.wepay = 2;
        } else if (item.PayType == 3) {
          this.aipay = 3;
        }
      });
    },
    async goBuy(price, Ordernum, user, max, min, payType) {
      let payTypes = payType.split(",");
      let paytypeFlag = false;
      let uid = this.uid;
      let res = await reqO2cPayType({ uid });
      payTypes.map(item => {
        res.PayMethod.map(it => {
          if (item == it.PayType) {
            paytypeFlag = true;
          }
        });
      });


            payTypes.map((i)=>{
        if(i==5){
this.isFive=true
        }else{
if (!paytypeFlag) {
        Toast("您的支付方式与此订单支付方式不匹配，请先去添加支付方式");
        this.$router.push("/bank");
        return;
      }
        }
      })
      // if (this.isStore != 2) {
      //   this.$router.push("/Profile");
      //   return Toast("请去我的里面申请商户");
      // }

      if (this.selfPhone) {
        this.show = true;
        this.price = price;
        this.oid = Ordernum;
        this.user = user;
        this.max = Number(max);
        this.min = Number(min);
        this.num = "";
        this.pwd = "";
        this.money = "";
        this.account = 0;
      } else {
        Toast("请去添加手机号");
        this.$router.push("/bindingMobile");
      }
      let balance = await req2Coinlist({});
      balance.Balance.map((item)=>{
        if(item.CoinName=='usdt'){
          if(item.Num>0){
// this.usdtFlag=false
          }
        }
      })
    },
    async confirm() {
      // console.log(!this.usdtFlag ,this.radio) !this.usdtFlag &&
            if(this.radio){
      if (!this.flag) {
            return Toast("正在下单，请稍后");
          }
          this.flag = false;
          let uid = this.uid;
          let amount = this.account
            .toString()
            .substr(0, this.account.indexOf(".") + 7);
          let oid = this.oid;
          let payPwd = this.pwd;
          if (Number(amount) <= 0) {
            this.flag = true;
            return Toast("请输入数量");
          }
          if (payPwd.length < 1) {
            this.flag = true;
            return Toast("请输入密码");
          }
          let usdtType=2
          createMatch({ uid, payPwd, amount, oid,usdtType }).then(res => {
            this.flag = true;
            this.num = "";
            this.oid = "";
            this.pwd = "";
            this.show = false;
            this.allOrders = [];
            this.getOrderrefs();
// this.radio="0"
            if (res.errcode == 0) {
              Toast("下单成功");
              setTimeout(() => {
                this.$router.push({ path: "/OTCOrder/OTCSellOrder" });
              }, 1000);
            } else {
              Toast(res.msg);
            }
          });

        }else{
          Dialog.confirm({
        title: "提示",
        message:
          " 卖出成功后请及时联系买家，30分钟内付款，若超时未付款，自动取消此订单"
      })
        .then(() => {
          if (!this.flag) {
            return Toast("正在下单，请稍后");
          }
          this.flag = false;
          let uid = this.uid;
          let amount = this.account
            .toString()
            .substr(0, this.account.indexOf(".") + 7);
          let oid = this.oid;
          let payPwd = this.pwd;
          if (Number(amount) <= 0) {
            this.flag = true;
            return Toast("请输入数量");
          }
          if (payPwd.length < 1) {
            this.flag = true;
            return Toast("请输入密码");
          }
          let usdtType=0
          createMatch({ uid, payPwd, amount, oid,usdtType }).then(res => {
            this.flag = true;
            this.num = "";
            this.oid = "";
            this.pwd = "";
            this.show = false;
            this.allOrders = [];
            this.getOrderrefs();

            if (res.errcode == 0) {
              Toast("下单成功");
              setTimeout(() => {
                this.$router.push({ path: "/OTCOrder/OTCSellOrder" });
              }, 1000);
            } else {
              Toast(res.msg);
            }
          });
        })
        .catch(() => {
          this.show = false;
        });
}
    },
    changeMoney() {
      this.num = Math.round((this.money / this.price) * 1000000) / 1000000;
    },
    changeNum() {
      this.money = this.num * this.price;
    },
    initSwiper() {
      var swiper = new Swiper(".swiper-container", {
        direction: "horizontal", // 垂直切换选项
        slidesPerView: "auto"
      });
    },
    change() {
      this.pwd = this.pwd.replace(/\D/g, "");
    },
    inputNum() {
      this.num = Math.floor(this.account * this.price * 100) / 100;
    },
    inputFun(e) {
      this.num = this.num.match(/^\d*(\.?\d{0,2})/g)[0];
      this.account = (this.num / this.price).toFixed(6);
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.pid = this.coinList[newVal].CoinId;
      this.coinType = this.coinList[newVal].CoinName;
      this.start = -10;
      this.allOrders = [];
      this.moreShow = true;
      this.getOrder(this.pid, this.coinname);
      // this.radio="0"
    }
  }
};
</script>

<style lang="less">
#OTCSell {
  padding: 0 10px;
  font-size: 14px;
  padding-bottom: 70px;
  height: 100%;
  overflow: scroll;
  .van-ellipsis {
    font-weight: 900;
  }
  .van-tabs__line {
    height: 5px;
    background: #e9a44e;
  }
  .swiper-container {
    width: 100%;
    overflow: hidden;
    .swiper-slide {
      width: 20%;
      padding: 10px 0;
      text-align: center;

      &.active {
        border-bottom: 1px solid #213c4d;
      }
    }
  }
  .more {
    padding: 5px;
    text-align: center;
  }
  .van-loading {
    margin: auto;
  }
  .content {
    margin-top: 10px;
    padding: 20px 10px 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px #ddd;

    .user,
    .num,
    .limit,
    .confirm {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      padding-bottom: 10px;
      .ratio {
        span:nth-of-type(2) {
          padding-left: 5px;
        }
        span:nth-of-type(1) {
          padding-right: 10px;
        }
      }
      p {
        font-weight: 700;
        font-size: 18px;
      }
    }
    .num {
      padding: 5px 0;
    }
    .limit {
      margin-bottom: 10px;
      .cny {
        font-size: 24px;
        font-weight: 700;
      }
    }
    .confirm {
      .affirm_btn {
        border: none;
        box-shadow: none;
        padding: 10px 20px;
        background-color: #16A38A;
        border-radius: 5px;
      }
      .pay {
        i {
          font-size: 24px;
        }
      }
    }
  }
  .popup {
    font-size: 16px;
    padding: 10px;
    h3 {
      padding: 10px 0;
      font-size: 18px;
      font-weight: 400;
    }
    p {
      line-height: 30px;
      span {
        font-weight: 700;
        padding-left: 5px;
      }
    }
    .number,
    .pwd {
      padding: 10px 0;
      display: flex;
      align-items: center;
      input {
        border: 1px solid #ccc;
        padding: 10px 5px;
        width: 85%;
        margin-left: 2%;
      }
    }
    .btn {
      width: 90%;
      margin: 10px auto 0;
      padding: 10px 0;
      text-align: center;
      background-color: #16A38A;
    }
  }
  .icon {
    position: fixed;
    right: 15px;
    bottom: 70px;
    display: inline-block;
    padding: 5px 6px;
    border: 3px solid #fff;
    border-radius: 50%;

    i {
      font-size: 25px;
      color: #fff;
    }
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .van-tabs__nav,
  .van-tabs__nav--line {
    background-color: rgba(0, 0, 0, 0);
  }

  .van-tab {
    color: #fff;
  }
  .van-tab--active {
    color: #e9a44e;
  }
  .van-popup {
    color: #000;
  }
}
</style>
