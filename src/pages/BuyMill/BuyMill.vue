<template>
  <div id="buyMill">
        <div class="imgs">
            <img src="../../common/images/buymill.png" alt="">
        </div>
        <div class="con">
            <div class="tit">矿机等级</div>
            <div class="step">
                <div class="reduce" @click="machineReduce">-</div>
                <div class="num">{{machine}}</div>
                <div class="add" @click="machineAdd">+</div>
            </div>

        </div>
        <div class="con">
            <div class="tit">芯片等级</div>
            <div class="step">
                <div class="reduce" @click="chipLevelRed">-</div>
                <div class="num">{{chipLevel}}</div>
                <div class="add" @click="chipLevelAdd">+</div>
            </div>
        </div>
         <div class="con">
            <div class="tit">芯片数量</div>
            <div class="step">
                <div class="reduce" @click="chipNumRed">-</div>
                <div class="num">{{chipNum}}</div>
                <div class="add" @click="chipNumAdd">+</div>
            </div>
        </div>
        <div class="btn" @click="BuyMill">
            确定
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        machine:1,
        chipNum:1,
        chipLevel:0
    };
  },
    created() {},
    mounted() {},
    methods: {
        // 矿机等级减少
        machineReduce(){
            this.machine -= 1
            if(this.machine < 1) {
                this.machine = 1
                return
            }
        },
        // 矿机等级增加
        machineAdd(){
            this.machine += 1
            if(this.machine > 3) {
                this.machine = 3
            }

        },
        // 芯片等级减少
        chipLevelRed(){
            this.chipLevel -= 1
            if(this.chipLevel < 0) {
                this.chipLevel = 0
            }
        },
        // 芯片等级增加
        chipLevelAdd(){
            this.chipLevel += 1
            if(this.chipLevel > this.machine) {
                this.chipLevel = this.machine
            }
        },
        // 芯片数量减少
        chipNumRed(){
            this.chipNum -= 1
            if(this.chipNum < 1) {
                this.chipNum = 1
            }
        },
        // 芯片数量增加
        chipNumAdd(){
            this.chipNum += 1
            if(this.chipNum > this.machine) {
                this.chipNum = this.machine
            }
        },
        // 购买矿机
        BuyMill(){
            let mine_level = this.machine
            let chip_num = this.chipNum
            let chip_level = this.chipLevel
            this.$api.buyMill({mine_level,chip_num,chip_level},res=>{
                this.$dialog.toast({mes:res.msg,timeout:1000})
            })
        }
    },
};
</script>

<style lang="less" scoped>
    #buyMill {
        padding: 0 20px;
        .imgs {
            width: 100%;
            height: 40%;
            margin-bottom: 20px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .con {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 10px;
        }
        .step {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .reduce,
        .add {
            // padding: 8px 15px;
            height: 31px;
            width: 39px;
            line-height: 31px;
            text-align: center;
            background: linear-gradient(#72F4FE,#26A5FF);
            font-size: 20px;

            border-radius: 2px;
        }
        .reduce {
            // transform: skewX(10deg);
        }
        .add {
            // transform: skewX(-10deg);
        }
        .num {
            height: 31px;
            background: linear-gradient(#72F4FE,#26A5FF);
            width: 40px;
            margin: 0 5px;
            line-height: 31px;
            text-align: center;
            border-radius: 2px;
        }
        .tit {
            padding: 0 10px;
            font-size: .25rem;
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

    }
</style>
