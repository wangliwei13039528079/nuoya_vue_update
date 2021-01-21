<template>
    <div id="out">
        <HeaderTop title="转出">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
            <!-- <a class="right" @click="goTo('/outlog')" slot="right">转账记录</a> -->
        </HeaderTop>

        <div class="" style="padding: 10px">
            <!-- <van-cell-group>
                <van-field placeholder="对方手机号" v-model="uid">
                    <van-button slot="button" size="small" type="primary" style="background-color:#37434f; border: none" @click="goTo('/scan')">扫一扫</van-button>
                </van-field>
                <van-field placeholder="转出数量" v-model="transfernum"/>
            </van-cell-group> -->
            <div class="content">
                <label for="option"><i class="iconfont iconxiala"></i></label>
                
                <select name="" id="option" ref="options">
                    <option value="">请选择转出类型</option>
                    <option value="balance">注册钱包</option>
                    <option value="points">激活钱包</option>
                </select>
            </div>
            <div class="content">
                <input type="text" placeholder="对方手机号" v-model="mobile">
            </div>
            <div class="content">
                <input type="text" placeholder="转出数量" v-model="transfernum">
            </div>

            <div class="btn-group">
                <van-button size="large" type="primary" @click="showKeyboard = true"  style="background-color:#161616; border: none;color:#fff">确定转出</van-button>
                <!--<van-button size="large" type="danger" @click="goTo('/trade')">兑换资产</van-button>-->
            </div>
        </div>
        <!--悬浮层-->
        <div class="pwd-keyboard" v-show="showKeyboard">
            <!-- 密码输入框 -->
            <!-- 密码输入框 -->
            <van-password-input
                :value="value"
                @focus="showKeyboard = true"
            />

            <!-- 数字键盘 -->
            <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
            />
        </div>
        <!--悬浮层-->
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Field} from 'vant'
    import {Toast} from 'vant'

    Vue.use(Field)
    Vue.use(Toast)
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    // import {reqTransfer, reqCheckScPassword} from '../../api'

    import {PasswordInput, NumberKeyboard} from 'vant'

    Vue.use(PasswordInput).use(NumberKeyboard)

    export default {
        data () {
            return {
                mobile: '',
                transfernum: '',
                showKeyboard: false,
                value: '',
                flag:true
            }
        },
        mounted () {
            this.uid = this.$route.query.code
        },

        methods: {
            goTo (path) {
                this.$router.replace({path: path, query: {backurl: this.$route.path}})
            },

            onInput (key) {
                this.value = (this.value + key).slice(0, 6)

                if (this.value.length == 6) {
                    this.showKeyboard = false
                    let type = this.$refs.options.value
                    let pay_pwd = this.value
                    let mobile = this.mobile
                    let number = this.transfernum
                    let data = {
                        pay_pwd,
                        mobile,
                        number,
                        type
                    }
                    this.value = ''
                    if(!type) {
                       return Toast('请选择转出类型')
                    }
                    if(mobile.length < 1 || mobile.length != 11) {
                        return this.$dialog.toast({mes: '请输入正确的手机号', timeout: 1000})
                    }
                    if(number.length < 1) {
                        return this.$dialog.toast({mes: '输入数量', timeout: 1000})
                    }
                    this.$api.userTransfer(data,res=>{
                        if(res) {
                            this.$dialog.toast({mes: res.msg, timeout: 1000})
                            this.mobile = ''
                            this.transfernum = ''

                        }
                    })
                
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1)
            }
        },

        components: {
            HeaderTop
        }
    }
</script>

<style scoped lang="less">
    #out {
        // padding-top: 50px;
        height: 100%;
        background-color: #000;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .btn-group {
            margin-top: 5px;

            button {
                margin-top: 5px;
            }
        }
        .van-number-keyboard {
            color: #000;
            z-index: 10000 !important;
        }
        .van-cell {
            background-color: #423F52;
            color: #fodeba;
            input {
                color: #fff !important;
            }
        }
        .van-hairline--top-bottom::after {
            border: 0;
        }
        .content {
            padding: 10px 15px;
            // background-color: #423F52;
            font-size: 14px;
            position: relative;
            border-bottom: 1px solid #1A202E;
            input {
                border: none;
                padding: 5px 0;
                color: #ababab;
            }
            label {
                position: absolute;
                top: 10px;
                right: 15px;
                color: #fff;
            }
            select {
                color: #ababab;
                width: 100%;
                border: none;
                option {
                    color: #ababab;
                    background-color: #232121;
                    border: 0;
                }
                
            }
        }

        .right {
            color: #fff;
            position: absolute;
            right: 0;
            height: 45px;
            line-height: 50px;
            padding-right: 10px;
        }

        .pwd-keyboard {
            width: 100%;
            height: 100%;
            z-index: 10000;
            position: fixed;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.4);

            .van-password-input {
                margin-top: 30%;
            }
        }
    }
</style>
