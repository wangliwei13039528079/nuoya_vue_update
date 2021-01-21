<template>
    <div id="finance">
        <HeaderTop title="财务">
        </HeaderTop>
        <div class="content">

            <div class="property-box">
                <p>单位:<span>USD</span></p>
                <div class="content-box">
                    <div class="left-box">
                        <p>总资产</p>
                        <p style="font-size: 20px; font-weight: bold">${{asset.total_money}}</p>

                    </div>
                    <div class="right-box">
                        <p>净资产</p>
                        <p style="font-size: 20px; font-weight: bold">${{asset.true_money}}</p>

                    </div>
                </div>

            </div>

            <div class="charts">
                <div class="right">
                    <div class="myEchart" ref='myEchart' style="width:100%;height:180px"></div>
                </div>
            </div>
            <div></div>
            <div class="menu-box">
                <!-- <div class="menu-item" @click="goTo('/CashAssets')">
                    <img src="../../common/images/menu_wallet.png">
                    <span>钱包</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/TDTDC')">
                    <img src="../../common/images/atom.png">
                    <span></span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/invest')">
                    <img src="../../common/images/hammer.png">
                    <span>投资理财</span>
                </div> -->
                 <!-- <div class="menu-item" @click="goTo('/investK')">
                    <img src="../../common/images/kuang.png">
                    <span>矿池</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/investC')">
                    <img src="../../common/images/chibi.png">
                    <span>持币生息</span>
                </div> -->
                <div class="menu-item"  @click="goTo('/transferBill')">
                    <img src="../../common/images/a.png">
                    <span>流水账单</span>
                </div>
                <!-- <div class="menu-item" @click="goToT('/out')">
                    <img src="../../common/images/menu_transfer.png">
                    <span>转账</span>
                </div> -->
                
                 <!-- <div class="menu-item">
                    <img src="../../common/images/flow.png" @click="goTo('/transferBill')">
                    <span>充币</span>
                </div> -->
                <!-- <div class="menu-item" @click="goToT('/transfer')">
                    <img src="../../common/images/change.png">
                    <span>资金转换</span>
                </div> -->
                 <!-- <div class="menu-item" @click="goToT('/transfer')">
                    <img src="../../common/images/change.png">
                    <span>现货资产</span>
                </div> -->
                <div class="menu-item" @click="go">
                    <img src="../../common/images/rob.png">
                    <span>抢购</span>
                </div>
                <div class="menu-item" @click="go">
                    <img src="../../common/images/b.png">
                    <span>杠杆资产</span>
                </div>
                <div class="menu-item" @click="goToT('/OTCDeal/OTCBuy')">
                    <img src="../../common/images/c.png">
                    <span>OTC</span>
                </div>
                <div class="menu-item" @click="go">
                    <img src="../../common/images/d.png">
                    <span>我要理财</span>
                </div>
                <div class="menu-item"     @click="got"> <!--  @click="goTo('/ShopList')"> -->
                    <img src="../../common/images/e.png">
                    <span>产品发布</span>
                </div>
                <!-- <div class="menu-item" @click="go">
                    <img src="../../common/images/f.png">
                    <span>OTC交易</span>
                </div> -->
                
                
                <!-- <div class="menu-item" @click="goToT('/key')">
                    <i class="iconfont iconicon-chakansiyue"></i>
                    <span>ETH私钥</span>
                </div>
                <div class="menu-item" @click="goToT('/ExportHelpWord')">
                    <i class="iconfont icondaochu"></i>
                    <span>导出助记词</span>
                </div> -->
                <!-- <div class="menu-item" @click="goTo('/sharecode')">
                    <img src="../../common/images/star.png">
                    <span>分享</span>
                </div> -->
                

                <!-- <div class="menu-item">
                    <img src="../../common/images/badge.png" @click="showD()">
                    <span>客服</span>
                </div> -->
                 
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import {Dialog,Toast} from 'vant';
    import Vue from 'vue'
    import {mapState} from 'vuex'

    Vue.use(Dialog)
    Vue.use(Toast)

    export default {
        components: {
            HeaderTop
        },

        data() {
            return {
                dataList: [
                    {value: 1, name: '0-20分'},
                ],
                myChart: null,
                money: {},
                zichan: [],
                tit:'',
                text:'',
                userInfo:'',
                asset:{},
                rob:{}
            }
        },


        mounted() {
            
            window.onresize = () => {
                this.myChart.resize();
            }

            this.getTotal()
            this.getNum()
            // this.$nextTick(()=>{
            //     this.initChart();
            // })
            // this.userInfo = this.userAllInfo.userInfo


        },
        methods: {
            initChart() {
                this.myChart = this.$echarts.init(this.$refs.myEchart);
                this.myChart.setOption({
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        itemWidth: 14,
                        itemHeight: 14,
                        align: 'left',
                        top: 10,
                        left: 10,
                        data: this.dataList,
                        textStyle: {
                            color: '#F2F1F7',
                            fontSize:14
                        },
                        formatter: (name) => {                 //用来格式化图例文本，支持字符串模板和回调函数两种形式。模板变量为图例名称 {name}
                            return name
                        },

                    },
                    color:['#808080','#BBE0E3','#A3A3E0','#BFBFBF','#262673','#EEA149','#1E4649'],

                    title: [{
                        text: this.text,
                        left: '73%',
                        top: '48%',
                        textAlign: 'center',
                        textBaseline: 'middle',
                    }],

                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '90%'],
                            center: ['75%', '50%'],

                            label: {
                                normal: {
                                    show: false,
                                },

                            },

                            data: this.dataList
                        }
                    ]
                })
            },

            showD() {
                Dialog.alert({
                    message: '客服QQ：1001000'
                }).then(() => {
                    // on close
                });
            },
            getNum () {
                this.$api.eosvNum({},res=>{
                    this.rob = res.data
                })
            },
            getTotal() {
                this.$api.userWallet({},res=>{
                    if(res){
                        this.asset = res.data
                        let type = res.data.money
                        let arrs = []
                        for (let key in type) {
                            let item = type[key]
                            arrs.push({name: key, value: Number(type[key]).toFixed(2)})
                        }
                        this.dataList = arrs;
                        for(let i =0;i< this.dataList.length;i++){

                            this.dataList[i].name += `  ${this.dataList[i].value}`
                        }


                        // this.initChart()
                        this.$nextTick(()=>{
                            this.initChart();
                        })
                    }
                })
                
            },

            go(){
                this.$dialog.toast({mes:'您的级别不够',timeout:1000})
            },
             got(){
                this.$dialog.toast({mes:'暂未开放',timeout:1000})
            },

            goTo(path) {
                if(this.rob.status == 0) {
                    this.$dialog.toast({mes:this.rob.eosv_msg,timeout:2000})
                    return
                }
                this.$router.push({path: path})
            },
            goToT(path) {
                // if(this.userInfo.is_real != 2) {
                //     return Toast('请先去实名认证')
                // }
                this.$router.push({path: path})
            }
        },
        // computed: {
        //     ...mapState(['userAllInfo'])
        // }
    }
