<template>
    <div id="addAiPay">
        <HeaderTop title="添加支付宝支付">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>

        <div class="context">
            <van-cell-group>
                <van-field label="支付宝账号：" v-model="paynum" placeholder="输入您的支付宝账号"/>

                <van-field label="收款人：" v-model="username" placeholder="请输入真实姓名"/>
            </van-cell-group>
            <div class="uploader-box">
                <form id="form1" action="" method="post" enctype="multipart/form-data" @change="changeImage">
                <label for="upfile" style="color:#fff">上传收款码</label>
                    <input type="file"  v-show="false" name="upfile" id="upfile" value="请上传凭证" style="width:50px;height:20px;background:#eee"/>
                </form>
                <img :src="avatar" alt="" class="imgBox">
            </div>
            <div class="btn-group" style="padding-bottom: 20%">
                <button :disabled="disabled" class="btn-add" @click="add()">确认添加</button>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

    import {reqAddPayType,reqSettingsUser,Url} from '../../common/apigo'
    import common from '../../common/common'

    import Vue from 'vue'

    import {Field, Toast,Dialog} from 'vant'
    // import {upload} from 'cube-ui'

    import axios from 'axios'

    Vue.use(Field).use(Toast).use(Dialog)

    export default {
        components: {
            HeaderTop
        },

        data () {
            return {
                username:'',
                uid:'',
                name:'',
                userInfo:'',
                imgUrl: '',
                paynum: '',
                pay_type: 3,
                payimg: '',
                avatar:'',
                formatImg:false,
                disabled:false,
                flag:true
            }
        },

        computed: {
            showImg () {
                if (this.imgUrl) {
                    return true
                } else {
                    return false
                }
            }
        },
        mounted(){
            // this.Userinfo
            this.userOnline()
        },

        methods: {
            userOnline(){
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id

                })
            },
            // Userinfo(){
            //     if (!JSON.parse(localStorage.getItem('userInfo'))){
            //         Dialog.alert({
            //             title: '提示',
            //             message: '请您先登录'
            //         }).then(() => {
            //             // on close
            //             this.$router.replace("/login")
            //         });
            //     }
            // },
            // userOnline(){
            //     let result = JSON.parse(localStorage.getItem('userInfo'))
            //     this.userInfo = localStorage.getItem('userInfo')
            //     this.uid = result.uid
            // },

            async add() {
                if(!this.flag) {
                    return Toast('正在添加，请稍候')
                }
                this.flag = false
                let param = new FormData(); //创建form对象
                param.append('uid',this.uid);//添加form表单中其他数据
                param.append('payNum',this.paynum)
                param.append('payType',this.pay_type)
                param.append("payImg",document.getElementById("upfile").files[0])
                param.append('username',this.username)
                param.append('bank','')
                param.append('branch','')
                if (this.paynum == ''){
                    Toast('请输入收款账号')
                    this.flag = true
                    return false
                }
                if (this.username == ''){
                    this.flag = true
                    Toast('请输入收款人姓名')
                    return false
                }
                if (document.getElementById("upfile").files[0] == null){
                    this.flag = true
                    Toast('请上传收款码')
                    return false
                }
                if (this.formatImg == true){
                    this.disabled = false
                }
                if (this.formatImg == false){
                    this.disabled = true
                    Toast('暂不支持该类型图片')
                    return false
                }

                // let Authorization = (JSON.parse(this.userInfo));
                let apiauth = common.getStorage('user_token')
                let config = {
                    headers:{'Content-Type':'multipart/form-data'},
                    headers:{"apiauth": apiauth}
                };


                axios.post(Url+"/o2c/addPayMethod",param,config).then((res)=>{
                // axios.post("http://192.168.31.132:9099/c2c/seller/addPayMethod",param,config).then((res)=>{
                    if(res) {
                        this.flag = true
                    }
                    if (res.data.errcode == 0){
                        Toast('支付方式添加成功')
                        this.$router.back(-1)
                        return
                    }
                    if (res.data.errcode == -2){
                        Toast('收款账号无效')
                        return
                    }
                    if (res.data.errcode == -3){
                        Toast('系统错误')
                        return
                    }
                    if (res.data.errcode == -4){
                        Toast('系统错误')
                        return
                    }
                    if (res.data.errcode == -5){
                        Toast('已存在支付方式')
                        return
                    }
                    if (res.data.errcode == -6){
                        Toast('开户行无效')
                        return
                    }
                    if (res.data.errcode == -7){
                        Toast('支行无效')
                        return
                    }
                    if (res.data.errcode == -8){
                        Toast('图片无效')
                        return
                    }
                    if (res.data.errcode == -9){
                        Toast('图片不以.jpg或.png结尾')
                        return
                    }
                }).catch((reject)=>{

                })
            },
            changeImage(e) {
                if(e.target.files[0]){
                    this.ownImg = false
                    var file = e.target.files[0];
                    let filemaxsize = 4096
                    let size = file.size / 1024
                    console.log(size,filemaxsize)
                    if (size > filemaxsize){
                        Toast('您上传的图片过大,请重新选择')
                        this.disabled = true;
                        this.formatImg = false
                        return false
                    }
                    var name = file.name
                    var fileTypes = [".jpg", ".png", ".jpeg"];
                    if(name) {
                        var isNext = false;
                     // var fileEnd = name.substring(name.indexOf("."));

                         let pic = name.split(".")
            let fileEnd = "." + pic[pic.length - 1]
                        for (var i = 0; i < fileTypes.length; i++) {
                            if (fileTypes[i] == fileEnd) {
                                console.log(fileTypes[i])
                                isNext = true;
                                this.disabled = false;
                                this.formatImg = true;
                                break;
                            }
                        }
                        if (!isNext){
                            Toast('暂不支持该类型图片');
                            name = "";
                            this.disabled = true;
                            this.formatImg = false
                            return false;
                        }
                    }
                    var reader = new FileReader()
                    var that = this
                    reader.readAsDataURL(file)
                    reader.onload = function(e) {
                        that.avatar = this.result
                    }
                }
            },
        }
    }
