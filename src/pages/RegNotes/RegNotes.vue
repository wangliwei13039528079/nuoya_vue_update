<template>
    <div id="regNodes">
        <HeaderTop title="节点关系">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div class="content">
            <!--navigation to start-->
            <div class="top-navigation">
                <a @click="goTo('/regnotes/one')" :class="$route.path == '/regnotes/one' ? 'active':''">一级节点({{oneNode}})</a>
                <a @click="goTo('/regnotes/two')" :class="$route.path == '/regnotes/two' ? 'active':''">二级节点({{twoNode}})</a>
            </div>
            <router-view>
            </router-view>
            <!--navigation to end-->
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    // import {reqTree} from '../../api'

    export default {

        data() {
            return {
                oneNode:'',
                twoNode:''
            }
        },
        mounted(){
            // this.getNodeOne()
            // this.getNodeTwo()
           
        },
        methods: {

            //router
            goTo(path) {
                this.$router.replace({path: path})
            },
            // async getNodeOne() {
            //     let num = 1
            //     let res = await reqTree({num})
            //     this.oneNode = res.length
            // },
            // async getNodeTwo() {
            //     let num = 2
            //     let res = await reqTree({num})
            //     this.twoNode = res.length
            // }
             
        },

        components: {
            HeaderTop
        }
    }
</script>

<style scoped lang="less">


    @nice-blue: #37434f;
    #regNodes {
        height: 100%;
        background-color: #edf1f4;
        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .content {
            padding-top: 50px;

            /*navigation to start*/

            .top-navigation {
                height: 40px;

                a {
                    text-align: center;
                    float: left;
                    display: block;
                    background-color: #fff;
                    width: 50%;
                    height: 40px;
                    line-height: 40px;

                    &.active {
                        border-bottom: 2px solid @nice-blue;
                        box-sizing: border-box;
                    }
                }
            }

            /*navigation to end*/
        }
    }
</style>
