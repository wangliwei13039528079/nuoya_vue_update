<template>
    <div class="indexgrids">
        <yd-grids-group rows="4">
            <yd-grids-item link="/classify" >
                <img slot="icon" src="../../static/image/index1.png">
                <span slot="text">全部分类</span>
            </yd-grids-item>
            <yd-grids-item link="/goodslist?hot=1" >
                <img slot="icon" src="../../static/image/index2.png">
                <span slot="text">热卖商品</span>
            </yd-grids-item>
            <yd-grids-item link="/allorder" >
                <img slot="icon" src="../../static/image/index3.png">
                <span slot="text">我的订单</span>
            </yd-grids-item>
            <yd-grids-item link="/collect" >
                <img slot="icon" src="../../static/image/index4.png">
                <span slot="text">我的收藏</span>
            </yd-grids-item>
            <yd-grids-item link="/cart" >
                <img slot="icon" src="../../static/image/index5.png">
                <span slot="text">购物车</span>
            </yd-grids-item>
            <yd-grids-item link="/user" >
                <img slot="icon" src="../../static/image/index6.png">
                <span slot="text">个人中心</span>
            </yd-grids-item>
            <yd-grids-item link="/MerchantUnion" >
                <img slot="icon" src="../../static/image/index7.png">
                <span slot="text">商家联盟区</span>
            </yd-grids-item>
        </yd-grids-group>
    </div>
</template>

<script type="text/babel">
export default {
}
</script>
<style type="text/css">
.indexgrids .yd-grids-4 {
    background-color: #000;
}
</style>
