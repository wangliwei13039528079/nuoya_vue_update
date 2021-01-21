<template>
    <div id="addAiPay">
        <HeaderTop :title="pay_type == 3 ? '修改支付宝':'修改微信'">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>

        <div class="context">
            <van-cell-group>
                <van-field :label="pay_type == 3 ? '支付宝：':'微信号：'" v-model="paynum"
                           :placeholder="pay_type == 3 ? '输入您的支付宝账号':'请输入微信号'"/>
      
                <van-field label="收款人：" v-model="username" placeholder="请输入收款人名称"/>
            </van-cell-group>
            <div class="uploader-box">
                <form id="form1" action="" method="post" enctype="multipart/form-data" @change="changeImage">
                    <label for="upfile" style="color:#fff">请修改收款码</label>
                    <input v-show="false" type="file" name="upfile" id="upfile" value="" />
                </form>
                <img :src="avatar" alt="" class="imgBox">
            </div>
            <div class="btn-group">
                <button :disabled="disabled" class="btn-add" @click="add()">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

    import {reqAddPayType,reqSettingsUser,Url,regAllPayType} from '../../common/apigo'
    import common from '../../common/common'

    import Vue from 'vue'

    import {Field, Toast,Dialog} from 'vant';


    Vue.use(Field).use(Toast).use(Dialog);
    export default {
        components: {
            HeaderTop
        },


        data() {
            return {
                username:'',
                uid:'',
                userInfo:'',
                imgUrl: '',
                paynum: '',
                pay_type: '',
                PayType:[],
                payImg: '',
                id:'',
                avatar:'',
                ownImg:true,
                formatImg:true,
                disabled:false,
                flag:true

            }
        },



        mounted() {
            // this.Userinfo()
            this.userOnline()
            this.pay_type = this.$route.params.type
            // console.log(this.pay_type)
        },

        methods: {
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
            // userOnline() {
            //     let result = JSON.parse(localStorage.getItem('userInfo'))
            //     this.userInfo = localStorage.getItem('userInfo')
            //     this.uid = result.uid
            // },
            userOnline(){
                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getPaytype()

                })
            },

            async getPaytype(){
                let uid = this.uid;
                let type = this.pay_type;
                const result = await regAllPayType({uid,type})
                console.log(result.PayMethod)
                if (result.PayMethod.PayType == 3){
                    this.paynum = result.PayMethod.Paynum;
                    this.username = result.PayMethod.Username;
                    this.avatar = 'http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/' + result.PayMethod.Payimg;
                }
                if (result.PayMethod.PayType == 2){
                    this.paynum = result.PayMethod.Paynum;
                    this.username = result.PayMethod.Username;
                    this.avatar = 'http://tokenbankimg-1255856352.cos.ap-chengdu.myqcloud.com/' + result.PayMethod.Payimg;
                }
            },
            async add() {
                if(!this.flag) {
                    return Toast('正在修改，请稍候')
                }
                let image = document.getElementById("upfile").files[0]
                if(image){
                    this.payImg = image
                }else {
                    this.payImg = ''
                }
                this.flag = false
                let param = new FormData(); //创建form对象
                param.append('uid',this.uid);//添加form表单中其他数据
                param.append('payNum',this.paynum)
                param.append('payType',this.pay_type)
                param.append("payImg",this.payImg)
                param.append('username',this.username)
                param.append('bank','')
                param.append('branch','')
                if (!this.paynum){
                    this.flag = true
                    Toast('请输入收款账号')
                    return false
                }
                if (!this.username){
                    this.flag = true
                    Toast('请输入收款人姓名')
                    return false
                }
                if (!document.getElementById("upfile").files[0] && !this.avatar){
                    this.flag = true
                    Toast('请上传收款码')
                    return false
                }
                if (this.formatImg == true){
                    this.disabled = false
                }
                if (this.formatImg == false){
                    this.flag = true
                    Toast('暂不支持该类型图片')
                    this.disabled = true
                    return false
                }

                let apiauth = common.getStorage('user_token')
                console.log(apiauth)
                let config = {
                    headers:{'Content-Type':'multipart/form-data'},
                    headers:{"apiauth": apiauth}
                };

                axios.post(Url+"/o2c/payMethod/update",param,config).then((res)=>{
                // axios.post("http://192.168.31.132:9099/c2c/sell/payMethod/update",param,config).then((res)=>{
                    if(res){
                        this.flag = true
                    }
                    if (res.data.errcode == 0){
                        Toast('支付方式修改成功')
                        this.disabled = true
                        this.$router.back(-1)
                    }
                    if (res.data.errcode == -2){
                        Toast('收款账号无效')
                        return
                    }
                    if (res.data.errcode == -3){
                        Toast('支付方式无效')
                        return
                    }
                    if (res.data.errcode == -4){
                        Toast('用户名无效')
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
                    // console.log(file)
                    let filemaxsize = 4096
                    let size = file.size / 1024
                    if (size > filemaxsize){
                        Toast('您上传的图片过大,请重新选择')
                        this.disabled = true;
                        this.formatImg = false
                        return false
                    }
                    var name = file.name
                    var fileTypes = [".jpg",".png",".JPG",".PNG"];
                    if(name) {
                        var isNext = false;
                       //  var fileEnd = name.substring(name.indexOf("."));

                         let pic = name.split(".")
                           let fileEnd = "." + pic[pic.length - 1]
                        for (var i = 0; i < fileTypes.length; i++) {
                            if (fileTypes[i] == fileEnd) {
                                isNext = true;
                                this.disabled = false
                                this.formatImg = true;
                                break;
                            }
                        }
                        if (!isNext){
                            Toast('暂不支持该类型图片');
                            name = null;
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
        min-height: 100%;
        height: auto;
        // background-color: #000;
        font-size: 14px;
        color: #666;

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
            color: #fff;
        }

        .context {
            // margin-top: 50px;


            .uploader-box {
                margin-top: 10px;
                // background-color: #fff;
                height: 100%;
                padding: 20px;
                // border-bottom: 1px solid #eee;
                text-align: center;

                .uploader-wrap-box {

                    width: 100%;
                    height: 100%;
                    border: 1px dashed #ccc;
                }

                .dsc {


                    i {
                        font-size: 24px;
                        color: #fff;
                    }

                    p {
                        margin-top: 5px;
                        font-size: 14px;
                        color: #fff;
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
