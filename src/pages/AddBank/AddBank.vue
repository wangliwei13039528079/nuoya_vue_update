<template>
    <div id="addBank">
        <HeaderTop title="添加银行卡">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <van-popup v-model="show" position="bottom">       
            <van-picker show-toolbar title="请选择开户行" :columns="banks" @cancel="onCancel" @confirm="onConfirm"
                        @change="onChange"/>
        </van-popup>
        <form style="padding: 5px">
            <van-cell-group>
                <van-field label="收款人" placeholder="请输入真实姓名" v-model="name" />
                <van-field label="银行卡号" placeholder="请输入银行卡号" v-model="card" @input="changeCard"/>
                <van-field readonly label="开户银行" placeholder="请输入开户银行的卡号" @click="show=true"
                           v-model="selectedBank" name="code"/>
                <van-field label="支行" placeholder="请输入开户银行的支行分行" v-model="addr"/>
                <!--<div class="default">-->
                <!--<span>设为默认</span>-->
                <!--<van-switch v-model="checked"/>-->
                <!--</div>-->

            </van-cell-group>
            <!-- <div style="padding: 10px">
                <van-button size="large" type="primary" @click.prevent="add()" style="background:#1296DB">确认添加</van-button>
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
    import {reqAddBank, reqDoAddBank} from '../../common/apigo'

    import {mapState} from 'vuex'

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

        computed:{
            ...mapState(['userAllInfo'])
        },
        mounted() {
            this.selectBank = this.selectBank
            this.userOnline()
            // this.userMsg()
            this.getBank()
        },

        methods: {
            userOnline(){
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                })
            },
             changeCard(){
                 // this.num = this.num.replace(/[^\d]/g,'')
                this.card = this.card.replace(/[^\d]/g,'')
            },

            async userMsg(){
                let uid = this.uid
                let assets = await reqSettingsUser({uid})
                this.phone = assets.userinfo.Phone
            },

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
                    return Toast('正在添加，请稍候')
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
                let result = await reqDoAddBank({uid, payNum, payType, payImg, username,bank,branch})
                if(result) {
                    this.flag = true
                }

                if (result.errcode == 0) {
                    Toast('添加银行卡成功')
                    this.$router.back(-1)
                    return
                }
                if (result.errcode == -2){
                    Toast('收款账号无效')
                    return
                }
                if (result.errcode == -3){
                    Toast('系统错误')
                    return
                }
                if (result.errcode == -4){
                    Toast('系统错误')
                    return
                }
                if (result.errcode == -5){
                    Toast('已存在支付方式')
                    return
                }
                if (result.errcode == -6){
                    Toast('开户行无效')
                    return
                }
                if (result.errcode == -7){
                    Toast('支行无效')
                    return
                }
                if (result.errcode == -8){
                    Toast('图片无效')
                    return
                }
                if (result.errcode == -9){
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
        color: #000;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .btn-group {
            padding: 5px;


            .btn-add {
                            background: rgb(57, 57, 65);
//  box-shadow: rgba(0, 0, 0, 0.3) 0px -0.05rem 0.05rem;
 border-radius: 0.2rem;
 color:#fff;
 border:none;
 width:90%;
 margin:0 auto;
 display:block;
 height: 45px;
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
        .van-field__control {
            color: #fff;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        .van-button--primary {
            background-color: #fff !important;
        }
        .van-button::before {
            background-color: #fff !important;
            border-color: #fff !important;
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
        input::-webkit-input-placeholder {
            color: #fff;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #fff;
        }
    }

</style>
