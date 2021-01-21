<template>
    <div id="security">
        <HeaderTop :title="$t ('security')">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div class="security-content-wrapper">

            <div class="security-content">
                <list-item :title="$t ('Payment')" :is-link="true" @goTo="goTo('/bank')"></list-item>
                <list-item :title="$t ('setloginpwd')" :is-link="true" @goTo="goTo('/loginpassword')"></list-item>
                <list-item :title="$t ('editpays')" :is-link="true" @goTo="goTo('/paypassword')"></list-item>
                <list-item :title="$t ('paysreset')" :is-link="true" @goTo="goTo('/ForgetPaypwd')"></list-item>
                <!--<list-item title="实名信息认证" :is-link="true" @goTo="goTo('/Certification')"></list-item>-->
            </div>
        </div>
    </div>
</template>

<script>
    // 滑动组件
    import BScroll from "better-scroll";
    // 头部标题栏
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

    import ListItem from '../../components/ListItem/ListItem.vue'

    export default {


        mounted() {
            this.$nextTick(() => {
                new BScroll('.security-content-wrapper', {
                    click: true
                })
            });
        },

        methods: {
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
        // background-color: #edf1f4;
        padding-top: 50px;
        color: #fff;
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
            // top: 50px;
            // bottom: 0;
            width: 100%;


            .security-content {
                padding: 5px;
                color: #fff;
            }
        }
    }

</style>
