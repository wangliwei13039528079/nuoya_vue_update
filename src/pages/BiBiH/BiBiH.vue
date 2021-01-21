<template>
  <div class="bibih">
    <HeaderTop :title="$t('transfer')">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>

    <div class="content">
      <!-- <van-cell-group>
        <van-field label="划转类型" value="J币" readonly/>
        <van-field
          v-model="num"
          @input="changeNum"
          type="number"
          label="划转数量"
          placeholder="请输入划转的数量"
        />
      </van-cell-group> -->
      <div class="con">
        <span for="" class="tit">{{ $t('typeTransfer') }}</span>
        <!-- <label for="option">
          <i class="iconfont iconxiala"></i>
        </label> -->
        <van-icon name="arrow-down" info="" style="float:right!important;width:10%" />
        <select name id="option" ref="options" style="float:right!important;width:30%">
          <option :value="item.Name" v-for="(item,index) in transferCoin">{{item.Name.toUpperCase()}}</option>
        </select>
        
      </div>
      <div class="con">
        <span for="" class="tit">{{ $t('numTransfer') }}</span>
        <input type="text" :placeholder="$t('numTransferP')"  v-model="num">
          
      </div>

      <div class="menus">
        <van-button size="large" class="btn" @click="showKeyboard = true">{{ $t('sure') }}</van-button>
      </div>

      <!--悬浮层-->
      <div class="pwd-keyboard" v-show="showKeyboard">
        <!-- 密码输入框 -->
        <!-- 密码输入框 -->
        <van-password-input :value="value" @focus="showKeyboard = true"/>

        <!-- 数字键盘 -->
        <van-number-keyboard
          style="color:#000"
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
      <!--悬浮层-->
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import { reqRevolve, req2Coinlist, reqRransfer,reqTransferCoin } from "../../common/apigo";
import { Field, Toast } from "vant";
import Vue from "vue";
Vue.use(Field);
Vue.use(Toast);

export default {
  data() {
    return {
      type: "",
      num: "",
      total: "",
      types: "",
      transfer: "",
      flag: true,
      show: false,
      psd: "",
      showKeyboard: false,
      value: "",
      coinlist:[],
      transferCoin:[]
    };
  },

  components: {
    HeaderTop
  },
  mounted() {
    this.type = this.$route.query.type;
    this.types = this.$route.query.name;
    this.userOnline()
    this.getCoinList()

  },
  methods: {
    userOnline() {
      this.$api.userInfo({}, res => {
        this.uid = res.data.id;
        this.getCoin()
      });
    },
    changeNum() {
      this.num = this.num.match(/^\d*(.?\d{0,10})/g)[0];
      if (Number(this.num) < 0) {
        this.num = "";
      }
    },
     async getCoinList(){
        let coinname = this.types
        const result = await reqTransferCoin({coinname})
        if(result.errcode == 0) {
            this.transferCoin = result.coin
        }
    },
    // options(){
    //     this.trantype = this.$refs.trantype.value
    // },
    async getCoin() {
      let uid=this.uid;
      let mid=''
      const result = await req2Coinlist({uid,mid});
      if(result.errcode==0){
        let coins = result.Balance
        coins.forEach((item,index)=>{
          if(item.CoinName != this.types) {
              this.coinlist.push(item.CoinName)
          }
          if(item.CoinName == this.types) {
            this.num = parseInt(item.Num*1000000)/1000000
          }
        })
      }
    },
    async getRransfer() {
      if (!this.flag) {
        return Toast("正在划转，请稍后");
      }
      this.flag = false;
      let coinAdd = this.$refs.options.value;
      let coinSub = this.types
      // let to_type = 6
      let uid = this.uid;
      let amount = this.num;
      let payPwd = this.value;
      if (this.num.length < 1) {
        this.flag = true;
        this.value = "";
        return Toast("请输入数量");
      }
      if(this.num == 0) {
        this.value = ''
        this.flag = true
        Toast('请输入数量')
        return
      }
      if (payPwd.length < 1) {
        Toast("请输入二级密码");
        this.flag = true;
        return;
      }
      let result = await reqRransfer({ uid, coinAdd, coinSub, amount, payPwd }); //{from_type,to_type,num,erjipwd}
      if(result){
        this.value = ''
      }
      if (result.errcode == -1) {
        Toast("uid不正确");
      } else if (result.errcode == -2) {
        Toast("划转币种无效");
      } else if (result.errcode == -3) {
        Toast("请输入0~10000之间的数量");
      } else if (result.errcode == -4) {
        Toast("用户信息获取失败");
      } else if (result.errcode == -5) {
        Toast("密码错误");
      } else if (result.errcode == -6) {
        Toast("账户被禁用");
      } else if (result.errcode == -7) {
        Toast("获取币种失败");
      } else if (result.errcode == -8) {
        Toast("金额无效");
      } else if (result.errcode == -9) {
        Toast("余额不足");
      } else if (result.errcode == -10) {
        Toast("划转失败");
      } else if (result.errcode == -11) {
        Toast("划转失败");
      } else if (result.errcode == -12) {
        Toast("账单插入失败");
      } else if (result.errcode == 0) {
        Toast("成功");
      }
      this.num = "";
      this.flag = true;
      this.value = "";
      // if(res.code == 1) {
      //     this.getMoney()
      // }
    },
    // async getMoney () {
    //     let res = await req2Coinlist()
    //     let flag = this.types
    //     for (var i in res.type) {
    //         this.total = res.type[flag].money
    //     }
    // },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);

      if (this.value.length == 6) {
        this.showKeyboard = false;
        this.getRransfer()
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>

<style scoped lang="less">
.bibih {
  height: 100%;
  padding: 0 10px;
  // background-color: #edf1f4;
  padding-top: 50px;
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .content {
  background: rgb(61, 62, 70);
     width:95%;
     margin: .2rem auto;
     padding:.2em 0 .1rem 0;
    -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;
    .menus {
      margin-top: 10px;
    }
  }
  .type {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    display: flex;
    align-items: center;
    span {
      flex: 1;
      max-width: 90px;
    }
    select {
      padding: 5px;
    }
  }
  .tips {
    padding: 10px 15px;
    font-size: 14px;
    margin-top: 5px;
  }
  .van-button--default {
    background-color: #7497f1;
    color: #fff;
    border: none;
  }
  .pwd-keyboard {
    width: 100%;
    height: 100%;
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);

    .van-password-input {
      margin-top: 30%;
    }
  }
      .btn {
    padding: 10px 0;
    text-align: center;
    border-radius: 5px;

      background: rgb(57,57,65);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;border:none;color:#fff;position:fixed;bottom:.3rem;width:90%;left:50%;transform: translate(-50%,-50%);
                color: #fff;
                border-top: none;
  }
  .con {
      padding: 10px 15px;
    font-size: 14px;
    position: relative;

    // display: flex;
      background-color: rgb(60,61,69);
            border: 1px solid #eec67f;
            color: #fff;
            margin:.3rem auto;
            width: 90%;
            border-radius:5px;
    span {
      display: inline-block;
      width: 30%;
    }
    label {
        position: absolute;
        top: 10px;
        right: 15px;
    }
    input {
        border: none;
        padding: 5px 0;
        flex: 1;
        color: #fff;
         text-align: right;
    }
    select {
        color: #fff;
        width: 100%;
        border: none;
        padding-left: 5px;
        flex: 1;
         text-align: right;
        option {
            color: #fff;
            background-color: #232121;
        }
    }
  }
}
</style>
