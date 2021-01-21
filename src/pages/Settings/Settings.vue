<template>
    <div id="settingsUser">
        <HeaderTop title="更多设置">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div class="userinfo-content-wrapper">
            <div class="userinfo-content">
                <vlink-cell-group>
                    <ListItem title='系统公告' :isLink="true" @goTo="goTo('/systemnotice')"></ListItem>
                    <ListItem title='声音提示' :isLink="true" @goTo="goTo('/VoiceTip')"></ListItem>
                    <!--<ListItem title='系统留言' :isLink="true" @goTo="goTo('/systemmsg')"></ListItem>-->
                </vlink-cell-group>

                <vlink-cell-group>
                    <ListItem title='多语言' :isLink="true"></ListItem>
                    <ListItem title='版本' :isLink="true"></ListItem>
                    <ListItem title='检测更新' :isLink="true"></ListItem>
                </vlink-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll";
    import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
    import ListItem from '../../components/ListItem/ListItem.vue'
    // import VlinkCellGroup from '../../components/CellGroup/CellGroup.vue'

    export default {
        data() {
            return {
            };
        },
        mounted() {

            this.$nextTick(() => {

                new BScroll('.userinfo-content-wrapper', {
                    click: true
                })


            });
        },


        methods: {
            goTo(path) {

                this.$router.push({path:path})
            }
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

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
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



