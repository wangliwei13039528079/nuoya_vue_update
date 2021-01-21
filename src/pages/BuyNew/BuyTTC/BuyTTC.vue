<template>
    <div id="buyTTC">
        <template v-if="sellInfoList.length < 1">
            <div class="none">
                暂无卖单
            </div>
        </template>
        <template v-if="sellInfoList.length > 0">
            <!-- <SellItem v-for="(item,index) in buyInfoList" :seller="item.buyer" :key="index" :name="item.buyer" :money="Number(item.points).toFixed(2)" :trade_num="item.trade_num" :trade_min="item.trade_min" :trade_max="item.trade_max" :trade_price="item.trade_price"
                 @goBuy="goTo('/SellNewDetail',{seller:item.seller,order_id:item.order_id})"></SellItem> -->
            <ul class="top">
                <li>数量</li>
                <li>单价($)</li>
                <li>总价($)</li>
                <li>总价(￥)</li>
                <!-- <li>操作</li> -->
            </ul>
            <div class="content" v-for="(item,index) in sellInfoList" :key="index">
                <div class="num">{{item.points}}</div>
                <div class="price">{{item.trade_price}}</div>
                <div>${{item.usd}}</div>
                <div>￥{{item.cny}}</div>
                <!-- <div class="sell" @click="goTo('/sellNewDetail',{order_id:item.order_id})"><span>卖给他</span></div> -->
            </div>
        </template>
    </div>
</template>

<script>

    import {reqSellInfo} from "../../../api";
    import {mapState} from 'vuex'
    import Vue from 'vue'
    import {Toast} from 'vant'
    Vue.use(Toast)
    // import SellItem from '../../../components/SellItem/SellItem.vue'
    // import VueRouterUtils from '../../../common/script/VueRouterUtils.js'

    export default {
        // components: {SellItem},
        data() {
            return {
                buyInfoList: {},
                sellInfoList:''
            }
        },

        mounted() {
            this.getSellItemInfo();
            this.userInfo = this.userAllInfo.userInfo
        },
        methods: {
            async getSellItemInfo() {
                const result = await reqSellInfo();
                this.sellInfoList = result;
            },

            // goTo(path, query) {
            //     if(this.userInfo.is_real != 2) {
            //         return Toast('未实名认证，不能出售')
            //     }
            //     this.$router.push({path:path,query:query})
            // }
        },
        computed: {
            ...mapState(['userAllInfo'])
        },

    }
</script>

<style scoped lang="less">

    @nice-blue: #60adf5;
    #buyTTC {

        .none {
            padding: 10px;
            
        }
        .msg-item {
            padding: 15px 5px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .item-left {
                display: flex;
                align-items: center;
                font-size: 13px;


                .avatar-box {
                    width: 64px;
                    height: 64px;
                    background-color: pink;

                    > img {
                        width: 64px;
                        height: 64px;
                    }
                }

                .item-left-info {
                    p {
                        color: #666;
                        margin-left: 5px;
                        padding: 5px;
                    }
                }
            }

            .item-right {
                display: flex;
                flex-direction: column;
                justify-items: right;
                align-items: flex-end;
                font-size: 16px;

                .num {
                    padding: 5px;
                }

                span {
                    font-weight: bold;
                }

                .btn-buy {
                    margin-top: 15px;
                    border: none;
                    background-color: @nice-blue;
                    padding: 5px;
                    width: 50px;
                    height: 30px;
                    color: #fff;
                }

            }
        }
        .top {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            background-color: #fff;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
            li {
                width: 20%;
                text-align: center
            }
        }
        .content {
            display: flex;
            justify-content: space-around;
            padding: 15px 0;
            background-color: #fff;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
            div {
                width: 20%;
                text-align: center;
            }
            .sell {
                span {
                    font-size: 12px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                
            }
        }

    }

</style>
