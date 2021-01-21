<template>

    <div class="ExamineBank">
        <!-- <HeaderTop title="查看支付方式信息">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui2"></i>
            </a>
        </HeaderTop> -->
        <div>
            <van-cell-group>
                <van-cell title="银行卡号"  :value="useraccount" />
                <van-cell title="收款人姓名" :value="username" />
                <van-cell title="银行卡开户行" :value="bank" />
                <van-cell title="银行卡支行分行" :value="branch" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import { Cell, CellGroup,Dialog } from 'vant';

    Vue.use(Cell).use(CellGroup).use(Dialog);

    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

    import {reqExamine,regAllPayType} from '../../common/apigo'
    export default {


        data() {
            return {
                uid:'',
                type:'1',
                useraccount:'',
                username:'',
                bank:'',
                branch:''
            }
        },

        mounted(){
            this.userOnline()
            
        },


        methods:{
            userOnline(){
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getPaytype()

                })
            },
            async getPaytype(){
                let uid = this.uid;
                let type = 1;
                console.log(uid,type)
                const result = await regAllPayType({uid,type})
                console.log(result.PayMethod)
                if (result.PayMethod.PayType == 1){
                    this.useraccount = result.PayMethod.Paynum;
                    this.username = result.PayMethod.Username;
                    this.bank = result.PayMethod.Bank;
                    this.branch = result.PayMethod.Branch
                }
            },
        },

        components: {
            HeaderTop
        },
    }
</script>

<style lang="less">

    .ExamineBank {

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .van-cell {
                background-color: rgb(60,61,69);
            border: 1px solid #eec67f;
            color: #fff;
            margin:.3rem auto;
            width: 90%;
            border-radius:5px;
        }
        .van-hairline--top-bottom::after {
            width: 0;
        }
        .van-cell__value {
            color: #fff;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }

    }


</style>
