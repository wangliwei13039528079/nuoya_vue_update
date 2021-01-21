<template>
    <div id="myCommodityDetail">
        <van-cell-group>
            <van-cell title="产品分类" :value="catName" />
            <van-cell title="产品名称" :value="order.name" />
            <van-cell title="产品单价" :value="order.price" />
            <van-cell title="产品库存" :value="order.stock" />
            <van-cell title="产品销量" :value="order.buy_count" />
            <van-cell title="审核状态" :value="getStatus(order.status)" />
            <van-cell title="商品状态" value="此商品可能违规，已被强制下架" v-if="order.isdel != 0"/>
            <van-cell title="是否上架" value="内容" v-if="order.isdel == 0 && order.status == 1">
                <van-switch v-model="checked" @input="proStatus"/>
            </van-cell>
            
        </van-cell-group>
        <div @click="goTo('/EditProduct')" class="edit">
            编辑商品
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup } from 'vant';
import { Switch } from 'vant';
import { Dialog } from 'vant';
Vue.use(Cell).use(CellGroup);
Vue.use(Switch);
Vue.use(Dialog);
export default {
    data() {
        return {
            id:this.$route.query.id,
            order:{},
            checked:false,
            catId:'',
            catName:''
        };
    },
    created() {},
    mounted() {
        this.getOrder()
        this.getClassify()
    },
    methods: {
        goTo(path){
            this.$router.push({path:path,query:{id:this.order.id}})
        },
        getOrder(){
            this.$api.myCommodityDetail({goods_id:this.id},res=>{
                if(res){
                    this.order = res.data
                    this.catId = res.data.cat_id
                    if(this.order.marketable == 1) {
                        this.checked = true
                    } else {
                        this.checked = false
                    }
                }
                
            })
        },
        getStatus(status){
            let state = ''
            switch(status){
                case 0:
                    state = '审核中'
                    break
                case 1:
                    state = '已通过'
                    break
                case 2:
                    state = '已拒绝,请重新编辑商品'
                    break
            }
            return state
        },
        // 修改产品上下架
        proStatus(checked){
            let type
            let msg
            if(checked) {
                type = 1
                msg = '确定要上架吗'
            }else {
                type = 2
                msg = '确定要下架吗'
            }
            Dialog.confirm({
                title: '提示',
                message: msg
            }).then(() => {
                // this.checked = !this.checked
                this.$api.editProStatus({id:this.id,type},res=>{
                    if(res.status) {
                        this.getOrder()
                    }
                })
            }).catch(() => {
            // on cancel
                this.checked = !checked
            });
            
            
        },
        // 产品分类
        getClassify(){
            this.$api.productClassify({},res=>{
                res.data.forEach((item,index)=>{
                    if(item.id == this.catId){
                        this.catName = item.name
                    }
                })
            })
        },
    },
};
</script>

<style lang="less" scoped>
#myCommodityDetail {
    .van-cell {
        background-color: #000;
        color: #fff;
        border-bottom: 1px solid #1A202E;
        align-items: center;
    }
    .van-hairline--top-bottom::after{
        border-width: 0;
    }
    .van-cell:not(:last-child)::after {
        width: 0;
    }
    
    .van-cell__value {
        color: #fff;
        flex: 2;
    }
    .edit {
        padding: 12px 0;
        background-color: #ef4f4f;
        width: 20%;
        // display: float;
        float: right;
        text-align: center;
        margin-top: 20px;
        margin-right: 10px;
        border-radius: 5px;
    }
}
</style>
