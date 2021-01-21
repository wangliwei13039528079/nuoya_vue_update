<template>
    <div id="one">
        <div v-if="userInfo.length < 1" class="userInfo-item">暂无节点</div>
        <template v-else>
            <div class="userInfo-item" v-for="(item,index) in userInfo" :key="index">
                <!-- <div class="info-img-box">
                    <img :src="item.avatar">
                </div> -->
                <div class="info-msg">
                    <p>姓名：{{item.nickname?item.nickname:'未认证'}}</p>
                    <p>账户：{{item.account}}</p>
                </div>
                <div class="info-team">
                    <p>推荐人数：{{item.jtall}}</p>
                    <p>团队人数：{{item.teamall}}</p>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

    // import {reqTree} from "../../../api";

    export default {


        data() {
            return {
                userInfo: []
            }
        },


        mounted() {
            // this.getMember();
        },

        methods: {
            // async getMember() {
            //     const result = await reqTree({num: 1});

            //     if (result) {
            //         this.userInfo = result;
            //     }
            // },

            // formatter : function(value) {
            //     var len= value.length;
            //     var xx= value.substring(3,len-4);
            //     var values = value.replace(xx,"****");
            //     return values;
            // }

        }
        // computed:{
        //     node:{
        //         cache:false,
        //         get:function(){
        //             return this.userInfo
        //         }
        //     }
        // }

    }
</script>

<style scoped lang="less">
    #one{
        color: #666;
        .userInfo-item{
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            padding: 10px;
            .info-img-box{
                width: 60px;
                height: 60px;

                >img{
                    width: 60px;
                    height: 60px;
                }
            }
            .info-team {

            }
            p{
                padding: 5px;
            }
        }
    }

</style>
