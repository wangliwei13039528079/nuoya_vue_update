<template>

    <div class="CashAssets">
        <!-- <HeaderTop title="现货资产"> -->
            <!-- <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a> -->
            <!-- <a class="right" @click="goTo('/Bill?type=1')" slot="right">账单</a> -->
        <!-- </HeaderTop> -->
        <!-- <div class="content">
            <div class="content-wrap">
                <div class="top-info">
                    <p class="title">--- 现货折合 ---</p>
                    <p><span>￥</span>{{total}}</p>
                </div>

                <div class="coin-content">
                    <div class="coin-item" v-for="(item,index) in coinlist" :key="index">
                        <div class="coin">
                            <div class="icon">
                                <img :src="item.ImgUrl" alt="">
                            </div>
                            <div class="content-box">
                            
                            <div class="type">
                                <div class="name">{{item.CoinName}}</div>
                                <div class="value">{{parseInt(item.Num*1000000)/1000000}}</div>
                            </div>
                            <div class="info-box">
                                <div class="convert">折合</div>
                                <div> $ {{item.TotalMoney}}</div>
                            </div>
                        </div>
                        </div>
                        
                        <div class="menu-box" >
                            <a  @click="goPageC('/BiBiC',item.CoinName)" v-if="item.CoinName == 'eth' || item.CoinName == 'usdt'">充币</a>
                            <a  @click="goPageT('/BiBiT', item.Mid , item.CoinName)" v-if="item.CoinName == 'eth' || item.CoinName == 'usdt'">提币</a>
                            <a @click="goPage('/BiBiH?type=' + item.Mid + '&name=' + item.CoinName)">划转</a>
                            <a @click="goPage('/Bill?type=' + item.CoinName)">记录</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div> -->
        <div class="content" v-for="(item,index) in coinlist" :key="index">
            <div class="coin">
                <img :src="item.ImgUrl" alt="">
                <p>{{item.CoinName.toLocaleUpperCase()}}</p>
            </div>
            <div class="num">
                <p>可用</p>
                <p>{{parseInt(item.Num*1000000)/1000000}}</p>
            </div>
            <div class="btn">
                <div class="bibiC" @click="goPageC('/BiBiC',item.CoinName)" v-show="item.CoinName == 'eth' || item.CoinName == 'usdt'">充币</div>
                <div class="bibiT" @click="goPageT('/BiBiT', item.Mid , item.CoinName)" v-show="item.CoinName == 'eth' || item.CoinName == 'usdt'">提币</div>
                <div class="transfer" @click="goPage('/BiBiH?type=' + item.Mid + '&name=' + item.CoinName)">划转</div>
                <div class="bill" @click="goPage('/Bill?type=' + item.CoinName)">记录</div>
            </div>
        </div>


    </div>
</template>

<script>

    import Vue from 'vue'
    import {PullRefresh,Toast} from 'vant';
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'

    Vue.use(PullRefresh);
    Vue.use(Toast)
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import {reqBalance,reqCoin,req2Coinlist} from "../../common/apigo";


    export default {


        data() {
            return {
                total: 0,
                // coinlist: {ETH: {type: 8, is_recharge: 1, money: "0.000000", convertinto: "0.00"}},
                coinlist:[],
                isLoading: false,
                userInfo:'',
            }
        },

        components: {
            HeaderTop
        },

        mounted() {
            this.userOnline()
        },

        methods: {
            userOnline() {
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getCoin();

                })
            },
            async getCoin() {
                let uid=this.uid;
                let mid=''
                const result = await req2Coinlist({uid,mid});
                if(result.errcode==0){
                    let coins=result.Balance
                    coins.forEach(item=>{
                        if(item.CoinName == 'eth') {
                            this.coinlist.unshift(item)
                        }else if(item.CoinName == 'kpc') {
                            this.coinlist.splice(1,0,item)
                        }else if(item.CoinName == 'eos') {
                            this.coinlist.splice(3,0,item)
                        }else if(item.CoinName == 'usdt') {
                            this.coinlist.splice(2,0,item)
                        }
                        else {
                            this.coinlist.push(item)
                        }
                    })
                }
            },
            goPage(path) {
                this.$router.push({path: path})
            },
            goPageT(path,mid,coinName) {
                if(coinName == 'eth' || coinName == 'usdt') {
                    this.$router.push({path: path,query:{type:mid,name:coinName}})  
                }else {
                    Toast('请提ETH')
                }
                                  
            },
            goPageC(path,coin) {
                if(coin == 'eth' || coin == 'usdt') {
                    this.$router.push({path: path,query:{type:coin}})
                }else {
                    Toast('请充值ETH')
                }
                
            },

            // async getCoinlist() {
            //     const result = await req2Coinlist();

            //     if (result) {
            //         this.coinlist = result.type
            //         // this.total = result.type.TDTDC.convertinto
            //         this.$nextTick(() => {
            //             new BScroll('.content', {
            //                 click: true
            //             })
            //         })
            //     }
               
            //     for(var key in this.coinlist) {
            //         this.total += Number(this.coinlist[key].convertinto)
            //     }   
            // },
        },
        // computed: {
        //     ...mapState(['userAllInfo'])
        // },
    }
</script>

<style scoped lang="less">

    .CashAssets {
        // height: 100%;
        // background-color: #000;
        padding-top: 10px;
        padding-bottom: 60px;
        font-size: .25rem;


        .content {
            padding: 0 15px;
            margin-bottom: 10px;
            .coin {
                padding: 10px 0;
                img {
                    width: 40px;
                    height: 40px;
                }
            }
            .num {
                padding: 10px 0;
                padding-left: 40px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .btn {
                display: flex;
                justify-content: flex-start;
                padding-top: 20px;
               
                div{
                    width: 20%;
                     margin-right: 6.5%;
                    text-align: center;
                    background-color: #5c73af ;
                    color: #fff;
                    padding: 10px 0;
                }
                div:last-child{
                    margin-right: 0;
                }
            }

        }

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }


        .top-info {
            background-color: #2c3d4f;
            height: 150px;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            > p {
                margin: 5px 0;
            }
        }
        .coin-content {
            padding-bottom: 60px;
        }
        .coin {
            display: flex;
            align-items: center;
            .icon {
                    width: 40px;
                    height: 40px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
        }

        .coin-item {
            margin: 10px;
            justify-content: space-between;
            // border-radius: 5px;
            border-bottom: 1px solid #99999957;
           
            .content-box {
                // display: flex;
                padding: 10px;
                // background-color: #fff;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                color: #fff;
                 flex: 1;



                .type {
                    padding: 10px;
                    display: flex;
                    font-size: 16px;
                    font-weight: bold;
                    justify-content: space-between;

                    // .name {
                    //     color: #fff;
                    // }

                }

                .info-box {
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    // color: #fff;
                }
                
            }

            .menu-box {
                font-size: 14px;
                padding: 10px 0;
                display: flex;
                text-align: center;
                // background-color: #f5f5f5;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                // border-top: 1px solid #d6d6d6;
                color: #ababab;
                // background-color: #1d1d1d;


                > a {
                    flex: 1;
                    // width: 25%;

                    &:nth-child(n+2) {
                        border-left: 1px solid #99999957;
                        // border-right: 1px solid #fff;
                    }
                    // &:nth-child(3) {
                    //     border-right: 1px solid #fff;
                    // }
                }
            }
        }

    }


</style>
