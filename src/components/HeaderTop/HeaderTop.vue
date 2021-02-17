<template>
    <header id="header">
        <slot name="left"></slot>
        <span class="iconfont icon-bars icon1"></span>
        <span class="header-title">{{title}}</span>
        <span class="iconfont icon-lingdang icon2"></span>


        <slot name="right"></slot>
    </header>
</template>
<script>
    export default {
        props: {
            title: String
        },
    }
</script>
<style lang="less">
    #header {
        // background-color: #37434f;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        min-width: 320px;
        width: 100%;
        display: flex;
        height: 50px;
        background-color: #F6F7FC;

        .header-title {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 18px;
            font-weight: 500;
            letter-spacing:2px;
            transform: translate(-50%, -50%);
            width: 50%;
            color: #000000;
            text-align: center;
            font-weight:548;
        }
        .icon1 {
            position: absolute;
            top: 50%;
            left: 5%;
            font-size: 18px;
            font-weight: 500;
            letter-spacing:2px;
            transform: translate(-50%, -50%);
            color: #000000;
            text-align: center;
            font-weight:548;
        }
        .icon2 {
                    position: absolute;
                    top: 50%;
                    float:right;
                    right: 5%;
                    font-size: 18px;
                    font-weight: 500;
                    letter-spacing:2px;
                    transform: translate(-50%, -50%);
                    color: #000000;
                    text-align: center;
                    font-weight:548;
                }
    }
</style>
