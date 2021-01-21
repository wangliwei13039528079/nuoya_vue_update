<template>
  <div id="exportHelpWord">
    <HeaderTop :title="$t('Backupmnemonics')">
      <a class="back" @click="$router.back(-1)" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>
    <div class="buy-aminy waimian" v-show="userInfo" >
      <div class="neimiantitle">备份助记词</div>
      
           <div class="neimian">{{userInfo}}</div>
        
    </div>
     <div class="btn-group" v-show="userInfo">
      <button class="btn-submit" @click="goTo('/InvestCtwo')" v-show="confirmed == 0">下一步</button>
      <button class="btn-submit" v-show="confirmed == 1">{{ $t('over') }}</button>
    </div>


    <!-- <div @click="isshow = true; showKeyboard = true" class="check">

      查看助记词
    </div> -->
    <!-- 密码输入框 -->
    <van-password-input  :value="value" :info="$t('key6')" @focus="showKeyboard = true" v-if="isshow"/>

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
    />
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
      showKeyboard: false,
      isshow: false,
      value:'',
      loginNum:'',
      helpWord:'',
      flag:true,
      confirmed:''
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
        this.isshow = true
        this.showKeyboard = true
        // if(this.loginNum != 1 || this.helpWord) {
        //   this.isshow = true
        //   this.showKeyboard = true
        // }else {
        //   this.isshow = false
        //   this.showKeyboard = false
        // }
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
        this.confirmed = result.confirmed
        this.helpout = this.GLOBAL.getStorage("helpout");
        sessionStorage.setItem('helpWord',this.userInfo)
        if (this.confirmed) {
        } else {
          Dialog.alert({
            message:
              "请妥善保管您的助记词，助记词一旦丢失，无法找回。为了安全起见，请不要截图。"
          }).then(() => {});
        }
      } else if (result.errcode == -2) {
        Toast("密码错误,请重新输入");
        this.isshow = true
          this.showKeyboard = true
        // this.goLanguage()
      } else if(result.errcode == -3) {
          Toast('密码错误,请重新输入')
          this.isshow = true
          this.showKeyboard = true
      }else if(result.errcode == -4) {
          Toast('还未生成助记词，请先生成助记词')
          this.$router.replace({path:'/InvestEasy'})
      }
    },
    async goLanguage() {
      let uid = this.uid;
      // this.overLay=true
      let language = this.radio;
      const result = await reqMaddress({ uid, language });
      if(result.errcode == 0) {
        this.flag = false
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
     // 输入密码
    onInput(key) {

      this.value = (this.value + key).slice(0, 6);
      if(this.value.length == 6) {
          this.isshow = false
          this.showKeyboard = false
          this.getMnemonic()
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
  },

  components: {
    HeaderTop
  }
};
</script>

<style lang="less">
#exportHelpWord {
  color: #fff;
//   background: #000;
  height: 100%;
  padding-top: 50px;
  .van-radio__label {
    color: #d27a64 !important;
  }
  .van-radio {
    color: #f00 !important;
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
    padding: 0 10px;
    color: #000;
  }
  .van-number-keyboard {
    color: #000;
    // z-index: 10000 !important;
  }
  .van-number-keyboard__body {
    z-index: 100000 !important;
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
    padding: 15px;

    .btn-submit {
      width: 100%;
      height: 40px;
      color: #fff;
     background:rgb(53,54,61);
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
   .waimian{
               background: rgb(61,62,70);
               
                width: 92%;
                margin: 0 auto;
                color: #000;
                 border-radius: 5px;
                padding: 0 0 2px 0;
                 -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
                box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
        }
  .buy-aminy {

    .tip {
      padding-top: 40px;
    }
    .yzm {
      height: 150px;
      margin-top: 20px;
      text-align: center;
      line-height: 30px;
      padding: 20px;
      color: #fff;
      font-size: 18px;
    }
           .neimian{
color:#ababab;
white-space: wrap;
word-wrap:break-word;
font-size:16px;
margin:15px 15px 15px 15px;
line-height:30px;
border:1px solid rgb(138, 119, 89);
padding:10px 10px;
border-radius:5px;
        }
     
        .neimiantitle{
         border-left:2px solid rgb(238, 198, 127);
         border-bottom:1px solid rgb(49, 50, 59);
         margin: .4rem .3rem 0 0;
         color: #fff;
         font-size:14px;
         padding: 10px 10px 10px 10px;
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
