<template>
    <div id="dapp" style="background-color:#F6F7FC;">
        <HeaderTop title="生态"></HeaderTop>
        <div class="content">
            <div class="tit1">
                    <span>保险</span>
                    <span>Insurance</span>
            </div>
           <div class="round">
                    <img src="../../../static/image/insurance.png" alt="">
           </div>
        </div>

       <div class="content">
                  <div class="tit2">
                    <span>珠宝</span>
                    <span>Jewelry Watch</span>
                  </div>
                  <div class="round1">
                    <img src="../../../static/image/insurance.png" alt="">
                  </div>
       </div>
       <div class="content">
                  <div class="tit1">
                    <span>黄金</span>
                    <span>Gold investment products</span>
                  </div>
                  <div class="round">
                    <img src="../../../static/image/insurance.png" alt="">
                  </div>
        </div>
        <div class="content">
           <div class="tit2">
               <span>奢侈品</span>
              <span>Luxury</span>
           </div>
           <div class="round1">
                    <img src="../../../static/image/insurance.png" alt="">
           </div>
        </div>
       <div class="content">
           <div class="tit1">
               <span>农产品</span>
              <span>Agriculture products</span>
           </div>
           <div class="round">
                    <img src="../../../static/image/insurance.png" alt="">
           </div>
        </div>
       <div class="content">
                <div class="tit2">
                  <span>房产</span>
                  <span>Global real estate</span>
                </div>
                <div class="round1">
                    <img src="../../../static/image/insurance.png" alt="">
                </div>
        </div>
       <div class="content">
              <div class="tit1">
                  <span>海岛</span>
                  <span>Private island</span>
              </div>
              <div class="round">
                    <img src="../../../static/image/insurance.png" alt="">
              </div>
           </div>
        <div class="content">
                   <div class="tit1">
                     <span>游艇</span>
                      <span>Private yacht</span>
                   </div>
                   <div class="round">
                    <img src="../../../static/image/insurance.png" alt="">
                   </div>
        </div>
        <div class="content">
             <div class="tit2">
                  <span>汽车</span>
                  <span>Top sports car</span>
             </div>
             <div class="round1">
                    <img src="../../../static/image/insurance.png" alt="">
             </div>
        </div>
    </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Vue from 'vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
  import { PullRefresh, Toast } from "vant";
  import BScroll from "better-scroll";
  import { mapState } from "vuex";
  Vue.use(PullRefresh);
  Vue.use(Toast);
  import { Swipe, SwipeItem } from "vant";

  Vue.use(Swipe).use(SwipeItem);
    import { reqBalance, reqCoin, req2Coinlist } from "../../common/apigo";

   export default {
    data() {
        return {};
    },
    created(){
      if(this.GLOBAL.getStorage("user_token")){
                  this.getCoin();
                }else{
                  this.$router.push('/login')
                }
    },
    mounted() {
        this.initSwiper()
    },
    methods: {
        initSwiper() {
            this.$nextTick(() => {
                var mySwiper = new Swiper('.swiper-container', {
                    autoplay: 2000, //可选选项，自动滑动
                    loop: true,
                    pagination: '.swiper-pagination'
                })
                // new BScroll('#Msite', {
                //     click: true,
                //     momentum: false
                // })

            })
        },
        goTo(path) {
            this.$router.push({path})
        },
        notOpen() {
            this.$dialog.toast({mes: '未开放', timeout: 1000})
        },
        goToShop(path, id) {
            this.$router.push({path, query: {cat_id: id}})
        }
    },
    components: {
        HeaderTop
    },
};
</script>

<style lang="less" scoped>
#dapp {
    padding: 50px 10px 60px;
    width:100%;
    .content{
     width:100%;
     height: 16vw;
    }
    .round{
     margin-left:2%;
     float:left;
    border: 2.3px solid #6C75E4;
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    background-color: #FFFFFF;
    position:absolute;
    text-align:center;
     img {
            width: 40px;
            height: 40px;
            margin-top:3vw;
       }
     }
     .tit1 {
       margin-left:5%;
       margin-top:1vw;
       float:left;
       height: 13vw;
       background-color: #FFFFFF;
       border-top-left-radius: 65px;
       border-top-right-radius: 65px;
       border-bottom-right-radius: 65px;
       border-bottom-left-radius: 65px;
       width: 85%;
       font-size: 16px;
       border: 2.3px solid #6C75E4;
       position:absolute;
       color:darkgray;
       font-size: 17px;
       text-align:center;
       font-weight:600;
    }
    .round1{
         margin-left:2%;
         float:left;
        border: 2.3px solid #F49319;
        width: 15vw;
        height: 15vw;
        border-radius: 50%;
        background-color: #FFFFFF;
        position:absolute;
        text-align:center;
     img {
            width: 40px;
            height: 40px;
            margin-top:3vw;
       }
         }
         .tit2 {
           margin-left:5%;
           margin-top:1vw;
           float:left;
           height: 13vw;
           background-color: #FFFFFF;
           border-top-left-radius: 65px;
           border-top-right-radius: 65px;
           border-bottom-right-radius: 65px;
           border-bottom-left-radius: 65px;
           width: 85%;
           font-size: 16px;
           border: 2.3px solid #F49319;
           position:absolute;
           color:darkgray;
           font-size: 17px;
           text-align:center;
           font-weight:600;
           verticle-align:middle;
        }
        span{
         word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;
        }
  }
</style>
