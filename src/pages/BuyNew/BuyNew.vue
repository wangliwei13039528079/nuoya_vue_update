<template>
    <div id="buyNew">

        <!-- 头部标题 开始 -->
        <HeaderTop title="CTC">
            <a class="right" slot="right" @click="goTo('/Deal')">
                去交易
            </a>
        </HeaderTop>
        <!-- 头部标题 结束 -->
        <!-- <div class="tab-nav-box">
            <a @click="goTo('/buynew/sellTTC')" :class="$route.path == '/buynew/sellTTC' ? 'active': ''">买单</a>
            <a @click="goTo('/buynew/buyTTC')" :class="$route.path == '/buynew/buyTTC' ? 'active': ''">卖单</a>
        </div> -->
        <ul class="top">
            <li>数量</li>
            <li>单价($)</li>
            <li>总价($)</li>
            <li>总价(￥)</li>
            <!-- <li>操作</li> -->
        </ul>
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
    import {PullRefresh, NoticeBar} from 'vant';    
    import {Toast} from 'vant'                          //PullRefresh下拉刷新、NoticeBar通告栏
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'         //应用头部
    import 'swiper/dist/css/swiper.min.css'                                 //swiper样式 必须引入否则轮播会出不来
    // import VueRouterUtils from '../../common/script/VueRouterUtils.js'
    // 滑动组件
    // import BScroll from "better-scroll";

    Vue.use(PullRefresh)
        .use(NoticeBar)
    Vue.use(Toast)

    export default {
        //数据
        data() {
            return {
                count: 0,
                isLoading: false,
                userInfo:''
                
            }
        },
        //页面挂载
        mounted() {
            // this.$nextTick(() => {

            //     new BScroll('.security-content-wrapper', {
            //         click: true
            //     })
            // });
            this.userInfo = this.userAllInfo.userInfo
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
                this.$router.push({path: path})
            },
            // goDeal(path){
            //     if(this.userInfo.is_real != 2) {
            //         return Toast('请先去实名认证')
            //     }
            //     this.$router.push({path: path})
            // }
        },

        //计算属性
            // computed: {
            //     ...mapState(['userAllInfo'])
            // },


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
    #buyNew {
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
        .top {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            background-color: #fff;
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            position: fixed;
            top: 50px;
            left: 0;
            width: 100%;
            li {
                width: 20%;
                text-align: center;
                font-weight: 700;

            }
        }
        /*轮播图 结束*/

        /*tab栏 开始*/

        .tab-nav-box {
            height: 42px;
            background-color: #fff;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
            display: flex;
            justify-content: space-around;

            > a {
                float: left;
                display: block;
                text-align: center;
                width: 50%;
                box-sizing: border-box;

                &.active {
                    border-bottom: 2px solid #37434f;
                }
            }
        }

        .security-content-wrapper {
            // position: fixed;
            padding-top: 36px;
            overflow: hidden;
            // top: 86px;
            // bottom: 68px;
            width: 100%;


            .security-content {
            }
        }

        /*tab栏 结束*/
    }
</style>
