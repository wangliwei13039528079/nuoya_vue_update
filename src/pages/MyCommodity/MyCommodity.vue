<template>
    <div id="myCommodity">
        <van-tabs v-model="active" background="#000" title-active-color="#fff" title-inactive-color="#ccc" @click="tabClick">
           
            <van-tab title="全部">
                <div class="order-content" v-for="(item,index) in allGoods" :key="index" @click="goTo(item.id)">
                    <div class="imgBox">
                        <img :src="item.image_id" alt="">
                    </div>
                    <div class="info">
                        <p>商品名称：{{item.name}}</p>
                        <p>单价：￥{{item.price}}</p>
                        <p>库存：{{item.stock}}</p>
                        <p>上架时间：{{item.ctime}}</p>
                    </div>
                </div>
                <div class="status">
                    <p v-if="goods.length < 10">没有更多数据了</p>
                    <p v-else @click="getGoods">点击加载更多</p>
                </div>
            </van-tab>
            <van-tab title="审核中">
                <div class="order-content" v-for="(item,index) in allGoods" :key="index" @click="goTo(item.id)">
                    <div class="imgBox">
                        <img :src="item.image_id" alt="">
                    </div>
                    <div class="info">
                        <p>商品名称：{{item.name}}</p>
                        <p>单价：￥{{item.price}}</p>
                        <p>库存：{{item.stock}}</p>
                        <p>上架时间：{{item.ctime}}</p>
                    </div>
                </div>
                 <div class="status">
                    <p v-if="goods.length < 10">没有更多数据了</p>
                    <p v-else @click="getGoods">点击加载更多</p>
                </div>
            </van-tab>
            <van-tab title="已通过">
                <div class="order-content" v-for="(item,index) in allGoods" :key="index" @click="goTo(item.id)">
                    <div class="imgBox">
                        <img :src="item.image_id" alt="">
                    </div>
                    <div class="info">
                        <p>商品名称：{{item.name}}</p>
                        <p>单价：￥{{item.price}}</p>
                        <p>库存：{{item.stock}}</p>
                        <p>上架时间：{{item.ctime}}</p>
                    </div>
                </div>
                 <div class="status">
                    <p v-if="goods.length < 10">没有更多数据了</p>
                    <p v-else @click="getGoods">点击加载更多</p>
                </div>
            </van-tab>
             <van-tab title="已拒绝">
                <div class="order-content" v-for="(item,index) in allGoods" :key="index" @click="goTo(item.id)">
                    <div class="imgBox">
                        <img :src="item.image_id" alt="">
                    </div>
                    <div class="info">
                        <p>商品名称：{{item.name}}</p>
                        <p>单价：￥{{item.price}}</p>
                        <p>库存：{{item.stock}}</p>
                        <p>上架时间：{{item.ctime}}</p>
                    </div>
                </div>
                 <div class="status">
                    <p v-if="goods.length < 10">没有更多数据了</p>
                    <p v-else @click="getGoods">点击加载更多</p>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Vue from 'vue'
import {host} from '../../common/serviceUrl'
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
export default {
    data() {
        return {
            active:0,
            goods:[],
            type:'',
            page:0,
            allGoods:[]
        };
    },
    created() {},
    mounted() {
        this.getGoods(0)
    },
    methods: {
        tabClick(index){
            if(index == 0) {
                this.type = '' 
            }else {
                this.type = index
            }
            this.page = 0
            this.allGoods = []
            this.getGoods()
        },
        getGoods(){
            this.page++
            this.$api.myCommodity({type:this.type,page:this.page,limit:10},res=>{
                this.goods = res.data
                this.allGoods = this.allGoods.concat(this.goods)
            })
        },
        goTo(id){
            this.$router.push({path:'/MyCommodityDetail',query:{id}})
        }
    },
};
</script>

<style lang="less" scoped>
#myCommodity {
    padding: 0 10px;
    .order-content {
        margin-bottom: 0;
        padding: 10px 0;
        border-radius: 5px;
        display: flex;
        align-items: center;
        background-color: #161616;
        margin-bottom: 10px;
        .imgBox {
            width: 100px;
            height: 100px;
            margin-right: 10px;
            padding-left: 10px;
            img {
                width: 100%;
                height: 100%;
                
            }

        }
        .info {
            font-size: .25rem;
            p {
                line-height: 20px;
            }
        }

    }
    
   
    /deep/.van-hairline--top-bottom::after {
        border-width:0;
    }
    .status {
        padding: 10px 0;
        text-align: center;
        color: #ccc;
    }
    
    
}

</style>
