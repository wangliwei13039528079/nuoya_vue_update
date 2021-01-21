<template>
    <div id="Deal">

        <!-- 头部标题 开始 -->
        <HeaderTop title="交易中心">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <!-- 头部标题 结束 -->
        <div class="tab-nav-box">
            <a @click="goTo('/Deal/DealBuy')" to="/Deal/DealBuy" :class="$route.path == '/Deal/DealBuy' ? 'active': ''">买入</a>
            <a @click="goTo('/Deal/DealSell')" to="/Deal/DealSell" :class="$route.path == '/Deal/DealSell' ? 'active': ''">卖出</a>
        </div>
        <div class="security-content-wrapper">
            <div class="security-content">

                <!--tab栏 结束-->

                <!--路由组件 开始-->
                <router-view>
                </router-view>
                <!--路由组件 结束-->
            </div>
        </div>

    </div>
</template>
<script>
    import Vue from 'vue'
    import {mapState} from 'vuex'
    import Swiper from 'swiper'                                              //swiper组件
    import {PullRefresh, NoticeBar} from 'vant';                              //PullRefresh下拉刷新、NoticeBar通告栏
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'         //应用头部
    import 'swiper/dist/css/swiper.min.css'                                 //swiper样式 必须引入否则轮播会出不来
    // import VueRouterUtils from '../../common/script/VueRouterUtils.js'
    // 滑动组件
    import BScroll from "better-scroll";

    Vue.use(PullRefresh)
        .use(NoticeBar)

    export default {
        //数据
        data() {
            return {
                count: 0,
                isLoading: false,
                
            }
        },
        //页面挂载
        mounted() {
            this.$nextTick(() => {

                new BScroll('.security-content-wrapper', {
                    click: true
                })
            });
        },

        //方法
        methods: {
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.count++;
                }, 500);
            },
            goTo(path) {

                // if (path == '/sellnew') {
                //     if (this.userAllInfo.usermoney[0].sell_status == 2) {
                //         this.$router.push('/sell')
                //         return false
                //     }
                // }
                this.$router.replace({path: path})
            }
        },

        //计算属性
        computed: {
            ...mapState(['userAllInfo'])
        },


        // 引入的组件
        components: {
            HeaderTop
        },

        //监听
        watch: {
            userAllInfo(newVal, oldVal) {
                this.$nextTick(() => {
                    var mySwiper = new Swiper('.swiper-container', {
                        autoplay: true, //可选选项，自动滑动
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    })
                })
            }
        }
    }

</script>
<style lang="less" scoped>
    #Deal {
        @nice-blue: #60adf5;
        width: 100%;
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


        /*轮播图 开始*/

        .slide {
            height: 150px;

            img {
                width: 100%;
                height: 150px;
            }
        }

        /*轮播图 结束*/

        /*tab栏 开始*/

        .tab-nav-box {
            height: 42px;
            background-color: #fff;
            line-height: 40px;
            // border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-around;

            > a {
                float: left;
                display: block;
                text-align: center;
                width: 50%;
                box-sizing: border-box;

                &.active {
                    border-bottom: 3px solid #37434F;
                }
            }
        }

        .security-content-wrapper {
            position: fixed;
            overflow: hidden;
            top: 91px;
            bottom: 0;
            width: 100%;
            background-color: #edf1f4;


            .security-content {
                height: 100%;
            }
        }

        /*tab栏 结束*/
    }
</style>
