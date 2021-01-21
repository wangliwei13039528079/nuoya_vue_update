<template>
  <div id="buyEosv">
        <div class="imgs">
            <!-- <video src="../../../static/image/world.mp4" loop="loop" autoplay></video> -->
            <img src="../../../static/image/world.gif" alt="">
        </div>
        <div class="option">
            <div :class="['level',{active:level==1}]" @click="choice(1)">
                <div>
                    <img src="../../../static/image/level1.png" alt="">
                </div>
                <p>一级</p>
                <p>$100~$1000</p>
            </div>
            <div :class="['level',{active:level==2}]" @click="choice(2)">
                <div>
                    <img src="../../../static/image/level2.png" alt="">
                </div>
                <p>二级</p>
                <p>$1000~$2000</p>
            </div>
            <div :class="['level',{active:level==3}]" @click="choice(3)">
                <div>
                    <img src="../../../static/image/level3.png" alt="">
                </div>
                <p>三级</p>
                <p>$2000~$4000</p>
            </div>
            <div :class="['level',{active:level==4}]" @click="choice(4)">
                <div>
                    <img src="../../../static/image/level4.png" alt="">
                </div>
                <p>四级</p>
                <p>$4000~$8000</p>
            </div>
            <div :class="['level',{active:level==5}]" @click="choice(5)">
                <div>
                    <img src="../../../static/image/level5.png" alt="">
                </div>
                <p>预备节点</p>
                <p >$10万~$50万</p>
            </div>
            <div :class="['level',{active:level==6}]" @click="choice(6)">
                <div>
                    <img src="../../../static/image/level6.png" alt="">
                </div>
                <p>超级节点</p>
                <p>大于$50万</p>
            </div>
        </div>
        <van-dialog
        v-model="show"
        title="购买金额"
        show-cancel-button
        @confirm="confirm"
        @cancel = "cancel"
        >
            <div class="money">
                <input type="number" name="" id="" placeholder="请输入购买金额" v-model="money">
            </div>
            
        </van-dialog>
        <!-- <div class="btn" @click="buyEosv">
            确定
        </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'vant'
import { setTimeout } from 'timers';
Vue.use(Dialog)
export default {
  data() {
    return {
        level:'',
        show:false,
        money:'',
        flag:true,
        vip:''
    };
  },
    created() {},
    mounted() {
        this.userOnline()
    },
    methods: {
        choice(level){
            
            this.money = ''
            // if(level == 5 || level == 6) {
            //     if(this.vip < 4) {
            //         this.$dialog.toast({mes:'您的等级不够',timeout:1000})
            //         return
            //     }
            // }
            this.show = true
            this.level = level

        },
        notOpen(){
            this.$dialog.toast({mes:'您的等级不够',timeout:1000})
        },
        userOnline() {
            this.$api.userInfo({}, res => {
                this.vip = res.data.vip
            });
        },
        // 购买矿机
        buyEosv(){
            if(!this.flag){
                return this.$dialog.toast({mes:'正在购买，请稍候',timeout:1000})
            }
           
            if(this.level == 1) {
                if(this.money < 100 || this.money >= 1000) {
                    return this.$dialog.toast({mes:'购买金额不在该等级区间之内，无法购买'})
                }
            }
            if(this.level == 2) {
                if(this.money < 1000 || this.money >= 2000) {
                    return this.$dialog.toast({mes:'购买金额不在该等级区间之内，无法购买'})
                }
            }
            if(this.level == 3) {
                if(this.money < 2000 || this.money >= 4000) {
                    return this.$dialog.toast({mes:'购买金额不在该等级区间之内，无法购买'})
                }
            }
            if(this.level == 4) {
                if(this.money < 4000 || this.money >= 8000) {
                    return this.$dialog.toast({mes:'购买金额不在该等级区间之内，无法购买'})
                }
            }
             if(this.level == 5) {
                if(this.money < 100000 || this.money >= 500000) {
                    return this.$dialog.toast({mes:'购买金额不在该等级区间之内，无法购买'})
                }
            }
            if(this.level == 6) {
                if(this.money <= 500000) {
                    return this.$dialog.toast({mes:'购买金额不在该等级区间之内，无法购买'})
                }
            }
            this.flag = false
            let level = this.level
            let money = this.money
            this.$api.buyMill({money,level},res=>{
                if(res) {
                    this.flag = true
                    this.money = ''
                    this.$dialog.toast({mes:res.msg,timeout:1000})
                }
                if(res.status){
                    setTimeout(()=>{
                        this.$router.replace({path:'/EOSV'})
                    },1000)
                }
                
            })
        },
        confirm(){
            this.buyEosv()
        },
        cancel(){
            this.money = ''
        }
    },
};
</script>

<style lang="less" scoped>
    #buyEosv {
        padding: 0 0.3rem 60px;
        .imgs {
            width: 100%;
            height: 200px;
            margin-bottom: 20px;
            img {
                width: 100%;
                height: 100%;
            }
            video {
                width: 100%;
            }
        }
        .btn {
            width: 280px;
            height: 50px;
            margin: 60px auto 0;
            background: url('../../common/images/btn.png');
            background-size: contain;
            background-repeat: no-repeat;
            line-height: 50px;
            text-align: center;

        }
        .option {
            display: flex;
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
            .level {
                width: 30%;
                background-color: #161616;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                border-radius: 5px;
                padding: 15px 0;
                box-sizing: border-box;
                margin-bottom: 0.3rem;
                border: 1px solid transparent;
                div {
                    width: 50px;
                    // height: 50px;
                    margin-bottom: 10px;
                    img {
                        width: 100%;
                        // height: 100%;
                    }
                }
                p {
                    padding-top:10px;
                    width:100%;
                    word-wrap:break-word;
                    text-align:center;
                }
                &.active {
                    border: 1px solid #ccc;
                    color: #fff;
                }
            }
        }
        /deep/.van-dialog__header {
            color: #000;
        }
        .money {
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            input {
                width: 100%;
                border: none;
                border-bottom: 1px solid #ccc;
                padding: 10px 5px;
                color: #000;

            }
        }

    }
</style>
