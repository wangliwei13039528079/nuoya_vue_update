<template>
    <div id="settingsUser">
        <HeaderTop title="ETH私钥">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
       
            <div ref="text" style="color:#000;white-space: wrap;word-wrap:break-word;font-size:16px;margin:40px 15px;line-height:30px;border:1px solid #000;padding:30px 10px">{{privatekey}}</div>
            <!-- <button>复制</button> -->
            <van-button style="margin:10px 15px;width:90%"  @click="Copy" type="info">复制</van-button>
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

Vue.use(Toast);

    export default {
        data() {
            return {
                privatekey:""
            };
        },
        mounted() {
            this.userOnline()
        },


        methods: {
             userOnline() {

                this.$api.userInfo({}, res => {
                    this.uid=res.data.id
                    this.getKey()

                })
            },
            async getKey() {
                let uid = this.uid
                let coin="eth"
                // console.log(uid,coin)
                const result = await reqKey({uid,coin});
                this.privatekey=result.privatekey;
                // console.log(result.privatekey)
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
        background-color: #edf1f4;
        padding-top:60px;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
                white-space: wrap;
            }
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
    }
</style>



