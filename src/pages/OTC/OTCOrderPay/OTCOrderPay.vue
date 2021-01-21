<template>
  <div id="orderPay">
    <HeaderTop title="支付订单">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </HeaderTop>
    <div class="user-info-box">
      <div class="masktop"></div>
      <div class="maskbottom"></div>
      <van-cell-group>
        <van-cell title="订单号" :value="order.Matchnum" />
        <!-- <van-cell title="卖家编号" :value="order.SellAccount" />
        <van-cell title="手机号" :value="order.SellPhone" /> -->
        <van-cell title="数量" :value="order.Amount" />
        <van-cell title="单价()" :value="order.Price" />
        <van-cell title="总价()" :value="order.TotalPrice" />
      </van-cell-group>
    </div>
    <div class="pay-type-box" v-for="(item,index) in PayInfo" :key="index">
      <template v-if="item.PayType == 1">
        <van-cell title="收款人名字" :value="item.Username" />
        <van-cell title="开户银行" :value="item.Bank" />
        <van-cell title="银行卡号" :value="item.Paynum" />
        <van-cell title="支行" :value="item.Branch" />
      </template>
      <template v-if="item.PayType == 3">
        <div class="pay-type-title">支付方式：支付宝</div>
        <van-cell title="收款人名字" :value="item.Username" />
        <van-cell title="收款账号" :value="item.Paynum" />
        <div @click="exhibition(item.Payimg)" class="pay-img-box">
          <img :src="imgurl + item.Payimg" />
        </div>
        <span
          style="font-size: 12px; color: #ccc;text-align: center; display: block"
        >截图二维码通过支付宝扫描相册文件进行支付</span>
      </template>
      <template v-if="item.PayType == 5">
        <div class="pay-type-title">支付方式：USDT</div>
        <!-- <van-cell title="收款人名字" :value="item.Username" /> -->
        <van-cell title="收款账号" :value="item.Paynum" />
        <div @click="exhibition(item.Payimg)" class="pay-img-box">
          <img :src="imgurl + item.Payimg" />
        </div>
        <span
          style="font-size: 12px; color: #ccc;text-align: center; display: block"
        >截图二维码通过扫描相册文件进行支付</span>
      </template>
      <template v-if="item.PayType == 2">
        <div class="pay-type-title">支付方式：微信</div>
        <van-cell title="收款人名字" :value="item.Username" />
        <van-cell title="收款账号" :value="item.Paynum" />
        <div @click="exhibition(item.Payimg)" class="pay-img-box">
          <img :src="imgurl + item.Payimg" />
        </div>
        <span
          style="font-size: 12px; color: #ccc;text-align: center; display: block"
        >截图二维码通过微信扫描相册文件进行支付</span>
      </template>
    </div>

    <div class="uploader-box">
      <van-uploader class="uploader-wrap-box" :after-read="onRead" multiple>
        <div class="dsc">
          <img :src="imgUrl" v-show="showImg" style="width: 100%" height="100%" />
          <i v-show="!showImg" class="iconfont icon-ai-up-img"></i>
          <p v-show="!showImg">上传支付凭证</p>
        </div>
      </van-uploader>
    </div>

    <div class="btn-group">
      <button
        class="btn-uploader"
        :disabled="disableds"
        @click="affirm()"
        ref="btn_uploader"
      >{{btnStr}}</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderTop from "../../../components/HeaderTop/HeaderTop.vue";

import { Toast } from "vant";

import { reqmatchInfo, Url, reqOTCgopay } from "../../../common/apigo";

import { Cell, CellGroup } from "vant";

Vue.use(Cell)
  .use(CellGroup)
  .use(Toast);

import { Icon } from "vant";

Vue.use(Icon);

import { Uploader } from "vant";

Vue.use(Uploader);
import { ImagePreview } from "vant";

Vue.use(ImagePreview);
import axios from "axios";

