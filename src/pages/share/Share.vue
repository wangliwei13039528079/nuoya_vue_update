<template>
    <div class="share-index">
        <HeaderTop title="推荐好友" style="background-color: #474953;">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div class="code">
            <div class="cis_ct1">
               <div class="ercode" ref="qrCodeUrl"></div>
                <div class="info">
                    <small> 手机浏览器或微信扫一扫推荐注册 </small>
                </div>
                <div class="xiant">
                <div class="fl">
                    <!-- <p class="tuima"> A区邀请 -->
                           <p class="tuima"> 邀请
                
                    </p>
                </div>
                <div class="fr">
                    <yd-button v-clipboard:copy="url" v-clipboard:success="onCopy" class="copyButton" size="small" type="hollow">复制</yd-button>
                </div>
                 <div class="clear"></div>
                 <div class="kuang">
                   {{ userId }}
                 </div>
                
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
import QRCode from 'qrcodejs2'
Vue.use(VueClipboard)

export default {
    data () {
        return {
            QCode: '', // 二维码value
            size: 240, // 二维码大小
            img: '',
            timer: null,
            userId: '',
            url: ''
        }
    },
    components: {
        HeaderTop
    },
    mounted () {
        this.getShareCode()
    },
    methods: {
        // 获取邀请码
        getShareCode () {
            this.$api.userInfo({}, res => {
                if (res.status) {
                    this.userId = res.data.id
                     const url = process.env.WEB_URL + 'register/'+ res.data.id +'?abl=1' 
                    this.url = url
                    new QRCode(this.$refs.qrCodeUrl, {
                        text: url, // 需要转换为二维码的内容
                        width: 200,
                        height: 200,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.H
                    })
                } else { // 没有登录， 跳转到等页面
                    this.$router.push('/login')
                }
            })
        },
        onCopy () {
            this.$dialog.toast({mes: '复制成功', timeout: 1000})
        },
        gtouchmove () {
        // 看具体需求
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
<style scoped lang="less">
    .back {
        padding: 0 10px;
        i {
            font-size: 15px;
            color: #fff;
            line-height: 50px;
        }
    }
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
        background-color: #474953;
        padding-top: 2em;
        .cis_ct1 {
            border-radius: 1em;
            width: 90vw;
            // height: 70vh;
            
      box-shadow: 0 4px 8px rgba(0, 0, 0, .22), 0 0 12px rgba(0, 0, 0, .14);
        background: rgb(53,54,61);
            margin: 0;
            display: inline-block;
            .tuijian{
                margin-top: 1em;
                p{
                    display: inline-block;
                    margin: 0.5em;
                    color: #728bd9;
                    font-size: 16px;
                }
            }
             .tuima{
        color: #fff;
        margin:.48rem 0 0 0;
        font-size: 18px;
    }
    .kuang{
       border:1px solid rgb(138, 119, 89);
       color:rgb(168,168,168);
       width: 100%;
         padding: .2rem ;
       word-wrap: break-word; word-break: normal;
       margin: .4rem auto .4rem;
        border-radius: 4px;
    }
            .copyButton{
                border:1px solid rgb(231, 183, 61);
                color: rgb(231, 183, 61);
                padding: 0 .4rem;
                margin:.4rem 0 0 0;
                border-radius: 4px;
                font-size: 14px;
                background:rgb(53,54,61);
            }
            .header {
                border-radius: 1em;
                text-align: left;
               
                font-size: 16px;
                padding: 1em;
                height: 50px;
                background-color: rgb(53,54,61);
            }
            .info{
                margin-bottom: 1em;
                color:rgb(168,168,168);
                font-size:16px;
            }
            .ercode {
                background:rgb(49, 50, 57);
                padding: .3rem;
                width:230px;
                border-radius: 1em;
                margin: 2em  auto 1.5em;
                text-align: center;
                display: inline-block;
                height: auto;
            }
        }
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
    .xiant{
        border-top:1px solid rgb(43,44,52);
        border-bottom:1px solid rgb(43,44,52);
        margin: .5rem;
       
    }
   
</style>
