<template>
    <div class="indexlisthot" v-if="hotGoods.length">
        <div class="indexlistheader">
            <img src="../../static/image/hot.png"/>
            <h3>店铺热卖</h3>
        </div>
        <yd-list theme="2" slot="list">
            <yd-list-item v-for="(item, key) in hotGoods" :key="key" type="link" v-if="Number(item.price) > 0" :href="{path:'goodsdetail',query:{goods_id:item.id}}">
                <img class="goods-imgs" slot="img" v-lazy="item.image_url" style="width:30%">
                <span slot="title">{{item.name}}</span>
                <yd-list-other slot="other">
                    <div>
                        <span class='demo-list-price'><em></em>{{item.price}}</span>
                        <!--<span class='demo-list-del-price'>¥{{item.w_price}}</span>-->
                         <div class="tip" v-if="item.product.stock == 0">
                            已售罄
                        </div>
                    </div>
                    <div><button class="indexlist-cart"><img src="../../static/image/cart.png"/></button></div>
                </yd-list-other>
            </yd-list-item>
        </yd-list>
    </div>
</template>

<script type="text/babel">
export default {
    data () {
        return {
            hotGoods: []
        }
    },
    created () {
        let where = {hot: 1}
        let limit = 30
        this.$api.goodsList({where: JSON.stringify(where),limit}, res => {
            this.hotGoods = res.data.list
        })
    }
}
</script>
<style lang="less">
    .indexlisthot .yd-list-title {
        color: #fff;
    }
    .indexlisthot .yd-list-mes {
        background-color: #000 !important;
    }
    .indexlisthot .indexlistheader {
        padding: .2rem
    }
     .indexlisthot .yd-list-item {
        position: relative;
    }
    .indexlisthot .tip {
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
</style>


