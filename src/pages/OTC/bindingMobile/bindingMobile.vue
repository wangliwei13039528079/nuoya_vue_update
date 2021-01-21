<template>
  <div id="bindingMobile">
    <HeaderTop :title="!mobile ? '绑定手机号' : '修改手机号'">
      <a class="back" @click="$router.back(-1)" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </HeaderTop>
    <van-cell-group>
      <van-field label="手机号" type="text" placeholder="请输入手机号" v-model="mobile" />
    </van-cell-group>

    <div class="submit" style="padding: 10px">
      <van-button
        type="primary"
        size="large"
        style="background-color:#3366cc;border:none;color:#fff"
        @click="confirmEdit()"
      >确定</van-button>
    </div>
    <van-password-input
      :value="value"
      info="支付密码"
      @focus="showKeyboard = false,isshow=false"
      v-if="isshow"
    />
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard=false,isshow=false"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Field } from "vant";
import { NumberKeyboard, Toast } from "vant";
import { Button } from "vant";

Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
Vue.use(NumberKeyboard);
import HeaderTop from "../../../components/HeaderTop/HeaderTop.vue";

export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      show: false,
      flag: "",
      key: "",
      newShow: true,
      reShow: true,
      isshow: false,
      showKeyboard: false,
      mobile: "",
      value: "",
    };
  },
  created() {
    this.userOnline()
  },
  mounted() {},

  computed: {},
  methods: {
    goTo(path) {
      this.$router.replace({ path: path });
    },

    confirmEdit() {
      (this.showKeyboard = true), (this.isshow = true);
    },
    userOnline() {
      this.$api.userInfo({}, res => {
        this.mobile = res.data.mobile;
      });
    },
    bindingMobile() {
      let mobile = this.mobile;
      this.$api.userSetMobile({ mobile }, res => {
        if(res){
            Toast(res.msg);
          }
          if (res.status) {
            this.$router.back();
          }

      });
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.showKeyboard = false;
        this.isshow = false;
        this.$api.payPwd({ pay_pwd: this.value }, res => {
          this.value = "";

          if (res.status) {
            this.bindingMobile();
          }else{
            Toast(res.msg);
          }
        });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },

  components: {
    HeaderTop
  }
};
</script>

<style lang="less">
#bindingMobile {
  padding-top: 50px;

  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  input::-webkit-input-placeholder {
    font-size: 13px;
  }
  /deep/ .van-cell__value {
    padding-left: 5px;
  }
  .van-number-keyboard{
    color: #000;
  }
}
</style>
