<template>
  <div id="Borrowing">
    <HeaderTop title="">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
      <a class="right" @click="getcancelCount" slot="right">记录</a>
    </HeaderTop>
    <div class='BorrowingCon'>
        <p class='realBorrowing'>可用额度(USDT)</p>
        <h1 class='realNum'>{{parseFloat(userNum).toFixed(2)}}</h1>
        <div class='realBtn' @click='goTo("/CashAssets")'>提升信用</div>
        <div class='realtip'>您的授权额度和信用分成正比关系，请点击提升信用增大您的授权额度</div>
    </div>
    <div class='borrowingopear'>
        <div style="border-right: 1px solid #eeeeee5c;">
            <div @click="withdrawShowPopup" style='font-size: 18px;'>去还钱</div>
            <p style='    height: 25px;
    line-height: 25px;'>借贷利率</p>
    <p style='    height: 25px;
    line-height: 25px;'>{{userlilv*100+'%'}}</p>
                <!-- <p style='    height: 25px;
    line-height: 25px;'>下月应还</p>
                <p style='    height: 25px;
    line-height: 25px;'>{{parseFloat(userMsg.repay).toFixed(2)}}</p> -->
              

    
        </div>
        <div>
            <div @click="repayShowPopup" style='font-size: 18px;'>去借钱</div>
            <p style='    height: 25px;
    line-height: 25px;'>偿还额度</p>
    <p style='    height: 25px;
    line-height: 25px;'>{{parseFloat(userNumRepay).toFixed(2)}}</p>
                <!-- <p style='    height: 25px;
    line-height: 25px;'>提升额度</p>
                <p style='    height: 25px;
    line-height: 25px;'>{{userNumRepay.toFixed(2)}}</p> -->
               
    
        </div>
    </div>
    <div>
        <img style="    width: 100%;
    height: 120px;" src="../../../static/image/borrowingBar.jpg"/>
    </div>
    <p style='    padding: 10px 20px 30px;'>借贷流程</p>
    <div class="stepCon">
        <div>
            <img style='width:20px;height:20px;' src='../../../static/image/duihao.png'/>
            <!-- <div>注册信息认证</div> -->
        </div>
        
        <p style='height:2px;background:#f4ea2a'></p>
<div>
            <img style='width:20px;height:20px;' src='../../../static/image/duihao.png'/>
            <!-- <div>线上信用授信</div> -->
        </div>
        <p style='height:2px;background:#f4ea2a'></p>
        <div>
            <img style='width:20px;height:20px;' src='../../../static/image/duihao.png'/>
            <!-- <div>借贷申请</div> -->
        </div>
        <p style='height:2px;background:#f4ea2a'></p>
                <div>
            <img style='width:20px;height:20px;' src='../../../static/image/duihao.png'/>
            <!-- <div>招标放贷</div> -->
        </div>

    </div>
    <div class="stepContip">

<div>注册信息认证</div>
  <div>线上信用授信</div>
  <div>借贷申请</div>
  <div>招标放贷</div>
    </div>
    

<van-popup v-model="withdrawShow">
  <div style='padding: 30px 35px;color:#000'>
    <div style='    display: flex;    align-items: center;'>
    <div>待还款</div><div style='color:#e9a44e;padding-left:20px'>{{parseFloat(userMsg.repay).toFixed(2)}}{{withdrawRadio}}</div></div>
    <div style='display:flex;height: 60px;
    align-items: center;padding-left:20px;border-bottom: 1px solid #000;margin:10px 0;'>
        <input type="number" placeholder="请输入还款数量" v-model="withdrawNum" style='border: none;
    height: 30px;
    line-height: 30px;
    padding: 20px 0;width:120px' />
    <div>
    <div class='greenClass' ref='withdrawInputone' style='    width: 80px;display: flex;
    align-items: center;margin-bottom: 20px;' @click='withdrawInputfunc(1)' ><img style='width: 20px;
    height: 20px;    margin-right: 5px;' :src='withdrawSrcOne'/>USDT</div>
    <div class='redClass' ref='withdrawInputTwo' style='    width: 80px;display: flex;
    align-items: center;'  @click='withdrawInputfunc(2)' ><img style='width: 20px;
    height: 20px;    margin-right: 5px;' :src='withdrawSrcTwo'/>PUD</div>
    </div>
    </div>
