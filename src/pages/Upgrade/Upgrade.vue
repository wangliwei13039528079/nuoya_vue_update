<template>
  <div id="Upgrade">
        <div class="imgs">
            <img src="../../common/images/machine.png" alt="">
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
        <div class="btn" @click="upgrade">
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
            chipLevel:0,
            oldMachine:'',
            oldChipNum:'',
            oldChipLevel:'',
            id:this.$route.query.id
        };
    },
    created() {},
    mounted() {
        this.getMillDetail()
    },
    methods: {
        // 矿机等级减少
        machineReduce(){
            this.machine -= 1
            if(this.machine < this.oldMachine) {
                this.machine = this.oldMachine
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
            if(this.chipLevel < this.oldChipLevel) {
                this.chipLevel = this.oldChipLevel
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
            if(this.chipNum < this.oldChipNum) {
                this.chipNum = this.oldChipNum
            }
        },
        // 芯片数量增加
        chipNumAdd(){
            if(this.machine < this.chipNum) {
                this.chipNum = this.oldChipNum
                return
            }
            this.chipNum += 1
            if(this.chipNum > this.machine) {
                this.chipNum = this.machine
            }
        },
        // 升级矿机
        upgrade(){
            let mine_id = this.$route.query.id
            let mine_level = this.machine
            let chip_num = this.chipNum
            let chip_level = this.chipLevel
            this.$api.millUp({mine_id,mine_level,chip_num,chip_level},res=>{
                this.$dialog.toast({mes:res.msg,timeout:1000})
            })
        },
        //矿机详情
        getMillDetail(){
            this.$api.single({mid:this.id},res=>{
                if(res.status) {
                    this.machine = res.data.level
                    this.oldMachine = res.data.level
                    this.chipNum = res.data.chip_num
                    this.oldChipNum = res.data.chip_num
                    this.chipLevel = res.data.chip_level
                    this.oldChipLevel = res.data.chip_level
                }
            })
        }
    },
};
</script>

<style lang="less" scoped>
    #Upgrade {
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
            background-size: cover;
            background-repeat: no-repeat;
            line-height: 50px;
            text-align: center;


        }

    }
</style>
