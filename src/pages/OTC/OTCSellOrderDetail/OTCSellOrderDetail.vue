<template>
  <div id="orderDetail">
    <!-- 头部标题 开始 -->
    <HeaderTop title="订单详情">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </HeaderTop>
    <!-- 头部标题 结束 -->
    <div class="statu">
      <h2>{{getStatus(order.Status)}}</h2>
      <p v-if="order.Status == 0">{{residueTime}}</p>
      <!-- <div class="con">
                <p>{{getStatus(order.status)}}</p>
                <div>
                    <button v-if="order.status == 1" @click="showImg(order.payimg)">支付凭证</button>
                    <button v-if="order.status == 1" @click="getconfirm">确认收款</button>

                </div>
      </div>-->
    </div>
    <div class="orderInfo">
      <div class="top">
        <p>
          卖家：
          <span style="color:#e9a44e">{{order.SellAccount}}</span>
        </p>
        <p>
          买家：
          <span style="color:#e9a44e">{{order.BuyAccount}}</span>
        </p>
      </div>
      <div class="center">
        <div class="column">
          <p>订单编号</p>
          <p>买家电话</p>
          <p v-show="order.Paytype=='5'">支付USDT</p>
          <p v-show="order.Paytype!='5'">总价</p>
          <p>数量</p>
          <p v-show="order.Paytype!='5'">单价</p>
        </div>
        <div style="text-align:right;" class="column">
          <p>
            {{order.Matchnum}}
            <!-- <i class="iconfont icon-fuzhi" v-clipboard:copy="order.Matchnum" v-clipboard:success="onCopy"></i> -->
          </p>
          <p>{{order.BuyPhone}}</p>         
          <p v-show="order.Paytype=='5'" class="money" style="font-size:24px;">{{order.TotalPrice}}</p>

          <p v-show="order.Paytype!='5'" class="money" style="font-size:24px;">{{order.TotalPrice}}</p>
          <p>{{order.Amount}}</p>
          <p v-show="order.Paytype!='5'">{{order.Price}}</p>
        </div>
      </div>
      <div class="wallet" style="display:flex">
        <!-- <button v-if="order.Status == 1">去释放</button> -->
        <!--  <p @click="goTo('/CashAssets')" v-if="order.Status == 2">查看钱包</p>-->
        <p style="width:120px;" v-if="order.Status != 1 && flag">{{getStatus(order.Status)}}</p>
        <p style="width:120px;" v-if="order.Status == 1" @click="goOTCConfirm()">去释放</p>
        <!-- <div class="way">
                    <button @click="goTo(`/OTCOrderPay/${order.Matchnum}`)" v-if="order.Status == 0">去付款</button>
                    
        </div>-->
        <p
          style="width:120px;"
          v-if="(order.Status == 1 && order.Payimg!='')  || (order.Status == 2 && order.Payimg!='')"
          @click="showImg(imgUrl)"
        >查看支付凭证</p>
      </div>
      <div class="wallet" style="display:flex">
        <p @click="goChart(order.Matchnum)">联系</p>
      </div>
    </div>
    <van-popup v-model="show">
      <div class="title">聊天</div>
      <ul id="lis">
        <template v-for="(item,index) in message">
          <li class="right" v-if="item.touid == touid" :key="index">
            <p v-if="!item.isimg">{{item.msg}}</p>
            <img :src="item.msg" alt v-if="item.isimg" />
            <div>
              <img src="../../../common/images/avater.jpg" alt />
            </div>
          </li>
          <li class="left" v-else :key="index">
            <div>
              <img src="../../../common/images/service.jpg" alt />
            </div>
            <p v-if="!item.isimg">{{item.msg}}</p>
            <img :src="item.msg" alt v-if="item.isimg" />
          </li>
          <li class="center" v-if="item.sender == 2" :key="index"></li>
        </template>
      </ul>
      <div class="service">
        <div>
          <label for="file">
            <i class="iconfont icon-ai-up-img"></i>
          </label>
          <input type="file" style="display:none;" id="file" @change="file" />
        </div>
        <input type="text" placeholder="聊一聊" class="text" v-model="msg" />
        <div @click="send">发送</div>
        <div @click="textFlag = true">
          <i class="iconfont icon-file"></i>
        </div>
      </div>
      <div class="default" v-if="textFlag">
        <p v-for="(item,index) in textList" :key="index" @click="select(item)">{{item}}</p>
      </div>
    </van-popup>
    <!-- <ul id="lis">
            <template v-for="(item,index) in message" >
                <li class="right" v-if="item.uid == uid" :key="index">
                    <p v-if="!item.isimg">{{item.msg}}</p>
                    <img :src="item.msg" alt="" v-if="item.isimg">
                    <div>
                        <img src="../../common/images/avater.jpg" alt="">
                    </div>
                
                </li>
                <li class="left" v-else :key="index">
                    <div>
                        <img src="../../common/images/service.jpg" alt="">
                    </div>
                    <p v-if="!item.isimg">{{item.msg}}</p>
                    <img :src="item.msg" alt="" v-if="item.isimg">
                </li>
                <li class="center" v-if="item.sender == 2" :key="index">

                </li>
            </template>
        </ul>
        <div class="service">
            <div>
                <label for="file">
                    <i class="iconfont icon-ai-up-img"></i>
                </label>
                <input type="file" style="display:none;" id="file" @change="file">
            </div>
            <input type="text" placeholder="聊一聊" class="text" v-model="msg">
            <div @click="send">
                发送
            </div>
            <div @click="textFlag = true">
                <i class="iconfont icon-file"></i>
            </div>
        </div>
        <div class="default" v-if="textFlag">
            <p v-for="(item,index) in textList" :key="index" @click="select(item)">{{item}}</p>
    </div>-->

    <!-- 密码输入框 -->
    <van-password-input :value="value" info="请输入支付密码" @focus="showKeyboard = true" v-if="isshow" />

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false;isshow = false"
    />
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { Toast } from "vant";
Vue.use(Toast);
import {
  reqSendMsg,
  Url,
  reqmatchInfo,
  reqOTCConfirm,
  reqOTCmcancel
} from "../../../common/apigo";
import HeaderTop from "../../../components/HeaderTop/HeaderTop.vue"; //应用头部
import Im from "../../../pages/SBchart/SBchart.vue";
// import { setInterval, clearInterval } from 'timers';
import { mapState } from "vuex";
// import { clearInterval } from 'timers';

