<template>
    <div class="searchpage">
        <div class="searchpage-header">
            <div class="search-input">
                <i class="search-icon" ></i>
                <input v-model="search" type="text" placeholder="请输入关键字搜索" @keyup.enter="submitHandler"/>
            </div>
            <button class="searchimg" @click="goTreaty()">取消</button>
        </div>
        <div class="searchpage-body">
            <div class="" v-for="(item, index) in history" :key="index" @click="buttonSearch(item)">
                {{ item }}
            </div>

        </div>
        <div class="clear-history">
            <yd-button size="large" type="hollow" v-if="is_clear" @click.native="remove" style="color:#fff;background:#383c47;border-radius:10px;border:none;">清除历史记录</yd-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            search: '',
            history: [], // 搜索历史本地存储
            is_clear: false
        }
    },
    mounted () {
        let localSearch = this.getlocalSearch()
        if (localSearch) {
            this.history = localSearch.split(',')
            this.is_clear = true
        }
    },
    methods: {
        goTreaty(){
            this.$router.replace("/Treaty")
        },
        // 提交搜索
        submitHandler () {
            if (!this.search && this.search === '') {
                return false
            } else {
                this.setLocalSearch(this.search)
                this.$router.push({path: '/goodslist', query: {keywords: this.search}})
            }
        },
        // 设置搜索缓存本地
        setLocalSearch (keywords) {
            let key = this.GLOBAL.getStorage('keywords')
            if (!key) {
                this.GLOBAL.setStorage('keywords', keywords)
            } else {
                if (key.indexOf(keywords) === -1) {
                    this.GLOBAL.setStorage('keywords', keywords + ',' + key)
                }
            }
        },
        // 获取本地缓存
        getlocalSearch () {
            return this.GLOBAL.getStorage('keywords')
        },
        // 点击搜索记录搜索
        buttonSearch (val) {
            this.search = val
            this.submitHandler()
        },
        // 清除搜索缓存
        remove () {
            this.is_clear = false
            this.GLOBAL.removeStorage('keywords')
            this.history = []
        }
    }
}
</script>

<style>
    .searchpage{
        overflow: hidden;
    }
    .searchpage .search-input{
        position: relative;
    }
    .searchpage .search-input i{
        position: absolute;
        top: .32rem;
        left: .4rem;
        z-index: 1000;
    }
    .searchpage .search-input .search-icon:after{
        font-size: .35rem;
    }
    .searchpage .search-input input{
        height: .7rem;
        width: 85%;
        border: none;
        background-color: #383c47;
        border-radius: 2rem;
        position: absolute;
        top: .15rem;
        left: .2rem;
        opacity: .7;
        padding: 0 .7rem;
        color: #688098;
    }
    .searchpage-body{
        margin-top: 1rem;        
    }
    .searchpage-body>div{
        background: #383c47;
    }
</style>
