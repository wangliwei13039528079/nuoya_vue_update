<template>
  <div id="OTCDeal">
    <HeaderTop title="迷你交易大厅">
      <a class="back" @click="goTo('/msite')" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
      <a class="right" @click="getcancelCount" slot="right">发布广告</a>
    </HeaderTop>
    <ul class="lis">
      <li @click="goTo('/OTCDeal/OTCBuy')" :class="$route.path=='/OTCDeal/OTCBuy'?'active':''">购买</li>
      <li @click="goTo('/OTCDeal/OTCSell')" :class="$route.path=='/OTCDeal/OTCSell'?'active':''">出售</li>
    </ul>
    <div
      style="color:#e9a44e;
    position: fixed;
    right: 10px;
    top: 60px;
    z-index: 999;"
      @click="goTo('/OTCOrder/OTCBuyOrder')"
    >订单中心</div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { reqSettingsUser, cancelCount, im } from "../../../common/apigo";
import Vue from "vue";
import axios from "axios";
import common from "../../../common/common";
import HeaderTop from "../../../components/HeaderTop/HeaderTop.vue";

import { Toast, Dialog } from "vant";
import { watch } from "fs";

Vue.use(Toast).use(Dialog);

export default {
  data() {
    return {
      uid: ""
    };
  },
  created() {
    if(this.GLOBAL.getStorage("user_token")){
      this.userOnline();
    }else{
      this.$router.push('/login')
    }
  },

  mounted() {
    let apiauth = common.getStorage("user_token");
  },

  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
      });
    },
    goTo(path) {
      this.$router.push({ path: path });
    },
    async getcancelCount() {
      let uid = this.uid;
      let types = "1";
      const result = await cancelCount({ uid, types });
      if (result.count < 3) {
        this.$router.push({ path: "/OTCRelease" });
      }
      if (result.count >= 3) {
        this.$dialog.alert({
          mes: '您的挂单撤单次数达到上限，今日无法下单！',
          callback: () => {
            this.$router.replace({ path: "/OTCDeal" })
          }
        })
        // Dialog.alert({
        //   title: "提示",
        //   message: "您的挂单撤单次数达到上限，今日无法下单！"
        // }).then(() => {
        //   this.$router.replace({ path: "/OTCDeal" });
        // });
      }
    }
  },

  components: {
    HeaderTop
  },
  destroyed() {}
};
</script>

<style scoped lang="less">
#OTCDeal {
  height: 100%;
  font-size: 14px;
  padding-bottom: 50px;

  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .right {
    position: absolute;
    right: 10px;
    line-height: 50px;
    height: 50px;
  }
  .lis {
    width: 50%;
    height: 36px;
    line-height: 36px;
    margin: 50px auto 0;
    display: flex;
    border: 1px solid #ccc;
    border-right: none;
    margin-bottom: 10px;
    li {
      width: 50%;
      text-align: center;
      border-right: 1px solid #ccc;
      &.active {
        background: url(../../../../static/image/otcBs.png);
        background-size:cover;
        // border: 1px solid #e9a44e;
      }
    }
  }
}
</style>
