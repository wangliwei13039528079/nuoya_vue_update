<template>
  <div id="buyOTC">
    <div class="con">
      <p>币种</p>
      <select ref="cointype" @change="option">
        <option
        style="color: #000;"
          :value="item.CoinId"
          v-for="(item,index) in coinList"
          :key="index"
        >{{item.CoinName?item.CoinName.toUpperCase():''}}</option>
      </select>
      <van-icon name="arrow-down" info />
    </div>
    <!-- <div class="con">
      <div style="width:30%">手续费</div><div style="flex:1;color:#f00;font-weight:900">GM 20%;USDT 15%;PPA 30%</div>
    </div> -->
    <div class="con">
      <p>单价</p>

      <div class="stepper" style="color:#213C4D">
        <!-- <button class="minus" @click="minus">-</button> -->
        <input type="number" v-model="price"    />
        <!-- <button class="add" @click="add">+</button> -->
      </div>
    </div>
    <div class="con">
      <label for>数量</label>
      <input style="width:35%" type="number" placeholder="请输入数量" v-model="num" @input="changenum" />
      <span>( {{total}} )</span>
    </div>
    <div class="con">
      <label for>最大量</label>
      <input type="number" placeholder="请输入最大量(最少1)" v-model="max" @input="changeMax" />
    </div>
    <div class="con">
      <label for>最小量</label>
      <input type="number" placeholder="请输入最小量(最少1)" v-model="min" @input="changeMin" />
    </div>
    <div class="con">
      <p>支付方式</p>
      <van-checkbox-group v-model="pay">
        <template v-for="(item,key,index) in payType">
          <van-checkbox
            checked-color="#07c160"
            :name="item.PayType"
            :key="index"
            v-if="item"
          >{{item.PayType | payName}}</van-checkbox>
        </template>
      </van-checkbox-group>
      <van-button type="info" @click="addOther()" style="background:#e9a44e;border:none">管理支付方式</van-button>
    </div>
    <div class="con" id="cons">
      <label for>二级密码</label>
      <input
        type="password"
        v-model="value"
        @click="show=true;scroll()"
        readonly
        placeholder="请输入密码"
      />
    </div>

    <!-- 悬浮窗 --- 数字键盘-->
    <div style="height:200px;color:#213C4D" v-show="show" id="num_key">
      <van-number-keyboard
        :show="show"
        extra-key="."
        close-button-text="完成"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
      />
    </div>

    <!-- 悬浮窗 --- 数字键盘-->

    <!-- <div class="btn" @click="release()">确定</div> -->
  </div>
</template>

<script>
import {
  reqCoin,
  reqPayList,
  reqRelease,
  reqO2cPayType,
  OtcCreateOrder
} from "../../../../common/apigo";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { Checkbox, CheckboxGroup } from "vant";
Vue.use(Checkbox).use(CheckboxGroup);
import { Button } from "vant";
Vue.use(Button);
Vue.filter("payName", function(value) {
  if (value == 1) {
    return "银行卡";
  } else if (value == 2) {
    return "微信";
  } else if (value == 3) {
    return "支付宝";
  }else if (value == 4) {
    return "USDT";
  }else if (value == 5) {
    // console.log('pp')
    return "USDT";
  }
});

