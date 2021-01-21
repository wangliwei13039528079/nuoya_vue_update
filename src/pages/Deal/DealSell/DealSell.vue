<template>
    <div id="dealSell">
        <!-- <h1>等待开放</h1> -->
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
        <div class="btn" @click="dealSell">确定</div>
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

        <!-- 提示规则 -->
        <!-- <div class="rule">
            <h1>挂单规则：</h1>
            <p>1、挂单数量只能是5的倍数</p>
        </div> -->
    </div>
</template>
<script>
    // import {reqCSell} from '../../../api'
    import {Toast} from 'vant'
    import Vue from 'vue'
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
                flag:true
                
            }
        },
        //页面挂载
        mounted() {
           
        },

        //方法
        methods: {
            onInput(value) {
                if (this.psd.length >= 6) return this.show = false
                this.psd += value
            },
            onDelete() {
                this.psd = this.psd.substr(0, this.psd.length - 1)
            },
            // async dealSell(){
            //     if(!this.flag) {
            //         return Toast('正在挂单，请稍后再试')
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
            //     const res = await reqCSell({number,erjipsd})
            //     Toast(res.msg)
            //     if(res) {
            //         this.num = ''
            //         this.psd = ''
            //         this.flag = true
            //     }
                
            // }
        },
        
    }

</script>
<style lang="less" scoped>
    #dealSell {
        h1 {
            text-align: center;
            margin-top: 15px;
        }
        .con {
            display: flex;
            justify-content: space-between;
            padding: 4%;
            border-bottom: 1px solid #ccc;
            background-color: #fff;
            label {
                width: 30%;
            }
            input {
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
        .rule {
            margin-top: 50px;
            padding: 0 10px;
            text-align: left;
            p {
                line-height: 20px;
            }
        }
    }
</style>
