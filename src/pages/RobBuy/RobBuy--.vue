<template>
    <div class="robBuy">
        <div class="tit">
            <img src="../../../static/image/rub.png" alt="">
        </div>
        <div class="content">
            <div class="imgs">
                <img src="../../../static/image/PLC.png" alt="">
                <p>PLC</p>
            </div>
            <div class="list">
                <p style="font-size:18px;color:red">今日剩余数量：{{rob.eosv_num < 0 ? '0' : rob.eosv_num}}</p>
                <p>已抢购数量：{{rob.user_num}}</p>
            </div>
        </div>
        <div class="content">
            <div class="imgs">
                <img src="../../../static/image/usdt.png" alt="">
                <p>USDT</p>
            </div>
            <div class="list">
                <p>可兑换PLC：{{rob.set_rnc}}</p>
                <p> 剩余数量：{{rob.rnc}}</p>
            </div>
        </div>
          <!-- 折线图 开始 -->
        <div class="myEchart" ref='myEchart' style="width:100%;height:230px"></div>
        <!-- 折线图 结束 -->
        <div class="rob">
            <label for="" style="font-size:16px">抢购数量：</label>
            <input type="number" placeholder="请输入抢购数量" v-model="number" @input="changeRnc">
            <span>PLC</span>
            <div>
                ≈ {{rnc}} USDT
            </div>
            <div class="btn" @click="confirm" v-if="!flag">
                点击抢购
            </div>
            <div class="loading" v-if="flag">
                <van-loading type="spinner" />
                <p>正在抢购...</p>

            </div>
        </div>
        <div class="log" @click="goTo('/RobLog')">
            抢购记录
        </div>
        <!-- 密码输入框 -->
        <van-password-input
        v-if="showKeyboard"
        :value="value"
        info="密码为 6 位数字"
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
</template>

<script>
import Vue from 'vue'
import { Loading } from 'vant'
Vue.use(Loading)
import { PasswordInput, NumberKeyboard } from 'vant';
Vue.use(PasswordInput).use(NumberKeyboard);
export default {
    data() {
        return {
            number:'',
            rob:{},
            flag:false,
            value: '',
            showKeyboard: false,
            rnc:0
        };
    },
    created() {},
    mounted() {
        this.getNum()
    },
    methods: {
        goTo(path){
            this.$router.push({path:path})
        },
        changeRnc(){
            if(Number(this.number) < 0) {
                this.number = 1
            }
            this.rnc = this.number * this.rob.eosv_rnc
        },
        confirm(){

            let number = this.number
            if(number.length < 1) {
                this.$dialog.toast({mes:'请输入数量',timeout:1000})
                return
            }
            // if(Number(number) > Number(this.rob.set_rnc)) {
            //     this.$dialog.toast({mes:'抢购数量过大',timeout:1000})
            //     return
            // }
            let reg = /^[0-9]*[1-9][0-9]*$/
            if(!reg.test(number)){
                this.$dialog.toast({mes:'抢购数量只能是整数',timeout:1000})
                return
            }
            this.flag = true
            this.$api.RobBuy({number},res=>{
                if(res.status){
                    setTimeout(()=>{
                        this.flag = false
                        this.$dialog.toast({mes:res.msg,timeout:1000})
                         if(res.status){
                            this.number = ''
                            this.getNum()
                        }
                    },2000)
                }else {
                    this.flag = false
                    this.number = ''
                }

            })
        },
        getNum () {
            this.$api.eosvNum({},res=>{
                this.rob = res.data
            })
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if(this.value.length == 6) {
                this.showKeyboard = false
                this.confirm()
            }
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        }
    },
};
</script>

<style lang="less" scoped>
.robBuy {
    padding: 0 20px;
    font-size: 14px;
    .loading {
        text-align: center;
    }
    .van-loading {
        width: 100%;
    }
    .tit {
        height: 180px;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .content {
        padding: 15px;
        background-color: #161616;
        border-radius: 5px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .imgs {
            width: 40px;
            height: 60px;
            margin-right: 20px;
            text-align: center;
            img {
                width: 40px;
                height: 40px;
            }
            p {
                margin-top: 5px;
            }
        }
        .list {
            p {
                padding: 5px 0;
            }
        }
    }
    .con {
        width: 60%;
        margin: auto;
        background-color: #161616;
        padding: 20px 0;
        border-radius: 5px;
        margin-bottom: 50px;
        h3 {
            text-align: center;
            font-size: 16px;
            color: #fff;
            margin-bottom: 10px;
        }
        .list {
            padding-top: 10px;
            text-align: center;
        }
    }
    .rob {
        // width: 60%;
        margin: auto;
        background-color: #161616;
        padding: 20px 0;
        border-radius: 5px;
        text-align: center;
        h3 {
            font-size: 16px;
            color: #fff;
            margin-bottom: 20px;
        }

        input {
            margin-bottom: 10px;
            border: none;
            text-align: center;
            width: 50%;
        }
    }
    .log {
        text-align: right;
        color: #10AEFF;
        padding: 10px 0;
    }
    .btn {
        margin-top: 10px;
        background-color: #fff;
        padding: 10px 0;
        width: 40%;
        margin: 10px auto 0;
        border-radius: 5px;
        color: #000;
    }
    .van-password-input {
        position: fixed;
        width: 100%;
        top: 40%;
        left: 0;
        margin: 0;
        padding: 0 10px;
    }
    .van-number-keyboard__body {
        color: #000;
    }
}
</style>
