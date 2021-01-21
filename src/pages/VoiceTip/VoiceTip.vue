<template>
    <div id="language">
       <HeaderTop title="声音提示">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <van-radio-group v-model="voice">
            <van-cell-group>
                <van-cell title="开启" clickable @click.self="voice = '1';getStudio()">
                    <van-radio name='1' @click="voice = '1';getStudio()"/>
                </van-cell>
                <van-cell title="关闭" clickable @click.self="voice = '0';getStudio()">
                    <van-radio name='0' @click="voice = '0';getStudio()"/>
                </van-cell>
            </van-cell-group>
        </van-radio-group>

    </div>
</template>
<script>
    import Vue from 'vue'
    import { Cell, CellGroup } from 'vant'
    Vue.use(Cell).use(CellGroup)
    import { RadioGroup, Radio } from 'vant'
    Vue.use(RadioGroup)
    Vue.use(Radio)

    // import {reqUserAllInfo,reqStudio} from '../../api'
    import {mapState} from 'vuex'

    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    export default {

        data() {
            return {
                voice:''
            }
        },

        mounted() {
            this.voice = this.userAllInfo.userInfo.studio.toString()
        },
        computed: {
            // ...mapState(['userAllInfo'])
        },
        methods: {
            // async getUserAllInfo() {
            //     let apiauth = localStorage.getItem('apiauth')
            //     if (apiauth) {
            //         let info = await reqUserAllInfo()
            //         if (info) {
            //             this.$store.dispatch('recordUserAllInfo', info)
            //         }
            //     }
            // },
            // async getStudio () {
            //     let status = this.voice
            //     let res = await reqStudio({status})
            //     if(res.code == 1) {
            //         this.getUserAllInfo()
            //     }
            // }
        },
        components:{
            HeaderTop
        },
        
    }
</script>
<style lang="less" scoped>
    #language {
        height: 100%;
        background-color: #edf1f4;
        padding-top: 50px;
        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
    }
</style>
