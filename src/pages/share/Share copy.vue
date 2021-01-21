<template>
    <div class="share-index">
        <div class="code" @touchstart="gtouchstart">
        <!-- <qriously :value="QCode" :size="size" /> -->
            <img :src="img" alt="" v-clipboard:copy="QCode" v-clipboard:success="onCopy" id="codeImg" @touchstart="gtouchstart" @touchmove="gtouchmove" @touchend="gtouchend">
        </div>
        <!-- <div class="copy">
            <p v-clipboard:copy="QCode" v-clipboard:success="onCopy">点击复制</p>
        </div> -->
        
        <!-- <p href="">{{ QCode }}</p> -->
    </div>
</template>

<script>
    import VueClipboard from 'vue-clipboard2'
　　import Vue from 'vue'
　　Vue.use(VueClipboard)
    import {host} from '../../common/serviceUrl'
     mui.init({
        gestureConfig: {
            longtap: true
        }
    });

export default {
    
    data () {
        return {
            QCode: '', // 二维码value
            size: 240, // 二维码大小
            img:'',
            timer:null
        }
    },
    mounted () {
        this.getShareCode()
    },
    methods: {
        // 获取邀请码
        getShareCode () {
            this.$api.shareCode({}, res => {
                if(res.status) {
                    this.QCode = res.url
                    this.img = host + '/' + res.data
                }
            })
        },
        // 拼接推荐url 路由
        // QCodeUrl (code) {
        //     let protocol = window.location.protocol
        //     let host = window.location.host
        //     this.QCode = protocol + '//' + host + '/#/register?pid=' + code
        // },
        // QCodeUrl (code) {
        //     this.QCode = this.GLOBAL.locationHost() + '/#register?invitecode=' + code
        // }
        onCopy(){
            this.$dialog.toast({mes:'复制成功',timeout:1000})
        },
        gtouchstart () {
        // 开始触摸
            this.timer = setTimeout(() => {
                // 长按实现的功能
                 console.log('长按了')
                plus.nativeUI.confirm('是否保存图片',(e)=>{
                    if(e.index == 0) {
                        plus.gallery.save(this.img, function () {
                            plus.nativeUI.alert("保存图片到相册成功");
                        },function(){
                            plus.nativeUI.alert("保存失败");
                        }); 
                    }else {
                        console.log('点击了取消按钮')
                    }
                })
            }, 1000)
        },
        gtouchmove () {
        // 看具体需求
            console.log('移动了')
            clearTimeout(this.timer)
            this.timer = null
        },
        gtouchend () {
            clearTimeout(this.timer)
            this.timer = null
        }
        
        
    
    }
}
</script>

<style scoped>
    .share-index{
        background: #fff;
        height: 100%;
        /* padding-top: 1rem; */
    }
    .share-index img{
        width: 100%;
        height: 100%;
        /* margin-bottom: .3rem; */
    }
    .share-index p{
        margin-bottom: .5rem;
        font-size: .4rem;
    }
    .share-index a{
        display: block;
        font-size: .3rem;
    }
    .code {
        text-align: center;
        width: 100%;
        height: 100%;
    }
    .share-index p {
        color: #000;
        text-align: center;
        word-break: break-all; 
        word-wrap: break-word;
        padding: 0 10px;
    }
    .share-index .copy {
        text-align: center;
        /* margin: 10px auto; */
    }
    .share-index .copy p{
        display: inline-block;
        padding: 10px 15px;
        background-color: #000;
        color: #fff;
        margin: 0;
        font-size: 16px;
    }
</style>
