<template>
    <div class="merchantManage">

        <yd-cell-group>
            <!-- <yd-cell-item type="link" href="/msiteb">
                <img slot="icon" src="../../static/image/signin.png">
                <span slot="left">回到矿机</span>
            </yd-cell-item> -->
            <!-- <yd-cell-item v-if="isOpenIntegral" type="div" @click.native="signIn">
                <img slot="icon" src="../../static/image/signin.png">
                <span slot="left">积分签到</span>
            </yd-cell-item> -->
            <!-- <yd-cell-item href="/coupon" type="link">
                <img slot="icon" src="../../static/image/coupon.png">
                <span slot="left">我的优惠券</span>
            </yd-cell-item> -->
            <yd-cell-item href="/UploadProduct" type="link">
                <img slot="icon" src="../../../static/image/member-cart.png">
                <span slot="left">上架商品</span>
            </yd-cell-item>
            <yd-cell-item href="/MyCommodity" type="link">
                <img slot="icon" src="../../../static/image/remainingsum.png">
                <span slot="left">我的商品</span>
            </yd-cell-item>
            <yd-cell-item href="/MyCommodityOrder" type="link">
                <img slot="icon" src="../../../static/image/remainingsum.png">
                <span slot="left">订单管理</span>
            </yd-cell-item>
        </yd-cell-group>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: [],
            orderNum: [],
            isOpenIntegral: false, // 用户是否开启积分
            isClerk: false, // 是否是店员并且开启店铺自提
            retailNum:[]
        }
    },
    mounted () {
    },
    methods: {
        
    }
}
</script>

<style>
    .merchantManage {
        padding-bottom: 53px;
    }
    .merchantManage .yd-btn-block{
        height: .8rem;
    }
	.merchantManage .yd-cell-item:not(:last-child):after{
		border-bottom: 1px solid #e9e9e9;
	}
    .merchantManage .yd-cell {
        background-color: #000;
        
    }
    .merchantManage .yd-cell-item {
        background-color: #000 !important;
        border-bottom: 1px solid #423F52;
    }
    .merchantManage .yd-grids-txt {
        color: #fff;
    }
    .yd-cell-left {
        color: #fff !important;
    }
    .yd-grids-3 {
        background-color: #000 !important;
        border-bottom: 1px solid #423F52;
    }
    .yd-cell-item:not(:last-child):after {
        width: 0 !important;
		border-bottom: 1px solid #e9e9e9 ;
    }
    .yd-cell:after {
        width: 0 !important;
		border-bottom: 1px solid #e9e9e9;
    }
</style>
