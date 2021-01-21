<template>
    <div id="sysNotice">
        <HeaderTop title="系统公告">
            <a class="back" @click="$router.back();" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>

        <van-collapse v-model="activeNames">
            <van-collapse-item :title="item.title" v-for="(item,index) in notices" :key="index">
                <!-- {{remove(item.notice_contents)}} -->
                <div v-html="item.content"></div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    import Vue from 'vue'
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import {Collapse, CollapseItem} from 'vant'

    // import {
    //     reqSysNotices
    // } from '../../api'

    Vue.use(Collapse).use(CollapseItem)

    export default {

        data () {
            return {
                activeNames: ['1'],
                notices: []
            }
        },

        components: {
            HeaderTop
        },

        mounted () {
            // this.getSysNotices()
            this.getNotice()
        },

        methods: {
            // async getSysNotices () {
            //     const result = await reqSysNotices()
            //     this.notices = result
            // },
            getNotice(){
                this.$api.reqHomePage({},res=>{
                    this.notices = res.data.notice
                })
            },
            remove (str) {
                return str.replace(/<[^>]+>/g, '')
            }
        }
    }


</script>

<style lang="less">
    #sysNotice {
        padding-top: 50px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .van-collapse-item {
            background-color: #001b33;
        }
        .van-cell {
            background-color: #001b33 !important;
            color: #fff;
            border-bottom: 1px solid #1A202E;
        }

        .van-hairline--top-bottom::after {
            border-width: 0;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        .van-hairline--top::after {
            border-top-width: 0;
        }
        .van-collapse-item__content {
            background-color: #4c6581;
            color: #728bd9;
            // color: #000;
        }
        .van-collapse-item__content {
            color: #ababab;
        }
    }

</style>
