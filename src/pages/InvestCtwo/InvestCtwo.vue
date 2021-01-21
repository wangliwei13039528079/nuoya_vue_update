<template>
  <div id="InvestCtwo">
    <HeaderTop title="确认助记词">
      <a class="back" @click="goTo('/')" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>
    <div class="buy-aminy">
      <div class="tip">请按顺序点击你的助记词，以便确认备份助记词的正确</div>
      <div class="yzm">{{str}}</div>
      <input class="ipt" v-model="selectd" @focus="show">
      <div
        class="ccc"
        v-show="isShow"
        v-for="(item,index) in arr"
        :key="index"
        @click="selected(item,index)"
      >{{item}}</div>
    </div>
    <div></div>

    <div class="btn-group" style="padding: 0 15px">
      <!-- <button @click="goIndex()"></button> -->
      <van-button
        size="large"
        style="margin-top:30px;background:#7497f1;color:#fff;border:none"
        @click="goIndex()"
      >助记词已抄好</van-button>
    </div>
  </div>
</template>

<script>
import { reqMnemonic } from "../../common/apigo";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Vue from "vue";
import { Field } from "vant";
import { RadioGroup, Radio } from "vant";
import { Toast } from "vant";

import { Collapse, CollapseItem } from "vant";

Vue.use(Collapse).use(CollapseItem);

Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Field);

import {reqConfirmMnemonic} from '../../common/apigo'

import { PasswordInput, NumberKeyboard } from "vant";

Vue.use(PasswordInput).use(NumberKeyboard);
import { Button } from "vant";
import { connect } from "net";

Vue.use(Button);
export default {
  data() {
    return {
      userInfo: null,
      listInfo: [],
      arrInfo: null,
      listInfo2: null,
      list1: null,
      list2: null,
      list3: null,
      list4: null,
      listInfof: [],
      isShow: true,
      selectd: "",
      arr: [],
      newarr: [],
      strarr: [],
      str: "",
      uid:''
    };
  },

  mounted() {
    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // this.listInfo2=this.userInfo.mnemonic;
    // this.listInfo2 ="civil kingdom tide myself notice fog maid mutual sauce liquid door spatial";
    this.userOnline();
  },

  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.getMnemonic();
      });
    },
    async getMnemonic() {
      // let uid = this.uid;

      // const result = await reqMnemonic({ uid });
      // this.listInfo2 = result.mnemonic;
      this.listInfo2 = sessionStorage.getItem('helpWord');
      this.listInfo = this.listInfo2.split(" ");
      this.list1 = this.listInfo.splice(0, 3).join(" ");
      this.list2 = this.listInfo.splice(0, 3).join(" ");
      this.list3 = this.listInfo.splice(0, 3).join(" ");
      this.list4 = this.listInfo.splice(0, 3).join(" ");
      this.arr.push(this.list2);
      this.arr.push(this.list3);
      this.arr.push(this.list1);
      this.arr.push(this.list4);
    },
    show() {
      this.isShow = true;
    },
    goTo(path) {
      this.$router.replace({ path: path });
    },
    selected(val, index) {
      this.selectd = val;
      let arr = this.arr;
      let newarr = this.newarr;
      newarr.push(arr.splice(index, 1));
      this.strarr.push(val);
      this.str = this.strarr.join(" ");
      this.newarr = newarr;
    },
    async goIndex() {
      if (this.listInfo2 == this.str) {
        this.$router.replace({
          path: "/"
        });
        this.GLOBAL.setStorage('helpout', "1")
        let uid = this.uid
        let res = await reqConfirmMnemonic({uid})
        if(res.errcode == -2) {
          Toast('确认失败')
        }
      } else {
        Toast("助记词错误");
        this.strarr = [];
        this.str = null;
        this.listInfo = this.listInfo2.split(" ");
        this.list1 = this.listInfo.splice(0, 3).join(" ");
        this.list2 = this.listInfo.splice(0, 3).join(" ");
        this.list3 = this.listInfo.splice(0, 3).join(" ");
        this.list4 = this.listInfo.splice(0, 3).join(" ");
        if (this.arr.length <= 0) {
          this.arr.push(this.list2);
          this.arr.push(this.list3);
          this.arr.push(this.list1);
          this.arr.push(this.list4);
        }
      }
    }
  },
  components: {
    HeaderTop
  }
};
</script>

<style scoped lang="less">
#InvestCtwo {
  color: #999;
//   background: #000;
  height: 100%;

  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
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

  .buy-aminy {
    // background-color: #000;
    padding: 20px;
    .tip {
      padding-top: 20px;
      font-size: 16px;
      font-weight: 900;
    }
    .yzm {
      height: 150px;
      background: #eee;
      margin-top: 20px;
      line-height: 30px;
      padding: 20px;
      font-size: 18px;
      margin-bottom: 30px;
      color: #000;
    }
    .ipt {
      margin-top: 30px;
      width: 0px;
      height: 0px;
      line-height: 0px;
      float: left;
      // border: 1px solid #ccc;
      border:none;
      background: none;
    }
    .ccc {
      float: left;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: #eee;
      border-bottom: 1px solid #ccc;
      padding: 0 10px;
      font-size: 14px;
      color: #000;
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
