<template>
    <div id="merchantUnion">
        <div class="searchpage-header">
            <van-field
            readonly
            clickable
            label="分类"
            :value="value"
            placeholder="请选择分类"
            @click="showPicker = true"
            />

            <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
            </van-popup>
        </div>
        <yd-list theme="2" slot="list" style="padding-top:40px">
            <yd-list-item v-for="(item, key) in allGoods" :key="key" type="link" :href="{path:'MerchantGoodsDetail',query:{goods_id:item.id}}">
                <template v-if="item.price != 0">
                <img class="goods-imgs" slot="img" v-lazy="item.image_id">
                <span slot="title">{{item.name}}</span>
                <yd-list-other slot="other">
                    <div>
                        <span class='demo-list-price'><em></em>{{item.price}}</span>
                        <div class="tip" v-if="item.stock == 0">
                            已售罄
                        </div>
                        <!-- <span class='demo-list-del-price'>¥{{item.w_price}}</span> -->
                    </div>
                    <div><button class="indexlist-cart"><img src="../../../static/image/cart.png"/></button></div>
                </yd-list-other>
                </template>
            </yd-list-item>
            
        </yd-list>
        <div class="status" ref="status">
            <p v-if="goods.length < 10">没有更多数据了</p>
            <p v-else @click="getGoods">点击加载更多</p>
        </div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
        goods:[],
        page:0,
        allGoods:[],
        search:'',
        value: '',
        showPicker: false,
        columns: ['全部'],
        classify:[],
        index:''
    };
  },
  created() {},
  mounted() {
      this.getGoods()
      this.getClassify()
  },
  methods: {
        getGoods(){
            this.page++
            this.$api.selfSupportGoods({page:this.page,limit:10},res=>{
                if(res.status) {
                    this.goods = res.data
                    this.allGoods = this.allGoods.concat(this.goods)
                    // if(this.allGoods.length < 1) {
                    //     this.$refs.status.style.paddingTop = 40+'px'
                    // }
                }
            })
        },
        seachGoods(){
            this.page++
            let cat_id = this.classify[this.index].id
            this.$api.selfSupportGoods({page:this.page,limit:10,cat_id},res=>{
                if(res.status) {
                    this.goods = res.data
                    this.allGoods = this.allGoods.concat(this.goods)
                }
            })
        },
        onConfirm(value,index) {
            this.value = value;
            this.showPicker = false;
            this.index = index-1
            this.page = 0
            this.goods = []
            this.allGoods = []
            if(this.index == -1) {
                this.getGoods()
            }else {
                this.seachGoods()
            }
            
        },
        getClassify(){
            this.$api.productClassify({},res=>{
                this.classify = res.data
                this.classify.forEach((item,index)=>{
                    this.columns.push(item.name)
                
                })
            })
        },
  },
};
</script>

<style lang="less" scoped>
#merchantUnion {
    .tips {
        padding: 0 10px;
    }
    .yd-list-title {
        color: #fff;
    }
    .yd-list-mes {
        background-color: #000 !important;
    }
    .yd-list-item {
        position: relative;
    }
    .tip {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 30px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        line-height: 100%;
        text-align: center;
        padding-top: 80px;

    }
    .timedown {
        padding: 0 20px 10px;
        font-size: 0.35rem;
    }
    .timedown span {
        color: red;
    }
    .status {
        text-align: center;
        color: #ccc;
        p {
            text-align: center;
            padding: 10px 0;
        }
    }
    .yd-list-img img,
    /deep/.yd-list-mes {
        background-color: #000;
    }
    /deep/.yd-list-title {
        color: #fff;
    }
    
    .searchpage-header {
        width: 100%;
        height: 35px;
        position: fixed;
        top: 50px;
        left: 0;
        z-index: 100;
    }
    .van-cell {
        background-color: #000;
    }
    /deep/.van-field__label {
        color: #fff;
    }
    .van-cell:not(:last-child)::after {
        width: 0;
    }
    /deep/.van-field__control {
        color: #fff;
    }
}
</style>