import { ImagePreview } from "vant";

Vue.use(ImagePreview);
export default {
  //数据
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
      show: false,
      flag: true,
      Matchnum: null,
      selfBuy: null,
      myselfBuy: null,
      imgUrl: "",
      flag: "true",
      ImagePreview: [],
      value: "",
      showKeyboard: false,
      isshow: false,
      IId: null
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
    // if(window.times) {
    //     clearInterval(window.times)
    // }
    // window.times = setInterval(()=>{
    //     this.sellTime()
    // },1000)
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
    showImg(image) {
      this.ImagePreview = [];

      const imgUrl = image;
      this.ImagePreview.push(imgUrl);

      ImagePreview(this.ImagePreview);
    },
    goOTCConfirm() {
      this.isshow = true;
      this.showKeyboard = true;
      // this.getOTCConfirm()
    },
    async getOTCConfirm() {
      let uid = this.uid;
      let matchId = this.$route.params.id;
      let payPwd = this.value;
      let res = await reqOTCConfirm({ uid, matchId, payPwd });
      if (res) {
        this.value = "";
      }
      if (res.errcode == 0) {
        this.matchInfo();
        Toast("释放成功");
      } else if (res.errcode == -1) {
        Toast("请重新登录");
      } else if (res.errcode == -2) {
        Toast("请重新登录");
      } else if (res.errcode == -3) {
        Toast("请输入密码");
      } else if (res.errcode == -4) {
        Toast("释放失败");
      } else if (res.errcode == -5) {
        Toast("密码错误");
      } else if (res.errcode == -6) {
        Toast("释放失败");
      } else if (res.errcode == -7) {
        Toast("您不是商家");
      } else if (res.errcode == -8) {
        Toast("订单状态异常");
      } else if (res.errcode == -9) {
        Toast("释放失败");
      } else if (res.errcode == -10) {
        Toast("更新挂单失败");
      } else if (res.errcode == -11) {
        Toast("获取币种失败");
      } else if (res.errcode == -12) {
        Toast("获取余额失败");
      } else if (res.errcode == -13) {
        Toast("更新日志失败");
      }
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
    // 输入密码
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        this.isshow = false;
        this.showKeyboard = false;
        this.getOTCConfirm();
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    // async getMsg() {
    //     let uid = this.uid
    //     let touid = this.touid
    //     let type = '1'
    //     let res = await reqChatLists({uid,touid,type})
    //     if(res.code == 1) {
    //         this.message = res.data
    //     }

    // },
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
              console.log(fileTypes[i]);
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
            console.log(res);
            if (res.data.code != 1) {
            }
          });
        }
      }, 1000);
    },
    async matchInfo() {
      let uid = this.uid;
      let matchId = this.$route.params.id;
      let res = await reqmatchInfo({ uid, matchId });
      this.IId = res.Match.Bid;
      this.order = res.Match;
      this.mtime = res.Match.Mtime;
      this.imgUrl =
        "http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/" +
        res.Match.Payimg;
      window.times = setInterval(() => {
        this.sellTime();
      }, 1000);
    },
    async mcancel(id) {
      if (!this.flag) {
        return Toast("正在撤销，请稍后");
      }
      this.flag = false;
      let uid = this.uid;
      let matchid = id;
      let res = await reqOTCmcancel({ uid, matchId });
      Toast(res.msg);
      if (res) {
        this.flag = true;
      }
      if (res.errcode == 1) {
        this.matchInfo();
      }
    },
    getStatus(statu) {
      let state = "";
      switch (statu) {
        case 0:
          state = "待收款";
          break;
        case 1:
          state = "去释放";
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
        this.residueTime = "";
        clearInterval(window.times);
        this.matchInfo();
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
  padding: 50px 0 10px;

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
    color: #213c4d;
  }
  .van-number-keyboard {
    color: #213c4d;
    z-index: 10000 !important;
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
    // padding-bottom: 40px;
    // height: 200px;
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
      border-bottom: 1px solid #e9a44e;
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
    // width: 70%;
    margin: 0 auto;
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
}
</style>
