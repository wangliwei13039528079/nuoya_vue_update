<template>
  <div id="orderDetail">
    <HeaderTop title="订单详情">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </HeaderTop>
    <div class="statu">
      <h2>{{getStatus(order.Status)}}</h2>
      <p v-if="order.Status == 0">{{residueTime}}</p>
    </div>
    <div class="orderInfo">
      <!-- <div class="top">
        <p>
          卖家：
          <span style="color:#e9a44e">{{order.SellAccount}}</span>
        </p>
        <p>
          买家：
          <span style="color:#e9a44e">{{order.BuyAccount}}</span>
        </p>
      </div> -->
      <div class="center">
        <div class="column">
          <p>订单编号</p>
          <p>卖家电话</p>
          <p v-show="order.Paytype=='5'">支付USDT</p>
          <p v-show="order.Paytype!='5'">总价</p>
          <p>数量</p>
          <p v-show="order.Paytype!='5'">单价</p>
        </div>
        <div style="text-align:right;" class="column">
          <p>{{order.Matchnum}}</p>
          <p>{{order.SellPhone}}</p>
          <p v-show="order.Paytype=='5'" class="money" style="font-size:24px;">{{order.TotalPrice}}</p>

          <p v-show="order.Paytype!='5'" class="money" style="font-size:24px;">{{order.TotalPrice}}</p>

          <p>{{order.Amount}}</p>
          <p v-show="order.Paytype!='5'">{{order.Price}}</p>
        </div>
      </div>
      <div class="wallet">
        <p @click="goTo('/CashAssets')" v-if="order.Status == 2">查看钱包</p>
        <p v-if="order.Status != 0 && order.Status != 2">{{getStatus(order.Status)}}</p>
        <div class="way">
          <button @click="goTo(`/OTCOrderPay/${order.Matchnum}`)" v-if="order.Status == 0">去付款</button>
          <button v-if="order.Status == 0" @click="mcancel(order.Matchnum)">撤销</button>
        </div>
      </div>
      <div class="wallet" style="display:flex">
        <p @click="goChart(order.Matchnum)">联系</p>
      </div>
      <div class="wallet" style="display:flex">
        <p @click="goTo('/Service')">投诉</p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { Toast } from "vant";
