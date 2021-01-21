<template>
    <div class="userheader">
        <!--<div class="topcolor"></div>-->
        <div class="userimg">
            <div class="headerimg">
                <input name="file" type="file" accept="image/png,image/gif,image/jpeg,image/jpg" @change="upload($event)"/>
                <img :src="avatar" v-if="avatar"/>
                <p>{{ name }}</p>
                <!-- <span v-if="isOpenIntegral">积分: {{ point }}</span> -->
                <p>{{level1|levelo}}<span>{{level2|levelt}}</span></p>
                <!-- <p>{{level1}}{{level2}}</p> -->
            </div>
            <!-- <div class="user-setting">
                <i class="iconfont icon-shezhi" @click="setting"></i>
            </div> -->
        </div>
    </div>
</template>

<script>
import Vue from "vue"
 Vue.filter("levelo", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
//  console.log(value)
 if(value==0){
     return "粉丝";
 }else if(value==1){
     return "体验会员";
 }else if(value==2){
     return "消费商（VIP）";
 }else if(value==3){
     return "销售代表";
 }else if(value==4){
     return "销售经理";
 }else if(value==5){
     return "总监";
 }else if(value==6){
     return "副总";
 }
                
});
 Vue.filter("levelt", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
 if(value==0){
     return "";
 }else if(value==1){
     return "/经理";
 }else if(value==2){
     return "/小区经理";
 }else if(value==3){
     return "/大区经理";
 }
                
});
export default {
    props: {
        avatar: {
            type: String,
            default () {
                return ''
            }
        },
        name: {
            type: String,
            default () {
                return ''
            }
        },
        point: {
            type: [String, Number],
            default () {
                return ''
            }
        },
        level1:{
            type: [String, Number],
            default () {
                return ''
            }
        },
        level2:{
            type: [String, Number],
            default () {
                return ''
            }
        },
        balance: {
            type: String,
            default () {
                return ''
            }
        },
        isOpenIntegral: {
            type: Boolean,
            default () {
                return false
            }
        }
    },
    methods: {
        setting () {
            this.$router.push({path: '/setting'})
        },
        // 头像上传
        upload (e) {
            this.$emit('upload', e)
        }
    }
}
</script>

<style>
    .headerimg input {
        position: absolute;
        top: 40%;
        transform: translateY(-50%);
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        opacity: 0;
        z-index: 5;
    }
    .headerimg {
        text-align: center;
    }
</style>
