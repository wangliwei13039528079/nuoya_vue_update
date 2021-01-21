<template>
    <div id="register">
        <ul class="tit">
            <li :class="emailShow?'active':''" @click="telShow=false,emailShow=true"> {{ $t('emailreg') }}</li>
            <li :class="telShow?'active':''" @click="telShow=true,emailShow=false" >{{ $t('telreg') }}</li>
        </ul>
        <div class="form-register">

            <yd-cell-item v-if="telShow">
                <!-- <span slot="left">{{ $t('tel') }}</span> -->
                <select slot="left" v-model="country_number" style="min-width: 3em;color: #fff !important;border: 1px solid #fff !important;margin: 0.25em;padding: 3px 0.25em;">
                    <option v-for="(item, index) in areas" :key="index" :value="item">{{item}}</option>
                </select>
                <yd-input slot="right" type="number" v-model="mobile" :placeholder="$t('inputtel')" :show-success-icon="false"></yd-input>
            </yd-cell-item>
            <yd-cell-item v-if="emailShow">
                <!-- <span slot="left">{{ $t('email') }}</span> -->
                <yd-input slot="right" type="email" v-model="email" :placeholder="$t('inputemail')" regex="/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <!-- <span slot="left">{{ $t('invite') }}</span> -->
                <yd-input slot="right" type="text" v-model="spread_uid" readonly :placeholder="$t('code')"></yd-input>
            </yd-cell-item>

               <yd-cell-item>
                 
                <yd-input slot="right" type="text" v-model="spread_uidb" readonly :placeholder="$t('code')"></yd-input>
            </yd-cell-item>  
            <!--<yd-cell-item>
                <!--<span slot="left">{{ $t('nodeId') }}</span>-->
                <!--<yd-input slot="right" type="text" v-model="nodeId" :placeholder="$t('inode')"></yd-input>-->
            <!--</yd-cell-item>-->
            <!--<yd-cell-item>-->
                <!--<span slot="left">{{ $t('area') }}</span>-->
                <!--<yd-radio-group slot="right" v-model="area">-->
                    <!--<yd-radio val="1"> {{ $t('left') }}</yd-radio>-->
                <!--</yd-radio-group>-->
                <!--<yd-radio-group slot="right" v-model="area">-->
                    <!--<yd-radio val="2"> {{ $t('right') }}</yd-radio>-->
                <!--</yd-radio-group>-->
            <!--</yd-cell-item>-->

            <div style='padding: 10px;
    height: 50px;
    border-bottom:1px solid rgb(42,45,48);
    display: flex;
    align-items: center;'>
                <!-- <span style='width:30%'>{{ $t('loginpwd') }}</span> -->
                <input style='flex: 1;
    border: none;
    height: 30px;
    line-height: 30px;' type="password" v-model="pwd" :placeholder="$t('combination')"/>
            </div>
            <div style='padding: 10px;
    height: 50px;
    border-bottom:1px solid rgb(42,45,48);
    display: flex;
    align-items: center;'>
                <!-- <span style='width:30%'>{{ $t('repwd') }}</span> -->
                <input style='flex: 1;
    border: none;
    height: 30px;
    line-height: 30px;' type="password" v-model="repwd" :placeholder="$t('reloginpwd')"/>
            </div>
            <div style='padding: 10px;
    height: 50px;
    border-bottom:1px solid rgb(42,45,48);
    display: flex;
    align-items: center;'>
                <!-- <span style='width:30%'>{{ $t('paypwd') }}</span> -->
                <input style='flex: 1;
    border: none;
    height: 30px;
    line-height: 30px;' v-number-only type="password" v-model="paypwd" :placeholder="$t('sixpaypwd')"/>
            </div>
            <div style='padding: 10px;
    height: 50px;
    border-bottom:1px solid rgb(42,45,48);
    display: flex;
    align-items: center;'>
                <!-- <span style='width:30%'>{{ $t('repwd') }}</span> -->
                <input style='flex: 1;
    border: none;
    height: 30px;
    line-height: 30px;' v-number-only type="password" v-model="repaypwd" :placeholder="$t('repaypwd')"/>
            </div>
        </div>
        <!--悬浮层-->
        <div class="pwd-keyboard" v-show="showKeyboard">
            <!-- 数字键盘 -->
            <van-number-keyboard
                :show="show"
                @input="onInput"
                @delete="onDelete"
                @blur="show=false"
            />
        </div>
    
        <div class="login">
            {{ $t('have') }}？<span @click="goTo('/login')">{{ $t('login') }}</span>
        </div>
    <!--悬浮层-->
        <div class="submit-box" >
            <van-button style="background: rgb(57,57,65);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;border:none;color:#fff;position:fixed;bottom:.3rem;width:90%;left:50%;transform: translate(-50%,-50%);"  class="btn-register" size="large" @click="register">{{ $t('reg') }}</van-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Field, Button, Toast, PasswordInput, NumberKeyboard, Dialog} from 'vant'
