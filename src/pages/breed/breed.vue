<template>
  <div class="breed">
    <div class="hhead">
      <div class="iconfont iconfanhui left" @click="$router.back();"></div>
      <div class="center">{{ $t('boutique') }}</div>
      <div class="right" @click="goTo('/breedlist');"><img src="../../../static/image/messageliu.png" class="liustyle"/></div>
    </div>
    <div class="calcgg">
    <!-- <div class="imgBox">
      <img src="../../../static/image/dappbanner.png" />
    </div> -->
     <div class="swiper-container" >
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in images"> 
                 <img :src="item.address">
              </div>
             
          </div>
            <div class="swiper-pagination swiprRem"></div> 
      
      </div>
    <div class="listBox">
      <div v-for="item in indexData">
        <div class="listBoxImg" @click="getBuy(item.id,item.min)">
          <img :src="item.img" />
        </div>
        <h1>{{item.name}}</h1>

        <p>
          <span>{{ $t('Valueamount') }}：$</span>
          <span>{{item.min}}</span>
        </p>

        <!-- <p>
          <span>天收益：</span>
          <span>{{getbl(item.profit)}}/天</span>
        </p>
        <p>
          <span>周期：</span>
          <span>{{item.day}}天</span>
        </p> -->
        <!-- <div class="btn" @click="getBuy(item.id,item.min)">购买</div> -->
      </div>
    </div>

    <van-dialog v-model="show" title show-cancel-button @confirm="confirm">
      <p>
        <span>{{ $t('Subscriptionvalue') }}</span>
        <input type="text" v-model="minNum"       style="height:40px;width:3.2rem;color:#000;background:#fff;border:1px solid #000;padding:0 .7rem;margin:0 0 0 .4rem"/>
      </p>
      <p style="display: flex;">
        <span style="margin:.4rem 0 0 0 ">{{ $t('Payment') }}</span>
        <van-radio-group v-model="radiotype"  style="margin:0 0 0 .45rem">
            <van-radio name="1" checked>USDT</van-radio>
          <!-- <van-radio name="2">USDT</van-radio> -->
           <!-- <van-radio name="2">USDT({{ udstCount }})+<br>RUSD({{ qeeCount }})</van-radio>   -->

        </van-radio-group>
      </p>
      <!-- <p style="display: flex;" v-if="coinprice === null || coinprice === ''">
        <span style="color: #ff5454;"> 请配置GEE币种 </span>
      </p> -->

      <p>
        <span>{{ $t('Secondarypassword') }}</span>
        <input type="password" v-model="pad" style="height:40px;width:3.2rem;color:#000;background:#fff;border:1px solid #000;padding:0 .7rem;margin:0 0 0 .4rem" />
      </p>
    </van-dialog>
    </div>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

import Vue from 'vue'
import { Toast, Dialog, RadioGroup, Radio } from 'vant'
 import Swiper from 'swiper';
 import 'swiper/dist/css/swiper.min.css';
Vue.use(Toast)

// 全局注册
Vue.use(Dialog)

Vue.use(RadioGroup)
Vue.use(Radio)
export default {
    inject: ['reload'],
    data () {
        return {
            indexData: [],
            uid: '',
            appointmentFlag: false,
            ttype: '',
            num: '',
            pad: '',
            show: false,
            minNum: '',
            threeMoney: 0,
            threePoint: 0,
            radiotype: '1',
            coinprice: null,
            images: [
              {"id":1,
              "address":require('../../../static/image/dappbanner.png')
            },{"id":2,
              "address":require('../../../static/image/dappbanner2.png')
            }
            ],
        }
    },
    components: {
        HeaderTop
    },
    created () {
      　var that = this;
　　that.$nextTick(function(){
                new Swiper ('.swiper-container', {
                direction:"horizontal",/*横向滑动*/ 
　　　　 　    　loop:true,
　　　　　     　pagination:".swiper-pagination",/*分页器*/ 
    　　 　　    autoplay:3000/*每隔3秒自动播放*/ 
       }) 
    })
    },
    mounted () {
        let that = this
        that.getData()
        this.userOnline()
        this.getPrice()
    },
    computed: {
        udstCount () {
            return this.minNum * 0.9
        },
        qeeCount () {
          let count = this.minNum * 0.1
            // let count = this.minNum * 0.3 / this.coinprice
            return count.toFixed(2)
        }
    },
    methods: {
    
        goTo (path) {
            this.$router.push(path)
        },
        getData () {
            let types = '2'
            this.$api.reqOceanIndex({ types }, res => {
                if (res.status) {
                    this.indexData = res.data
                }
            })
        },
        getPrice () {
            let coin = {'symbol': 'qee'}
            this.$api.coinPrice(coin, res => {
                if (res.status) {
                    this.coinprice = res.data
                }
            })
            setTimeout(this.getPrice, 2000)
        },
        userOnline () {
            this.$api.userInfo({}, res => {
                this.uid = res.data.id
                this.threeMoney = res.data.money
                this.threePoint = res.data.point
            })
        },
        async confirm () {
            if (!this.pad) {
                Toast('请输入二级密码')
                return
            }

            this.appointmentFlag = true
            let exchange_type
            if (this.radiotype == 2) {
                exchange_type = 'usdt'
            } else if (this.radiotype == 1) {
                exchange_type = 'usdt'
            } else if (this.radiotype == 3) {
                exchange_type = 'usdt'
            }
            let oid = this.oid
            let num = this.minNum
            let pay_pwd = this.pad
            this.$api.reqOceanlicai({ oid, num, exchange_type, pay_pwd }, res => {
                if (res) {
                    Toast(res.msg)
                    this.appointmentFlag = false
                    this.pad = ''
                    this.radiotype = '1'
                    if (res.status) {
                        this.$router.push({ path: '/breedlist' })
                    }
                }
            })
        },
        async getBuy (oid, minNum) {
            if (this.appointmentFlag) {
                Toast('购买中')
                return
            }
            this.show = true
            let uid = this.uid
            let type = ''
            this.oid = oid
            this.minNum = minNum
            // const result = await regAllPayType({ uid, type });
            // if (result.PayMethod.length >=3) {
            //   this.ttype = 2;
            //   this.getMake();
            // } else {
            //   Toast("至少添加三种支付方式");
            //   this.$router.push("/bank");
            // }
        },
        getbl (item) {
            return (item * 100).toFixed(2) + '%'
        }
    }
}
</script>
<style>


   .swiper-pagination-bullet {
    width: 16px!important;
    height: 6px;
    display: inline-block;
    border-radius: 20px!important;
    background: #000;
    opacity: .2;
}

