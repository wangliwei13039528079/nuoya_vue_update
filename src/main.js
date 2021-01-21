// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router/routers'
import VueRouter from 'vue-router'
import i18n from './i18n'
import * as Api from './common/api'
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
// import 'vue-ydui/dist/ydui.base.css'
import Common from './common/common'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css'
import Mui from 'vue-awesome-mui'
import VueQriously from 'vue-qriously'
import VueLazyload from 'vue-lazyload'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'font-awesome/css/font-awesome.min.css'
import initRichText from './common/initHTMLEditor.js'
import echarts from 'echarts' //引入echarts
import VueResource from 'vue-resource'

// SDK脚本的引入
import webim from '../static/sdk/webim'
import json2 from '../static/sdk/json2'
import VUECharts from 'vue-echarts'
import md5 from 'js-md5';
import 'swiper/dist/css/swiper.css';
let Base64 = require('js-base64').Base64;
Vue.use(webim,json2,md5);
Vue.use(VueResource)
Vue.component('v-chart', VUECharts)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
initRichText()

Vue.prototype.$echarts = echarts //引入组件


Vue.use(Vant);
Vue.use(VueQriously)
Vue.use(Mui)
Vue.use(Share)
Vue.use(VueRouter)
Vue.use(YDUI)
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: './static/image/loading.gif',
    attempt: 1
})

Vue.config.productionTip = false
Vue.prototype.$api = Api
Vue.prototype.GLOBAL = Common

const router = new VueRouter({
    mode: 'hash',
    routes: routers,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { x: 0, y: 0 }
    }
})

const that = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    i18n,
    template: '<App/>'
})

router.beforeEach((route, redirect, next) => {
    document.title = route.meta.title ? route.meta.title : ''
    //百度统计
    if (typeof _hmt != "undefined" ) {
        if (route.path) {
            _hmt.push(['_trackPageview', '/#' + route.fullPath]);
        }
    }
    // 如果将要跳转的页面需要登录 用户没有登录将跳转登录页面
    if (route.meta.isLogin) {
        if (!Common.getStorage('user_token')) {
            Common.jumpToLogin()
        }
    }
    // 如果未匹配到路由 跳转至首页 (防止用户手动输入地址出错)
    if (route.matched.length === 0) {
        redirect.name ? next({ name: redirect.name }) : next('/')
    } else {
        next()
    }
})

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
      router.replace(targetPath);
    }
});

export default that
