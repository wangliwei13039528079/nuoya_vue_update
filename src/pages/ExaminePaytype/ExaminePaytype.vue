<template>

    <div class="ExaminePaytype">
        <!-- <HeaderTop title="查看支付方式信息">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui2"></i>
            </a>
        </HeaderTop> -->

        <div>
            <van-cell-group>
                <van-cell title="收款账号"  :value="useraccount" />
                <van-cell title="收款人姓名" :value="username" />
            </van-cell-group>
        </div>

        <div class="payimg">
            <p>收款二维码：</p>
            <img :src="Image" alt="">
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
                type:'',
                useraccount:'',
                username:'',
                Image:''
            }
        },
        mounted(){
            this.userOnline()
            this.type = this.$route.params.type
            console.log(this.type)
            
        },

        methods: {
            userOnline(){
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getPaytype()
                })
            },
            async getPaytype(){
                let uid = this.uid;
                let type = this.type;
                const result = await regAllPayType({uid,type})
                console.log(result.PayMethod)
                if (result.PayMethod.PayType == 3){
                    this.useraccount = result.PayMethod.Paynum;
                    this.username = result.PayMethod.Username;
                    this.Image = 'http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/' + result.PayMethod.Payimg;
                }
                if (result.PayMethod.PayType == 2){
                    this.useraccount = result.PayMethod.Paynum;
                    this.username = result.PayMethod.Username;
                    this.Image = 'http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/' + result.PayMethod.Payimg;
                }
            },
        },

        components: {
            HeaderTop
        },



    }
</script>

<style scoped lang="less">

    .ExaminePaytype {

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

        .payimg{
            padding-top: 20px;
            text-align: center;
            p{
                text-align: left;
                padding-left: 4%;
            }
            img{
                margin-top: 10px;
                width: 50%;
                height: 50%;
            }
        }

    }


</style>
