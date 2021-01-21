<template>
  <div class="gride">
     
       <div class="swiper-container">
            <div class="swiper-wrapper">
                <img src="../../../static/image/logo.png" alt="" class="swiper-slide">
                <img src="../../../static/image/level1.png" alt="" class="swiper-slide">
                <img src="../../../static/image/logo.png" alt="" class="swiper-slide">
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="btn" @click="start">
            立即体验
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import { Swipe, SwipeItem } from 'vant';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
// Vue.use(Swipe).use(SwipeItem);
export default {
  data() {
    return {

    };
  },
    created() {},
    mounted() {
        this.get()
        this.$nextTick(()=>{
            this.init()
        })
    },
    methods: {
        get(){
            localStorage.setItem('gride','1')
        },
        action(){
            this.$router.push({path:'/msiteb'})
        },
        init(){
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: true, //可选选项，自动滑动
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            })
            mySwiper.on('SlideChangeEnd',()=>{
                console.log(swiper.realIndex)
            })
        },
        start(){
            this.$router.replace({path:'/msiteb'})
        },
        
        
    },
};
</script>

<style lang="less" scoped>
    .gride {
        width: 100%;
        height: 100%;
        .swiper-container {
            width: 100%;
            height: 90%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        /deep/.swiper-pagination-bullet {
            background-color: #fff;
        }
        /deep/.swiper-pagination-bullet-active {
            background-color: #007aff;
        }
        .btn {
            padding: 4% 0;
            text-align: center;
            width: 50%;
            background-color: #161616;
            border-radius: 50px;
            color: #fff;
            font-size: 16px;
            margin: auto;
        }
    }
    
</style>
