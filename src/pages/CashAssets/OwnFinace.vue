<template>
    <div class="CashAssets">
        <HeaderTop :title="$i18n.t('assets')">
        </HeaderTop>
        <div class="content">
              <div class="coin-content">
                           <div class="coin-item" >
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1">
                                                   <p>总资产</p>
                                                </div>
                                                <div class="c1">
                                                   <p >888888</p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>

                           <div class="coin-item" >
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1" style="color:#1C9CAA">
                                                   <p>云资产</p>
                                                </div>
                                                <div class="c1">
                                                   <p >888888</p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>

                           <div class="coin-item" >
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1" style="color:#D8432B">
                                                   <p>生态云增</p>
                                                </div>
                                                <div class="c1">
                                                   <p >888888</p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>

                           <div class="coin-item" >
                                        <div class="content_box">
                                               <div class="a1">
                                                  <p><img src="../../../static/image/insurance.png" alt=""></p>
                                                </div>
                                                <div class="b1" style="color:#EDA000">
                                                   <p>社区云增</p>
                                                </div>
                                                <div class="c1">
                                                   <p >888888</p>
                                                 </div>
                                               </div>
                                             <div class="clear"></div>
                            </div>
              </div>
        </div>
  <div>
  <div id="main1" class="main1" ></div>
  <div class="clear"></div>

  <div class="tit" >我的资产</div>
    <div class="clear"></div>
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
      //初始化数据
      initData() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main1'));
        // 绘制图表
        myChart.setOption({

            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '80%',
                    center: ['50%', '50%'],
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ],
                   color : [ 'yellow', 'red', 'blue', 'green', 'yellow',  ],
                   itemStyle : {
                                   normal : {
                                       label : {
                                           show : false   //隐藏标示文字
                                       },
                                       labelLine : {
                                           show : false   //隐藏标示线
                                       }
                                   }
                               }

                }
            ]
        });
      },
    }
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
                height: 6vw;
                background: white;
                border-top-left-radius: 50px;
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
                border-bottom-left-radius: 50px;
                width: 30%;
                margin-left:35%;
                margin-top:1vw;
                font-size: 16px;
                color: black;
                text-align:center;
        }
        .coin-item {
            height:10vw;
            margin: 10px 18px;;
            border-radius: 5px;
            background-color: #FFFFFF;
            box-shadow: 0px 0px 0.1rem rgba(0,0,0,.2);
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
               color:#5CC8CB;
               text-align: left;
               float:left;
               font-family:Microsoft Yahei;
               font-size:20px;
               font-weight:600;
               text-shadow:1px 1px 1px #000;
             }
            .c1 {
                margin-top:3vw;
                width:30%;
                color:#5A5A5A;
                text-align: right;
                margin-right:15%;
                font-size:20px;
                font-weight:600;
            }
        }
        }
    }

</style>