export default {
  data() {
    return {
      coinList: [
        {
          coin_name: "BTC"
        },
        {
          coin_name: " EOC"
        }
      ],
      price: 0,
      pay: [],
      payType: [],
      coinType: "",
      mid: "",
      num: 0,
      total: "0",
      max: "",
      min: "",
      psd: "",
      show: false,
      flag: true,
      value: "",
      // num:'',
      show: false,
      actions: [
        {
          name: "选项"
        },
        {
          name: "选项",
          subname: "描述信息"
        },
        {
          loading: true
        },
        {
          name: "禁用选项",
          disabled: true
        }
      ],
      selfPhone: ""
    };
  },

  mounted() {
    this.getCoin();
    this.userOnline();
  },
  methods: {
    addOther() {
      this.$router.push({ path: "/bank" });
    },
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.selfPhone = res.data.mobile;
        this.getPayType();
        this.getMoney();
      });
    },
    onSelect(item) {
      this.show = false;
      Toast(item.name);
    },
    async getCoin() {
      const result = await reqCoin();
      if (result.errcode == 0) {
        this.coinList = result.coin;

        this.pid = this.coinList[0].CoinId;
        this.coinType = this.coinList[0].CoinId;
        this.price = Number(this.coinList[0].CoinPrice);
      }
      if (result.errcode == -1) {
        Toast("获取币种失败");
      }
    },
    async getPayType() {
      let uid = this.uid;
      const res = await reqO2cPayType({ uid });

      this.payType = res.PayMethod;
      
      if (this.payType.length > 0) {

      if(this.coinType=='9'){
        let arr=this.payType
        arr.push({'PayType':5})
        this.payType=arr;
      }

      } else {
        Toast("请添加支付方式");
        setTimeout(() => {
          this.$router.push({ path: "/bank" });
        }, 500);
      }
    },
    async release() {
      if (this.num.length < 1) {
        this.flag = true;
        return Toast("请输入数量(最少1)");
      }
      if (this.max.length < 1) {
        this.flag = true;
        return Toast("请输入最大量(最少1)");
      }
      if (this.min.length < 1) {
        this.flag = true;
        return Toast("请输入最小量(最少1)");
      }
      if (!this.pay) {
        this.flag = true;
        return Toast("请选择支付方式");
      }
      this.showKeyboard = true;
    },
    minus() {
      if (this.price <= 0) {
        this.price = 0;
      } else {
        this.price = (Number(this.price) - 0.1).toFixed(1);
      }
    },

    add() {
      this.price = (Number(this.price) + 0.1).toFixed(1);
    },

    goTo(path, query) {
      this.$router.push({ path: path, query: query });
    },
    changenum() {
      let totalZan = (Number(this.num) * Number(this.price)).toString();
      this.total = totalZan.substring(0, totalZan.indexOf(".") + 7);
      if (Number(this.num) < 0) {
        this.num = 0;
        this.total = "";
      }
    },
    changetotal() {
      this.total = this.total.match(/^\d*(\.?\d{0,2})/g)[0];
      this.num = (this.total / this.price).toFixed(6);
      if (Number(this.total) < 0) {
        this.num = "";
        this.total = "";
      }
    },
    changeMax() {
      if (Number(this.max) < 0) {
        this.max = "";
      }
    },
    changeMin() {
      if (Number(this.min) < 0) {
        this.min = "";
      }
    },
    option() {
      this.coinType = this.$refs.cointype.value;
      // console.log(this.coinType)
      this.getPayType()
    },
    scroll() {
      let numKey = document.getElementById("cons");
      numKey.scrollIntoView(true);
    },
    onInput(key) {
      if (!this.selfPhone) {
        Toast("请去添加手机号");
        this.$router.push("/bindingMobile");
        return;
      }
      if (
        Number(this.num) >= Number(this.max) &&
        Number(this.num) >= Number(this.min) &&
        Number(this.max) >= Number(this.min)
      ) {
        if(Number(this.num)>=1 && Number(this.min)>=1 && Number(this.max)>=1){

        }else{
          this.flag = true;
        return Toast("1个起买");
        }
      } else {
        this.flag = true;
        return Toast("输入数量或最大量或最小量有误");
      }
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        if (this.num <= 0) {
          this.flag = true;
          this.showKeyboard = false;
          this.value = "";
          return Toast("请输入数量");
        }
        this.showKeyboard = false;
        let uid = this.uid;
        let mid = this.pid;
        let tradeMin = this.min.substr(0, this.min.indexOf(".") + 7);
        let tradeMax = this.max.substr(0, this.max.indexOf(".") + 7);
        let amount = this.num.substr(0, this.num.indexOf(".") + 7);
        let payTypeC = this.pay.map(item => {
          return item;
        });
        let payType = payTypeC.join(",");
        let types = "1";
        let unitPrice = this.price;
        let payPwd = this.value;
        this.value = "";
        OtcCreateOrder({
          uid,
          mid,
          tradeMin,
          tradeMax,
          payType,
          types,
          unitPrice,
          payPwd,
          amount
        }).then(res => {
          if (res.errcode == 0) {
            Toast("挂单成功");
            this.num = "";
            this.total = "";
            this.pay = [];
            this.maxPrice = "";
            this.minPrice = "";
            this.psd = "";
            this.value = "";
            setTimeout(() => {
              this.$router.replace({ path: "/OTCDeal/OTCSell" });
            }, 1000);
          } else {
            Toast(res.msg);
          }
        });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  watch: {
    coinType(newVal, oldVal) {
      this.coinList.forEach(item => {
        if (item.CoinId == newVal) {
          this.price = Number(item.CoinPrice);
          this.pid = item.CoinId;
          this.num = "";
          this.total = "";
        }
      });
      for (let key in this.moneys) {
        if (key == newVal) {
          this.balance = this.moneys[key].Num;
        }
      }
    },
    price(newVal, oldVal) {
      if (newVal != oldVal) {
        this.total = Math.floor(this.num * this.price * 100) / 100;
      }
    }
  }
};
</script>

<style lang="less">
@nice-blue: #60adf5;
#buyOTC {
  overflow: auto;
  outline: none;
  padding: 10px 15px;
  #buyOTC > input {
    outline: none;
    border: none;
  }
  .con {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ebedf0;
    align-items: center;
    position: relative;
    label,
    p {
      width: 30%;
    }
    select {
      flex: 1;
      border: none;
      color: #fff;
    }
    option {
      color: #000;
    }
    input {
      width: 70%;
      color: #fff;
      outline: none;
      border: none;
    }
  }
  .btn {
    width: 97%;
    margin: 30px auto 0;
    padding: 4% 0;
    text-align: center;
    background-color: #e9a44e;
    border-radius: 5px;
  }
  .van-checkbox {
    margin: 5px 0;
  }

  .van-checkbox__label {
    color: #fff;
  }
  .van-checkbox-group {
    flex: 1;
  }
  .stepper {
    flex: 1;
    display: flex;
    align-items: center;
    .add,
    .minus {
      width: 28px;
      height: 28px;
      display: inline-block;
      border: none;
      margin: 1px;
      padding: 5px;
      vertical-align: middle;
      font-size: 18px;
      color: #fff;
    }
    input {
      width: 30%;
      height: 28px;
      text-align: center;
    }
  }
  .van-stepper {
    flex: 1;
  }
}
</style>