<div style="background: rgb(25, 137, 250);
    width: 220px;
    height: 30px;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    color: #fff;margin-top:20px" @click='withdrawReal()'>下一步</div>
  </div>
</van-popup>
<van-popup v-model="repayShow">

<div style='padding: 30px 0;color:#000'>
    <div style='    display: flex;padding: 30px 35px;    align-items: center;'>
    <div>最高可出借</div><div style='color:#e9a44e;padding-left:20px'>{{parseFloat(userNum).toFixed(2)}}{{repayRadio}}</div></div>
    <div style='display:flex;height: 60px;
    align-items: center;border-bottom: 1px solid #000;margin:10px 35px;'>
    <!-- <van-radio-group v-model="repayRadio">
  <van-radio name="USDT">USDT</van-radio>
  <van-radio name="PUB">PUB</van-radio>
</van-radio-group> -->
<div>
    <div class='greenClass' ref='repayInputone' style='    width: 80px;display: flex;
    align-items: center;margin-bottom: 20px;' @click='repayInputfunc(1)' ><img style='width: 20px;
    height: 20px;    margin-right: 5px;' :src='repaySrcOne'/>USDT</div>
    <div class='redClass' ref='repayInputTwo' style='    width: 80px;display: flex;
    align-items: center;'  @click='repayInputfunc(2)' ><img style='width: 20px;
    height: 20px;    margin-right: 5px;' :src='repaySrcTwo'/>PUD</div>
    </div>
        <input type="number" placeholder="请输入借款数量" v-model="repayNum" style='border: none;
    height: 30px;
    line-height: 30px;
    padding: 20px 0;width:120px' />
    </div>
        <!-- <div style='display:flex;height: 50px;
    align-items: center;margin:0 35px;10px;'>
    <div style='width:60px;font-size: 16px;'>地址</div>

    </div> -->
    <!-- <div style='display:flex;height: 50px;width:300px;
    align-items: center;margin-bottom:10px;border-bottom: 1px solid #000;'>
        <input type="text" placeholder="请输入地址" v-model="repayDresss" style='border: none;
    
    height: 30px;
    line-height: 30px;
        width: 100%;font-size:12px;text-align: center;' />
    </div> -->
<div style="background: rgb(25, 137, 250);
    width: 220px;
    height: 30px;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    color: #fff;    margin: 20px auto 0;"  @click='repayReal()'>提交审核</div>
  </div>

</van-popup>

<van-password-input
  :value="valuewithdraw"
  info="密码为 6 位数字"
  :focused="withdrawShowKeyboard"
  @focus="withdrawShowKeyboard = true"
  v-if='withdrawShowKeyboard'
/>
<!-- 数字键盘 -->
<van-number-keyboard
  :show="withdrawShowKeyboard"
  @input="onInputwithdraw"
  @delete="onDeletewithdraw"
  @blur="withdrawShowKeyboard = false"
/>
<!-- 密码输入框 -->
<van-password-input
  :value="valuerepay"
  info="密码为 6 位数字"
  :focused="repayshowKeyboard"
  @focus="repayshowKeyboard = true"
  v-if='repayshowKeyboard'
/>
<!-- 数字键盘 -->
<van-number-keyboard
  :show="repayshowKeyboard"
  @input="onInputrepay"
  @delete="onDeleterepay"
  @blur="repayshowKeyboard = false"
/>
    </div>
</template>

<script type="text/ecmascript-6">
import { reqSettingsUser, cancelCount, im } from "../../common/apigo";
import Vue from "vue";
import axios from "axios";
import common from "../../common/common";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

import { Toast, Dialog } from "vant";
import { watch } from "fs";

Vue.use(Toast).use(Dialog);

import { Step, Steps } from 'vant';

Vue.use(Step);
Vue.use(Steps);
  import { Popup } from 'vant';

