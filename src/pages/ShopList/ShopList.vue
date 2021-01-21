<template>
    <div id="entityStore">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :distance="2">
            <yd-list theme="4" slot="list">
                <yd-list-item v-for="item, key in allList" :key="key" @click.native="goShop('/ShopDetail',item.uid,item.storename)">
                    <img slot="img" :src="item.logo">
                    <span slot="title">{{item.storename}} (等级：{{item.level}})</span>
                    <yd-list-other slot="other">
                        <div>
                           <!-- <p>{{item.content}}</p> -->
                           <p class="explain">店铺主营：{{item.explain}}</p>
                        </div>
                        <!-- <div>content</div> -->
                    </yd-list-other>
                </yd-list-item>
            </yd-list>
        </yd-infinitescroll>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            allList:[],
            limit:10,
            page:1
        };
    },
    created() {},
    mounted() {
        this.getShop()
    },
    methods: {
        loadList(){
            this.$api.shopList({limit:this.limit,page:++this.page},res=>{
                this.list = res.data
                this.allList = this.allList.concat(this.list)
                if (this.list.length < this.limit) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                    return
                }
                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            })
        },
        goShop(path,id,name){
            this.$router.push({path:path,query:{shopId:id,name:name}})
        },
        // 获取商铺列表
        getShop(){
            this.$api.shopList({limit:this.limit,page:this.page},res=>{
                this.list = res.data
                this.allList = this.allList.concat(this.list)
                if (this.list.length < this.limit) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                }
            })
        }
    },
};
</script>

<style lang="less" scoped>
    #entityStore {
        padding-bottom: 50px;
        .yd-list-theme4 {
            background-color: #f5f5f5;
        }
        .yd-list-theme4 .yd-list-item {
            align-items: center;
            margin-bottom: 8px;
            background-color: #fff;
            border-radius: 5px;
        }
        .explain {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            width: 100%;
        }
        

    }
</style>