</script>

<style scoped lang="less">
    #finance {
        padding-top: 50px;
        padding-bottom: 70px;
        background-color: #000;
        // height: 100%;
        .back {
            padding: 0 10px;
            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }


        .content {

            .property-box {
                // background-color: #fff;
                padding: 10px;

                > p {
                    font-size: 14px
                }

                .content-box {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin-top: 10px;

                    .left-box, .right-box {
                        flex: 1;
                        height: 70px;
                        color: #fff;
                        padding: 10px;
                        border-radius: 6px;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        width: 50%;
                        word-wrap: break-word;

                        > p {
                            padding: 2px;
                        }

                    }

                    .left-box {
                        background: linear-gradient(to right, #738393, #37434f); /* 标准的语法 */
                        margin-right: 5px;
                    }

                    .right-box {
                        background: linear-gradient(to right, #5882aa, #1c3b6a); /* 标准的语法 */
                        margin-left: 5px;
                    }
                }
            }

            .charts {
                margin-top: 5px;
            }

            .myEchart {
                // background-color: #fff;
            }


            .menu-box {
                margin-top: 15px;
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                // background-color: #fff;
                width: 100%;
                box-sizing: border-box;

                .menu-item {
                    padding: 10px;
                    border-right: 1px solid #423f5261;
                    border-bottom: 1px solid #423f5261;
                    box-sizing: border-box;
                    width: 33.3333%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    i {
                        font-size: 31px;
                        margin-bottom: 10px;
                    }
                    // color: #666;

                    // &:nth-child(even){

                    //     >img{
                    //         animation:myfirst 300s 5s;
                    //     }

                    // }

                    // &:nth-child(odd){


                    //     >img{
                    //         animation:myfirst 300s 15s;
                    //     }

                    // }

                    > img {

                        margin-bottom: 10px;
                        width: 12vw;
                    }



                    @keyframes myfirst
                    {
                        from {transform: rotateZ(0deg);}
                        to {transform: rotateZ(60deg);}
                    }
                }
            }
        }
    }
</style>
