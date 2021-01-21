<template>
    <div id="aboutDapp">
        <div class="con">
            <!-- <p>{{article.title}}</p> -->
            <div v-html="article.content"></div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            page:0,
            article:{}
        };
    },
    created() {},
    mounted() {
        this.getArticle()
    },
    methods: {
        getArticle(){
            this.page++
            this.$api.articles({type_id:3,limit:1,page:this.page},res=>{
                this.article = res.data.list[0]
            })
        }
    },
};
</script>

<style lang="less" scoped>
    #aboutDapp {
        padding-bottom: 60px;
        .con {
            padding: 0 10px;
            div {
                line-height: 20px;
                font-size: 16px;
            }
        }
    }
</style>
