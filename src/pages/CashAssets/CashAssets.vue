<template>
    <div class="CashAssets">
        <HeaderTop :title="$i18n.t('assets')">
            <a class="back" @click="goPage('/msiteb')" slot="left">
                <i class="iconfont icon-fanhui"></i>
            </a>
            <!-- <a class="right" @click="goTo('/Bill?type=1')" slot="right">账单</a> -->
        </HeaderTop>
        <div class="content">
            <div class="content-wrap"  style="padding-bottom: 6em;">
                <div class="coin-content">
                    <div class="coin-item" v-for="(item,index) in coinlist" :key="index">
                        <div class="coin">
                            <div class="icon">
                                <div style="display: flex;align-items: center;"><img class="imgh1" :src="item.ImgUrl" alt />
                                    <!-- <p style="font-weight:700">{{item.CoinName.toLocaleUpperCase()}}({{item.Price}})</p> -->
                                          <p style="font-weight:500;font-size: 0.32rem;">{{item.CoinName.toLocaleUpperCase()}} </p>
                                </div>

                                <a @click="goPage('/Bill?type=' + item.CoinName)"><img src="../../../static/image/messageliu.png" class="liustyle"/></a>
                            </div>
                            <div class="content_box">
                                <div class="total">
                                    <p>{{$t('coinHold')}}</p>
                                    <p class="classRed p2">{{parseInt((Number(item.Num)+item.LockNum)*1000000)/1000000}} <span class="span3"> ≈ ${{parseInt(item.TotalMoney*100)/100}}</span></p>
 
                                </div>
                                <!-- <div class="num">
                                  <p>{{$t('coinAvailable')}}</p>
                                  <p>{{parseInt(item.Num*1000000)/1000000}}</p>
                                </div> -->
                                <div class="lock">
                                    <p >{{ $t('price') }}</p>
                                    <p class="p1">$<span class="classRed">{{item.Price}}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="menu-box">
                        <a
                                    @click="goPageT('/BiBiT', item.Mid , item.CoinName)"
                                    v-if="item.WithdrawStatus==1"
                            >{{$t('withdraw')}}</a>
                            <a
                                    @click="goPage('/BiBiH?type=' + item.Mid + '&name=' + item.CoinName)"
                                    v-if="item.TransferStatus ==1"
                            >{{ $t('FlashExchange') }}</a>
                            <a
                                    class="transfer"
                                    @click="goPage('/BiBizzz?type=' + item.Mid + '&name=' + item.CoinName)"
                                    v-show="item.Interturn=='1'"
                            >{{ $t('Futures') }}</a>
                          
                                  <a
                                    @click="goPageC('/BiBiC',item.CoinName)"
                                    v-if="item.TopUpStatus==1"
                            >{{$t('rechargeCoin')}}</a>
                          
                          <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
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
  export default {
    data() {
      return {
        total: 0,

        coinlist: [],
        isLoading: false,
        userInfo: "",
      };
    },
    components: {
      HeaderTop
    },
    created(){
      if(this.GLOBAL.getStorage("user_token")){
        this.getCoin();
      }else{
        this.$router.push('/login')
      }
    },
    mounted() {
      // if(this.GLOBAL.getStorage("user_token")){
      //   this.getCoin();
      // }else{
      //   this.$router.push('/login')
      // }

    },

    methods: {
      async getCoin() {
        let mid = "";
        const result = await req2Coinlist({ mid });
        if (result.errcode == 0) {
          let coins = result.Balance;
          coins.forEach(item => {
            if (item.CoinName == "eth") {
              this.coinlist.unshift(item);
            } else if (item.CoinName == "eos") {
              this.coinlist.splice(2, 0, item);
            } else if (item.CoinName == "usdt") {
              this.coinlist.splice(1, 0, item);
            } else {
              this.coinlist.push(item);
            }
          });
        }
      },
      goPage(path) {
        this.$router.push({ path: path });
      },
      goPageT(path, mid, coinName) {
        this.$router.push({ path: path, query: { type: mid, name: coinName } });
      },
      goPageC(path, coin) {
        this.$router.push({ path: path, query: { type: coin } });
      }
    }
  };
</script>

<style scoped lang="less">

    .CashAssets {
        height: 100%;
        padding-top: 50px;
        overflow: auto;
        color: #d8dadd;
        background: #474953;
        .content {
            width: 100%;
        }

        .back {
            padding: 0 18px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .top-info {
            background-color: #2c3d4f;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            > p {
                margin: 5px 0;
            }
        }
        .content_box {
            display: flex;
            justify-content: space-between;
            .total,
            .num,
            .lock {
               .p2{
          font-size: 0.28rem;
        }
                p {
                  font-size: 0.22rem;
                    padding:0 0 8px 0;
                     
                }
                 .p1 {
                  font-size: 0.28rem;
                      color: #c6a086;
                }
                .span3{
                  margin-left: 0.1rem;
                      font-size: 0.2rem;
    color: #7b8085;
                }
            }
            .lock {
              
                text-align: right;
            }
        }
        .coin {
            font-size: 0.28rem;
            padding: 0 20px;
            .icon {
                display: flex;
                align-items: center;
                padding: 8px 0 8px;
                justify-content: space-between;
                .imgh1 {
                  width: 0.4rem;
                   height: 0.4rem;
                    margin-right: 10px;
                }
            }
            .liustyle{
width: .32rem;
margin:.10rem 0 0 0;
}
        }

        .coin-item {
            margin: 10px 18px;;
            justify-content: space-between;
            border-radius: 5px;
            background-color: #3d3e46;
            box-shadow: 0px 0px 0.1rem rgba(0,0,0,.2);

            .content-box {
                padding: 10px;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                //   color: #14364b;
                flex: 1;

                .type {
                    padding: 10px;
                    display: flex;
                    font-size: 16px;
                    font-weight: bold;
                    justify-content: space-between;
                }

                .info-box {
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                }
            }

            .menu-box {
                font-size: 14px;
                padding: 10px;
                margin:0 .3rem .3rem .3rem;
               // display: flex;
              // float: right;
                text-align: center;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                border-top: 1px solid #35363e;
               
                // 
                //   color: #9ba9b1;
                //   background-color: #f5f5f5;

                > a {
                 
                    // flex: 1;
                    // width: 60px;
                    // border-right: 1px solid #232121;
                    // background: url(../../../static/image/cashBtn.png);
                 padding:  0 0.3rem;
                  // height: 0.46rem;
                  line-height: 0.46rem;
                  font-size: 0.23rem;
                  color: #333; 
                  background: #eec67f;
                  border: 1px solid #b7967f;
                  text-align: center;
                  display: inline-block;
                  border-radius: 0.08rem;
                  margin-left: 0.35rem;
                    max-width: 33%;
                    float: right!important;
                  
                }
                :last-child{
                    margin-right:0;
                }
                .clear{
                  clear: both
                }
               
            }
        }
        .classRed{
            color: #c6a086;
        }
        
    }
</style>