import {Radio, RadioGroup} from 'vue-ydui/dist/lib.rem/radio'

// import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {Loading} from 'vant'

Vue.use(Field)

Vue.use(Button)

Vue.use(Dialog)

Vue.use(PasswordInput).use(NumberKeyboard)

Vue.use(Loading)
Vue.use(Toast)

// import {reqRegister, reqMsgCode} from '../../api'

export default {
    data () {
        return {
            mobile: '',
            account: '',
            nickname: '',
            pwd: '',
            affirm_pwd: '', // 密码确认变量
            erjipwd: '',
            affirm_erjipwd: '', // 支付二级密码确认变量
            erjipwd_type: 1,
            msgcode: '',
            spread_uid: '',
            spread_uidb: '',
            nodeId: '',
            area: '',
            areas: [
                '+86',
                '+852',
                '+853',
                '+886',
                '+81',
                '+1',
                '+44',
                '+65',
                '+60',
                '+66',
                '+84',
                '+63',
                '+62',
                '+39',
                '+7',
                '+64',
                '+31',
                '+46',
                '+61',
                '+380',
                '+33',
                '+49'
            ],
            country_number: '+86',
            computeTime: 0, // 验证码发送计时时间
            show: false, // 显示密码输入键盘
            DialogShow: true,
            flag: false,
            repwd: '',
            repaypwd: '',
            paypwd: '',
            registerFlag: true,
            emailShow: true,
            telShow: false,
            type: '',
            email: ''
        }
    },
    directives: {
        numberOnly: {
            bind (el) {
                el.handler = function () {
                    el.value = el.value.replace(/\D+/, '')
                }
                el.addEventListener('input', el.handler)
            },
            unbind (el) {
                el.removeEventListener('input', el.handler)
            }
        }
    },
    mounted () {
         console.log(res)
        this.spread_uid = this.$route.params.id
        this.spread_uidb = this.$route.params.ablocation
    },

    methods: {
        // 异步获取短信验证码
        send () {
            if (this.flag) {
                return
            }
            if (!this.computeTime) { // 如果当前没有计时
                this.computeTime = 60
                this.flag = true
                this.intervalId = setInterval(() => {
                    this.computeTime--
                    if (this.computeTime <= 0) {
                        clearInterval(this.intervalId)
                    }
                }, 1000)
            }
            this.$api.sms({mobile: this.mobile, code: 'register'}, res => {
                console.log(res)
                console.log( "22222222")
            })
            if (result.code == 1) {
                Toast(result.msg)
            }

            if (result.code !== 1) {
                Toast(result.msg)
                if (this.computeTime) {
                    this.computeTime = 0
                    clearInterval(this.intervalId)
                    this.intervalId = undefined
                }
            }
        },
        goTo (path) {
            this.$router.replace({path})
        },

        register () {
            // Toast.loading({
            //     mask: true,
            //     message: '注册中...'
            // })
            if (!this.registerFlag) {
                Toast('正在注册，请稍候')
                return
            }
            if (this.emailShow) {
                this.emailReg()
            } else {
                this.telReg()
            }
        },
        emailReg () {
            let email = this.email
            let repwd = this.repwd
            let password = this.pwd
            let pay_pwd = this.paypwd
            let repaypwd = this.repaypwd
            let code = this.msgcode
            let invitecode = this.spread_uid
            let nid = this.nodeId
            let location = this.area
            let type = 1
            let reg = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/
            if (!reg.test(email)) {
                Toast('请输入正确的邮箱号')
                return
            }

            if (password.length < 6) {
                Toast('密码必须大于6位')
                return false
            } else if (password !== this.repwd) {
                Toast('登录密码输入不一致，请重新输入')
                return false
            } else if (pay_pwd.length !== 6) {
                Toast('支付密码必须是6位数字')
                return false
            } else if (repaypwd !== pay_pwd) {
                Toast('支付密码输入不一致，请重新输入')
                return false
            } else if (pay_pwd == password) {
                Toast('支付密码与登录密码不能一致')
                return false
            }
            this.registerFlag = false
            let data = {
                invitecode,
                email,
                password,
                repwd,
                pay_pwd,
                repaypwd,
                type
            }
            this.$api.register(data, res => {
                if (res) {
                    this.registerFlag = true
                    if (res.status) {
                        setTimeout(() => {
                            this.$router.replace({path: '/login'})
                        }, 1000)
                        // location.href="http://app.hk.eosc.vip"
                    }
                }
                if (res.status) {
                    Toast(res.msg)
                }
            })
        },
        telReg () {
            let mobile = this.mobile
            let repwd = this.repwd
            let password = this.pwd
            let pay_pwd = this.paypwd
            let repaypwd = this.repaypwd
            let code = this.msgcode
            let invitecode = this.spread_uid
            let type = 2
            let nid = this.nodeId
            let location = this.area
            let country_number = this.country_number

            if (mobile.length < 6) {
                Toast('请输入合法的手机号码')
                return false
            }
            // else if(nickname == '' || nickname.length <=0){
            //     Toast('请输您的真实姓名')
            //     return false;
            // }
            else if (password.length < 6) {
                Toast('密码必须大于6位')
                return false
            } else if (password !== this.repwd) {
                Toast('登录密码输入不一致，请重新输入')
                return false
            } else if (pay_pwd.length !== 6) {
                Toast('支付密码必须是6位数字')
                return false
            } else if (repaypwd !== pay_pwd) {
                Toast('支付密码输入不一致，请重新输入')
                return false
            } else if (pay_pwd == password) {
                Toast('支付密码与登录密码不能一致')
                return false
            }
            this.registerFlag = false
            let data = {
                invitecode,
                mobile,
                password,
                repwd,
                pay_pwd,
                repaypwd,
                type,
                country_number
            }
            this.$api.register(data, res => {
                if (res) {
                    this.registerFlag = true
                    if (res.status) {
                        setTimeout(() => {
                            this.$router.replace({path: '/login'})
                        }, 1000)
                        // location.href="http://app.hk.eosc.vip"
                    }
                }
                if (res.status) {
                    Toast(res.msg)
                }
            })
        },

        showKeyboard () {
            this.show = true
            // 延时滚动到底部
            setTimeout(() => {
                document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight
            }, 500)
        },
        reg () {
            let reg = /^\d{6}$/
            if (!reg.test(Number(this.pay_pwd))) {
                Toast('请输入六位数字密码')
                this.pay_pwd = ''
            }
        },

        // 数字键盘输入事件
        onInput (key) {
            if (this.erjipwd_type == 1) {
                this.paypwd = (this.paypwd + key).slice(0, 6)
            } else {
                this.repaypwd = (this.repaypwd + key).slice(0, 6)
            }
            // this.erjipwd +=key;
        },

        onDelete () {
            if (this.erjipwd_type == 1) {
                this.paypwd = this.erjipwd.slice(0, this.erjipwd.length - 1)
            } else {
                this.repaypwd = this.affirm_erjipwd.slice(0, this.affirm_erjipwd.length - 1)
            }
        },

        showDialog () {
            if (this.DialogShow == true) {
                Dialog.alert({
                    title: '重要提示',
                    message: '请您务必填写真实姓名，否则会对交易带来影响'
                }).then(() => {
                })
            }
        }

    },

    computed: {
        rightPhone () {
            return /^1\d{10}$/.test(this.mobile)
        }
    }

    // components: {
    //     HeaderTop
    // }
}
</script>

