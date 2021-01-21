<template>
    <section class="bibic">

        <header-top :title="$t('withdraw')">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </header-top>
        <div class="content">
        
              
                    <van-field
                        :label="$t('typeCoin')"
                        :value="types"
                        disabled
                    />
            
                <!-- <div class="con">
                    <label for="option"><i class="iconfont iconxiala"></i></label>
                    <select name="" id="option" ref="options">
                        <option value="">请选择提币类型</option>
                        <option :value="item" v-for="(item,index) in coinlist">{{item}}</option>
                    </select>
                </div> -->
                <div style='display: flex;position:relative'>
                <van-field 
                    v-model="num"
                    :label="$t('amount')"
                    @input="changeNum"
                />
                <!-- <div style='
    
    position:absolute;
    top:.6rem;
    right:0
    '>{{ $t('available') }}<span style='margin:0 5px'>{{cashAssetsNum}}</span>{{types}}</div> -->
                </div>
                <!-- <div class="con">
                    <input type="text" placeholder="请输入转出数量" v-model="num">
                </div> -->
                <van-field
                    v-model="url"
                    :label="$t('addCoin')"
                />
                <!-- <div class="con">
                <input type="text" placeholder="请输入提币地址" v-model="url">
            </div> -->
          

            <div class="menus">
                <van-button  class="btn" @click="showKeyboard = true">{{ $t('sure') }}</van-button>
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
            <van-number-keyboard style="color:#000"
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard = false"
            />
        </div>
        <!--悬浮层-->

    </section>
</template>

<script>
    import Vue from 'vue'
    import {Cell, CellGroup} from 'vant';
    import {reqWithdraw,req2Coinlist} from "../../common/apigo";
    import {Field} from 'vant';
    import {Toast} from 'vant';
    import HeaderTop from "../../components/HeaderTop/HeaderTop";

    Vue.use(Field);
    import {Button} from 'vant';
    import {PasswordInput, NumberKeyboard} from 'vant'

    Vue.use(PasswordInput).use(NumberKeyboard)

    Vue.use(Button);

    Vue.use(Cell).use(CellGroup);
    export default {
        name: "BiBiT",
        components: {HeaderTop},


        data(){
            return{
                type: '',
                num: '',
                url: '',
                types:'',
                flag:true,
                showKeyboard:false,
                value:'',
                uid:'',
                coinlist:[],
                cashAssetsNum:0
            }
        },


        mounted(){
            this. type = this.$route.query.type
            this.types = this.$route.query.name.toUpperCase()
            this.cashAssetsNum=this.$route.query.num
            this.userOnline()

        },

        methods: {
            userOnline() {
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getCoin()
                })
            },
            changeNum(){
                // this.num = this.num.replace(/[^\d]/g,'')
                this.num = (this.num.match(/^\d*(.?\d{0,10})/g)[0])
                if(Number(this.num) < 0) {
                    this.num = ''
                }
            },
            async getCoin() {
                let uid=this.uid;
                let mid=''
                const result = await req2Coinlist({uid,mid});
                if(result.errcode==0){
                    let coins = result.Balance
                    let i = ''
                    coins.forEach((item,index)=>{
                        if(item.CoinName != this.types) {
                            this.coinlist.push(item.CoinName)
                        }

                    })

                }
            },
            async getWithdraw() {
                if(!this.flag){
                    return Toast('正在提币，请稍候')
                }
                this.flag = false
                let uid = this.uid
                let coin=this.types
                let address = this.url;
                let amount = this.num;
                let payPwd = this.value
                if(this.num < 0) {
                    return Toast('提币数量不能小于0')
                }
                const result = await reqWithdraw({uid,address,payPwd,amount,coin});
                if(result){
                    this.flag = true
                    this.value = ''
                }
                   Toast("uid无效")

                  if  (result.errcode==0){
                    Toast("提现成功")
                    this.url = ''
                    this.num = ''
                    this.value = ''
                    this.$router.push('/CashAssets')
                } else {

                      Toast(result.msg)

                }  
                // if(result.errcode==-1){
                //     Toast("uid无效")
                // }else if(result.errcode==-2){
                //     Toast("币名无效")
                // }else if(result.errcode==-3){
                //     Toast("请输入正确的地址")
                // }else if(result.errcode==-4){
                //     Toast("请输入正确的数量")
                // }else if(result.errcode==-5){
                //     Toast("提币数量过小")
                // }else if(result.errcode==-6){
                //     Toast("查询用户失败")
                // }else if(result.errcode==-7){
                //     Toast("密码不正确")
                // }else if(result.errcode==-8){
                //     Toast("获取余额失败")
                // }else if(result.errcode==-9){
                //     Toast("余额不足")
                // }else if(result.errcode==-10){
                //     Toast("提现失败")
                // }else if(result.errcode==-11){
                //     Toast("提现失败")
                // }else if(result.errcode==0){
                //     Toast("提现成功")
                //     this.url = ''
                //     this.num = ''
                //     this.value = ''
                //     this.$router.push('/CashAssets')
                // }
                this.value=""
            },

            onInput (key) {
                this.value = (this.value + key).slice(0, 6)

                if (this.value.length == 6) {
                    this.showKeyboard = false
                    // this.toBibit()
                    this.getWithdraw()
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1)
            }
        },
        // watch:{
        //     type(val){
        //         if(val == 6) {
        //             this.types = 'DSTC'
        //         }else if(val == 8) {
        //             this.types = 'ETH'
        //         }
        //     }
        // }
    }
</script>

<style scoped lang="less">

    .bibic {
        height: 100%;
        padding: 0 10px;
        // background-color: #edf1f4;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .content {
  background: rgb(61, 62, 70);
     width:95%;
     margin: .2rem auto;
     padding:.2em 0 .1rem 0;
    -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;

            .menus {
                margin-top: 10px;
            }
            .van-button--default {
                background-color: #7497f1;
                color: #fff;
                border: none;
            }

        }
        .con {
    padding: 10px 15px;
    font-size: 14px;
    position: relative;

    // display: flex;
      background-color: rgb(60,61,69);
            border: 1px solid #eec67f;
            color: #fff;
            margin:.3rem auto;
            width: 90%;
            border-radius:5px;
            label {
                position: absolute;
                top: 10px;
                right: 15px;
            }
            input {
                border: none;
                padding: 5px 0;
            }
            select {
                color: #fff;
                width: 100%;
                border: none;
                padding-left: 5px;
                option {
                    color: #fff;
                    background-color: #969799;
                }
            }
        }

        .pwd-keyboard {
            width: 100%;
            height: 100%;
            z-index: 999;
            position: fixed;
            left: 0;
            top: 0;
            background-color: rgba(0, 0, 0, 0.4);

            .van-password-input {
                margin-top: 30%;
            }
        }
        .van-cell-group {
            background-color: rgb(60,61,69);
        }
        .van-cell {
                 background-color: rgb(60,61,69);
            border: 1px solid #eec67f;
            color: #fff;
            margin:.2rem auto;
            width: 90%;
            border-radius:5px;
      
    
        }
            .btn {
    padding: 10px 0;
    text-align: center;
    border-radius: 5px;

      background: rgb(57,57,65);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;border:none;color:#fff;position:fixed;bottom:.3rem;width:90%;left:50%;transform: translate(-50%,-50%);
                color: #fff;
                border-top: none;
  }
        .van-hairline--top-bottom::after {
            border-width: 0;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        /deep/.van-field__control:disabled {
            color: #fff;
        }
        /deep/.van-field__control {
            color: #fff;
            text-align:right;
        }
    }

</style>
