<template>
    <div id="settingsUser">
        <HeaderTop :title="$t('ethkey')">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div style="padding-left:15px;margin-top:20px;" v-show="privatekey">
            <div style="color:rgb(238, 198, 127);font-weight: 900;">{{ $t('save')}} </div>
            <p style="margin-bottom:10px;color:#97989c">{{ $t('key1')}}</p>
            <div style="color:rgb(238, 198, 127);font-weight: 900;">{{ $t('key2')}}</div>
            <p style="margin-bottom:10px;color:#97989c">{{ $t('key3')}}</p>
            <div style="color:rgb(238, 198, 127);font-weight: 900;">{{ $t('key4')}}</div>
            <p style="margin-bottom:10px;color:#97989c">{{ $t('key5')}}</p>
        </div>
        <div v-show="privatekey" ref="text" class="waimian">
            <div class="neimiantitle">ETH私密</div>
            <div class="neimian">
                   {{privatekey}}
            </div>
         
            </div>
        <!-- <button>复制</button> -->
        <van-button v-show="privatekey" style="margin:10px auto;display:block;width:92%;background:rgb(53,54,61);border:none;color:#fff"  @click="Copy" type="info">{{ $t('copy')}} privatekey</van-button>
         <!-- 密码输入框 -->
        <van-password-input :value="value" :info="$t('key6')" @focus="showKeyboard = true" v-if="isshow"/>

        <!-- 数字键盘 -->
        <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        />
    </div>
</template>

<script>
import Vue from 'vue'
    // import BScroll from "better-scroll";
    import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
    import ListItem from '../../components/ListItem/ListItem.vue'
    // import VlinkCellGroup from '../../components/CellGroup/CellGroup.vue'
    import {reqKey} from '../../common/apigo'
    import { Button } from 'vant';

    Vue.use(Button);
    import { Toast } from 'vant';
import { error } from 'util';

    Vue.use(Toast);

    export default {
        data() {
            return {
                privatekey:"",
                showKeyboard:true,
                isshow:true,
                value:''
            };
        },
        mounted() {
            this.userOnline()
        },


        methods: {
             userOnline() {

                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    // this.getKey()

                })
            },
            async getKey() {
                let uid = this.uid
                let coin="eth"
                let payPwd = this.value
                const result = await reqKey({uid,coin,payPwd});
                if(result) {
                    this.value = ''
                }

                if(result.errcode == 0) {
                    this.privatekey=result.privatekey;
                }
                if(result.errcode==-3){

                    Toast('密码错误')
                    this.isshow = true
                    this.showKeyboard = true
                }
                if(result.errcode == -4) {
                    Toast('密码错误')
                    this.isshow = true
                    this.showKeyboard = true
                }
                if(result.errcode == -5) {
                    this.$router.replace("/InvestEasy")
                }
            },
            goTo(path) {

                this.$router.push({path:path})
            },
            Copy(){
                var str=this.privatekey;
                var save = function(e){
                    e.clipboardData.setData('text/plain', str);
                    e.preventDefault();
                }
                document.addEventListener('copy', save);
                document.execCommand('copy');
                document.removeEventListener('copy',save);
                // alert('复制成功！');
                Toast("复制成功")
            },
             // 输入密码
            onInput(key) {

                this.value = (this.value + key).slice(0, 6);
                if(this.value.length == 6) {
                    this.isshow = false
                    this.showKeyboard = false
                    this.getKey()
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },

        },

        components: {
            HeaderTop,
            ListItem,
            // VlinkCellGroup
        }
    };
</script>

<style lang="less" scoped>
    #settingsUser {
        width: 100%;
        height: 100%;
        // background-color: #edf1f4;
        padding-top:60px;
        background: rgb(71, 73, 83);


        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
                white-space: wrap;
            }
        }
        .van-password-input {
            position: fixed;
            width: 100%;
            top: 20%;
            margin: 0;
            padding: 0 10px;
            color: #000;
        }
        .van-number-keyboard {
            color: #000;
            z-index: 10000 !important;
        }
        .userinfo-content-wrapper {
            position: fixed;
            top: 50px;
            bottom: 0;
            width: 100%;

            .userinfo-content{
                padding: 5px;
            }
        }

        .vlink-cell-group{
            margin-top: 5px;
        }
        .neimian{
color:#ababab;
white-space: wrap;
word-wrap:break-word;
font-size:16px;
margin:15px 15px 15px 15px;
line-height:30px;
border:1px solid rgb(138, 119, 89);
padding:10px 10px;
border-radius:5px;
        }
        .waimian{
               background: rgb(61,62,70);
               
                width: 92%;
                margin: 0 auto;
                color: #000;
                 border-radius: 5px;
                padding: 0 0 2px 0;
                 -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
                box-shadow: 0 -0.05rem 0.05rem rgba(0, 0, 0, 0.3);
        }
        .neimiantitle{
         border-left:2px solid rgb(238, 198, 127);
         border-bottom:1px solid rgb(49, 50, 59);
         margin: .4rem .3rem 0 0;
         color: #fff;
         font-size:14px;
         padding: 10px 10px 10px 10px;
        }
    }
</style>



