<template>
  <div id="deliverGoods">
        <van-cell-group>
            <van-field
                v-model="expressName"
                label="快递名称"
                placeholder="请输入快递名称"
            />
            <van-field
                v-model="expressNum"
                label="快递单号"
                placeholder="请输入快递单号"
            />
        </van-cell-group>
        <div class="btn" @click="deliver">
            确定发货
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field } from 'vant';
Vue.use(Field);
export default {
    data() {
        return {
            expressName:'',
            expressNum:'',
            flag:true
        };
    },
    created() {},
    mounted() {},
    methods: {
        deliver(){
            if(!this.flag){
                return this.$dialog.toast({mes:'正在提交，请稍候'})
            }
            let addr_name = this.expressName
            let addr_code = this.expressNum
            let order_id = this.$route.query.order_id
            if(addr_name.trim().length < 1) {
                return this.$dialog.toast({mes:'请输入快递名称',timeout:1000})
            }
            if(addr_code.trim().length < 1) {
                return this.$dialog.toast({mes:'请输入快递单号',timeout:1000})
            }
            this.flag = false
            this.$api.deliverGoods({addr_name,addr_code,order_id},res=>{
                if(res){
                    this.flag = true
                    this.$dialog.toast({mes:res.msg,timeout:1000})
                }
                if(res.status){
                    this.$router.replace({path:'/MyCommodityOrder',query:{tab:3}})
                }
            })
        }
    },
};
</script>

<style lang="less" scoped>
#deliverGoods{
    padding: 0 10px;
    .van-cell {
        background-color: #000;
        color: #fff;
        border-bottom: 1px solid #1A202E;
    }
    .van-cell:not(:last-child)::after {
        width: 0;
    }
    .van-hairline--top-bottom::after {
        border-width: 0;
    }
    /deep/.van-field__control {
        color: #fff;
    }
    .btn {
        width: 100%;
        margin: 50px auto 0;
        padding: 12px 0;
        text-align: center;
        background-color: #FF3B44;
    }
}
</style>
