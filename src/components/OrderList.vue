<template>
    <div class="orderlist">
        <yd-list theme="4">
            <yd-list-item v-for="(item, index) in products" :key="index" @click.native="showDetail(item.products.goods_id)">
                <img slot="img" :src="item.products.image_path">
                <h3 class="goodsname" slot="title">{{ item.products.name }}</h3>
                <p class="goods" slot="title">{{ item.products.spes_desc }}</p>
                <yd-list-other slot="other">
                    <div>
                        <span class="demo-list-price"><em></em>{{ item.products.price }} USDT</span>
                    </div>
                    <div>x{{ item.nums }}</div>
                </yd-list-other>
                <yd-list-other slot="other">
                    <div class="order-tips" v-if="item.products.promotion_list">
                        <div v-for="(val, key) in item.products.promotion_list" :key="key">
                            <yd-badge shape="square" :type="val.type === 2 ? 'danger' : ''">{{ val.name }}</yd-badge>
                        </div>
                    </div>
                </yd-list-other>
            </yd-list-item>
        </yd-list>
    </div>
</template>

<script>
export default {
    props: {
        products: {
            type: [Array, Object],
            default () {
                return []
            }
        }
    },
    methods: {
        showDetail (goodsId) {
            this.$router.push({path: '/goodsdetail', query: {goods_id: goodsId}})
        }
    }
}
</script>

<style>
   .order-tips{
       overflow: hidden;
       width: 100%;
   }
   .order-tips>div{
       float: left;
       margin-right: .1rem;
   }
   .orderlist,
   .yd-list-theme4,
   .orderlist .yd-list-item {
       background-color: #000 !important;
   }
   .orderlist .yd-list-mes {
       background-color: #000;
   }
   .orderlist .yd-list-title {
       color: #fff;
   }
</style>
