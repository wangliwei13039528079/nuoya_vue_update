<template>
  <div id="earnings">
    <HeaderTop title="备份助记词">
      <a class="back" @click="$router.back(-1)" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>
    <div class="buy-aminy" v-show="userInfo">
      <div class="yzm">{{userInfo}}</div>
    </div>
    <div class="btn-group" v-show="userInfo">
      <button class="btn-submit" @click="goTo('/InvestCtwo')" v-show="!helpout">下一步</button>
      <button class="btn-submit" v-show="helpout">助记词生成完毕</button>
    </div>
    <!-- <div style="padding-left:20px;font-size:16px;padding-bottom:20px" v-show="!userInfo">您还未获取助记词，请选择助记词语言</div> -->
    <!-- <van-radio-group v-model="radio" style="padding: 10px 20px" v-show="!userInfo">
      <van-radio name="1" style="color:#fff">中文</van-radio>
      <van-radio name="2" style="color:#fff">英文</van-radio>
      <van-radio name="3" style="color:#fff">日文</van-radio>
      <van-radio name="4" style="color:#fff">韩文</van-radio>
    </van-radio-group> -->
    <!-- <div class="btn-group" v-show="!userInfo">
      <button class="btn-submit" @click="goLanguage()">确定</button>
    </div> -->
  
    
  </div>
</template>

<script>
//import {reqInvestment} from "../../api";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Vue from "vue";
import { Field } from "vant";
import { RadioGroup, Radio } from "vant";
import { Toast } from "vant";

Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Field);
import { Dialog } from "vant";

Vue.use(Dialog);

import { reqMnemonic, reqMaddress } from "../../common/apigo";
import { PasswordInput, NumberKeyboard } from "vant";
import { setInterval } from "timers";

Vue.use(PasswordInput).use(NumberKeyboard);

export default {
  data() {
    return {
      userInfo: null,
      uid: null,
      language: null,
      radio: "",
      helpout: null,
      loginNum:'',
      helpWord:'',
      flag:true
    };
  },

  mounted() {
    this.userOnline();
    this.helpWord = sessionStorage.getItem('helpWord')
  },

  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.loginNum = res.data.login_num
        if(this.loginNum != 1 || this.helpWord) {
          this.isshow = true
          this.showKeyboard = true
        }else {
          this.isshow = false
          this.showKeyboard = false
        }
        this.goLanguage()
        // this.getMnemonic();
      });
    },
    async getMnemonic() {
      let uid = this.uid;
      let payPwd = this.value
      let that = this;
      const result = await reqMnemonic({ uid,payPwd });
      if(result) {
        this.value = ''
      }
      if (result.errcode == 0) {
        this.userInfo = result.mnemonic;
        this.helpout = this.GLOBAL.getStorage("helpout");
        if (this.helpout) {
        } else {
          Dialog.alert({
            message:
              "请妥善保管您的助记词，助记词一旦丢失，无法找回。为了安全起见，请不要截图。"
          }).then(() => {});
        }
      } else if (result.errcode == -2) {
        Toast("还未生成助记词,请选择助记词的语言种类");
        // this.goLanguage()
      }
    },
    async goLanguage() {
      let uid = this.uid;
      // this.overLay=true
      let language = '2';
      const result = await reqMaddress({ uid, language });
      if(result.errcode == 0) {
        this.flag = false
        Dialog.alert({
            message:
              "请妥善保管您的助记词，助记词一旦丢失，无法找回。为了安全起见，请不要截图。"
          }).then(() => {});
      }
      this.userInfo = result.mnemonic;
      sessionStorage.setItem('helpWord',this.userInfo)
      // window.onload();
    },
    goTo(path) {
      this.$router.replace({
        path: path
      });
    },
  },

  components: {
    HeaderTop
  }
};
</script>

<style lang="less">
#earnings {
  color: #fff;
//   background: #000;
  height: 100%;
  .van-radio__label {
    color: #d27a64 !important;
  }
  .van-radio {
    color: #f00 !important;
    margin: 5px 0;
    width: 50%;
  }
  .van-radio-group {
    display: flex;
    flex-wrap: wrap;
  }
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .van-password-input {
    position: fixed;
    width: 100%;
    top: 20%;
    margin: 0;
    padding: 0 20px;
    color: #000;
  }
  .van-number-keyboard {
    color: #000;
    z-index: 10000 !important;
  }

  .top {
    background-color: #37434f;
    height: 100px;
    position: relative;

    .left {
      position: absolute;
      right: 10px;
      top: 27px;

      > a {
        padding: 10px;
        display: block;
        font-size: 28px;
        color: #fff;
      }
    }

    .title {
      padding-top: 20px;
      padding-left: 20px;
      color: #fff;
      display: inline-block;
      font-size: 30px;
      margin-bottom: 5px;
    }

    .num {
      color: #fff;
      font-size: 18px;
      padding-top: 10px;
      padding-left: 20px;
    }
  }
  .check {
    width: 80%;
    margin: 20% auto 0;
  }
  .van-number-keyboard {
    color: #000;
  }
  .btn-group {
    padding: 20px;

    .btn-submit {
      width: 100%;
      height: 50px;
      color: #fff;
      background-color: #7497f1;
      // box-shadow: 1px 1px 20px #eee;
      border: none;
      border-radius: 10px;

      &:active {
        background-color: #eee;
      }
    }
  }

  .time {
    display: flex;
  }

  .list-box {
    margin-top: 5px;
    width: 100%;
    display: flex;

    > div:nth-child(2) {
      border-right: 1px solid #eee;
      border-left: 1px solid #eee;
    }

    .item {
      padding: 20px 10px;
      text-align: center;
      flex: 1;
      background-color: #fff;

      .title {
        font-size: 13px;
        padding: 5px;
      }

      .rate {
        margin-top: 5px;
        color: red;
        font-size: 1rem;
        font-weight: bold;
      }

      &.active {
        background-color: #eee;
      }
    }
  }

  .buy-aminy {
    // background-color: #000;
    padding: 20px;
    .tip {
      padding-top: 40px;
    }
    .yzm {
      height: 150px;
      background: #ccc;
      margin-top: 20px;
      text-align: center;
      line-height: 30px;
      padding: 20px;
      color: #000;
      font-size: 18px;
    }
  }

  .pwd-keyboard {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);

    .van-password-input {
      margin-top: 30%;
    }
  }
}
</style>
