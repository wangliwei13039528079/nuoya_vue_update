<template>
    <div id="dealBuy">
        <div class="con">
            <label for="">币种</label>
            <input type="text" value="USGC" readonly>
        </div>
        <div class="con">
            <label for="">交易数量</label>
            <input type="text" v-model="num" placeholder="请输入交易数量">
        </div>
        <div class="con">
            <label for="">二级密码</label>
            <input type="password" :value="psd" @click="show=true" readonly placeholder="请输入密码">
        </div>
        <div class="btn" @click="dealBuy">确定</div>
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
    // import {reqCBuy} from '../../../api'
    import {NumberKeyboard, Toast} from 'vant'
    Vue.use(NumberKeyboard)
    Vue.use(Toast)

    export default {
        //数据
        data() {
            return {
                count: 0,
                isLoading: false,
                value:'',
                show:false,
                psd:'',
                num:'',
                flag:true
                
            }
        },
        //页面挂载
        mounted() {
           
        },

        //方法
        methods: {
            // async dealBuy(){
            //     if(!this.flag) {
            //         return Toast('正在挂单，请稍后')
            //     }
            //     this.flag = false
            //     let number = this.num
            //     let erjipsd = this.psd
            //     if(number.length < 1) {
            //         this.flag = true
            //         return Toast('请输入数量')
            //     }
            //     if(erjipsd.length < 1) {
            //         this.flag = true
            //         return Toast('请输入密码')
            //     }
            //     if(number % 5 != 0) {
            //         this.flag = true
            //         return Toast('请输入5的倍数')
            //     }
            //     const res = await reqCBuy({number,erjipsd})
            //     Toast(res.msg)
            //     if(res) {
            //         this.num = ''
            //         this.psd = ''
            //         this.flag = true
            //     }
            // },
            onInput(value) {
                if (this.psd.length >= 6) return this.show = false
                this.psd += value
            },
            onDelete() {
                this.psd = this.psd.substr(0, this.psd.length - 1)
            },
            
        },
        
    }

</script>
<style lang="less" scoped>
    #dealBuy {
        height: 100%;
        .con {
            display: flex;
            justify-content: space-between;
            padding: 4%;
            border-bottom: 1px solid #ccc;
            background-color: #fff;
            label {
                width: 30%;
            }
            input{
                width: 70%;
            }
        }
        .btn {
            width: 97%;
            margin: 30px auto 0;
            padding: 4% 0;
            text-align: center;
            background-color: #37434F;
            color: #fff;
            border-radius: 5px;
        }
    }
</style>