Vue.use(Popup);
import { DropdownMenu, DropdownItem } from 'vant';

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
  data() {
    return {
      uid: "",
      userNum:0,
      userNumRepay:0,
      userMsg:{},
      active: 3,
      withdrawShow:false,
      repayShow:false,
      withdrawNum:'',
withdrawRadio:'USDT',
repayNum:'',
repayRadio:'USDT',
repayDresss:"",
withdrawSrcOne:'./static/image/duihao1.png',
withdrawSrcTwo:'./static/image/yuan.png',
repaySrcOne:'./static/image/duihao1.png',
repaySrcTwo:'./static/image/yuan.png',
valuewithdraw: '',
      withdrawShowKeyboard: false,
      valuerepay: '',
      repayshowKeyboard: false,
      userlilv:0

    };
  },
  created() {
    if(this.GLOBAL.getStorage("user_token")){
      this.userOnline();
      this.use()
      
    }else{
      this.$router.push('/login')
    }
  },
  
  mounted() {
    let apiauth = common.getStorage("user_token");
  },

  methods: {
     repayReal(){
      this.repayShow = false;
      this.repayshowKeyboard= true


    },
    onInputrepay(key) {
      this.valuerepay = (this.valuerepay + key).slice(0, 6);
      // this.value = (this.value + key).slice(0, 6);
      if (this.valuerepay.length == 6) {
        this.repayshowKeyboard = false;

        this.$api.payPwd({ pay_pwd: this.valuerepay }, res => {
          this.valuerepay = "";
          if (res.status) {
            this.userSet_borrow();
          }
        });
      }
    },
    onDeleterepay() {
      this.valuerepay = this.valuerepay.slice(0, this.valuerepay.length - 1);
    },
    withdrawReal(){
      this.withdrawShow = false;
      this.withdrawShowKeyboard= true


    },
    onInputwithdraw(key) {
      this.valuewithdraw = (this.valuewithdraw + key).slice(0, 6);
      if (this.valuewithdraw.length == 6) {
        this.withdrawShowKeyboard = false;

        this.$api.payPwd({ pay_pwd: this.valuewithdraw }, res => {
          this.valuewithdraw = "";
          if (res.status) {
            this.userSet_repayment();
            
          }
        });
      }
    },
    onDeletewithdraw() {
      this.valuewithdraw = this.valuewithdraw.slice(0, this.valuewithdraw.length - 1);
    },
        withdrawShowPopup() {
      this.withdrawShow = true;
    },
    repayShowPopup() {
      this.repayShow = true;
    },
    withdrawInputfunc(index){
      if(index==1){
        this.withdrawRadio='USDT'
        this.$refs.withdrawInputTwo.style.color = "rgb(233, 164, 78)";
        this.$refs.withdrawInputone.style.color = "#1ba27a";
        this.withdrawSrcTwo='./static/image/yuan.png'
        this.withdrawSrcOne='./static/image/duihao1.png'

      }else{
        this.withdrawRadio='PUD'
        this.$refs.withdrawInputone.style.color = "rgb(233, 164, 78)";
        this.$refs.withdrawInputTwo.style.color = "#1ba27a";
        this.withdrawSrcTwo='./static/image/duihao1.png'
        this.withdrawSrcOne='./static/image/yuan.png'
      }

    },
    repayInputfunc(index){
      if(index==1){
        this.repayRadio='USDT'
        this.$refs.repayInputTwo.style.color = "rgb(233, 164, 78)";
        this.$refs.repayInputone.style.color = "#1ba27a";
        this.repaySrcTwo='./static/image/yuan.png'
        this.repaySrcOne='./static/image/duihao1.png'
      }else{
        this.repayRadio='PUD'
        this.$refs.repayInputone.style.color = "rgb(233, 164, 78)";
        this.$refs.repayInputTwo.style.color = "#1ba27a";
        this.repaySrcTwo='./static/image/duihao1.png'
        this.repaySrcOne='./static/image/yuan.png'
      }

    },
    userOnline() {
      this.$api.userGet_repayment({}, res => {
        this.userMsg = res.data;
        this.userNumRepay=res.data.repay
        console.log(this.userNumRepay)
        // this.userNum=this.userMsg.borrowed
      });
      
    },
    use(){
      this.$api.userGet_borrow({},res=>{
        this.userlilv=res.data.lilv
        this.userNum=res.data.jiedai
        // this.userNumRepay=res.data.jiedai
      })
    },
    goTo(path) {
      this.$router.push({ path: path });
    },
    userSet_borrow(){
            let num=this.repayNum
      if(num<=0){
        Toast('请输入数量')
        return false
      }
            let rate=this.repayRadio.toLowerCase() 
                  // let address=this.repayDresss
      // if(address==''){
      //   Toast('请输入地址')
      //   return false
      // }
      this.$api.userSet_borrow({num,rate},res=>{
        if(res.status){
          Toast(res.msg)
          this.repayNum=''
          this.userOnline()
          this.use()
        }

      })
    },
    userSet_repayment(){
      let num=this.withdrawNum
      if(num<=0){
        Toast('请输入数量')
        return false
      }
      let rate=this.withdrawRadio.toLowerCase() 



      this.$api.userSet_repayment({num,rate},res=>{
        if(res.status){
          Toast(res.msg)
          this.withdrawNum=''
          this.userOnline()
          this.use()
        }

      })
    },
    getcancelCount() {
      this.$router.push("/BorrowingFlow")
      // let uid = this.uid;
      // let types = "1";
      // const result = await cancelCount({ uid, types });
      // if (result.count < 3) {
      //   this.$router.push({ path: "/OTCRelease" });
      // }
      // if (result.count >= 3) {
      //   Dialog.alert({
      //     title: "提示",
      //     message: "您的挂单撤单次数达到上限，今日无法下单！"
      //   }).then(() => {
      //     this.$router.replace({ path: "/OTCDeal" });
      //   });
      // }
    }
  },

  components: {
    HeaderTop
  },
  destroyed() {}
};
</script>

