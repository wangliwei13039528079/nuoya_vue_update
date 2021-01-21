<template>
    <div class="">
        <div class="userinfo-content-wrapper">
            <div class="userinfo-content">
                <ListItem title='头像' @goTo="goTo()">
                    <img :src="userInfo.avatar" slot="avatar">
                </ListItem>
                <ListItem title='姓名' :value='userInfo.username' :isLink="true"></ListItem>
                <ListItem title='登录账户' :value='userInfo.nickname'></ListItem>
                <ListItem title='手机号码' :value='userInfo.mobile' :isLink="true"></ListItem>
                <ListItem title='安全邮件' value='未绑定' :isLink="true"></ListItem>
                  <ListItem title='实名认证' v-if="userInfo.is_real == 0" value='未认证' :isLink="true" @goTo="go('/Identity')"></ListItem>
                <ListItem title='实名认证' v-else-if="userInfo.is_real == 1" value= '审核中'  :isLink="true"></ListItem>
                <ListItem title='实名认证' v-else-if="userInfo.is_real == 2" value= '已认证'  :isLink="true"></ListItem>
                <ListItem title='实名认证' v-else-if="userInfo.is_real == 3" value= '认证失败，重新认证'  :isLink="true" @goTo="go('/Identity')"></ListItem>
                <ListItem title='实名认证' v-else-if="userInfo.is_real == 5" value= '已认证，未上传身份证'  :isLink="true" @goTo="go('/Identity')"></ListItem>  
                  <ListItem title='成为商户' v-if="userInfo.dealer == 0" :isLink="true" @goTo="apply" value="点击申请"></ListItem>
                <ListItem title='成为商户' v-else-if="userInfo.dealer == 3" :isLink="true" @goTo="apply" value="已拒绝，重新申请"></ListItem>
                <ListItem title='成为商户' v-else :isLink="true" :value="msg"></ListItem>  
                
                <!-- <button class="btn btn-logout" @click="showLogout()">退出登录</button> -->
            </div>
        </div>
        <yd-cell-group>
            <!-- <yd-cell-item href="/mybankcardlist" type="link">
                <img slot="icon" src="../../../static/image/bankcard.png">
                <span slot="left">我的银行卡</span>
            </yd-cell-item> -->
            <yd-cell-item href="/recommendlist" type="link">
                <img slot="icon" src="../../../static/image/coupon.png">
                <span slot="left">推荐记录</span>
            </yd-cell-item>
            <yd-cell-item href="/datasetting" type="link">
                <img slot="icon" src="../../../static/image/set.png">
                <span slot="left">资料设置</span>
            </yd-cell-item>
        </yd-cell-group>
        <!-- <div style="margin: 15px">
            <yd-button size="large" type="danger" @click.native="logout">退出登录</yd-button>
        </div> -->
    </div>
</template>

<script>
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
    import ListItem from '../../components/ListItem/ListItem.vue'
     import Vue from 'vue'
export default {
    data() {
            return {
                userInfo: {},
                msg:'',
                flag:true
            }
        },
        mounted(){
            this.userOnline()
        },
        components:{
ListItem
        },
    methods: {
        userOnline() {

                this.$api.userInfo({}, res => {
                    this.userInfo=res.data
                    // this.getKey()
                    console.log(this.userInfo)

                })
            },
        logout () {
            this.$dialog.confirm({
                mes: '确认退出吗?',
                opts: [
                    {
                        txt: '取消',
                        color: false
                    },
                    {
                        txt: '确定',
                        color: true,
                        callback: () => {
                            this.$api.logout({}, res => {
                                if (res.status) {
                                    this.GLOBAL.removeStorage('user_token')
                                    this.GLOBAL.removeStorage('login-type')
                                    this.GLOBAL.removeStorage('loginSign')
                                    this.$router.replace('/index')
                                }
                            })
                        }
                    }
                ]
            })
        }
    }
}
</script>

<style scoped>
    .yd-cell {
        background-color: #000;
    }
    .yd-cell a.yd-cell-item, .yd-cell label.yd-cell-item {
        background-color: #000;
    }
    .yd-cell:after {
        width: 0;
    }
    .yd-cell-left {
        color: #fff !important;
    }
    .userinfo-content-wrapper {
            position: fixed;
            top: 50px;
            bottom: 0;
            width: 100%;

            

                
            
        }
        .btn {
                display: block;
                width: 100%;
                height: 45px;
                background-color: #fff;
                border: none;
                margin-top: 10px;
                color: #666;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
        }
    
</style>
