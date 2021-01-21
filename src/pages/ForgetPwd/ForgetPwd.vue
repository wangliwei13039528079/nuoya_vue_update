<template>
    <div id="forgetPwd">
        <HeaderTop :title="$t('loginpwdreset')">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <van-cell-group>
            <van-field :label="$t('aiaccount')" type="text" :placeholder="$t('aiaccount')" v-model="amount"/>
            <van-field :label="$t('newpwd')" type="password" :placeholder="$t('inputnewpwd')" v-model="newPassword" right-icon="closed-eye" @click-right-icon="newShow=false" v-show="newShow"/>
            <van-field :label="$t('newpwd')" type="text" :placeholder="$t('inputnewpwd')" v-model="newPassword" right-icon="eye-o" @click-right-icon="newShow = true" v-show="!newShow"/>
            <van-field :label="$t('newpwd')" type="password" :placeholder="$t('renewpwd')" v-model="confirmPassword" :error-message="errorMessage" right-icon="closed-eye" @click-right-icon="reShow=false" v-show="reShow"/>
            <van-field :label="$t('newpwd')" type="text" :placeholder="$t('renewpwd')" v-model="confirmPassword" :error-message="errorMessage" right-icon="eye-o" @click-right-icon="reShow=true" v-show="!reShow"/>
            <van-field :label="$t('key')" type="text" :placeholder="$t('inputkey')"
            v-model="key"/>
        </van-cell-group>



        <div class="submit" style="padding: 10px">
            <van-button type="primary" size="large" style="background-color:#7497f1;border:none;color:#fff" @click="confirmEdit()">{{ $t('edit') }}</van-button>
        </div>
        <!-- 悬浮窗 --- 数字键盘-->
        <!-- 悬浮窗 --- 数字键盘-->
    </div>


</template>

<script>

    import Vue from 'vue'
    import {Field} from 'vant'
    import {Button, Toast} from 'vant'

    Vue.use(Button)
    Vue.use(Field)
    Vue.use(Toast)
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    // import {reqEditPassword} from '../../api'

    export default {

        data () {
            return {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                errorMessage: '',
                key:'',
                amount:'',
                newShow:true,
                reShow:true
            }
        },
        mounted () {
        },

        computed: {},
        methods: {
            //路由跳转
            goTo (path) {
                this.$router.replace({path: path})
            },

            confirmEdit () {

                if (this.newPassword.length <= 0 || this.confirmPassword <= 0) {
                    Toast('请输入密码')
                    return false
                }
                if (this.newPassword == this.confirmPassword) {
                    this.errorMessage = ''
                    let newPassword = this.newPassword
                    let account = this.amount
                    let key = this.key
                    this.$api.forgetPwd({newPassword,key,account},res=>{
                        if (res.status) {
                            Toast(res.msg)
                            this.GLOBAL.removeStorage("user_token");
                            this.GLOBAL.removeStorage("login-type");
                            this.GLOBAL.removeStorage("helpout");
                            setTimeout(() => {
                                this.$router.replace('/login')
                            }, 500)
                        }
                    })

                } else {
                    this.errorMessage = '两次输入的密码不一致，请重新输入'
                }
            },
            a(h){
                console.log(h)
            }
        },

        components: {
            HeaderTop
        }
    }

</script>

<style lang="less">

    #forgetPwd {
        padding-top: 50px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }


        .forget {
            padding: 5px;
            display: flex;
            flex-direction: row-reverse
        }
        .van-cell {
            background-color: #001b33;
            border-bottom: 1px solid #4c6581;
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
        input::-webkit-input-placeholder {
            color: #728bd9;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #728bd9;
        }
    }

</style>
