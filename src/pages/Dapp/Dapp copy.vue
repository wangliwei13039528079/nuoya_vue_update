<template>
    <div id="dapp">
        <HeaderTop title="生态"></HeaderTop>
        <!--轮播图 开始-->
        <!-- <div class="slide">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <img src="../../../static/image/dapp1.png" alt="" 
                            class="swiper-slide">
                    <img src="../../../static/image/dapp2.png" alt="" 
                    class="swiper-slide">
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div> -->
        <!--轮播图 结束-->
            <div class="menu">
                <div class="menu_item" @click="goTo('/OTCDeal')">
                    <div class="menu_box">
                        <img src="../../../static/image/OTC.png" alt="">
                        <span style="font-size:14px;">OTC</span>
                    </div>
                    <p class="line"></p>
                </div>
                <div class="menu_item" @click="goTo('/BiBiPage')">
                    <div class="menu_box">
                        <img src="../../../static/image/bibi.png" alt="">
                        <span>币币交易</span>
                    </div>
                    <p class="line"></p>
                </div>
                <div class="menu_item" @click="notOpen">
                    <div class="menu_box">
                        <img src="../../../static/image/fund.png" alt="">
                        <span>外汇基金</span>
                    </div>
                    <p class="line"></p>

                </div>
                 <div class="menu_item" @click="notOpen">
                    <div class="menu_box">
                    <img src="../../../static/image/game.png" alt="">
                    <span>游戏</span>
                    </div>
                    <p class="line"></p>

                </div>
                <div class="menu_item" @click="notOpen">
                    <div class="menu_box">
                        <img src="../../../static/image/insurance.png" alt="">
                        <span>全球保险</span>
                    </div>
                    <p class="line"></p>

                </div>
                <div class="menu_item" @click="notOpen">
                    <div class="menu_box">
                        <img src="../../../static/image/travel.png" alt="">
                        <span>全球旅行</span>
                    </div>
                    <p class="line"></p>
                </div>
                        <div class="menu_item" @click="notOpen">
                    <div class="menu_box">
                    <img src="../../../static/image/usa.png" alt="">
                    <span>海外置业</span>
                    </div>
                    <p class="line"></p>

                </div>
                <div class="menu_item" @click="goTo('/index')">
                    <div class="menu_box">
                        <img src="../../../static/image/welfare.png" alt="">
                        <span>商城</span>
                    </div>
                    <p class="line"></p>

                </div>
                <div class="menu_item" @click="notOpen">
                    <div class="menu_box">
                        <img src="../../../static/image/medical.png" alt="">
                        
                        <span>公益</span>
                    </div>
                    <p class="line"></p>
                </div>
                <!-- <div class="menu_item" @click="goTo('/Scan')">
                    <div class="menu_box">
                        <img src="../../../static/image/welfare.png" alt="">
                        <span>扫一扫</span>
                    </div>
                    <p class="line"></p>
                </div> -->
               
                <!-- <div class="menu_item" @click="goToShop('/goodslist',6)">
                    <img src="../../../static/image/insurance.png" alt="">
                    <span>保险</span>
                </div> -->
            </div>
     
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
                    autoplay: true, //可选选项，自动滑动
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination'
                    }
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
            this.$dialog.toast({mes:'敬请期待',timeout:1000})
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
            // border-left: 1px solid #99999957;
            // border-top: 1px solid #99999957;
            // .menu_item {
            //     padding: 20px 0;
            //     box-sizing: border-box;
            //     width: 30%;
            //     display: flex;
            //     flex-direction: column;
            //     align-items: center;
            //     justify-content: space-between;
            //     font-size: 12px;
            //     // background-color: #161616;
            //     border-right: 1px solid #99999957;
            //     border-bottom: 1px solid #99999957;
            //     // border-radius: 5px;
            //     margin-bottom: .3rem;
            //     img {
            //         width: 45px;
            //         height: 45px;
            //         margin-bottom: 10px;
            //     }
            //     i {
            //         font-size: 31px;
            //         margin-bottom: 10px;
            //     }
            // }
            .menu_item {
                width: 30%;
                // border-bottom: 1px solid #99999957;
                margin-bottom: .35rem;



            }
             .menu_box {
                padding-bottom: 10px;
                padding-right: 10px;
                box-sizing: border-box;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                font-size: 12px;
                // border-bottom: 1px solid #99999957;
                margin-bottom: .35rem;
                border-right: 1px solid #4c6581;
                // background-color: #161616;
                // border-radius: 5px;
                img {
                    width: 45px;
                    height: 45px;
                    margin-bottom: 10px;
                }
                i {
                    font-size: 31px;
                    margin-bottom: 10px;
                }
            }
            .line {
                width: 87%;
                border-bottom: 1px solid #4c6581;
            }
            .menu_item:nth-child(3n) {
                .menu_box {
                    border-right: none;
                }
            }
            .menu_box:nth-child(3n) {
                border-right: none;
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
