<template>
  <div id="settings">
    <!-- 头部用户信息 开始 -->
    <HeaderTop title="我的"></HeaderTop>
    <div class="top-info" v-if="userInfo"  @click="goTo('/SettingsUser')">
      <img v-if="!userInfo.avatar" :src="userMsg.avatar" class="avatar">
      <img v-else :src="userInfo.avatar" class="avatar">
      <div class="info-box">
        <p v-show="userMsg.username">
          登录账号：
          <span style="" >{{userMsg.username}}</span>
        </p>
        <!-- <p>级别：<span>{{userMsg.vip}}级 （{{dealer}}）</span></p> -->
        <!-- <p style="font-weight: normal">
          <span>登录账号: {{userInfo.account}}</span>
        </p> -->
      </div>
      <button @click="goToLogin('/login')"  v-show="!userMsg.username">点击登录</button>
      <!-- <div class="right">
        <i class="iconfont icon-youjiantou"></i>
      </div> -->
    </div>
    <div class="top-info" v-else>
      <img class="avatar">
      <div class="info-box">
        <span>您还没有登录</span>
      </div>
      <button @click="goToLogin('/login')">点击登录</button>
    </div>
    <!-- 头部用户信息 结束 -->

    <!-- 滚动公共 开始 -->
    <!-- <div class="slide-container-v">
            <div class="title">官方公告
                <i class="iconfont icon-gonggao"></i>
            </div>
            <cube-slide ref="slide" :data="items" direction="vertical" :showDots="false">
                <cube-slide-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click.native="clickHandler(item, index)"
                >
                    <a>{{item.title}}</a>
                </cube-slide-item>
            </cube-slide>
    </div>-->
    <!-- 滚动公告 结束 -->

    <!-- 九宫格菜单 开始 -->
    <div class="menu-box">
      <div class="menu-item" @click="goTo('/Security')">
        <img src="../../common/images/security.png">
        <span>安全中心</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="menu-item" @click="goTo('/key')">
        <img src="../../common/images/key.png">
        <span>ETH私钥</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="menu-item" @click="goTo('/ExportHelpWord')">
        <img src="../../common/images/terms.png">
        <span>备份助记词</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <!-- <div class="menu-item" @click="goTo('/millcenter')">
                <img src="../../common/images/menu_icon_mill.png">
                <span>矿机</span>
      </div>-->

      <!-- <div class="menu-item" @click="goTo('/OrderCenter')">
        <img src="../../common/images/c2c.png">
        <span>CTC订单</span>
      </div>-->
      <!-- <div class="menu-item" @click="goTo('/OTCOrder')">
        <img src="../../common/images/OTC.png">
        <span>OTC订单</span>
      </div> -->
      <!-- <div class="menu-item" @click="goTo('/regnotes')">
        <img src="../../common/images/node.png">
        <span>节点</span>
      </div>-->
      <!-- <div class="menu-item" @click="leveling">
        <img src="../../common/images/up.png">
        <span>升级</span>
      </div>-->
      <div class="menu-item" @click="share()">
        <img src="../../common/images/share.png">
        <span>分享</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="menu-item" @click="goTo('/Help')">
        <img src="../../common/images/help.png">
        <span>帮助中心</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <!-- <div class="menu-item" @click="goTo('/AboutDapp')">
        <img src="../../common/images/about.png">
        <span>关于DAPP</span>
      </div> -->
        <div class="menu-item" @click="goToS('/Service')">
            <img src="../../common/images/service.png">
            <span>客服</span>
            <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="menu-item" @click="goToS('/recommendlist')">
            <img src="../../common/images/recommend.png">
            <span>推荐记录</span>
            <i class="iconfont icon-youjiantou"></i>
        </div>
      <!-- <div class="menu-item" @click="goTo('/balance')">
        <img src="../../common/images/service.png">
        <span>余额</span>
      </div> -->
      <!-- <div class="menu-item" @click="goTo('/user')">
        <img src="../../common/images/shopcenter.png">
        <span>商城中心</span>
      </div> -->

      <!-- <div class="menu-item">
        <img src="../../common/images/news.png">
        <span>币币新闻</span>
      </div>
      <div class="menu-item">
        <img src="../../common/images/news.png">
        <span>币币快讯</span>
      </div>
      <div class="menu-item">
        <img src="../../common/images/service.png" @click="goTo('/Service')">
        <span>客服</span>
      </div>-->
      <!-- <div class="menu-item">
                <img src="../../common/images/menu_icon_order.png" @click="goTo('/Complaint')">
                <span>投诉</span>
      </div>-->
      <!-- <div class="menu-item" @click="goTo('/Settings')">
        <img src="../../common/images/more.png">
        <span>更多设置</span>
      </div>

      <a class="menu-item" @click="goTo('/index')">
        <img src="../../common/images/more.png">
        <span>商城</span>
      </a>-->
      <!-- <a class="menu-item" :href="'https://gaiban.sc.jiujiutc.com/wap/index/index?apiauth=' + apiauth">
                <img src="../../common/images/menu_icon_shop.png">
                <span>商城2</span>
      </a>-->
     
      <!-- <div class="menu-item" @click="goTo('/ApplyMerchant')" v-if="userMsg.merchant == 0 || userMsg.merchant == 3">
        <img src="../../../static/image/ruzhu.png">
        <span>商家入住<span v-if="userMsg.merchant == 3">已被拒绝，重新申请</span></span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="menu-item" v-if="userMsg.merchant == 1">
        <img src="../../../static/image/ruzhu.png">
        <span>商家入驻(审核中)</span>
      </div>
      <div class="menu-item"  v-if="userMsg.merchant == 2" v-clipboard:copy="address" v-clipboard:success="onCopy">
        <img src="../../../static/image/ruzhu.png">
        <span>商家入驻(已入驻，点击复制商户管理地址)</span>
      </div>
       <div class="menu-item" @click="applyStore()">
        <img src="../../common/images/up.png">
        <span>申请商家</span>
      </div> -->
      <div class="menu-item" @click="applyStore()">
        <img src="../../common/images/up.png">
        <span>申请商家</span>
      </div>
      <!-- <yd-cell-group>
            <yd-cell-item href="/ApplyMerchant" type="link" v-if="userMsg.merchant == 0 || userMsg.merchant == 3">
                <img slot="icon" src="../../common/images/up.png">
                <span slot="left">商家入驻</span>
                <p slot="right" v-if="userMsg.merchant == 3">已被拒绝，重新申请</p>
            </yd-cell-item>
            <yd-cell-item v-if="userMsg.merchant == 1">
                <img slot="icon" src="../../common/images/up.png">
                <span slot="left">商家入驻</span>
                <p slot="right" >审核中</p>
            </yd-cell-item>
            <yd-cell-item v-if="userMsg.merchant == 2" v-clipboard:copy="address" v-clipboard:success="onCopy">
                <img slot="icon" src="../../common/images/up.png">
                <span slot="left">商家入驻</span>
                <p slot="right" >已入驻，点击复制商户管理地址</p>
            </yd-cell-item>
            
        </yd-cell-group> -->
    </div>
    <div class="loginOut" @click="logout">退出登录</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Field, Popup, Toast } from "vant";
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import {
  reqLogout,
  reqRename,
  reqReavatar,
  reqShops,
  reqLeveling,
  reqUserAllInfo,
  applyDealer
} from "../../common/apigo";

