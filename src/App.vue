<template>
    <yd-layout id="app">
        <navbar slot="navbar" :title="$route.meta.title" v-show="$route.meta.navShow"></navbar>
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive && isRouterAlive" class="top"></router-view>
            </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
            <router-view v-if="!isRouterAlive && !$route.meta.keepAlive" class="top"></router-view>
        </transition>
        <transition name="router-fade" mode="out-in">
            <router-view v-if="isRouterAlive && !$route.meta.keepAlive" class="top"></router-view>
        </transition>
        <tabbar slot="tabbar" v-show="$route.meta.tabShow"></tabbar>
        <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </yd-layout>
</template>

<script>
import navbar from './components/NavBar.vue'
import tabbar from './components/TabBar.vue'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {mapGetters} from 'vuex'

export default {
    data () {
        return {
            isRouterAlive: true
        }
    },
    mounted(){
        // this.gride()
    },
    components: {
        navbar, tabbar,FooterGuide
    },
    computed: {
        ...mapGetters([
            'shopName',
            'shopDesc',
            'shopLogo',
			'statistics'
        ])
    },
    beforeMount () {
        this.getShopSetting();
    },
    provide () {
        return {
            reload: this.reload
        }
    },
    methods: {
        // 获取店铺配置 存入vuex
        getShopSetting () {
            this.$api.shopConfig().then(res => {
                this.$store.dispatch('shopConfig', res)
                if (this.$route.path === '/index') {
                    document.title = this.shopName
                }
                //百度统计
                if(res.statistics){
                    var script=document.createElement("script");
                    script.innerHTML = res.statistics;
                    document.getElementsByTagName("body")[0].appendChild(script);
                }
            });
        },
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
        gride(){
            let a = localStorage.getItem('gride')
            if(!a){
                this.$router.push({path:'/gride'})
            }
        }
    },
    watch: {
        '$route': {
            handler () {
                document.title = this.$route.path === '/index' ? this.shopName : this.$route.meta.title
            }
        }
    }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #fff;
  /* background-color: #3a3c45; */
  background-color:#474953;
}
#scrollView{
    margin-top: 0;
}
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}
#app .yd-navbar-center-title {
    color: #fff !important;
    font-size: 17px !important;
    font-weight: 500;
}
#app .yd-navbar-item i {
    color: #fff;
}
.van-radio__icon--checked .van-icon {
    color: #fff;
    background-color: rgb(238, 198, 127);
    border-color: rgb(238, 198, 127);
}
[class*=van-hairline]::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 2px solid #33333c;
    -webkit-transform: scale(.5);
    transform: scale(.5);
}
.yd-confirm-ft:after{

}
.van-button--default {
    color: #fff;
    background-color: rgb(64,65,74)!important;
    border: 1px solid #fff;
}
.van-dialog__cancel{
  color:rgb(159,167,179) ;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.clear{
    clear: both;
}
.yd-confirm{
        background-color: rgb(64,65,74);
}
.yd-confirm-bd{
    color: #fff;
}
.yd-confirm-ft>a.primary {
     color: #fff;
}
.yd-confirm-ft>a.default {
     color:rgb(159,167,179) ;
}
.icon-youjiantou{
    color: rgb(238, 198, 127);
}
 .van-cell-group{
     background: rgb(61, 62, 70);
     width:90%;
     margin: .2rem auto;
     padding:.2em 0 .1rem 0;
    -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;
}
  input::-webkit-input-placeholder {
            color: #fff;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #fff;
        }
        .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    box-sizing: border-box;
    width: 6.2em;
    margin-right: 12px;
    color: #fff;
    text-align: left;
    word-wrap: break-word;
}
</style>
