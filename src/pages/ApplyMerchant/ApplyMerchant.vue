<template>
    <div id="ApplyMerchant">
         <div class="con">
            <label for="">姓名</label>
            <input type="text" placeholder="请输入身份证名" v-model="userName">
        </div>
         <div class="con">
            <label for="">身份证号</label>
            <input type="text" placeholder="请输入身份证号" v-model="userCode">
        </div>
        <div class="con">
            <label for="">联系方式</label>
            <input type="text" placeholder="请输入联系方式" v-model="mobile">
        </div>
        <div class="con">
            <label for="">店铺名称</label>
            <input type="text" placeholder="请输入店铺名称" v-model="merchantName">
        </div>
        <div class="con">
            <label for="">营业执照号</label>
            <input type="text" placeholder="请输入营业执照号" v-model="businessCode">
        </div>
        <div class="upImg">
            <p>店铺logo</p>
            <p v-if="!logoImg">未上传</p>
            <input type="file" @change="uploadLogo" id="logo" v-show="false">
            <div class="imgBox" v-if="logoImg">
                <img :src="logoImg" alt="">
            </div>
            <label for="logo" >去上传</label>
            
        </div>
        <div class="upImg">
            <p>营业执照</p>
            <p v-if="!codeImg">未上传</p>
            
            
            <input type="file" placeholder="请上传营业执照" @change="uploadCodeImg" id="code_img" v-show="false">
            <div class="imgBox" v-if="codeImg">
                <img :src="codeImg" alt="">
            </div>
            <label for="code_img">去上传</label>
            
        </div>
        <div class="upImg">
            <p>手持身份证</p>
            <p v-if="!userCodeImg">未上传</p>
            
            
            <input type="file" @change="uploadUserCode" id="usercode" v-show="false">
            <div class="imgBox" v-if="userCodeImg">
                <img :src="userCodeImg" alt="">
            </div>
            <label for="usercode" >去上传</label>
            
        </div>
        <div class="introduce">
            <label for="">店铺简介</label>
            <textarea name="" id="" cols="30" rows="10" placeholder="请输入店铺简介" v-model="introduce"></textarea>
        </div>
        <!-- <div class="agreement">
            <input type="radio" name="" id="" :checked="checked" @click="checked=!checked">
            <p>我同意<span class="agree" @click="show=true">《商家入驻协议》</span></p>
        </div> -->
       <van-popup v-model="show">
           <h1>标题</h1>
           <p>第一：巴拉拉拉阿拉</p>
           <p>第二：呵呵哈哈哈或或看看看看扩扩扩啦啦啦啦啦啦啦</p>
           <p style="text-align:center" @click="show=false">关闭</p>
       </van-popup>
        <!-- <div class="btn" @click="confirm" disabled="false">
            确定
        </div> -->
        <yd-button size="large" type="danger" @click.native="confirm" :disabled="!checked">确定</yd-button>
    </div>
</template>

<script>
import {host} from '../../common/serviceUrl'
import Vue from 'vue'
import { Popup } from 'vant';
Vue.use(Popup);
export default {
    data() {
        return {
            logo:'',
            logoImg:'',
            code:'',
            codeImg:'',
            introduce:'',
            merchantName:'',
            userName:'',
            userCode:'',
            businessCode:'',
            userCodeImg:'',
            userCodeImgId:'',
            checked:true,
            show:false,
            mobile:''
        };
    },
    created() {},
    mounted() {

    },
    methods: {
        uploadLogo(){
            let image = document.getElementById('logo').files[0]
            let data = new FormData()
            data.append('image',image,image.name)
            this.$api.uploadImg(data,res=>{
                this.logo = res.data
                this.logoImg = host + res.data
            })
        },
        uploadCodeImg(){
            let image = document.getElementById('code_img').files[0]
            let data = new FormData()
            data.append('image',image,image.name)
            this.$api.uploadImg(data,res=>{
                this.code = res.data
                this.codeImg = host + res.data
            })
        },
        uploadUserCode(){
            let image = document.getElementById('usercode').files[0]
            let data = new FormData()
            data.append('image',image,image.name)
            this.$api.uploadImg(data,res=>{
                this.userCodeImgId = res.data
                this.userCodeImg = host + res.data
            })
        },
        confirm(){
            let content = this.introduce
            let storename = this.merchantName
            let logo = this.logo
            let code_img = this.code
            let truename = this.userName
            let user_code = this.userCode
            let business = this.businessCode
            let user_img = this.userCodeImgId
            let mobile = this.mobile
            if(truename.trim().length < 1){
                return this.$dialog.toast({mes:'请输入姓名',timeout:1000})
            }
            if(user_code.trim().length < 1){
                return this.$dialog.toast({mes:'请输入身份证号',timeout:1000})
            }
             if(storename.trim().length < 1){
                return this.$dialog.toast({mes:'请输入店铺名称',timeout:1000})
            }
            if(business.trim().length < 1){
                return this.$dialog.toast({mes:'请输入营业执照号',timeout:1000})
            }
            if(logo.trim().length < 1){
                return this.$dialog.toast({mes:'请上传店铺logo',timeout:1000})
            }
            if(code_img.trim().length < 1){
                return this.$dialog.toast({mes:'请上传营业执照',timeout:1000})
            }
            if(user_img.trim().length < 1){
                return this.$dialog.toast({mes:'请上传手持身份证照片',timeout:1000})
            }
            if(content.trim().length < 1){
                return this.$dialog.toast({mes:'请输入店铺简介',timeout:1000})
            }
            this.$api.addMerchant({content,storename,logo,code_img,truename,user_code,business,user_img,mobile},res=>{
                if(res){
                    // this.introduce = ''
                    // this.merchantName = ''
                    // this.code = ''
                    // this.codeImg = ''
                    // this.logo = ''
                    // this.logoImg = ''
                    this.$dialog.toast({mes:res.msg,timeout:1000})
                }
                if(res.status) {
                    this.$router.replace({path:'/Profile'})
                }

            })
        },
        goTo(path){
            this.$router.push({path})
        }
    },
    computed:{
        btnChecked(){
            return this.checked
        }
    }
};
</script>

<style lang="less" scoped>
    #ApplyMerchant {
        padding: 0 .3rem;
        font-size: .25rem;
        .con {
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            
            // border-bottom: 1px solid #1A202E;
            label {
                width:20%;
            }
            input {
                flex: 1;
                border: none;
            }
        }
        .introduce {
            label {
                display: block;
                padding: 10px 0;
            }
            textarea {
                width: 100%;
                padding: 5px;
                // background-color: #000;
                // border: 1px solid #1A202E;
            }
        }
        .upImg {
            display: flex;
            padding: 10px 0;
            // border-bottom: 1px solid #1A202E;
            align-items: center;
            p {
                width: 20%;
            }
            .imgBox {
                width: 200px;
                height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .btn {
            padding: 10px 0;
            text-align: center;
            background-color: #ef4f4f;
            margin: 10px 0;
            color: #fff;
        }
        .agreement {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px 0;
            p {
                padding-left: 5px;
            }
            .agree {
                color: #10aeff;
            }
        }
        .van-popup {
            width: 100%;
            min-height: 100%;
            padding: 20px 10px 0;
            h1 {
                text-align: center;
            }
        }
        
    }

</style>
