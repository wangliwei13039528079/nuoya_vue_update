<template>
    <div id="shareCode">
        <HeaderTop title="推广">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <!--Content to start-->
        <div class="content">
            <div class="code-img-box">
                <img :src="imgUrl">
            </div>
            <div class="share-address-box">
                <p style="font-size: 16px;padding: 5px"><span>推广链接</span></p>
                <p>{{shareUrl}}</p>
                <button v-clipboard:copy="shareUrl" v-clipboard:success="onCopy">复制链接</button>
            </div>

        </div>
        <!--Content to end-->
    </div>
</template>

<script>

    import Vue from 'vue'

    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

    // import {reqShareCode,URL} from "../../api";

    import {Toast} from 'vant'

    Vue.use(Toast)

    export default {

        data() {
            return {
                imgUrl: '',
                shareUrl: '',

            }
        },

        mounted() {
            this.getShareCode();
            console.log(URL)
        },

        methods: {
            async getShareCode() {
                const result = await reqShareCode();
                // this.imgUrl = 'http://api11.tch1p.com/uploads/usercode/' + result.spread_code           //share code-img
                this.imgUrl = result.spread_code           //share code-img
                this.shareUrl = result.spread_url                                                               //share url address
            },


            onCopy() {
                Toast('复制成功');
            }
        },

        components: {
            HeaderTop
        }
    }
</script>

<style scoped lang="less">

    #shareCode {
        height: 100%;
        background-color: #edf1f4;
        padding-top: 50px;
        color: #666;
        font-size: 14px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .content {
            padding: 10px;


            .code-img-box {
                margin-top: 20px;
                // height: 200px;
                padding: 10px;
                background-color: #fff;

                > img {
                    display: block;
                    margin: 0 auto;
                    width: 200px;
                    height: 200px;
                    border: none;
                }
            }

            .share-address-box {
                margin-top: 2px;
                text-align: center;

                > p {
                    padding: 5px;
                }

                border-top: 1px solid #eee;
                background-color: #fff;
                padding: 10px;
                > button {
                    width: 100px;
                    height: 36px;
                    background-color: #37434f;
                    border: none;
                    color: #fff;
                }
            }
        }
    }

</style>
