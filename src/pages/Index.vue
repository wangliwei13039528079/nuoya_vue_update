<template>
	<div class="index">
        <search></search>   <!-- 搜索框 -->
        <indexslider></indexslider> <!-- 轮播图 -->
        <rollnotice></rollnotice>   <!-- 公告 -->
        <indexcoupon :couponList="couponList"></indexcoupon>   <!-- 优惠券 -->
        <indexgrids></indexgrids>   <!-- 菜单menu -->
        <seckill></seckill>
        <groupbuying></groupbuying>
        <indexlistrec></indexlistrec>   <!-- 推荐商品列表 -->
        <indexlisthot></indexlisthot>   <!-- 热卖商品列表 -->
        <yd-backtop></yd-backtop>
	</div>
</template>

<script>
import search from '../components/Search.vue'
import indexslider from '../components/IndexSlider.vue'
import rollnotice from '../components/RollNotice.vue'
import indexcoupon from '../components/IndexCoupon.vue'
import indexgrids from '../components/IndexGrids.vue'
import indexlisthot from '../components/IndexListHot.vue'
import indexlistrec from '../components/IndexListRec.vue'
import groupbuying from '../components/GroupBuying'
import seckill from '../components/Seckill'

export default {
    data () {
        return {
            couponList: [],
            scrollTop:''
        }
    },
    components: {
        search, indexslider, rollnotice, indexcoupon, indexgrids, indexlisthot, indexlistrec, groupbuying, seckill
    },
    // 实例创建并挂载后调用此方法
    mounted () {
        this.getCouponList();
        let a = document.getElementById('index')
        a.addEventListener('scroll',this.handScroll)
    },
    methods: {
        // 获取商户优惠券信息
        getCouponList () {
            this.$api.couponList({}, res => {
                if (res.status) {
                    this.couponList = res.data
                }
            })
        },
        handScroll(){
            this.scrollTop = document.getElementById('index').scrollTop
        }
    },
    deactivated (){
        sessionStorage.setItem('scrollTop',this.scrollTop)
    },
    activated () {
        document.getElementById('index').scrollTop =sessionStorage.getItem('scrollTop')
    },
    
}
</script>

<style>
    #index {
        padding-bottom: 50px;
        height: 100%;
        overflow: scroll;
    }
    #index .yd-grids-4 {
        background-color: #000 !important;
    }
    #index .roolnotice {
        background-color: #000;
    }
    #index .yd-rollnotice {
        background-color: #000 !important;
    }
</style>