<style scoped lang="less">
#Borrowing {
  height: 100%;
  font-size: 14px;
  padding-bottom: 50px;
  padding-top: 50px;


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
    color: #fff;
  }
  .BorrowingCon{
    //   height:200px;
      display:flex;
          flex-direction: column;
    align-items: center;
    .realBorrowing{
        padding-top:10px;
    }
    .realNum{
        height: 50px;
    line-height: 50px;
    font-size:30px;
    }
    .realBtn{
        height: 40px;
    line-height: 40px;
    width: 100px;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #6687f1;

    }
    .realtip{
        margin-top:30px;
        font-size:12px;
        background: #eeeeee5c;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    }
  }
  .borrowingopear{
      display: flex;
    align-items: center;
    padding:10px 0;
    
    >div{
        width:50%;
         display: flex;
    flex-direction: column;
    align-items: center;
    padding:10px 0;
    border-bottom: 1px solid #eeeeee5c;
    >div{
        height:30px;
        line-height:30px;
        color:#fff;

    }

    }
  }
  .stepCon{
      display: flex;
    align-items: center;
    justify-content: space-between;
        padding: 0 40px;
    >p{
        flex:1;
    }
    >div{
        position:relative;
        >div{
                position: absolute;
                left:0;
                right:0;
                top:0;
                bottom:0;
        }
    }
  }
  .stepContip{
      display: flex;
    align-items: center;
    justify-content: space-between;
            padding: 20px 10px 0;
        >div{
            width:25%;
                display: flex;
    justify-content: center;
        }
  }
  .van-steps{
      background:rgba(0,0,0,0) !important;
  }
  .van-popup {
    border-radius: 10px;
    }
    .van-radio-group{
      width:80px;
    }
//   .van-step--horizontal{
// background-color: #f00 !important;

//   }  
  /deep/ .van-step__circle-container{
background: rgba(0,0,0,0) !important;
  }
  /deep/ .van-step--finish{
color: #969799 !important;
// /deep/ .van-radio__icon--checked .van-radio__label{
//   color:rgb(233, 164, 78);
// }
  }
  input{
    &::placeholder {
        color:#000;
        }
  }

  .redClass{
    color:rgb(233, 164, 78);
  }
    .greenClass{
    color:#1ba27a;
  }
  /deep/ .van-password-input{
    top:-300px;
  }
  /deep/ .van-number-keyboard__body{
    color:#000;
  }
}
</style>