Vue.use(Toast);
import {
  reqSendMsg,
  reqChatLists,
  Url,
  reqmatchInfo,
  reqOTCmcancel
} from "../../../common/apigo";
import HeaderTop from "../../../components/HeaderTop/HeaderTop.vue";
import Im from "../../../pages/SBchart/SBchart.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      order_id: "hhh123456",
      message: [],
      textFlag: false,
      textList: ["你好", "请付款", "我已付款，麻烦释放ETH"],
      msg: "",
      uid: "",
      touid: "",
      url: "",
      order: {},
      timer: null,
      times: null,
      residueTime: "",
      mtime: 0,
      differ: null,
      status: "",
      show: true,
      flag: true,
      Matchnum: null,
      selfBuy: null,
      myselfBuy: null,
      IId: null,
      message: [],
      url: "",
      timer: null,
      image: "",
      sendMsg: "",
      selToID: null,
      showProp: 0,
      avatarUrl: ""
    };
  },
  created() {
    this.userOnline();
    // this.matchInfo()
  },
  //页面挂载
  mounted() {
    // this.timer = setInterval(()=>{
    //     this.getMsg()
    // },1000)
    if (window.times) {
      clearInterval(window.times);
    }
    window.times = setInterval(() => {
      this.sellTime();
    }, 1000);
    this.$api.userInfo({}, res => {
      this.uid = res.data.id + "";
      this.avatarUrl = res.data.avatar;
      this.getSign();
    });
    this.selToID = this.$route.query.IId;

    // window.onload();
  },

  //方法
  methods: {
    goChart(matchid) {
      console.log(this.uid);
      this.$router.push({
        path: "/Servicebs",
        query: { matchid: matchid, uid: this.uid }
      });
    },
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.matchInfo();
      });
    },
    goTo(path) {
      if (path == "/Complaint") {
        this.$router.push({ path: path });
      } else {
        this.$router.replace({ path: path });
      }
    },
    onCopy() {
      Toast("复制成功");
    },
    scroll() {
      this.$nextTick(() => {
        var lis = document.getElementById("lis");
        lis.scrollTop = lis.scrollHeight;
      });
    },
    select(msg) {
      this.textFlag = false;
      this.msg = msg;
    },
    async send() {
      let msg = this.msg;
      let uid = this.uid; // 买家id
      let touid = this.touid; //  卖家id
      let res = await reqSendMsg({ msg, uid, touid });
      if (res) {
        this.msg = "";
      }
    },
    async getMsg() {
      let uid = this.uid;
      let touid = this.touid;
      let type = "1";
      let res = await reqChatLists({ uid, touid, type });
      if (res.code == 1) {
        this.message = res.data;
      }
    },
    async file(e) {
      let file;
      if (e.target.files[0]) {
        file = e.target.files[0];
        var name = file.name;
        var fileTypes = [".jpg", ".png", ".jpeg"];
        if (name) {
          var isNext = false;
           // var fileEnd = name.substring(name.indexOf("."));
          let pic = name.split(".")
           let fileEnd = "." + pic[pic.length - 1]
          for (var i = 0; i < fileTypes.length; i++) {
            if (fileTypes[i] == fileEnd) {
              isNext = true;
              this.disabled = false;
              this.formatImg = true;
              break;
            }
          }
          if (!isNext) {
            Toast("暂不支持该类型图片");
            name = "";
            this.disabled = true;
            this.formatImg = false;
            return false;
          }
        }
        var reader = new FileReader();
        var that = this;
        reader.readAsDataURL(file);
        let _this = this;
        reader.onload = function(event) {
          that.url = this.result;
          if (file.size / 1024 > 1025) {
            _this.imgCompress(file, { quality: 0.2 });
          } else {
            _this.image = file;
          }
        };
      }

      setTimeout(() => {
        if (this.url) {
          let img = this.url;
          let uid = this.uid;
          let touid = this.touid;
          let data = new FormData();
          data.append("image", this.image, this.image.name);
          data.append("uid", this.uid);
          data.append("touid", this.touid);
          let apiauth = localStorage.getItem("apiauth");
          let config = {
            headers: { "Content-Type": "multipart/form-data" },
            herders: { apiauth: apiauth }
          };

          axios.post(Url + "/index/msg/upimg", data, config).then(res => {
            if (res.data.code != 1) {
              Toast(res.data.msg);
            }
          });
        }
      }, 1000);
    },
    async matchInfo() {
      let uid = this.uid;
      let matchId = this.$route.params.id;
      let res = await reqmatchInfo({ uid, matchId });

      this.order = res.Match;
      this.mtime = res.Match.Mtime;
      this.IId = res.Match.Sid;
      // window.times = setInterval(() => {
      //   this.sellTime();
      // }, 1000);
    },
    async mcancel(id) {
      if (!this.flag) {
        return Toast("正在撤销，请稍后");
      }
      this.flag = false;
      let uid = this.uid;
      let matchId = id;
      let res = await reqOTCmcancel({ uid, matchId });
      if (res) {
        this.flag = true;
        this.matchInfo();
      }
      if (res.errcode == 0) {
        Toast("成功");
        this.matchInfo();
      } else {
        Toast(res.msg);
      }
    },
    getStatus(statu) {
      let state = "";
      switch (statu) {
        case 0:
          state = "待付款";
          break;
        case 1:
          state = "待释放";
          break;
        case 2:
          state = "已完成";
          break;
        case 3:
          state = "买家取消订单";
          break;
        case 4:
          state = "卖家取消订单";
          break;
        case 5:
          state = "管理员通过";
          break;
        case 6:
          state = "系统确认";
          break;
        default:
          state = "其他";
          break;
      }
      return state;
    },
    async sellTime() {
      let endTime = (this.mtime + 1800) * 1000;
      let startTime = new Date();
      this.differ = endTime - startTime;
      let orders = this.order;
      if (orders.Status != 0) {
        clearInterval(window.times);
        return;
      }
      if (this.differ < 1) {
        let matchId = this.$route.params.id;
        let uid = this.uid;
        this.residueTime = "";
        reqOTCmcancel({ uid, matchId }).then(res => {
          if (res.errcode == 0) {
            this.matchInfo();
            Toast("订单超时未付款，已自动撤销");
          } else {
            Toast("系统错误");
          }
        });
        clearInterval(window.times);
        return;
      }
      let m = Math.floor((this.differ / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");
      let s = Math.floor((this.differ / 1000) % 60)
        .toString()
        .padStart(2, "0");
      this.residueTime = `${m}分${s}秒`;
    }
  },

  watch: {
    message(newVal, oldVal) {
      if (newVal.length != oldVal.length && oldVal.length > 0) {
        this.scroll();
      }
    },
    newMsgList(newval, oldval) {
      if (newval != oldval) {
        this.newMsgList = newval;
        this.onMsgNotify(this.newMsgList);
      }
    }
  },
  // 引入的组件
  components: {
    HeaderTop,
    Im
  },
  computed: {
    ...mapState(["orderInfo"])
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    clearInterval(window.times);
    window.times = null;
  }
};
</script>
<style lang="less" scoped>
#orderDetail {
  width: 100%;
  height: 100%;
  padding: 60px 0 10px 0;

  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .statu {
    height: 9%;
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 18px;
      color:#e9a44e;
    }
    h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      button {
        padding: 5px;
        border: none;
        background-color: #e9a44e;
      }
    }
  }
  .orderInfo {
    margin-top: 2%;
    padding: 0 2% 1px;
    font-size: 16px;
    position: relative;
    .top {
      padding: 15px 0;
      border-bottom: 1px solid #e9a44e;
      display: flex;
      justify-content: space-between;
    }
    .center {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 2% 2%;
      border-bottom: 1px solid #e9a44e;
      p {
        padding: 10px 0;
      }
      .money {
        font-weight: 700;
        font-size: 18px;
      }
      .icon-fuzhi {
        font-size: 20px;
      }
    }
    .wallet {
      width: 100%;

      margin: 10px auto;
      text-align: center;
      p {
        width: 50%;
        margin: auto;
        padding: 12px 0;
        background-color: #e9a44e;
        border-radius: 5px;
      }
      .way {
        button {
          border: none;
          background-color: #e9a44e;
          padding: 12px;
          font-size: 16px;
          border-radius: 5px;
        }
      }
    }
  }
  .service {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    align-items: center;
    .text {
      width: 80%;
      padding-left: 5px;
    }
  }
  .van-popup {
    width: 100%;
    height: 79%;
    background-color: #ccc;
  }
  #lis {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding: 30px 10px 40px;
  }
  .left,
  .right {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    > img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    div {
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    p {
      max-width: 12em;
      word-wrap: break-word;
      word-break: normal;
      padding: 0.5em;
      line-height: 20px;
      border-radius: 5px;
    }
  }
  .right {
    justify-content: flex-end;
    div {
      margin-left: 5px;
    }
    p {
      background-color: #9eea6a;
      color: #213c4d;
    }
  }
  .left {
    justify-content: flex-start;
    div {
      margin-right: 5px;
    }
    p {
      background-color: #fff;
      color: #213c4d;
    }
  }
  .default {
    position: fixed;
    bottom: 38px;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 0 10px;
    p {
      padding: 5px 0;
      border-bottom: 1px solid #cccccc6b;
    }
  }
  .title {
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    background-color: #213c4d;
    color: #fff;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .contact {
    width: 70%;
    margin: auto;
    margin-top: 10px;
    display: flex;
    p {
      width: 50%;
      background-color: #e9a44e;
      padding: 10px;
      margin: 0 5px;
      text-align: center;
      color: #fff;
      border-radius: 5px;
    }
  }

  .send {
    padding: 0 10px;
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0;
    bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #ccc;
    .text {
      height: 97%;
      width: 70%;
      padding-left: 3px;
      border: none;
      resize: none;
    }
    button {
      width: 16%;
      height: 100%;
      border: none;
      background-color: #05c160;
    }
    label i {
      font-size: 30px;
    }
    #img {
      display: none;
      width: 10%;
    }
  }
  .say-active {
    background: #c6c7ca;
  }
  .img-responsive {
    width: 80px;
    height: 80px;
  }
  .bigImg {
    position: absolute;
    height: 100vh;
    left: 0;
    top: 0;
    background: #635f5f;
    padding: 100px 0 0;
  }
  .msgflow {
    padding-bottom: 40px;
    overflow: auto;
    height: 100%;
    .onemsg {
      display: flex;
      margin: 10px 0;

      .msgbody {
        margin: 0 5px 0 10px;
        padding: 5px;
        border-radius: 5px;
        max-width: 70%;
      }
    }
  }
  .headurlClass {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }

  .msgPre {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-wrap: break-word;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .dialogue-section {
    background: none;
  }
  .right {
    justify-content: flex-end;
    div {
      margin-left: 5px;
    }
    p {
      background-color: #9eea6a;
      color: #213c4d;
    }
  }
  .left {
    justify-content: flex-start;
    div {
      margin-right: 5px;
    }
    p {
      background-color: #213c4d;
      color: #213c4d;
    }
  }
}
</style>
