<template>
  <div id="service">
    <HeaderTop title="联系">
      <a class="back" @click="$router.back(-1)" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </HeaderTop>
    <div class="content">
      <ul id="lis">
        <template v-for="(item,index) in message">
          <li class="right" v-if="item.Uid == uid" :key="index">
            <p v-if="item.Type==1">{{item.Msg}}</p>
            <img
              :src="'http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/'+item.Msg"
              alt
              v-if="item.Type==2"
            />
            <div>
              <img src="../../../common/images/avater.jpg" alt />
            </div>
          </li>
          <li class="left" v-if="item.Uid != uid" :key="index">
            <div>
              <img src="../../../common/images/service.jpg" alt />
            </div>
            <p v-if="item.Type==1">{{item.Msg}}</p>
            <img
              :src="'http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/'+item.Msg"
              alt
              v-if="item.Type==2"
            />
          </li>
        </template>
      </ul>
    </div>

    <div class="send">
      <textarea type="text" name id class="text" v-model="msg"></textarea>
      <button @click="send">{{$t('send')}}</button>
      <label for="img">
        <i class="iconfont icon-ai-up-img"></i>
      </label>
      <input type="file" id="img" @change="file" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import HeaderTop from "../../../components/HeaderTop/HeaderTop.vue";
import { Toast } from "vant";
import {
  reqOtcChitchatM,
  reqOtcChitchatI,
  reqOtcchitchatRecord,
  Url
} from "../../../common/apigo";
import common from "../../../common/common";
Vue.use(Toast);

export default {
  data() {
    return {
      message: [],
      msg: "",
      url: "",
      timer: null,
      image: "",
      imgId: "",
      uid: ""
    };
  },

  mounted() {
    this.uid = this.$route.query.uid;
    this.getMsgList();
    this.timer = setInterval(() => {
      this.getMsgList();
    }, 1000);

    this.scroll();
  },

  methods: {
    getByteLen(val) {
      var len = 0;
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/gi) != null) {
          len += 2;
        } else {
          len += 1;
        }
      }
      return len;
    },
    async send() {
      if (this.getByteLen(this.msg) > 1000) {
        return Toast("您输入的内容太多啦~");
      }
      let msg = this.msg;
      let matchId = this.$route.query.matchid;
      if (msg.trim().length < 1) {
        this.msg = "";
        return Toast("请输入内容哦~");
      }
      let res = await reqOtcChitchatM({ matchId, msg });
      if (res.errcode == 0) {
        this.msg = "";
        this.getMsgList();
      } else {
        Toast(res.msg);
      }
    },
    async getMsgList() {
      this.uid = this.$route.query.uid;
      let uid = this.uid;
      let matchId = this.$route.query.matchid;
      let limit = "999999";
      let start = 1;
      let res = await reqOtcchitchatRecord({ uid, matchId, limit, start });
      if(res.msgs!='null'){
         this.message = res.msgs; 
      }
    },
    async file(e) {
      let matchId = this.$route.query.matchid;
      let data = e.target.files[0];
      let param = new FormData();
      param.append("img", data);
      param.append("matchId", matchId);
      let apiauth = common.getStorage("user_token");
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
        headers: { apiauth: apiauth }
      };
      axios.post(Url + "/o2c/chitchat", param, config).then(res => {
        this.getMsgList();
        if (res.errcode == 0) {
          this.getMsgList();
        } else {
          Toast(res.msg);
        }
      });
    },
    upload() {
      let msg = this.imgId;
      let isimg = 1;
      this.$api.addMsg({ msg, isimg }, res => {
        if (res.status) {
          this.imgId = "";
        }
      });
    },
    scroll() {
      this.$nextTick(() => {
        var lis = document.getElementById("lis");
        lis.scrollTop = lis.scrollHeight;
      });
    }
  },
  components: {
    HeaderTop
  },
  watch: {
    message(newVal, oldVal) {
      if (newVal.length != oldVal.length) {
        this.scroll();
      }
    }
  },

  // updated(){
  //     this.scroll()

  // },

  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
#service {
  padding-top: 50px;
  font-size: 16px;
  height: 100%;
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .content {
    height: 100%;
    ul {
      height: 100%;
      padding: 0 10px 40px;
      overflow-y: scroll;
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
  }
  .send {
    padding: 0 10px;
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0;
    bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #f5f5f5;
    .text {
      height: 97%;
      width: 70%;
      padding-left: 3px;
      border: none;
      resize: none;
      color: #213c4d;
    }
    button {
      width: 16%;
      height: 100%;
      border: none;
      background-color: #9eea6a;
    }
    label i {
      color: #213c4d;
      font-size: 30px;
    }
    #img {
      display: none;
      width: 10%;
    }
  }
}
</style>
