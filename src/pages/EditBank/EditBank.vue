<template>
    <div id="addBank">
        <HeaderTop title="修改银行卡">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <van-popup v-model="show" position="bottom">       
            <van-picker show-toolbar title="请选择开户行" :columns="banks" @cancel="onCancel" @confirm="onConfirm"
                        @change="onChange"/>
        </van-popup>
        <form style="padding: 5px">
            <van-cell-group>
                <van-field label="收款人:" placeholder="请输入真实姓名" v-model="name" />
                <van-field label="银行卡号:" placeholder="请输入银行卡号" v-model="card" @input="changeCard"/>
                <van-field readonly label="开户银行:" placeholder="请输入开户银行的卡号" @click="show=true"
                           v-model="selectedBank" name="code"/>
                <van-field label="支行:" placeholder="请输入开户银行的支行分行" v-model="addr"/>
                <!--<div class="default">-->
                <!--<span>设为默认</span>-->
                <!--<van-switch v-model="checked"/>-->
                <!--</div>-->

            </van-cell-group>
            <!-- <div style="padding: 10px">
                <van-button size="large" type="primary" @click.prevent="add()">确认添加</van-button>
            </div> -->
            
        </form>
        <div class="btn-group">
                <button class="btn-add" @click="add()">确认添加</button>
            </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import {Field, Picker, Popup, Switch,Toast,Dialog} from 'vant'

    Vue.use(Field).use(Picker).use(Popup).use(Switch).use(Toast).use(Dialog)
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import {reqAddBank, reqUpdatePaytype,reqSettingsUser} from '../../common/apigo'

    // import {mapState} from 'vuex'

    export default {

        data() {
            return {
                uid:'',
                phone:'',
                selectedBank: '请选择开户银行',
                banks: [],
                show: false,
                uname:'',
                name: '',
                card: '',
                addr: '',
                cid: null,      //选择
                is_default: 1,
                checked: true,
                flag:true
            }
        },

        // computed:{
        //     ...mapState(['userAllInfo'])
        // },

        mounted() {
            this.selectBank = this.selectBank
            this.userOnline()
            // this.userMsg()
            // this.getBank()
        },

        methods: {
            userOnline(){
                this.$api.userInfo({}, res => {
                    // console.log(res.data.mobile)
                    this.uid=res.data.id
                    this.phone = res.data.mobile
                    // this.userMsg()
                    this.getBank()
                    

                })
            },
            changeCard(){
                 // this.num = this.num.replace(/[^\d]/g,'')
                this.card = this.card.replace(/[^\d]/g,'')
            },

            // async userMsg(){
            //     let uid = this.uid

            //     let assets = await reqSettingsUser({uid})
            //     this.phone = assets.userinfo.Phone
            // },

            async getBank() {
                let result = await reqAddBank()
                this.banks = result.bankList
                this.banks.forEach(item => {
                    item.text = item['Title']
                    delete item['Title']
                    item.keyId = item['Id']
                    delete item['Id']
                })
            },

            async add() {
                if(!this.flag) {
                    return Toast('正在修改，请稍候')
                }
                this.flag = false
                let uid = this.uid
                let payNum = this.card
                let payType = '1'
                let payImg = ''
                let username = this.name
                let bank = this.selectedBank
                let branch = this.addr
                if (username == ''){
                    this.flag = true
                    return Toast('请添加收款人姓名')
                }
                if (payNum == ''){
                    this.flag = true
                    return Toast('请添加银行卡号')
                }
                if (bank == ''){
                    this.flag = true
                    return Toast('请选择银行')
                }
                if (branch == ''){
                    this.flag = true
                    return Toast('请添加支行')
                }
                let result = await reqUpdatePaytype({uid, payNum, payType, payImg, username,bank,branch})
                if(result){
                    this.flag = true
                }
                if (result.errcode == 0) {
                    Toast('修改银行卡成功')
                    this.$router.back(-1)
                    return
                }
                if (res.data.errcode == -2){
                    Toast('收款账号无效')
                    return
                }
                if (res.data.errcode == -3){
                    Toast('支付方式无效')
                    return
                }
                if (res.data.errcode == -4){
                    Toast('用户名无效')
                    return
                }
                if (res.data.errcode == -5){
                    Toast('已存在支付方式')
                    return
                }
                if (res.data.errcode == -6){
                    Toast('开户行无效')
                    return
                }
                if (res.data.errcode == -7){
                    Toast('支行无效')
                    return
                }
                if (res.data.errcode == -8){
                    Toast('图片无效')
                    return
                }
                if (res.data.errcode == -9){
                    Toast('图片不以.jpg或.png结尾')
                    return
                }
            },
            onChange(picker, value, index) {

            },
            onConfirm(value, index) {
                this.selectedBank = value.text
                this.cid = value.keyId
                this.show = false
            },
            onCancel() {
                this.show = false
            },

        },

        components: {
            HeaderTop
        },

        watch: {
            checked(value) {
                if (value) {
                    this.is_default = 1
                } else {
                    this.is_default = 1
                }
            },
        }
    }
</script>

<style lang="less">

    #addBank {

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .default {

            > span {
                padding-left: 8px;
                font-size: 14px;
                padding-right: 5px;
            }

            padding: 5px;
            display: flex;
            align-items: center;
        }
        .van-cell {
            background-color: #001b33;
            border-bottom: 1px solid #99999957;
            color: #abc2e2;
        }
        .van-hairline--top-bottom::after {
            width: 0;
        }
        .van-field__control {
            color: #abc2e2;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        .van-button--primary {
            background-color: #7497f1 !important;
        }
        .van-button::before {
            background-color: #7497f1 !important;
            border-color: #7497f1 !important;
        }
        .van-cell__value {
            color: #fff;
        }
        .btn-group {
            padding: 15px 5px 10px;


            .btn-add {
                background-color:#7497f1;
                color: #fff;
                height: 45px;
                border: none;
                width: 100%;
            }
        }
        input::-webkit-input-placeholder {
            color: #728bd9;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #728bd9;
        }
    }

</style>
