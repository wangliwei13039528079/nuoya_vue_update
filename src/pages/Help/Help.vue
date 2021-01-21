<template>
    <div id="help">
        <!-- <HeaderTop :title="$i18n.t('help')">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont icon-fanhui"></i>
            </a>

        </HeaderTop> -->
        <van-collapse v-model="activeNames">
            <van-collapse-item :title="item.title" :name="index" v-for="(item,index) in article" :key="index">
                <div v-html="item.content"></div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant';
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
Vue.use(Collapse).use(CollapseItem);
export default {
    data() {
        return {
            page:0,
            article:[],
            activeNames:['']
        };
    },
    created() {},
    mounted() {
        this.getArticle()
    },
    methods: {
        getArticle(){
            this.page++
            this.$api.articles({type_id:2,limit:10,page:this.page},res=>{
                this.article = res.data.list
            })
        }
    },
    components: {
        HeaderTop
    }
};
</script>

<style lang="less" scoped>
    #help {
        padding-bottom: 10px;
        padding-top: 50px;
        height: 100%;
        overflow: auto;
        .con {
            padding: 0 10px;
            div {
                line-height: 20px;
                font-size: 16px;
            }
        }
        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }
            /deep/ .uploader-box,
/deep/ .van-cell-group,
/deep/ .van-cell {
  background: rgba(0, 0, 0, 0);
  color: #fff !important;
}
/deep/ .van-field__control{
    color:#fff;
}
/deep/ .van-number-keyboard__body{
     color: #000 !important;
}
    }
</style>
