<template>
    <div v-if="payments.length">
        <div class="payment" v-for="(item, index) in payments" :key="index"  @click="gopay(item.code)">
            <img class="payment-img" :src="item.img"/>
            <div class="payment-left">
                <h3>{{ item.name }}</h3>
                <p v-if="item.code === 'balancepay'">当前余额: {{balance}}</p>
                <p v-else>{{ item.memo }}</p>
            </div>
            <img class="right-img" src="../../static/image/right.png"/>
        </div>
         <!-- 密码输入框 -->
        <van-password-input style="border:1px solid #eee"
        :value="value"
        info="密码为 6 位数字"
        @focus="showKeyboard = true"
        v-if="isshow"
        />

        <!-- 数字键盘 -->
        <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false;isshow = false"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            showKeyboard: false,
            isshow:false,
            codemsg:null,
            code:null
        };
    },
    props: {
        payments: {
            type: [Array,Object],
            default () {
                return []
            }
        },
        user: {
            type: Object,
            default () {
                return {}
            }
        },
        balance:{
            type:[Number,String],
            default () {
                return {}
            }
        }
    },
    methods: {
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
            if(this.value.length==6){
                this.isshow = false
                this.showKeyboard = false
                this.codemsg=[this.codemsg,this.value]
                this.payment()
                this.value = ''
            }
        },
        onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
        },
        gopay(codemsg){
            this.isshow=true
            this.codemsg=codemsg
            this.showKeyboard=true
        },
        payment () {
            this.$emit('pay', this.codemsg)
        }
    }
}
</script>

<style>
    .payment{
        /* background-color: #fff; */
        text-align: left;
        padding: .35rem .2rem;
        position: relative;
        margin-bottom: 1px;
    }
    .payment-img{
        width: 1rem;
        height: auto;
        padding-right: .15rem;
    }
    .payment-left{
        display: inline-block;
        padding-left: .2rem;
        border-left: 1px solid #F2F2F2;
        color: #fff;

    }
    .payment p {
        color:#fff;
    }
    .payment-left h3{
        margin-bottom: .15rem;
        font-size: .28rem;
    }
    .payment .right-img{
        right: .2rem;
    }
    .van-hairline {
        color: #000;
    }
</style>
