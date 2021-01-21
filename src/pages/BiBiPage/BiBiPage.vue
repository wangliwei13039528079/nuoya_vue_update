<template>
    <div id="BiBiPage">
        <div class="coin_tit">
            <div>币种/交易量</div>
            <div style="flex:1;text-align:right;padding-right:5%">最新价</div>
            <div style="width:25%;text-align:right">涨跌榜</div>
        </div>
        <div class="coin"  v-for="(item,index) in bbmarket" :key="index" @click="goKline(item.molecule,item.denominator)">
            <div class="coin_type">
                <div class="coin_img">
                    <img :src="item.img" alt="">
                </div>
                <div>
                    <p class="coin_f">{{item.molecule}} <span style="color:#ababab;font-size:14px">{{item.denominator}}</span></p>
                    <p style="color:#ababab">{{item.volume}}</p>
                </div>
            </div>
            <div class="coin_price">
                <p class="coin_f">${{parseInt(item.usd*10000)/10000}}</p>
                <p style="color:#ababab">￥{{parseInt(item.cny*100)/100}}</p>
            </div>
            <div class="coin_rise" :class="Number(item.gain)>0?'float_up':'float_down'">
                {{Number(item.gain)>0?'+'+item.gain:item.gain}}%
            </div>
        </div>
    </div>
</template>

<script>
// import { setInterval, clearInterval } from 'timers';
export default {
    data() {
        return {
            bbmarket:[],
            timer:null
        };
    },
    created() {},
    mounted() {
        this.getBBMarket()
        this.timer = setInterval(()=>{
           this.getBBMarket()
        },5000)
    },
    methods: {
        getBBMarket(){
            let limit = 10
            this.$api.bbmarketList({limit},res=>{
                if(res.status){
                    this.bbmarket = res.data.bbmarket
                }
            })
        },
        goKline(coin1,coin2){
            let coin = coin1 + '/' + coin2
            this.$router.push({path:'/KKline',query:{market:coin,type:'1day'}});
        }
    },
    beforeDestroy(){
        clearInterval(this.timer)
        this.timer = null
    }
};
</script>

<style lang="less" scoped>
#BiBiPage {
    .coin {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .coin_type {
            display: flex;
            justify-content: space-around;
        }
        .coin_f {
            font-size: 18px;
            line-height: 28px;
            color: #fff;
        }
        .coin_img {
            width: 26px;
            height: 26px;
            padding-right: 5px;
            img {
                width: 100%;
                padding-top: 3px;
            }
        }
        .coin_rise {
            // padding: 10px 15px;
            width: 25%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background-color: #B84F36;
            border-radius: 3px;
            color: #fff;
        }
        .float_up {
            background-color: #B84F36;
        }
        .float_down {
            background-color: #2db249;
        }
        .coin_price {
            flex: 1;
            text-align: right;
            padding-right: 5%;
        }
    }
    .coin_tit {
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        color: #ababab;
        font-size: 16px;
    }
}
</style>
