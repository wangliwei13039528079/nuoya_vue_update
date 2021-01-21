<template>
    <div id="loginPassword">
        <HeaderTop title="登录密码">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <van-cell-group>
            <van-field  placeholder="请输入旧的登录密码" v-model="oldPassword" type="password" minlength="6" right-icon="closed-eye" @click-right-icon="oldShow=false" v-show="oldShow"/>
            <van-field  type="text" placeholder="请输入旧的登录密码" v-model="oldPassword" right-icon="eye-o" @click-right-icon="oldShow = true" v-show="!oldShow"/>

            <van-field  type="password" placeholder="请输入新密码" v-model="newPassword" right-icon="closed-eye" @click-right-icon="newShow=false" v-show="newShow"/>
            <van-field  type="text" placeholder="请输入新密码" v-model="newPassword" right-icon="eye-o" @click-right-icon="newShow = true" v-show="!newShow"/>
            <van-field  type="password" placeholder="请再次输入新密码" v-model="confirmPassword" :error-message="errorMessage" right-icon="closed-eye" @click-right-icon="reShow=false" v-show="reShow"/>
            <van-field  type="text" placeholder="请再次输入新密码" v-model="confirmPassword" right-icon="eye-o" @click-right-icon="reShow = true" v-show="!reShow"/>
            <van-field  type="text" placeholder="请输入私钥"
            v-model="key"/>
        </van-cell-group>



        <div class="submit" style="padding: 10px">
            <van-button type="primary"  style="
 background: rgb(57, 57, 65);
 box-shadow: rgba(0, 0, 0, 0.3) 0px -0.05rem 0.05rem;
 border-radius: 0.2rem;color:#fff;border:none;width:95%;margin:0 auto;display:block" @click="confirmEdit()">确认修改</van-button>
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
                oldShow:true,
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
                    let oldPassword = this.oldPassword
                    let newPassword = this.newPassword
                    let key = this.key
                    this.$api.editPwd({oldPassword,newPassword,key},res=>{
                        if(res.status){
                            Toast(res.msg)

                        if (res.status) {
                            this.GLOBAL.removeStorage("user_token");
                            this.GLOBAL.removeStorage("login-type");
                            this.GLOBAL.removeStorage("helpout");
                            setTimeout(() => {
                                this.$router.replace('/login')
                            }, 500)
                        }
                        }
                    })

                } else {
                    this.errorMessage = '两次输入的密码不一致，请重新输入'
                }
            },
        },

        components: {
            HeaderTop
        }
    }

</script>

<style lang="less">

    #loginPassword {
        // padding-top: 50px;

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
        input::-webkit-input-placeholder {
            color: #fff;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #fff;
        }
    }

</style>
