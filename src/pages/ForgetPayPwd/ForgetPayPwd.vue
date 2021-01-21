<template>
    <div id="forgetPayPwd">
        <HeaderTop title="支付密码重置">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <van-cell-group>
            <van-field  readonly type="password" placeholder="请输入新密码" v-model="newPassword" maxlength="6" @click="flag='new';show=true" right-icon="closed-eye" @click-right-icon="newShow=false" v-show="newShow"/>
            <van-field  readonly type="text" placeholder="请输入新密码" v-model="newPassword" maxlength="6" @click="flag='new';show=true" right-icon="eye-o" @click-right-icon="newShow = true" v-show="!newShow"/>

            <van-field  readonly maxlength="6" type="password" placeholder="请再次输入新密码"
                       v-model="confirmPassword"
                       :error-message="errorMessage" @click="flag='confirm';show=true" right-icon="closed-eye" @click-right-icon="reShow=false" v-show="reShow"/>
            <van-field  readonly maxlength="6" type="text" placeholder="请再次输入新密码"
                       v-model="confirmPassword"
                       :error-message="errorMessage" @click="flag='confirm';show=true" right-icon="eye-o" @click-right-icon="reShow = true" v-show="!reShow"/>
            <van-field  type="text" placeholder="请输入私钥"
                       v-model="key"/>
        </van-cell-group>

        <div class="submit" style="padding: 10px">
            <van-button type="primary" style="
 background: rgb(57, 57, 65);
 box-shadow: rgba(0, 0, 0, 0.3) 0px -0.05rem 0.05rem;
 border-radius: 0.2rem;color:#fff;border:none;width:95%;margin:0 auto;display:block" @click="confirmEdit()">确认修改</van-button>
        </div>

        <!-- 悬浮窗 --- 数字键盘-->
        <van-number-keyboard
            :show="show"
            extra-key="."
            close-button-text="完成"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
        />
        <!-- 悬浮窗 --- 数字键盘-->

    </div>


</template>

<script>

    import Vue from 'vue'
    import {Field} from 'vant'
    import {NumberKeyboard, Toast} from 'vant'
    import {Button} from 'vant'

    Vue.use(Button)
    Vue.use(Field)
    Vue.use(Toast)
    Vue.use(NumberKeyboard)
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    // import {reqEditErJiPassword} from '../../api'

    export default {

        data() {
            return {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                errorMessage: '',
                show: false,         //控制数字键盘的显示/隐藏
                flag: '',           //表示当前选择的那个输入框
                key:'',
                newShow:true,
                reShow:true
            }
        },
        mounted() {
        },

        computed: {},
        methods: {
            //路由跳转
            goTo(path) {
                this.$router.replace({path: path})
            },

            async confirmEdit() {
                if (this.newPassword == this.confirmPassword) {
                    //console.log('两次输入的密码一致，可以提交请求')
                    let newPassword = this.newPassword
                    let key = this.key
                    this.$api.forgetPayPwd({newPassword,key},res=>{
                        if(res){
                            this.$dialog.toast({mes:res.msg,timeout:1000})
                        }
                        if(res.status){
                            this.newPassword = ''
                            this.key = ''
                            this.confirmPassword = ''
                        }
                    })
                } else {
                    this.errorMessage = '两次输入的密码不一致，请重新输入'
                }
            },

            onInput(value) {
                console.log(`当前点击：${value}`)
                switch (this.flag) {
                    case 'old':
                        if (this.oldPassword.length >= 6) return
                        this.oldPassword += value
                        break
                    case 'new':
                        if (this.newPassword.length >= 6) return
                        this.newPassword += value
                        break
                    case 'confirm':
                        if (this.confirmPassword.length >= 6) return
                        this.confirmPassword += value
                        break
                }
            },
            onDelete() {
                switch (this.flag) {
                    case 'old':
                        this.oldPassword = this.oldPassword.substr(0, this.oldPassword.length - 1)
                        break
                    case 'new':
                        this.newPassword = this.newPassword.substr(0, this.newPassword.length - 1)
                        break
                    case 'confirm':
                        this.confirmPassword = this.confirmPassword.substr(0, this.confirmPassword.length - 1)
                        break

                }
            },
        },

        components: {
            HeaderTop
        }
    }

</script>

<style lang="less">

    #forgetPayPwd {
        padding-top: 50px;

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
        .van-field__control {
            color: #fff;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        .van-number-keyboard {
            color: #000;
            z-index: 10000 !important;
        }
        input::-webkit-input-placeholder {
            color: #fff;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #fff;
        }
    }

</style>
