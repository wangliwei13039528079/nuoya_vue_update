<template>
    <div id="identityAuth">
        <HeaderTop title="实名认证">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>

        <div class="context">
            <van-cell-group>
                <van-field style="color: #FFF;" label="真实姓名：" v-model="realname" placeholder="输入您的真实姓名" :disabled="isdisabled"/>
            </van-cell-group>
            <van-cell-group>
                <van-field style="color: #FFF;" label="身份证号：" v-model="idcard" placeholder="请输入您的身份证号" :disabled="isdisabled"/>
            </van-cell-group>
            <div class="uploader-box">
                <form id="form1" action="" v-if="!isdisabled" method="post" enctype="multipart/form-data" @change="changeImageZ">
                    <label for="upfile" style="color:#fff">上传身份证正面</label>
                    <input type="file" name="upfile" id="upfile" value="上传正面身份证" style="width:50px;height:20px;background:#eee;color: #FFF;"/>
                </form>
                <img :src="avatarZ" alt="" class="imgBox">
            </div>
            <div class="uploader-box">
                <form id="form2" action="" v-if="!isdisabled" method="post" enctype="multipart/form-data" @change="changeImageF">
                    <label for="upfile1" style="color:#fff">上传身份证反面</label>
                    <input type="file"  name="upfile1" id="upfile1" value="上传反面身份证" style="width:50px;height:20px;background:#eee;color: #FFF;"/>
                </form>
                <img :src="avatarF" alt="" class="imgBox">
            </div>
            <div class="btn-group">
                <button v-if="!disabled" :disabled="disabled" class="btn-add" @click="add()">{{ process }}</button>
                <button v-if="disabled" :disabled="disabled">{{ process }}</button>
                <p style="color: red;" v-if="authstatus === '2'">{{ reason }}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

  import Vue from 'vue'

  import {Field, Toast,Dialog} from 'vant'

  Vue.use(Field).use(Toast).use(Dialog)

  export default {
    components: {
      HeaderTop
    },

    data () {
      return {
        realname:'',
        idcard:'',
        name:'',
        userInfo:'',
        imgUrl: '',
        paynum: '',
        pay_type: 3,
        payimg: '',
        avatarZ:'',
        avatarF:'',
        whichPic: '',
        formatImg:false,
        disabled:false,
        flag:true,
        authstatus: null,
        isdisabled: true,
        process: '提交认证',
        reason: ''
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
      this.identityauthstatus()
    },

    methods: {
      identityauthstatus(){
        this.$api.identityauthstatus({}, res => {
            if (res.status && res.data) {
              this.authstatus = res.data.status
              if (this.authstatus === '0') {
                this.process = '审核中'
              }
              if (this.authstatus === '1') {
                this.process = '已认证'
              }
              if (this.authstatus === '2') {
                this.process = '认证驳回, 重新提交'
                this.reason = res.data.reason
              }
              if (this.authstatus === '0' || this.authstatus === '1' || this.authstatus === '2') { // 审核中， 审核成功, 审核驳回
                this.isdisabled = true
                this.realname = res.data.realname
                this.idcard = res.data.idcard
                this.avatarZ = res.data.pic_positive
                this.avatarF = res.data.pic_other_side
                if (this.authstatus === '2') { // 审核驳回可编辑
                  this.isdisabled = false
                }
              } else {
                this.isdisabled = false
              }
            } else {
              this.isdisabled = false
            }
        })
      },
      async add() {
        if (this.isdisabled) {
          return
        }
        if (this.realname === null || this.realname === ''){
          this.flag = true
          Toast('请输入真实姓名')
          return false
        }

        if (this.idcard === null || this.idcard === ''){
          this.flag = true
          Toast('请输入真实身份证')
          return false
        }

        // if (this.avatarZ === null || this.avatarZ === ''){
        //   this.flag = true
        //   Toast('请上传身份证正面')
        //   return false
        // }
        // if (this.avatarF === null || this.avatarF === ''){
        //   this.flag = true
        //   Toast('请上传身份证反面')
        //   return false
        // }

        let param = {
          'realname': this.realname,
          'idcard': this.idcard,
          'avatarZ': this.avatarZ,
          'avatarF': this.avatarF
        };
        this.$api.identityauth(param, res => {
            if (res.status) {
                if   (res.status== 5) {
                  Toast('身份重复')
                   
                }else  {
                    Toast('认证成功， 等待审核~')
                   
                }
                   
            }
        })
      },
      changeImageZ (e) {
        this.whichPic = 'Z'
        console.log(this.whichPic)
        this.changeImage(e)
      },
      changeImageF (e) {
        this.whichPic = 'F'
        console.log(this.whichPic)
        this.changeImage(e)
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
          let data = new FormData()
          data.append('upfile', file, file.name)
          this.$api.uploadFile(data, res => {
            if (res.status) {
              if (that.whichPic === 'Z') {
                that.avatarZ = res.data.url
              } else {
                that.avatarF = res.data.url
              }
            }
          })
        }
      },
    }
  }
</script>

<style lang="less" scoped>
    #identityAuth {
        width: 100%;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .van-cell {
            background-color: #001b33;
            border-bottom: 1px solid #4c6581;
            color: #abc2e2;
        }
        .van-hairline--top-bottom::after {
            width: 0;
        }
        .van-field__control {
            color: #FFF!important;
        }
        .context {
            margin-top: 50px;
            .uploader-box {
                margin-top: 10px;
                // background-color: #fff;
                height: 100%;
                padding: 20px;
                border-bottom: 1px solid #4c6581;
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
                    background-color:#7497f1;
                    color: #fff;
                    height: 45px;
                    border: none;
                    width: 100%;
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
            color: #728bd9;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #728bd9;
        }
    }
</style>
<style>
    .van-field__control{color: #FFF!important;}
</style>
