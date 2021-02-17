<template>
    <div class="CashAssets">
        <HeaderTop :title="$i18n.t('owner')">
        </HeaderTop>
        <div class="tit" >name</div>
        <div class="clear"></div>
        <div class="tit" >@MINGZHI</div>
        <div class="clear"></div>
        <div class="content">
              <div class="coin-content"  >
                           <div class="coin-item" @click="goTo('/Security')">
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1">
                                                   <p>安全中心</p>
                                                </div>
                                                <div class="c1">
                                                   <p >></p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>

                           <div class="coin-item"  @click="goTo('/key')">
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1">
                                                   <p>ETH私钥</p>
                                                </div>
                                                <div class="c1">
                                                   <p >></p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>

                           <div class="coin-item"  @click="goTo('/Share')">
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1" >
                                                   <p>节点邀请</p>
                                                </div>
                                                <div class="c1">
                                                   <p >></p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>

                           <div class="coin-item" >
                                        <div class="content_box" @click="goTo('/index')">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1" >
                                                   <p>我的社区</p>
                                                </div>
                                                <div class="c1">
                                                   <p >></p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>
                           <div class="coin-item" @click="goTo('/recommendlist')" >
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1">
                                                   <p>申请商家</p>
                                                </div>
                                                <div class="c1">
                                                   <p >></p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>
                           <div class="coin-item" @click="logout">
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1" >
                                                   <p>退出邀请</p>
                                                </div>
                                                <div class="c1">
                                                   <p >></p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>
                           <div class="coin-item" @click="logout">
                                        <div class="content_box" >
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1" >
                                                   <p>退出登录</p>
                                                </div>
                                                <div class="c1">
                                                   <p >></p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>
              </div>
        </div>
  <div>

  </div>

    </div>
</template>

<script>
  import Vue from "vue";
  import { PullRefresh, Toast } from "vant";
  import BScroll from "better-scroll";
  import { mapState } from "vuex";
  Vue.use(PullRefresh);
  Vue.use(Toast);
  import { Swipe, SwipeItem } from "vant";

  Vue.use(Swipe).use(SwipeItem);
  import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
  import { reqBalance, reqCoin, req2Coinlist } from "../../common/apigo";
  let echarts = require('echarts/lib/echarts')
  // 引入饼状图组件
  require('echarts/lib/chart/pie')
  // 引入提示框和title组件


 export default {
    created(){
      if(this.GLOBAL.getStorage("user_token")){
                  this.getCoin();
                }else{
                  this.$router.push('/login')
                }
    },
    components: {
          HeaderTop
   },
    mounted(){
      this.initData();
    },
    methods:{
        goTo (path) {
            this.$router.push({path: path})
        },
        logout () {
                   this.$dialog.confirm({
                       mes: this.$t('loginOut')+'?',
                       opts: [
                           {
                               txt: this.$t('cancel'),
                               color: false
                           },
                           {
                               txt: this.$t('confirm'),
                               color: true,
                               callback: () => {
                                   this.$api.logout({}, res => {
                                       if (res.status) {
                                           this.GLOBAL.removeStorage('user_token')
                                           this.GLOBAL.removeStorage('login-type')
                                           this.GLOBAL.removeStorage('helpout')
                                           this.$router.replace('/')
                                       }
                                   })
                               }
                           }
                       ]
                   })
               },
    },
  }

</script>

<style scoped lang="less">
         .main1{
             float:left;
             width:100%;
             height: 30vw;
             background: #F6F7FC;
         }
    .CashAssets {
        height: 130vw;
        padding-top: 50px;
        background: #F6F7FC;
        .content {
            width: 100%;
             background: #F6F7FC;

        }
        .back {
            padding: 0 18px;
            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
       img {
            width: 6vw;
            height: 6vw;
       }
        .tit {
                padding:1vw 0 1vw 0;
                float:left;
                height: 5vw;
                width: 30%;
                margin-left:10%;
                margin-top:1vw;
                margin-bottom:1vw;
                font-size: 16px;
                color: black;
                text-align:center;
        }
        .coin-item {
            height:10vw;
            border-radius: 5px;
            background-color: #FFFFFF;
            border-bottom:1px solid #E6E6E6;
            color: #5CC8CB;
            width:100%;
            .content_box {
            display: flex;
            justify-content: space-between;
            .a1{
               margin-top:2vw;
               margin-left:5%;
               width:10%;
               color:#5CC8CB;
               text-align: left;
               float:left;
            }
            .b1{
               margin-top:2vw;
               margin-left:2%;
               width:43%;
               color:black;
               text-align: left;
               float:left;
               font-family:Microsoft Yahei;
               font-size:16px;
             }
            .c1 {
                margin-top:3vw;
                width:30%;
                color:#ADADAD;
                text-align: right;
                margin-right:15%;
                font-size:16px;
            }
        }
        }
    }

</style>
