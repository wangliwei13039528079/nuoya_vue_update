<template>
    <div id="dapp">
        <HeaderTop title="DAPP"></HeaderTop>
        <!--轮播图 开始-->
        <div class="slide">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <img src="../../../static/image/dapp1.png" alt=""
                            class="swiper-slide">
                    <img src="../../../static/image/dapp2.png" alt=""
                    class="swiper-slide">
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!--轮播图 结束-->
        <div class="modular">
            <div class="tit">
                精品
            </div>
            <div class="menu">
                <div class="menu_item" @click="goTo('/EOSV')">
                    <img src="../../../static/image/qeest.png" alt="">
                    <span>KLP合约</span>
                </div>
                
                  <div class="menu_item"  @click="notOpen">
                    <img src="../../../static/image/ny.png" alt="">
                    <span>保险</span>
                </div>
                <div class="menu_item" @click="notOpen">
                    <img src="../../../static/image/jiedai.png" alt="">
                    <span>汽车</span>
                </div>  
                <!-- <div class="menu_item"  @click="goTo('/kjpage')">
                    <img src="../../../static/image/li.png" alt="">
                    <span>节点部署</span>
                </div>
                <div class="menu_item" @click="goTo('/Borrowing')">
                    <img src="../../../static/image/jiedai.png" alt="">
                    <span>借贷</span>
                </div> -->
                <!-- <div class="menu_item" @click="goTo('/EOSV')">
                    <img src="../../../static/image/li.png" alt="">
                    <span>EOSV</span>
                </div> -->
                <!-- <div class="menu_item" @click="goTo('/BiBiPage')">
                    <img src="../../../static/image/BiBi.png" alt="">
                    <span>币币交易</span>
                </div> -->
                 <div class="menu_item" @click="goToShop('/goodslist',16)">

                    <img src="../../../static/image/insurance.png" alt="">
                    <span>欧洲珠宝</span>
                </div> 
            </div>
        </div>
        <!-- <div class="modular">
            <div class="tit">
                {{$t('enroll')}}
            </div>
            <div class="menu">
                <div class="menu_item" @click="notOpen">
                    <img src="../../../static/image/apply.png" alt="">
                    <span>{{$t('apply')}}</span>
                </div>
                <div class="menu_item" @click="notOpen">
                    <img src="../../../static/image/query.png" alt="">
                    <span>{{$t('query')}}</span>
                </div>
                <div class="menu_item" @click="notOpen">
                    <img src="../../../static/image/vip.png" alt="">
                    <span>VIP</span>
                </div>
            </div>
        </div> -->
        <div class="modular">
            <div class="tit">
                应用
            </div>
            <div class="menu">
                <div class="menu_item" @click="notOpen" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/cat.png" alt="">
                    <span>游戏</span>
                </div>
                <div class="menu_item" @click="notOpen" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/BiBi.png" alt="">
                    <span>支付</span>
                </div>
                <div class="menu_item" @click="notOpen" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/life.png" alt="">
                    <span>生活</span>
                </div>
                <div class="menu_item" @click="notOpen" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/old.png" alt="">
                    <span>服务</span>
                </div>
                <div class="menu_item" @click="notOpen" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/wai.png" alt="">
                    <span>金融</span>
                </div>
                <div class="menu_item" @click="notOpen" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/zb.png" alt="">
                    <span>直播</span>
                </div>
                
                 <!-- <div class="menu_item" @click="goTo('/BiBiPage')" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/BiBi.png" alt="">
                    <span>游戏</span>
                </div> -->
<!-- 
                 <div class="menu_item" @click="notOpen" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/cat.png" alt="">
                    <span>招财猫</span>
                </div>
                <div class="menu_item" @click="goTo('/OTCDeal')" style='    margin-bottom: 15px;'>
                    <img src="../../../static/image/OTC.png" alt="">
                    <span>OTC</span>
                </div>
                <div class="menu_item" @click="goTo('/BiBiPageList')">
                    <img src="../../../static/image/wai.png" alt="">
                    <span>外汇</span>
                </div>

                 <div class="menu_item" @click="notOpen">
                    <img src="../../../static/image/ji.png" alt="">
                    <span>基金</span>
                </div>
                <div class="menu_item" @click="notOpen">
                    <img src="../../../static/image/gu.png" alt="">
                    <span>股票</span>
                </div> -->
            </div>
        </div>
        <!-- <div class="modular">
            <div class="tit">
                保险
            </div>
            <div class="menu">
                <div class="menu_item" @click="goToShop('/goodslist',6)">
                    <img src="../../../static/image/old.png" alt="">
                    <span>养老保险</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',8)">
                    <img src="../../../static/image/trip.png" alt="">
                    <span>车险</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',7)">
                    <img src="../../../static/image/children.png" alt="">
                    <span>子女险</span>
                </div>
            </div>
        </div> -->
        <!-- <div class="modular">
            <div class="tit">
                {{$t('estate')}}
            </div>
            <div class="menu">
                <div class="menu_item" @click="goToShop('/goodslist',9)">
                    <img src="../../../static/image/overseas.png" alt="">
                    <span>{{$t('overseas')}}</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',14)">
                    <img src="../../../static/image/usa.png" alt="">
                    <span>{{$t('usa')}}</span>
                </div>
                <div class="menu_item" @click="notOpen">
                    <img src="../../../static/image/australia.png" alt="">
                    <span>{{$t('australia')}}</span>
                </div>
            </div>
        </div> -->
        <!-- <div class="modular">
            <div class="tit">
                {{$t('auto')}}
            </div>
            <div class="menu">
                <div class="menu_item" @click="goToShop('/goodslist',11)">
                    <img src="../../../static/image/runcar.png" alt="">
                    <span>{{$t('runCar')}}</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',12)">
                    <img src="../../../static/image/imported.png" alt="">
                    <span>{{$t('suv')}}</span>
                </div>
                <div class="menu_item" @click="goToShop('/goodslist',13)">
                    <img src="../../../static/image/domestic.png" alt="">
                    <span>{{$t('car')}}</span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import Vue from 'vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
    data() {
        return {

        };
    },
    created() {},
    mounted() {
        this.initSwiper()
    },
    methods: {
        initSwiper(){
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
        goTo(path){
            this.$router.push({path})
        },
        notOpen(){
            this.$dialog.toast({mes:'未开放',timeout:1000})
        },
        goToShop(path,id){
            this.$router.push({path,query:{cat_id:id}})
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
        // background-color: #fff;
        .tit {
            font-size: 16px;
            margin: 10px 0;
            color: #808596;
        }
        .menu {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            width: 100%;
            box-sizing: border-box;
            justify-content: space-between;
            .menu_item {
                padding: 20px 0;
                box-sizing: border-box;
                width: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                font-size: 12px;
                // background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 9px 1px #ddd;
                img {
                    width: 35px;
                    height: 35px;
                    margin-bottom: 10px;
                }
                span {
                    text-align: center;
                }
                i {
                    font-size: 31px;
                    margin-bottom: 10px;
                }
            }
        }
        .slide {
            width: 100%;
            height: 30vw;

            .swiper-container {
                width: 100%;
                height: 100%;
                img {
                    border-radius: 5px;
                }

                .swiper-slide {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
