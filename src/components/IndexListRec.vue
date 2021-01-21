<template>
    <transition name="fade">
    <div class="indexlistrec" v-if="recGoods.length">
        <div class="indexlistheader">
            <img src="../../static/image/seller.png"/>
            <h3>店铺推荐</h3>
        </div>
        <yd-list theme="2" slot="list">
            <yd-list-item v-for="(item, key) in recGoods" :key="key" type="link" v-if="Number(item.price) > 0" :href="{path:'goodsdetail',query:{goods_id:item.id}}">
                <img class="goods-imgs" slot="img" v-lazy="item.image_url">
                <!--<img slot="img" src="../../static/image/loading.gif" class="loading-img"/>-->
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
    </transition>
</template>

<script>
export default {
    data () {
        return {
            recGoods: []
        }
    },
    created () {
        let where = {recommend: 1}
        let limit = 30
        this.$api.goodsList({where: JSON.stringify(where),limit}, res => {
            this.recGoods = res.data.list
        })
    }
}
</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .indexlistrec .yd-list-title {
        color: #fff;
    }
    .indexlistrec .yd-list-mes {
        background-color: #000 !important;
    }
    .indexlistrec .indexlistheader {
        padding: .2rem;
    }
    .indexlistrec .yd-list-item {
        position: relative;
    }
    .indexlistrec .tip {
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