export default {
  data() {
    return {
      uid: "",
      imgUrl: "",
      ImagePreview: [],
      imgName: "",
      disableds: "disabled",
      order: {},
      Withdrawals: [],
      phone: "",
      codeImg: "",
      state: 0,
      btnStr: "请上传支付凭证解锁",
      cardInfo: {},
      time: "",
      timeStr: "",
      timer: "",
      Countdown: 0,
      admtime: "",
      selltime: "",
      guaorder_id: "",
      order_id: "",
      num: "",
      tradePrice: "",
      price: "",
      pay_type: [],
      matchid: "",
      url: "",
      image: "",
      baseurl: "",
      imgurl: "http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/",
      paytype: "",
      Userinfo: null,
      PayInfo: null,
      flag: true
    };
  },

  created() {
    this.userOnline();
  },
  mounted() {
    this.oid = this.$route.params.id;
    this.baseurl = Url;
  },

  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.getOrder();
      });
    },
    // 圖片
    async onRead(file) {
      const image = file.content;
      this.image = file.file;
      this.imgUrl = image;
      if (this.imgUrl) {
        this.$refs.btn_uploader.style.backgroundColor = "#e9a44e";
        this.$refs.btn_uploader.style.color = "#fff";
        this.disableds = false;
      }
      this.state = 1;
    },
    exhibition(image) {
      this.ImagePreview = [];
      this.ImagePreview.push(this.imgurl + image);
      ImagePreview(this.ImagePreview);
    },
    async getOrder() {
      let uid = this.uid;
      let matchId = this.oid;
      console.log();
      let res = await reqmatchInfo({ uid, matchId });
      if (res.errcode == -1) {
        Toast("系统错误");
      }
      if (res.errcode == -2) {
        Toast("系统错误");
      }
      if (res.errcode == -3) {
        Toast("系统错误");
      }
      this.order = res.Match;
      this.Userinfo = res.UserInfo;
      this.PayInfo = res.PayInfo;
      this.pay_type = this.order.payInfo;
      this.paytype = this.order.paytype;
      this.url = Url;
    },
    // 付款
    async affirm() {
      if (this.state == 1) {
        if (!this.flag) {
          return Toast("正在付款，请稍候");
        }
        this.flag = false;
        let data = new FormData();
        data.append("uid", this.uid);
        data.append("matchId", this.oid);
        data.append("proofImg", this.image);
        let apiauth = localStorage.getItem("user_token");
        let config = {
          headers: { "Content-Type": "multipart/form-data" },
          headers: { apiauth: apiauth }
        };
        axios.post(this.baseurl + "/o2c/pay", data, config).then(res => {
          if (res) {
            this.flag = true;
          }
          if (res.data.errcode == 0) {
            setTimeout(() => {
              this.$router.replace({
                path: `/OTCBuyOrderDetail/${this.order.Matchnum}`
              });
            }, 1000);
            this.state = 2;
            return false;
          }
          if (res.data.errcode == -1) {
            Toast("系统错误");
          }
          if (res.data.errcode == -2) {
            Toast("系统错误");
          }
          if (res.data.errcode == -3) {
            Toast("图片接收失败");
          }
          if (res.data.errcode == -4) {
            Toast("图片格式错误");
          }
          if (res.data.errcode == -5) {
            Toast("系统错误");
          }
          if (res.data.errcode == -6) {
            Toast("订单匹配结束");
          }
          if (res.data.errcode == -7) {
            Toast("系统错误");
          }
          if (res.data.errcode == -8) {
            Toast("系统错误");
          }
          if (res.data.errcode == -9) {
            Toast("您不是买家，不能付款");
          }
          if (res.data.errcode == -10) {
            Toast("付款失败");
          }
        });
      }

      if (this.state == 2) {
        this.$router.replace({ path: "/OTCOrder/OTCBuyOrder" });
        return false;
      }
    }
  },

  computed: {
    showImg() {
      if (this.imgUrl) {
        return true;
      } else {
        return false;
      }
    },
    countdown() {
      if (this.state == 2) {
        return true;
      } else {
        return false;
      }
    },
    phonenum() {
      if (this.state == 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    HeaderTop
  },

  watch: {
    state(newVal, oldVal) {
      switch (newVal) {
        case 0:
          this.btnStr = "请上传支付凭证";
          break;
        case 1:
          this.btnStr = "确认";
          break;
        case 2:
          this.btnStr = "跳转到订单页";
          break;
      }
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = "";
  }
};
</script>

<style lang="less" scoped>
@nice-blue: #60adf5;

#orderPay {
  height: 100%;
  // background-color: #fff;
  // : 0 10px;
  padding: 50px 0 10px;
  overflow: auto;

  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .masktop {
    height: 2px;
    position: absolute;
    width: 100%;
    z-index: 999;
  }
  .maskbottom {
    height: 2px;
    position: absolute;
    width: 100%;
    z-index: 999;
    top: 189px;
  }
  .user-info-box {
    padding: 10px;
  }
  .pay-type-title {
    padding: 0 15px;
    margin: 5px 0;
    font-size: 16px;
  }
  .pay-type-box {
    margin-top: 10px;
    padding: 10px 0;
    .pay-img-box {
      padding: 10px;
      height: 173px;
      border: 1px solid #423f52;
      margin: 0 15px;
      img {
        width: 150px;
        height: 150px;
        display: block;
        margin: 0 auto;
      }
    }
  }

  .uploader-box {
    margin-top: 10px;
    padding: 20px;

    .uploader-wrap-box {
      width: 100%;
      height: 100%;
      border: 1px dashed #ccc;
    }

    .dsc {
      i {
        font-size: 24px;
      }

      p {
        margin-top: 5px;
        font-size: 14px;
      }

      text-align: center;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .btn-group {
    margin-top: 5px;
    padding: 5px;

    button {
      border: none;
      width: 100%;
      height: 50px;
      background-color: #eee;
      color: #000;
      margin-bottom: 20px;
    }
  }
  .van-cell {
    justify-content: space-between;
    color: #fff;
    padding: 5px 10px;
    line-height: 20px;
  }
  .van-cell__title {
    flex: none;
  }
  .van-cell__value {
    span {
      color: #fff;
    }
  }
  .van-cell:not(:last-child)::after {
    width: 0;
  }
  /deep/ .van-uploader__wrapper {
    justify-content: center;
  }
  .uploader-box,
  .van-cell-group,
  .van-cell {
    background: rgba(0, 0, 0, 0) !important;
    color: #fff !important;
  }
  .van-field__control {
    color: #fff;
  }
  .van-cell,
  .van-field {
    background: rgba(0, 0, 0, 0) !important;
  }
}
</style>
