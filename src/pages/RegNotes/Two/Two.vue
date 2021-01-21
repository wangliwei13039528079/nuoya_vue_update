<template>
    <div id="one">
        <div class="userInfo-item" v-if="userInfo.length < 1">暂无节点</div>
        <template v-else>
            <div class="group">
                <div class="userInfo-item" v-for="(item,index) in userInfo" :key="index">
                    <!-- <div class="info-img-box">
                        <img :src="item.avatar||'../../../../common/images/avater.jpg'">
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
            </div>
        </template>
    </div>
</template>

<script>

    // import {reqTree} from '../../../api'

    export default {

        data () {
            return {
                userInfo: []
            }
        },

        mounted () {
            // this.getMember()
        },

        methods: {
            // async getMember () {
            //     const result = await reqTree({num: 2})

            //     if (result) {
            //         this.userInfo = result
            //     }
            // }
        }

    }
</script>

<style scoped lang="less">
    #one {
        color: #666;

        .userInfo-item {
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            padding: 10px;

            .info-img-box {
                width: 60px;
                height: 60px;

                > img {
                    width: 60px;
                    height: 60px;
                }
            }

            p {
                padding: 5px;
            }
        }
    }

</style>