</script>

<style lang="less">

    #addAiPay {
        width: 100%;
        // min-height: 100%;
        // height: auto;
        // background-color: #000;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .van-cell {
                  background-color: rgb(60,61,69);
            border: 1px solid #eec67f;
            color: #fff;
            margin:.3rem auto;
            width: 90%;
            border-radius:5px;
        }
        .van-hairline--top-bottom::after {
            width: 0;
        }
        .van-field__control {
            color: #abc2e2;
        }
        .context {
            // margin-top: 50px;


            .uploader-box {
                margin-top: 10px;
                // background-color: #fff;
                height: 100%;
                padding: 20px;

                text-align: center;

                .uploader-wrap-box {

                    width: 100%;
                    height: 100%;
                    border: 1px dashed #4c6581;
                }

                .dsc {


                    i {
                        font-size: 24px;
                        color: #666;
                    }

                    p {
                        margin-top: 5px;
                        font-size: 14px;
                        color: #666;
                    }

                    text-align: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            }


            .btn-group {
                padding: 5px;


                .btn-add {
                               background: rgb(57, 57, 65);
//  box-shadow: rgba(0, 0, 0, 0.3) 0px -0.05rem 0.05rem;
 border-radius: 0.2rem;
 color:#fff;
 border:none;
 width:90%;
 margin:0 auto;
 display:block;
 height: 45px;
                }
            }
        }
        .imgBox {
            width: 50%;
            height: 50%;
            margin: 10px auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        input::-webkit-input-placeholder {
            color: #fff;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #fff;
        }

    }

    // input {
    //     font-size: 0; /* 为了去掉‘未选择任何文件’这几个字，也可以随便弄到哪里*/
    // }
    /* 注意不是直接input > input[type=button] 哦*/
    // input::-webkit-file-upload-button,-moz-file-upload-button,-ms-file-upload-button,-o-file-upload-button {
    //     background: #efeeee;
    //     color: #333;
    //     border: 0;
    //     padding: 10px 50px;
    //     border-radius: 5px;
    //     font-size: 12px;
    //     box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12);
    // }
</style>
