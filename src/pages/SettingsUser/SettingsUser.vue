<template>
  <div id="settingsUser">
    <!-- <HeaderTop title="我的信息">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop> -->
    <div class="userinfo-content-wrapper">
      <div class="userinfo-content" style="margin-bottom:10px;">
        <!-- <ListItem title="头像" @goTo="goTo()">
          <img :src="userInfo.avatar" slot="avatar">
        </ListItem> -->
        <div class="img">
          <p class="left">{{ $t('avatar') }}</p>
          <div class="right">
            <label for="avatar">
              <img :src="userInfo.avatar" alt="">
            </label>
            <input type="file" id="avatar" v-show="false" @change="uploadAvatar($event)">
          </div>
        </div>
        <!-- <ListItem title="姓名" :value="userInfo.username"></ListItem> -->
        <ListItem :title="$t('loginAccount')" :value="userInfo.nickname"></ListItem>
        <!-- <ListItem title="手机号码" :value="userInfo.mobile"></ListItem> -->
        <ListItem :title="$t('invite')" :value="userInfo.id"   >= 100"></ListItem>
        <ListItem :title="$t('newversion')" :value="version"></ListItem>
         <!-- <ListItem :title="$t('version')" :value="wgtVer"></ListItem> -->
        <!-- <ListItem title='成为商户' v-if="userInfo.dealer == 0" :isLink="true" @goTo="apply" value="点击申请"></ListItem>
                <ListItem title='成为商户' v-else-if="userInfo.dealer == 3" :isLink="true" @goTo="apply" value="已拒绝，重新申请"></ListItem>
        <ListItem title='成为商户' v-else :isLink="true" :value="msg"></ListItem>-->
      </div>
      <yd-cell-group>
        <!-- <yd-cell-item href="/mybankcardlist" type="link">
          <img slot="icon" src="../../../static/image/bankcard.png">
          <span slot="left">我的银行卡</span>
        </yd-cell-item> -->
        <yd-cell-item href="/recommendlist" type="link">
          <img slot="icon" src="../../../static/image/coupon.png">
          <span slot="left">{{ $t('recommend') }}</span>
        </yd-cell-item>
        <!-- <yd-cell-item href="/language" type="link">
          <img slot="icon" src="../../../static/image/coupon.png">
          <span slot="left">语言</span>
        </yd-cell-item> -->
        <!-- <yd-cell-item href="/datasetting" type="link">
          <img slot="icon" src="../../../static/image/set.png">
          <span slot="left">资料设置</span>
        </yd-cell-item> -->
      </yd-cell-group>
      <div style="margin: 15px">
        <yd-button size="large" style="
 background: rgb(57, 57, 65);
 box-shadow: rgba(0, 0, 0, 0.3) 0px -0.05rem 0.05rem;
 border-radius: 0.2rem;color:#fff;border:none" type="danger" @click.native="logout">{{ $t('loginOut') }}</yd-button>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from "vue";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ListItem from "../../components/ListItem/ListItem.vue";

export default {
  data() {
    return {
      userInfo: {},
      msg: "",
      flag: true,
      version:'',
      wgtVer:'',
      code:'',
      vip:0
    };
  },
  created(){
      this.userOnline();
    this.getVersion();
    this.plusReady() 
    // this.getShareCode()
  },
  mounted() {
    // this.userOnline();
    // this.getVersion()
    // this.getShareCode()
  },

  computed: {},

  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.userInfo = res.data;
        this.vip = res.data.vip
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
    // 获取版本号
    getVersion(){
      this.$api.version({},res=>{
        this.version = res.data.value
        

      })
    },
     plusReady() {
           
              plus.runtime.getProperty(plus.runtime.appid, function (inf) {
             this.wgtVer = 33   // let     wgtVer =   inf.version

            //   console.log('当前应用版本：' +  wgtVer)
            //  this.wgtVer = 33 // this.wgtVer = ”“inf.version

                })
          },
    //  getShareCode () {
    //         this.$api.shareCode({}, res => {
    //             if(res.status) {
    //                 this.code = res.share
    //             }
    //         })
    //     },
    uploadAvatar (e) {
            let file = e.target.files[0]
            let data = new FormData()
            data.append('upfile', file, file.name)
            this.$api.uploadFile(data, res => {
                if (res.status) {
                    let avatar = res.data.url // 上传成功的图片地址
                    // 执行头像修改
                    this.$api.changeAvatar({
                        avatar: avatar
                    }, res => {
                        if (res.status) {
                            this.userInfo.avatar = res.data.avatar
                            this.$dialog.toast({
                                mes: res.msg,
                                timeout: 1300
                            })
                        }
                    })
                }
            })
        },
  },

   
  components: {
    HeaderTop,
    ListItem
  }
};

 
         
</script>

<style lang="less">
#settingsUser {
  width: 100%;
  height: 100%;
  // background-color: rgb(0, 27, 51);
  color: #fff;
  .yd-cell-box,.yd-cell,.yd-cell-item,.yd-cell-left{
     background: rgb(71, 73, 83);;
  }
  .yd-cell a.yd-cell-item{
     background: rgb(71, 73, 83);;
  }
  .yd-cell{
    padding: 0;
  }
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }

  .userinfo-content-wrapper {
    position: fixed;
    top: 50px;
    bottom: 0;
    width: 100%;

    .btn {
      display: block;
      height: 45px;
      background-color: #fff;
      border: none;
      margin-top: 10px;
      color: #fff;
      border-top: 1px solid #423f5261;
      border-bottom: 1px solid #423f5261;

      &.btn-logout {
        color: red;
        font-weight: bold;
      }
    }
  }
  .yd-cell {
        // background-color: #fff;
    }
    .yd-cell a.yd-cell-item, .yd-cell label.yd-cell-item {
        // background-color: #fff;
    }
    .yd-cell:after {
        width: 0;
    }
    .yd-cell-left {
        color: #fff !important;
    }
    .yd-cell-item{
      padding-left:20px;
    }
  .img {
    margin-left: 20px;
    margin-right: 20px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #232121;
    font-size: 14px;
  }
  .right {
    color: #ababab;
    padding-right: 20px;

    img {
        height: 40px;
        width: 40px;
        vertical-align: middle;
        border-radius: 50%;
    }
  }
}
</style>



