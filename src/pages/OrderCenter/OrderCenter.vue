<template>
    <div id="security">
        <HeaderTop title="订单中心">
            <a class="back" @click="goTo('/Profile')" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>


        <!-- <div class="security-content-wrapper">
            <div class="security-content">
                <list-item title="挂单管理中心" :is-link="true" @goTo="goTo('/sellordercenter')"></list-item>
                <list-item title="交易管理中心" :is-link="true" @goTo="goTo('/payordermanage')"></list-item>
                <list-item title="币币交易记录" :is-link="true" @goTo="goTo('/bibiorderlog')"></list-item>
                <list-item title="买入订单中心" :is-link="true" @goTo="goTo('/buyordercenter')"></list-item>
            </div>
        </div> -->
        <!-- 头部标题 结束 -->
       
        
        <div class="security-content-wrapper">
            <div class="security-content">
                 <div class="tab-nav-box">
                    <a @click="goTo('/OrderCenter/buy')" :class="$route.path == '/OrderCenter/buy' ? 'active': ''">我的买单</a>
                    <a @click="goTo('/OrderCenter/sell')" :class="$route.path == '/OrderCenter/sell' ? 'active': ''">我的卖单</a>
                    <a @click="goTo('/OrderCenter/buyordercenter')" :class="$route.path == '/OrderCenter/buyordercenter' ? 'active': ''">买入订单</a>
                    <a @click="goTo('/OrderCenter/payordermanage')" :class="$route.path == '/OrderCenter/payordermanage' ? 'active': ''">卖出订单</a>
                </div>

                <!--tab栏 结束-->

                <!--路由组件 开始-->
                <!-- <div @click="goTo('/Profile')">123</div> -->
                <router-view>
                </router-view>
                <!--路由组件 结束-->
            </div>
        </div>
    </div>
</template>

<script>
    // 滑动组件
    // import BScroll from "better-scroll";
    // 头部标题栏
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

    import ListItem from '../../components/ListItem/ListItem.vue'

    export default {


        mounted() {
            // this.$nextTick(() => {

            //     new BScroll('.security-content-wrapper', {
            //         click: true
            //     })
            // });
        },

        methods:{
            goTo(path) {
                this.$router.push({path: path})
            }
        },

        components: {                //组件
            HeaderTop,                   //头部附件
            ListItem                    //条目组件
        }
    }
</script>

<style scoped lang="less">

    #security {
        height: 100%;
        background-color: #edf1f4;
        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .security-content-wrapper {
            // position: fixed;
            padding-top: 50px;
            overflow: hidden;
            // top: 50px;
            // bottom: 0;
            width: 100%;


            .security-content {
                padding: 5px;
            }
        }

        .tab-nav-box {
            // padding-top: 50px;
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
                width: 33.33%;
                box-sizing: border-box;

                &.active {
                    border-bottom: 2px solid #37434f;
                }
            }
        }
    }

</style>
