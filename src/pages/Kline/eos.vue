<template>
    <kline
            header="EOSUSDT"
            header-desc="BINANCE / EOSUSDT"
            :price="price"
            :data="udata"
    ></kline>
</template>

<script>
import kline from '../../components/KLine/kline'

export default {
    name: 'eth',
    components: {
        kline
    },
    data () {
        return {
            udata: [],
            price: 0,
            timer: null
        }
    },
    created () {
        this.timer = setTimeout(this.getLatestData, 1000)
        this.getData()
    },
    methods: {
        getData () {
            this.$http.get(process.env.JAVA_API + '/api/kline/eos_usdt', []).then(function (response) {
                this.udata = response.data.data
                let len = this.udata.length
                this.price = this.udata[len - 1][1]
            // 响应成功回调
            }, function (response) {
            // 响应错误回调
            })
            setTimeout(this.getData, 60000)
        },
        getLatestData () {
            this.$http.get(process.env.JAVA_API + '/api/latest/eos_usdt', []).then(function (response) {
                let data = response.data.data
                this.price = data[1]
                // 响应成功回调
            }, function (response) {
                // 响应错误回调
            })
            this.timer = setTimeout(this.getLatestData, 1000)
        }
    }

}
</script>

<style scoped>

</style>