.swiper-pagination-bullet-active {
    opacity: 1;
    background: rgb(150, 150, 155)!important;
}
.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 10px;
    left: 0;
    width: 100%;
    margin: 0 0 0 100px;
}

.van-dialog {
    position: fixed;
    top: 45%;
    left: 50%;
    width: 320px;
    overflow: hidden;
    font-size: 16px;
    color:#fff;
    background-color: rgb(64,65,74);
    border-radius: 10px;
    -webkit-transform: translate3d(-50%,-50%,0);
    transform: translate3d(-50%,-50%,0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-transition-property: opacity,-webkit-transform;
    transition-property: opacity,-webkit-transform;
    transition-property: transform,opacity;
    transition-property: transform,opacity,-webkit-transform;
}
.van-radio__label{
color: #fff;
}
</style>
<style scoped>

 .swiper-container {
      width: 97%;
      height: 140px;
      margin: 12px auto 0 ;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, .22), 0 0 12px rgba(0, 0, 0, .14);
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    } 
   .swiper-slide img{
     width:100%
   }
.breed {
  padding-bottom: 60px;
  color: #fcfffa;
  height: 100%;
}
.breed .hhead{
  height: 50px;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  background: #474953;
  padding: 0 20px;
}
.breed .hhead>div{
  width: 33.3%;
  color: #fff;
  line-height: 50px;
}
.breed .hhead .left{
  text-align: left;
  font-size: 15px;
}
.breed .hhead .center{
  text-align: center;
  font-size: 18px;
}
.breed .hhead .right{
  text-align: right;
  font-size: 15px;
}
.breed .calcgg {
  padding: 0 10px;
  overflow: auto;
  height: calc(100% - 50px);
}
.breed .imgBox {
  height: 160px;
  padding: 10px 0 20px;
}
.breed .imgBox img {
  width: 100%;
  height: 100%;
}
.breed .listBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* overflow: auto; */
padding: 0 0 40px 0;
}

.breed .listBox > div {
  width: 33.33%;
  /* height: 410px; */
  background: #474953;
  margin-top: 25px;
  border-radius: 10px;
  text-align: left;
  padding: 5px 6px 0;
 
}
.breed .listBox > div .listBoxImg {
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 10px; */
    width: 100%;
  margin: auto;
  height: 130px;
   border-radius: 5%; 
  background: #3d3e46;
 box-shadow: 0 2px 4px rgba(0, 0, 0, .52), 0 0 6px rgba(0, 0, 0, .44);
  overflow: hidden;
}
.breed .listBox > div .listBoxImg img {
  width: 100%;
  height: 130px;
 
}
.breed .listBox > div h1 {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #eec67f;
  margin: 10px 0 0 0;
}
.breed .listBox > div p {
  line-height: 24px;
  color:#999999
}
.breed .listBox > div .btn {
  height: 30px;
  width: 70%;
  border-radius: 25px;
  background: #fcdc29;
  line-height: 30px;
  text-align: center;
  margin: 30px 15% 10px 15%;
}
.breed .listBox > div .btngrey {
  background: #eee;
  color: #000;
}
.breed .nomalBox {
  width: 33.3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}
.breed .nomalBox span {
  height: 24px;
  line-height: 24px;
}
.breed .nomalBox img {
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}

.liustyle{
width: .35rem;
margin:.35rem 0 0 0;
}
/deep/ .van-dialog__content {
  padding: 10px 20px 10px 20px;
  line-height: 30px;
  color: #fff;

  justify-content: space-between;
}
/deep/ .van-dialog__content p {
  margin: 10px 0;
}
/deep/ .van-dialog__content input {
  height: 30px;
  border-radius: 5px;
  background: none;
}

.van-radio{
margin:0 0 10px 0
}
/* /deep/ .van-dialog{
  background: #2a2d4c;
}
/deep/ .van-button--default {
    background: #2a2d4c;
    color: #fff;
}
/deep/ .van-dialog__confirm {
    background: #2a2d4c;
    color: #1989fa;
} */
</style>
