<template>
    <div id="earningslog">
        <HeaderTop title="收益">
            <a class="back" @click="goBack()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>

       <div class="total-box">

             <van-cell-group>
                <van-cell title="总收益" :value="total"/>
                <van-field
                    type="number"
                    v-model="allmoney"
                    center
                    clearable
                    label="转出"
                    placeholder="请输入转出数量"
                    onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                >
                    <van-button slot="button" size="small" type="primary" @click="outMoney()">确认转出{{itcid}}</van-button>
                </van-field>
            </van-cell-group>
        </div>
        <div class="list">
            <div
                class="item"
                @click="goTo('/tradingdetail?detailid='+item.id)"
                v-for="(item,index) in showyiList"
                :key="index"
            >
                <div class="item-1">
                    <div>
                        <p>
                            <span>{{ item.type == 800 ? '矿机收益':'节点收益'}}</span>
                            {{item.Hash.substring(0,10)}}
                        </p>
                        <p>{{item.created_at}}</p>
                    </div>
                    <div>
                        <span>{{item.point}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState} from "vuex";
    import Vue from 'vue'
    import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

    // import {reqTenincome} from "../../api";

    // import {reqTotincome, reqTranMoney,reqUserAllInfo} from '../../api'

    import {Toast} from 'vant'

    // vant 输入框组件
    import {Field} from 'vant';

    Vue.use(Field);

    //vant 单元格组件
    import {Cell, CellGroup} from 'vant';

    Vue.use(Cell).use(CellGroup);

    export default {
        props:["itcid"],
        data() {
            return {
                showyiList: [],
                total: 0,
                allmoney: 0,
                num:null,
                page:0
            };
        },

        mounted() {
            this.getAll()
        },
        watch:{
            itcid:function(newval,oldval){
                //console.log(newval,oldval)
                this.num=newval;
                this.getTotal(); 
                this.getTotal2();               
            },

        },
        methods: {
            goBack(){
                this.$router.replace('/MillDetail');
            },
            async getAll() {
                const result = await reqUserAllInfo({});
                //console.log(result.userInfo.allbonus);
                this.total=result.userInfo.allbonus;
            },
            goTo(path) {
                this.$router.push({path: path});
            },

            async getTotal() {
                let sid =this.num; //this.itc;
                let page = this.page;
                let limit = 30;
                let result = await reqTenincome({sid,page,limit});
                //console.log(result);
                this.showyiList = result.kuangji;
            },

            async getTotal2() {

                // console.log('getTotal2');

                let result = await reqTotincome();
                //this.total = result.total;
            },
            async outMoney() {

                if (this.allmoney >0) {
                    
                    let allbonus = this.allmoney
                // console.log(allbonus)
                const result = await reqTranMoney({allbonus});
                // console.log(result);

                    if (result) {
                        Toast(result.msg);
                        if (result.code == 1) {
                            this.getAll()
                            //刷新 data
                            this.getTotal();
                            this.getTotal2();
                        }
                    }
                }else{
                    Toast('转出金额必须大于1')
                }
                
            }
        },

        components: {
            HeaderTop
        }
    };
</script>

<style scoped lang="less">
    #earningslog {
        color: #ccc;
        padding-top:50px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                line-height: 50px;
            }
        }

        .total-box {
            margin: 5px;
            margin-bottom: 0px;

            .info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 5px;

                .btn-out {
                    padding: 5px 10px;
                    background-color: #60adf5;
                    color: #fff;
                    font-size: 14px;
                    border: none;
                }
            }
        }

        .list {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5px;
            color:#fff;

            .item {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;

                .item-1,
                .item-2 {
                    padding: 15px 10px;
                    margin-top: 5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    p {
                        padding: 2px 0px;
                    }
                }
            }
        }
    }
</style>
