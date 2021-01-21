<template>
  <div id="payElectricity">
    <div class="elecCon">
      <div class="elecVal">电费999</div>
      <div class="elecSelect">
        <div
          class="elecNum"
          v-for="(item,index) in num"
          :key="index"
          @click="goPay(item,index)"
        >{{item}}</div>
      </div>
      <van-password-input :value="value" @focus="showKeyboard = true" v-show="passShow" />

      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
        style="color:#000"
      />
    </div>
    <van-button type="primary" style="width:100%" @click="reGoPay()">确认充值</van-button>
  </div>

  <!-- 密码输入框 -->
</template>

<script>
import Vue from "vue";

import { Button } from "vant";
Vue.use(Button);

import { PasswordInput, NumberKeyboard } from "vant";
Vue.use(PasswordInput).use(NumberKeyboard);

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      num: [50, 100, 150, 200],
      payNum: null,
      value: "",
      showKeyboard: false,
      passShow:false
    };
  },

  mounted() {},
  methods: {
    goPay(item, index) {
      let docArr = document.getElementsByClassName("elecNum");
      for (var i = 0; i < docArr.length; i++) {
        document.getElementsByClassName("elecNum")[i].style.color = "#fff";
      }
      this.payNum = item;
      document.getElementsByClassName("elecNum")[index].style.color = "#f00";
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    
    if(this.value.length==6){
       this.showKeyboard = false;
       this.passShow=false 
       this.value=""  
    }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    //确认充值
    reGoPay() {
      this.showKeyboard = true;
      this.passShow=true
    }
  }
};
</script>

<style lang="less">
#payElectricity {
  height: 100%;
  background-color: #000;
  overflow: auto;
  padding: 10px;
  .top {
    .left-icon {
      position: absolute;
      display: flex;
      right: 10px;

      > a {
        padding: 10px;
        display: block;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .back {
    padding: 0 10px;
    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .elecCon {
    height: 60%;
  }
  .elecVal {
    height: 30px;
    line-height: 30px;
  }
  .elecSelect {
    display: flex;
    justify-content: space-around;
  }
  .elecNum {
    width: 18%;
    height: 60px;
    border: 1px solid #fff;
    text-align: center;
    line-height: 60px;
    margin-bottom: 200px;
  }

  @keyframes myfirst {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
