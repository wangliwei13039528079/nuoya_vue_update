<template>
    <div id="service">
        <HeaderTop title="客服">
            <a class="back" @click="$router.back(-1)" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div class="content">
            <ul id="lis">
                <template v-for="(item,index) in message" >
                    <li class="right" v-if="item.sender == 0" :key="index">
                        <p v-if="!item.isimg">{{item.msg}}</p>
                        <img :src="item.msg" alt="" v-if="item.isimg">
                        <div>
                            <img src="../../common/images/avater.jpg" alt="">
                        </div>
                    
                    </li>
                    <li class="left" v-if="item.sender == 1" :key="index">
                        <div>
                            <img src="../../common/images/service.jpg" alt="">
                        </div>
                        <p v-if="!item.isimg">{{item.msg}}</p>
                        <img :src="item.msg" alt="" v-if="item.isimg">
                    </li>
                </template>
            </ul>
        </div>
        
        <div class="send">
              <label for="img">
                <!-- <i class="iconfont icon-ai-up-img"></i> -->
                <img src="../../common/images/shangtu.png" style="width:20px" alt="">
            </label>
            <input type="file" id="img" @change="file">
            <textarea type="text" name="" id="" placeholder="请输入内容" class="text" v-model="msg">
            </textarea>
            <button @click="send"><img src="../../common/images/fasong.png" style="width:20px"  alt=""></button>
          
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import {Toast} from 'vant'
    // import {reqAddMsg,reqmsgList,requploadImg,URL} from '../../api'
    // import { setInterval, clearInterval } from 'timers';
    Vue.use(Toast)

    export default {
        data () {
            return {
                message:[],
                msg:'',
                url:'',
                timer:null,
                image:'',
                imgId:''
            }
        },

        mounted () {
            this.getMsgList()
            this.timer = setInterval(()=>{
                this.getMsgList()
            },1000)
           
            this.scroll()
            
            
        },

        methods: {
            getByteLen(val) {
                var len = 0;
                for (var i = 0; i < val.length; i++) {
                    var a = val.charAt(i);
                    if (a.match(/[^\x00-\xff]/ig) != null) {
                        len += 2;
                    } else{
                        len += 1;
                    }
                }
                return len;
            },
            send(){
                if(this.getByteLen(this.msg) > 1000) {
                    return Toast('您输入的内容太多啦~')
                }
                let msg = this.msg
                let isimg = 0
                if(msg.trim().length<1) {
                    this.msg = ''
                    return Toast('请输入内容哦~')
                }
                this.$api.addMsg({msg,isimg},res=>{
                    if(res.status) {
                        this.msg = ''
                    }
                })
                
            },
            getMsgList(){
                this.$api.message({},res=>{
                    if(res.status) {
                        this.message = res.data
                    }
                })
                
            },
            file(e){
                let data = new FormData()
                let file = e.target.files[0]
                data.append('image',file,file.name)
                this.$api.uploadImg(data,res=>{
                    if(res.status) {
                        this.imgId = res.data
                        this.upload()
                    }

                })
                
           
            },
            upload(){
                let msg = this.imgId
                let isimg = 1
                this.$api.addMsg({msg,isimg},res=>{
                    if(res.status) {
                        this.imgId = ''
                    }
                })
            },
            scroll(){
                this.$nextTick(()=>{
                    var lis = document.getElementById('lis');
                    lis.scrollTop = lis.scrollHeight;
                })
                
            }

        },
        components: {
            HeaderTop
        },
        watch:{
            message(newVal,oldVal){
                if(newVal.length != oldVal.length) {
                    this.scroll()
                }
            }
        },

        // updated(){
        //     this.scroll()
    
        // },

        beforeDestroy(){
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="less">
    #service {
         padding-top: 10px;
        font-size: 16px;
        height: 100%;
        background-color: #474953;
        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
        .content {
            height: 85%;
            padding: .5rem 0;
            width: 90%;
            margin:0 auto ;
    background-color: rgb(61,62,70);
            -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
            box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
            border-radius: 0.2rem;

            ul {
                height: 100%;
                padding: 0 10px 40px;
                overflow-y: scroll;
            }
            .left,
            .right {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                > img {
                    width: 100px;
                    height: 100px;
                    border-radius: 5px;

                }
                div {
                    width: 40px;
                    height: 40px;
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                           -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
            box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
                    }
                }
                p {
                    max-width: 12em;
                    word-wrap: break-word;
                    word-break: normal;
                    padding: 0.5em;
                    line-height: 20px;
                    border-radius: 5px;
                }
            }
            .right {
                
                justify-content: flex-end;
                div {
                    margin-left: 5px;
                }
                p {
                 display: inline-block;position:relative;padding:10px;
                //  max-width: calc(100% - 90px);
                 min-height: 40px;line-height:20px;font-size: 13px;word-break: break-all;border-radius: 4px;background-color: rgb(54,55,63);color:#fff;
                 
                }
                p:before{content: " ";position: absolute;top: 20px;left: 100%;border: 6px solid transparent;border-left-color: rgb(54,55,63);}
                
            }
            .left {
                justify-content: flex-start;
                div {
                    margin-right: 5px;
                }
                p {
                 display: inline-block;position:relative;padding:10px;
                //  max-width: calc(100% - 90px);
                 min-height: 40px;line-height:20px;font-size: 13px;word-break: break-all;border-radius: 4px;text-align: left;background-color: rgb(54,55,63);color:#fff;
                }
                p:before{content: " ";position: absolute;top: 20px;right: 100%;border: 6px solid transparent;border-right-color: rgb(54,55,63);}
            }
        }
        .send {
            padding: 0 10px;
            width: 90%;
            height: 40px;
            position: fixed;
            left:50%;
            transform: translate(-50%,-50%);
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: rgb(54,55,63);
            -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
            box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
            border-radius: 0.2rem;
            .text {
                height: 70%;
                width: 75%;
                margin: 0 0 0 5%;
                padding: 3px 0 0 20px;
                border: none;
                resize: none;
                color: #fff;
                background: rgb(44,45,53);
                border-radius: 20px;

            }
            button {
                width: 16%;
                height: 100%;
                border: none;
          
            }
            label i {
                color: #000;
                font-size: 30px;
            }
            #img {

                display: none;
                width: 10%;
            }
        }

    }
</style>