// import VlinkCellGroup from '../../components/CellGroup/CellGroup.vue'

// import {Slide} from "cube-ui";

// Vue.use(Slide);

Vue.use(Dialog)
  .use(Field)
  .use(Popup);

export default {
  components: {
    HeaderTop
  },
  data() {
    return {
      show_name: false,
      show_phone: false,
      newUsername: "",
      newPhone: "",
      items: [
        {
          title: "公告1"
        },
        {
          title: "公告2"
        }
      ],
      loop: true,
      apiauth: "",
      flag: true,
      userInfo: 1,
      userMsg:{},
      dealer:'',
      vip:0
    };
  },
  mounted() {
    //初始化数据
    // this.userInfo = this.userAllInfo.userInfo
    //this.newUsername = this.userInfo.nickname
    //this.newPhone = this.userAllInfo.userInfo.phone
    // this.apiauth = localStorage.getItem('apiauth')
  },
  created(){
    this.userOnline()

  },

  computed: {
    ...mapState(["userAllInfo"])
    // userInfo: {
    //     get: function () {
    //         return this.userAllInfo.userInfo;
    //     },
    //     set: function (value) {
    //     }

    // }
  },

  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.userMsg=res.data
        this.dealer=res.data.dealer;
        this.vip = res.data.vip
        if(this.dealer == 2) {
          this.dealer = '商户'
        }else {
          this.dealer = '普通-用户'
        }
      });
    },
    logout() {
      this.$dialog.confirm({
        mes: "确认退出吗?",
        opts: [
          {
            txt: "取消",
            color: false
          },
          {
            txt: "确定",
            color: true,
            callback: () => {
              this.$api.logout({}, res => {
                if (res.status) {
                  this.GLOBAL.removeStorage("user_token");
                  this.GLOBAL.removeStorage("login-type");
                  this.GLOBAL.removeStorage("helpout");
                  this.$router.replace("/");
                }
              });
            }
          }
        ]
      });
    },
    applyStore() {
        let that=this;
      Dialog.confirm({
        title: "标题",
        message: "申请成为商家"
      })
        .then(() => {
            that.getapplyDealer()
        })
        .catch(() => {
          // on cancel
        });
    },
    async getapplyDealer() {
      let uid = this.uid;
      let res = await applyDealer({ uid });
      if(res.errcode==0){
          Toast("申请成功")
      }else if(res.errcode==-1){
          Toast("请重新登录")
      }else if(res.errcode==-2){
          Toast("请重新登录")
      }else if(res.errcode==-3){
          Toast("不符合申请条件")
      }else if(res.errcode==-4){
          Toast("审核中")
      }else if(res.errcode==-5){
          Toast("已是商户")
      }else if(res.errcode==-6){
          Toast("申请失败")
      }
    },
    share() {
      this.$router.push("/Share");
    },
    // async goToShop(){
    //     const result = await reqShops()
    // },

    // async leveling(){
    //     if(!this.flag) {
    //         return Toast('正在提交，请稍后再试')
    //     }
    //     this.flag = false
    //     let res = await reqLeveling()
    //     if(res) {
    //         this.flag = true
    //         Toast(res.msg)
    //         // this.getUserAllInfo()
    //     }
    // },
    // async getUserAllInfo() {
    //     let info = await reqUserAllInfo()
    //     if (info) {
    //         this.$store.dispatch('recordUserAllInfo', info)
    //     }
    // },

    goTo(path) {
      this.$router.push({ path: path });
    },
    goToS(path){
      this.$router.push({ path: path });
      // if(this.userMsg.vip > 1) {
      //   this.$router.push({ path: path });
      // }else {
      //   Toast('您的级别不够')
      // }
    },

    // showD() {
    //     Dialog.alert({
    //         message: '非常抱歉，客服功能正在测试'
    //     }).then(() => {
    //         // on close
    //     });
    // },

    goToLogin(path) {
      localStorage.removeItem("apiauth");
      this.$router.push({ path: path });
      this.GLOBAL.removeStorage("loginSign"); //removeStorage

    },
    // async editUsername(action, done) {
    //     if (action === "confirm") {
    //         let nickname = this.newUsername;
    //         done(); //关闭弹出框
    //     } else {
    //         done();
    //     }
    // },
    editPhone(action, done) {
      if (action === "confirm") {
        this.phone = this.newPhone;
        done();
      } else {
        done();
      }
    },
    initShow() {
      this.isShow = false;
    }

    //突出登录
    // async logout() {
    //     Dialog.confirm({
    //         title: "提示",
    //         message: "您确定要退出吗？"
    //     }).then(() => {
    //         reqLogout().then(result => {
    //             if (result.code === 1) {
    //                 localStorage.removeItem("apiauth");
    //                 this.$store.dispatch("resetUserAllInfo");
    //                 Toast.success("退出成功");
    //                 setTimeout(() => {
    //                     this.$router.replace("/login");
    //                 }, 500);
    //             }
    //         });
    //     });
    // }
  },
  watch: {
    userInfo(newVal, oldVal) {
      if (newVal) {
        this.newUsername = newVal.nickname;
        this.newPhone = newVal.phone;
      }
    }
  }
};
</script>

