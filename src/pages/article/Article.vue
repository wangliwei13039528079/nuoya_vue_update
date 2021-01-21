<template>
    <div class="notice" style="background-color:#474953;">
<!--        <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">-->
        <h2 class="notice-title" style="color: white">{{ article.title }}</h2>
        <div class="notice-content" style="color: white">
            <p v-html="article.content"></p>
        </div>
        <div class="notice-footer" style="color: white">
            <span>{{ this.GLOBAL.timeToDate(article.ctime) }}</span>
        </div>
<!--        </yd-infinitescroll>-->
    </div>
</template>

<script>
export default {
    data () {
        return {
            article: []
        }
    },
    created () {
        this.$api.articleInfo({article_id: this.$route.query.article_id}, res => {
            console.log(res)
            if (res.status && res.data) {
                this.article = res.data
            } else {
                this.$dialog.alert({
                    mes: res.msg,
                    timeout: 1300,
                    callback: () => {
                        this.$router.back(-1)
                    }
                })
            }
        })
    },
    methods: {
        loadMore () {
            this.$api.articleList({
                page: ++this.page,
                limit:10,// this.pageSize,
                type_id: this.typeId
            }, res => {
                const _list = this.dateFormat(res.data.list)
                this.articleList = [...this.articleList, ..._list]
                if (_list.length < this.pageSize) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                    return
                }
                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            })
        },
        // 时间格式化
        dateFormat (list) {
            list.forEach((item) => {
                item.ctime = this.GLOBAL.timeToDate(item.ctime)
            })
            return list
        },
        showDetail (id) {
            this.$router.push({path: '/article', query: {article_id: id}})
        }
    }
}
</script>

<style>
</style>
