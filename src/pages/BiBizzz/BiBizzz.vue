<template>
  <div class="BiBizzz">
    <header-top :title="$t('Futures')">
      <a class="back" @click="$router.back()" slot="left">
                        <i class="iconfont iconfanhui"></i>

      </a>
    </header-top>
    <div class="content">
      <!-- <div class="con" style="border-bottom: none">
        <span for="" class="tit" style="width:100%;color:#f00;">互转需要支付矿工费1.25%</span>
      </div>-->
      <div class="con">
        <span for class="tit">{{ $t('type') }}</span>
        <div style="text-algin:right!important;float:right!important;">{{types.toUpperCase()}}</div>
      </div>
      <div class="con">
        <span for class="tit">{{ $t('accounts') }}</span>
        <input type="text" :placeholder="$t('potheraccount')" v-model="enuser" />
      </div>
      <!-- <div class="con">
        <span for="" class="tit">邀请码</span>
        <input type="text" placeholder="请输入对方邀请码" v-model="memonum">
      </div>-->
      <div class="con">
        <span for class="tit">{{ $t('amount') }}</span>
        <input type="text" :placeholder="$t('inputNum')" v-model="num" />
      </div>

      <div class="menus">
        <!-- <van-button size="large" @click="goTure()">确认</van-button> -->
        <div class="btn" @click="goTure()"> {{ $t('sure') }}</div>
      </div>

      <div
        v-if="showKeyboard"
        style="position: fixed;
    left: 0;
    top: 15%;
    z-index: 100;
    width: 100%;
    text-align: center;
    color:#000;"
      >
        <!-- <p style="font-size:20px;text-align:left;color:#f00">
          <span>请输入支付密码</span>
        </p>
        <p style="margin:5px 0">
          <span>互转数量</span>
        </p>
        <p style="font-size:26px;">
          <span>{{num}}</span>&nbsp;QBT
        </p> -->
        <van-password-input :value="value" @focus="showKeyboard = false" />
      </div>
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard=false"
      />
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import {
  req2Coinlist,
  reqTransferCoin,
  reqhutransferCoin
} from "../../common/apigo";
import { Field, Toast } from "vant";
import Vue from "vue";
Vue.use(Field);
Vue.use(Toast);

export default {
  data() {
    return {
      type: "",
      num: "",
      total: "",
      types: "",
      transfer: "",
      flag: true,
      show: false,
      psd: "",
      showKeyboard: false,
      value: "",
      coinlist: [],
      transferCoin: [],
      enuser: "",
      memonum: ""
    };
  },

  components: {
    HeaderTop
  },
  mounted() {
    this.type = this.$route.query.type;
    this.types = this.$route.query.name;
  },
  methods: {
    changeNum() {
      this.num = this.num.match(/^\d*(.?\d{0,10})/g)[0];
      if (Number(this.num) < 0) {
        this.num = "";
      }
    },
    async getCoin() {
      let uid = this.uid;
      let mid = "";
      const result = await req2Coinlist({ uid, mid });
      if (result.errcode == 0) {
        let coins = result.Balance;
        coins.forEach((item, index) => {
          if (item.CoinName != this.types) {
            this.coinlist.push(item.CoinName);
          }
          if (item.CoinName == this.types) {
            this.num = parseInt(item.Num * 1000000) / 1000000;
          }
        });
      }
    },
    async getRransfer() {
      if (!this.flag) {
        return Toast("正在互转，请稍后");
      }
      this.flag = false;

      if (this.enuser == "") {
        this.flag = true;
        this.value = "";
        return Toast("请输入对方账号");
      }
      if (this.num <= 0) {
        this.value = "";
        this.flag = true;
        Toast("输入数量无效");
        return;
      }
      if (this.value.length < 1) {
        Toast("请输入二级密码");
        this.flag = true;
        return;
      }
      let coinname = this.types;
      let num = this.num;
      let account = this.enuser;
      let payPwd = this.value;
      let result = await reqhutransferCoin({ account, num, coinname, payPwd });
      if (result) {
        this.value = "";
        Toast(result.msg);
        this.flag = true;
      }
      this.num = "";
      this.enuser = "";
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);

      if (this.value.length == 6) {
        this.showKeyboard = false;
        this.getRransfer();
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    goTure() {
      if (this.enuser == "") {
        this.flag = true;
        this.value = "";
        return Toast("请输入对方账号");
      }
      if (this.num <= 0) {
        this.value = "";
        this.flag = true;
        Toast("输入数量无效");
        return;
      }
      this.showKeyboard = true;
    }
  }
};
</script>

<style scoped lang="less">
.BiBizzz {
  height: 100%;
  padding: 50px 10px 10px;
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .content {
     background: rgb(61, 62, 70);
     width:95%;
     margin: .2rem auto;
     padding:.2em 0 .1rem 0;
    -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;
     
    .menus {
      margin-top: 10px;
    }
  }
  .type {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      max-width: 90px;
    }
    select {
      padding: 5px;
    }
  }
  .tips {
    padding: 10px 15px;
    font-size: 14px;
    margin-top: 5px;
  }
  .van-button--default {
    background-color: #7497f1;
    border: none;
  }
  .pwd-keyboard {
    .van-password-input {
      margin-top: 20px;
    }
    .van-password-input__security li {
      border: 1px solid #f00;
    }
  }
  .con {
    padding: 10px 15px;
    font-size: 14px;
    position: relative;

    // display: flex;
      background-color: rgb(60,61,69);
            border: 1px solid #eec67f;
            color: #fff;
            margin:.3rem auto;
            width: 90%;
            border-radius:5px;
    span {
      display: inline-block;
      width: 30%;
    }
    label {
      position: absolute;
      top: 10px;
      right: 15px;
    }
    input {
      border: none;
      padding: 5px 0;
      flex: 1;
      text-align: right;
    }
    select {
      width: 100%;
      border: none;
      padding-left: 5px;
      flex: 1;
    }
  }
  /deep/ .van-number-keyboard__body {
    color: #000;
  }
    .btn {
    padding: 10px 0;
    text-align: center;
    border-radius: 5px;

      background: rgb(57,57,65);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;border:none;color:#fff;position:fixed;bottom:.3rem;width:90%;left:50%;transform: translate(-50%,-50%);
                color: #fff;
                border-top: none;
  }
}
</style>
