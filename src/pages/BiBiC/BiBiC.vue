<template>
  <section class="bibic">
    <HeaderTop :title="$i18n.t('rechargeCoin')">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </HeaderTop>
    <div class="content">
      <div class="box">
        <div class="content">
      
          <div class="code" id="qrcode"></div>
          <button style="padding:6px; background-color:rgb(238, 198, 127);width:90px;font-size:14px;margin:0 auto;border-radius:5px;color:#000" @click="applyOut">加速到账</button>
          <div class="xiant">
           <p class="title">
            {{type.toUpperCase()}}
            <span v-if="eosMemo">的memo以及</span>
            {{$t('address')}}
            <span v-if="type == 'usdt'">[TRC20]</span>
          </p>
               <p
            v-if="eosMemo"
            style="border:1px solid rgb(238, 198, 127);
                color: rgb(238, 198, 127);
                padding: 0 .4rem;
               
                border-radius: 4px;
                font-size: 14px;
                background:rgb(53,54,61);
                width:70px;float:right"
            v-clipboard:copy="eosMemo"
            v-clipboard:success="onCopymemo"
          >{{$t('copy')}}</p>
            <div class="clear"></div>
          <p class="address" v-if="eosMemo">{{eosMemo}}</p>
     
             <p
            style=" border:1px solid rgb(238, 198, 127);
                color: rgb(238, 198, 127);
                padding: 0 .4rem;
                
                border-radius: 4px;
                font-size: 14px;
                background:rgb(53,54,61);
                width:70px;float:right"
            v-clipboard:copy="address"
            v-clipboard:success="onCopy"
          >{{$t('copy')}}</p>
          <div class="clear"></div>
          <p class="address">{{address}}</p>
       
          </div>
        </div>
      </div>
      <!-- <div class="btn" @click="getRefreshBalance">刷新余额</div> -->
    </div>
    <!-- <div class="content" v-else>暂不支持充币功能</div> -->
  </section>
</template>

<script>
import {
  reqBiBiC,
  reqFull,
  URL,
  reqAddress,
} from "../../common/apigo";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import QRCode from "qrcodejs2";
// import { constants } from 'fs'
import Clipboard from "clipboard";
import Vue from "vue";
import { Toast } from "vant";
import axios from "axios";
Vue.use(Toast);

export default {
  name: "BiBiC",
  components: { HeaderTop },

  data() {
    return {
      imgUrl: "",
      url: "",
      num: "",
      type: "",
      address: "",
      addressImg: "",
      flag: true,
      img: "",
      image: "",
      memo: "",
      uid: "",
      eosMemo: ""
    };
  },

  mounted() {
    this.type = this.$route.query.type;
    this.getAddress();
  },

  methods: {
    applyOut () {
      this.$dialog.confirm({
        mes: '确认后申请信息将提交给后台，是否继续?',
        opts: [
          {
            txt: '确定',
            color: true,
            callback: () => {
              this.$api.applyOut({}, res => {
                if (res.status) {
                  this.$dialog.toast({
                    mes: res.msg,
                    icon: 'success',
                    timeout: 1000
                  })
                } else {
                  this.$dialog.toast({
                    mes: res.msg,
                    icon: 'error',
                    timeout: 1000
                  })
                }
              })
            }
          },
          {
            txt: '取消',
            color: false
          }
        ]
      })
    },
    async getAddress() {
      let coin = this.type;
      let res = await reqAddress({ coin });
      if (res.errcode == -3) {
        Toast(this.$i18n.t("nomnemonic"));
        this.$router.replace({ path: "/InvestEasy" });
      }
      this.type = this.$route.query.type;
      this.address = res.address;
      this.eosMemo = res.memo;
      this.memo = res.memo;
      this.qrcode();
    },

    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 200,
        height: 200, // 高度
        text: this.address // 二维码内容
      });
    },
    onCopy() {
      Toast(this.$i18n.t("地址复制成功"));
    },
    onCopymemo() {
      Toast("memo复制成功");
    },
  }
};
</script>

<style scoped lang="less">
.bibic {
  height: 100%;
  padding: 0 10px;
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .content {
      text-align: center;
      margin: 0 auto;
    .box {
        border-radius: 1em;
            width: 90vw;
            // height: 70vh;
            
      box-shadow: 0 4px 8px rgba(0, 0, 0, .22), 0 0 12px rgba(0, 0, 0, .14);
        background: rgb(53,54,61);
            margin: 0;
            display: inline-block;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: -50px;
        z-index: 99;
        border: none;

        > img {
          width: 100px;
          height: 100px;
          border: none;
          border-radius: 50%;
        }
      }

      .content {
        width: 95%;
        text-align: center;
        > button {
          width: 100px;
          height: 36px;
          border: none;
          border-radius: 5px;
        }
        .title {
          font-size: 16px;
          float: left;
          padding: 2px;
          position: relative;
          top:.4rem
        }

        .address {
            border:1px solid rgb(138, 119, 89);
       color:rgb(168,168,168);
       width: 100%;
       padding: .2rem ;
       word-wrap: break-word; word-break: normal;
       margin: .4rem auto .4rem;
        border-radius: 4px;
        }

        .code {
               background:rgb(49, 50, 57);
                padding: .3rem;
                width:230px;
                border-radius: 1em;
                margin: 2em  auto 1.5em;
                text-align: center;
                display: inline-block;
                height: auto;
          box-sizing: border-box;

          > img {
            width: 170px;
            height: 170px;
          }
        }
        .btn {
          width: 100%;
          height: 50px;
          line-height: 50px;
          margin: 20px auto;
          background-color: #37434f;
          border-radius: 5px;
        }
      }

      .btn-group {
        margin-top: 10px;
        width: 100%;
        text-align: center;

        > button {
          width: 95%;
          height: 50px;
          border: none;
        }
      }
    }
  }
  .btn {
    width: 80%;
    margin: 15px auto;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
  }
      .xiant{
        border-top:1px solid rgb(43,44,52);
        border-bottom:1px solid rgb(43,44,52);
        margin: .4rem .5rem .4rem .5rem;
       
    }
  .uploader-box {
    width: 80%;
    margin: auto;
    margin-top: 10px;
    padding: 20px;
    border-bottom: 1px solid #eee;
    position: relative;
    img {
      height: 300px;
      width: 100%;
      border: none;
    }

    .ident {
      width: 100%;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