<style scoped lang="less">
    #register {
        height: 100%;
        padding: 0 10px 20px;
        font-size: 16px;
        .submit-box {
            height: 45px;
            width: 100%;
            // position: fixed;
            // left: 0;
            border: none;
            // bottom: 0px;
            margin: 20px 0;

            .btn-register {
                background-color: #000;
                color: #fff;
                border-top: none;
            }
        }
        .tit {
            display: flex;
            width: 60%;
            margin: auto;
            li {
                width: 50%;
                padding: 10px 0;    
                margin:30px 0;          
                text-align: center;
                color: rgb(139,143,154);
                &.active {
                    border-bottom: 3px solid #fcdc29;            
                    color: #fff;
                    font-size: 18px;
                }
            }
        }

        .pwd-keyboard {
            position: relative !important;
            color: #000;
        }

        .van-number-keyboard {
            /*position: relative !important;*/
        }

        .van-cell {
            text-align: left;
            color: #fff;
            input {
                color: #fff;
            }
            .van-cell__value {
                color: #fff;
            }
        }
        .van-cell-group,
        .van-cell {
            background-color: #000;
        }
        .van-cell__value,
        .van-field__control {
            color: #fff;
        }
        .yd-cell-item {
            padding-left: .5rem;
        }
        .yd-cell-left {
            color: #fff !important;
        }
        .yd-cell-right input{
            color: #fff !important;
        }

        .con {
            display: flex;
            justify-content: space-between;
            padding: 4%;
            border-bottom: 1px solid #423f5275;
            // background-color: #fff;
            align-items: center;
            label,p {
                width: 30%;
                color: #fff;
            }
            select {
                flex: 1;
                border: none;
            }
            input{
                width: 70%;
                border: none;
                color: #ababab;
            }
        }
        .code {
            display: flex;
            justify-content: space-between;
            padding: 4%;
            border-bottom: 1px solid #423f5275;
            // background-color: #fff;
            align-items: center;
            label,p {
                width: 30%;
                color: #fff;
            }
            select {
                flex: 1;
                border: none;
            }
            input{
                width: 70%;
                border: none;
                color: #fff;
                flex: 1;
            }
        }
        .van-button__text{

        }
        .yd-cell-item {
            padding-left: 4%;
            border-bottom: 1px solid rgb(42,45,48);
        }
        /deep/.yd-cell-left {
            width: 30% !important;
            font-size: 16px !important;
            color: #fff !important;

        }
        input::-webkit-input-placeholder {
            color: rgb(139,143,154);
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: rgb(139,143,154);
        }
        /deep/.yd-input {

            flex: 1;
            input {
                font-size: 16px !important;
                color: #fff !important;
            }

        }
        /deep/.yd-cell-right input[type=number]:not(.yd-spinner-input) {
            text-align: left !important;
        }
        .login {
            text-align: right;
            margin: .3rem 0 0 0;
            font-size: 14px;
            color: #fff;
            span {
                color: #fcdc29;
            }
        }

    }
</style>
<style>
    .yd-radio-text {color: #FFF!important;}
</style>
