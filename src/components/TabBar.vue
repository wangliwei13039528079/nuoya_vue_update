<template>
    <div class="tabbar" ref="tabbar" slot="tabbar">
        <router-link tag="div" class="tabbar-item" :id="item.active" v-for="(item, index) in tab" :to="item.link" :key="index">
            <!-- <i :class="item.type" v-if="item.link!='/Dapp'"></i> -->
            <img style="    width: 19px;
    height: 19px;margin:5px"  v-if="!item.active" :src='item.type'/>
            <img  style="    width: 19px;
    height: 19px;margin:5px" v-if="item.active" :src='item.types'/>


            <span>{{item.title}}</span>
        </router-link>
    </div>
</template>

<style type="text/css">
    .tabbar{
   
        /* border-top: 1px solid #eee; */
        z-index: 100;
        position: fixed;
        bottom: -.5rem;
    background: #36373f;
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;
        width: 90%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width: 750px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        /* padding:0 .4rem; */
    }
    .tabbar-item{
        display: inline-block;
        /* display: flex; */
        width: 25%;
        box-sizing: border-box;
        padding: .15rem 0 .05rem;
    }
    .tabbar-item>i{
        font-size: .5rem;
        color: #999;
    }
    .tabbar-item>span{
        display: block;
        color: #999;
        height: 16px;
        line-height: 16px;
        margin:0 0 5px 0
    }
    #true>i, #true>span{
        color: #fff;
    }
</style>

<script type="text/babel">
export default {
    data () {
        return {
         
            tab: [
                {title: this.$t('home'), link: '/msite', type: 'static/image/shou.png', types: 'static/image/shou1.png', active: false},
                 {title: this.$t('Intelligentminer'), link: '/breed', type: 'static/image/dappTab.png', types: 'static/image/dappTab1.png', active: false},
                {title: this.$t('wallet'), link: '/CashAssets', type: 'static/image/qianbao.png', types: 'static/image/qianbao1.png', active: true},
                //  {title: '精品', link: '/breed', type: 'static/image/dappTab.png',types: 'static/image/dappTab.png', active: false},
                // {title: '币币交易', link: '/treaty', type: 'iconfont iconbibijiaoyi1', active: false},
                // {title: 'OTC', link: '/OTCDeal/OTCBuy', type: 'iconfont iconotcjiaoyi-', active: false},
                //    {title: '商城', link: '/index', type: 'static/image/goods-cart.png',types: 'static/image/goods-cart.png', active: false},
                //  {title: '财务', link: '/Finance', type: 'static/image/caiwu.png', types: 'static/image/caiwu1.png', active: false},
                // {title: '矿机', link: '/Mill', type: 'iconfont iconkuangji', active: false},
                 {title: this.$t('mine'), link: '/financenew', type: 'static/image/wo.png', types: 'static/image/wo1.png', active: false}

            ]
        }
    },

    // 首次进入页面显示页面title及选中
    mounted () {
    
      
        if (this.$route.meta.title) {
            document.title = this.$route.meta.title
        }
        for (let k in this.tab) {
            if (this.tab[k].link === this.$route.path) {
                this.tab[k].active = true
            } else {
                this.tab[k].active = false
            }
        }
    },
    // 监听路由变化 修改选中
    watch: {
      
        '$route' () {
              this.tab= [
                {title: this.$t('home'), link: '/msite', type: 'static/image/shou.png', types: 'static/image/shou1.png', active: false},
                 {title: this.$t('Intelligentminer'), link: '/breed', type: 'static/image/dappTab.png', types: 'static/image/dappTab1.png', active: false},
                {title: this.$t('wallet'), link: '/CashAssets', type: 'static/image/qianbao.png', types: 'static/image/qianbao1.png', active: true},
                //  {title: '精品', link: '/breed', type: 'static/image/dappTab.png',types: 'static/image/dappTab.png', active: false},
                // {title: '币币交易', link: '/treaty', type: 'iconfont iconbibijiaoyi1', active: false},
                // {title: 'OTC', link: '/OTCDeal/OTCBuy', type: 'iconfont iconotcjiaoyi-', active: false},
                //    {title: '商城', link: '/index', type: 'static/image/goods-cart.png',types: 'static/image/goods-cart.png', active: false},
                //  {title: '财务', link: '/Finance', type: 'static/image/caiwu.png', types: 'static/image/caiwu1.png', active: false},
                // {title: '矿机', link: '/Mill', type: 'iconfont iconkuangji', active: false},
                 {title: this.$t('mine'), link: '/financenew', type: 'static/image/wo.png', types: 'static/image/wo1.png', active: false}

            ]
              
            for (let k in this.tab) {
                if (this.tab[k].link === this.$route.path) {
                    this.tab[k].active = true
                } else {
                    this.tab[k].active = false
                }
            }
        }
    }
}
</script>