<style scoped lang="less">
#settings {
//   height: 100%;
  padding-top: 50px;
  [v-cloak] {
    display: none;
  }
  padding-bottom: 100px;
  .slide-container-v {
    height: 40px;
    display: flex;
    background-color: #999;

    .title {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      color: #04b996;
      font-weight: bold;
      padding-left: 10px;
      padding-right: 10px;
    }

    .cube-slide-item {
      float: none;
    }

    a {
      display: block;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
    }
  }

  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }

  .top-info {
    display: flex;
    align-items: center;
    padding: 20px;
    // background-color: #37434f;
    // border: 1px solid #4c6581;
    margin: 0 15px ;
    border-radius: 10px;
    color: #728bd9;

    .right {
      position: absolute;
      right: 30px;

      i {
        width: 23px;
        height: 23px;
        font-size: 23px;
        line-height: 23px;
        display: block;
        color: #728bd9;
      }
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-sizing: border-box;
      margin-right: 10px;
      // background-color: #fff;
      color: #999;
    }

    .info-box {
      display: flex;
      flex-direction: column;
      color: #fff;

      > p {
        color: #abc2e2;
        font-weight: bold;
        padding: 3px 2px;
        font-size: 16px;
        > span {
          color: #728bd9;
        }
      }
    }

    > button {
      margin-left: 10px;
      background-color: #60adf5;
      border: none;
      color: #fff;
      border-radius: 3px;
      font-size: 13px;
      display: block;
      padding: 2px 10px;
    }
  }

  .menu-box {
    margin-top: 30px;
    margin-bottom: 10px;
    // background-color: #fff; 
    display: flex;
    flex-wrap: wrap;
    padding: 0 15px;
    align-items: center;

    .menu-item {
      width: 100%;
      // border-right: 1px solid #423f52;
      box-sizing: border-box;
      margin: 10px 0;
      border-bottom: 1px solid #4c6581;
      display: flex;
      align-items: center;

      > img {
        // margin-top: 10px;
        width: 30px;
        height: 30px;
      }

      > span {
        margin: 10px;
        font-size: 15px;
        flex: 1;
        // color: #666;
      }
    }
  }

  .van-cell-group {
    margin-bottom: 10px;
  }

  .van-cell__value {
    background-color: red;
  }

  .loginOut {
    width: 94%;
    color: #fff;
    text-align: center;
    padding: 15px 0;
    font-size: 15px;
    margin: auto;
    background-color: #7497f1;
    border-radius: 10px;
  }
}
</style>
