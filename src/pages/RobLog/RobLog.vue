<template>
    <div class="robLog">
        <ul class="tit">
            <li class="time">日期</li>
            <li class="number">抢购数量</li>
            <li class="realNum">成功抢购</li>
        </ul>
        <div v-if="log.length < 1">暂无记录</div>
        <div class="con" v-for="(item,index) in log" :key="item.id">
            <p class="time">{{item.ctime}} </p>
            <p class="number">{{item.num}}</p>
            <p class="realNum">{{item.status == 0 ? '抢购中' : item.eosv_money}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            log:[]
        };
    },
    created() {},
    mounted() {
        this.getLog()
    },
    methods: {
        getLog(){
            this.$api.robLog({},res=>{
                if(res.status){
                    this.log = res.data
                    this.log.map((item)=>{
                        item.ctime=item.ctime.substr(5,11)
                    })
                }
                
            })
        }
    },
};
</script>

<style lang="less" scoped>
    .robLog {
        padding: 0 0.3rem;
        font-size: 14px;
        .tit {
            display: flex;
            color: #fff;
            text-align: center;
            font-size: 16px;
            margin-bottom: 8px;
        }
        .time {
            flex: 1;
        }
        .number {
            flex: 1;
        }
        .realNum {
            flex: 1;
        }
        .con {
            color: #ababab;
            display: flex;
            text-align: center;
            border-bottom: 1px solid #1A202E;
            p {
                padding: 8px 0;
            }
        }
    }
</style>
