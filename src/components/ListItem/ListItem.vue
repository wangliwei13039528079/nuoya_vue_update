<template>
    <a class="user-item" @click="goTo()">
        <div class="content">
            <div class="left "><span>{{title}}</span></div>
            <div class="right"><span>{{value}}</span>
                <i v-show="isLink" class="iconfont icon-youjiantou"></i>
                <slot name="avatar"></slot>
                <slot name="file"></slot>
            </div>

        </div>
    </a>
</template>
<script>
    export default {
        props: {
            title: String,
            value: String,
            isLink: Boolean,
        },

        mounted() {
        },


        methods: {
            goTo() {
                // console.log(window.event.button);
                var li = event.currentTarget
                li.classList.add('active')


                setTimeout(function () {
                    li.classList.remove('active')
                }, 100)

                this.$emit('goTo')
            }
        }
    };
</script>
<style lang="less" scoped>
    .user-item {
        // background-color: #fff;
        padding-left: 20px;
        display: block;

        &.active {
            // background-color: #eee;
        }

        .content {
            width: 95%;
            position: relative;
            font-size: 14px;
            line-height: 45px;
            height: 45px;
            display: flex;
            box-sizing: border-box;
            justify-content: space-between;
          background: #36373f;
    -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.1rem;
    
           
margin: 0 0 .2rem 0;
            .left {
                padding:  0 0 0 20px;
                margin:7px 0 0 0;
                 line-height: 31px;
            height: 31px;

                vertical-align: middle;
                border-left: 2px solid rgb(238, 198, 127);
            }

            .right {
                color: #ababab;
                padding-right: 20px;

                > img {
                    height: 40px;
                    width: 40px;
                    vertical-align: middle;
                    border-radius: 50%;
                }
            }
        }

    }
</style>
