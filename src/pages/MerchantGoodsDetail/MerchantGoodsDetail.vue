<template>
    <div class="goodsdetail">
        <div class="goodsdetail-back">
            <i class="iconfont icon-zuo" @click="goBack"></i>
        </div>
        <!-- <slider
            :imgList="goodsData.album"
        ></slider> -->
        <div class="imgs">
            <img :src="goodsData.image_id" alt="">
        </div>
        <goodstitle
            :product="productSpes"
            :brief="goodsData.brief"
            :pro="''"
            :buyCount="goodsData.buy_count"
            :unit="goodsData.unit"
        ></goodstitle>
       <!-- <goodsservice
            :promotion="checkPromotion"
        ></goodsservice> -->
        <!-- <goodsstandard
            :spes="goodsData.spes_desc"
            @changeSpes="changeSpes"
        ></goodsstandard> -->
        <goodsnum :stock="goodsData.stock" @num="goodsNum" :unit="goodsData.unit"></goodsnum>
        <yd-tab>
            <yd-tab-panel label="图文详情">
                <ul v-html="goodsData.text"></ul>
            </yd-tab-panel>
            <yd-tab-panel class="params" label="产品参数">
                <ul v-if="params.length">
                    <li v-for="(item, index) in params" :key="index">
                        <div v-if="item.value"><span id="paramsleft">{{ item.name }} : </span><span id="paramsright">{{ item.value }}</span></div>
                    </li>
                </ul>
                <ul v-else>没有详细参数</ul>
            </yd-tab-panel>
            <yd-tab-panel class="comment" label="买家评论">
                <ul>
                    <li v-for="(item, index) in comment" :key="index">
                        <div class="comment-info">
                            <img :src="item.user.avatar" alt="" class="user-img">
                            <p class="user-name">{{ item.user.nickname }}</p>
                            <yd-rate slot="left" v-model="item.score" :readonly="true" size=".2rem"></yd-rate>
                        </div>
                        <p>{{ item.ctime }}  &nbsp;&nbsp;&nbsp;&nbsp;{{ item.addon }}</p>
                        <p>{{ item.content }}</p>
                            <yd-lightbox class="comment-imgs">
                                <yd-lightbox-img class="comment-img" v-for="(img, key) in item.images_url" :key="key" :src="img"></yd-lightbox-img>
                                <yd-lightbox-txt>
                                    <h1 slot="top">
                                        <div class="">
                                            <p class="user-name">{{ item.user.nickname }}</p>
                                            <yd-rate slot="left" v-model="item.score" :readonly="true" size=".2rem"></yd-rate>
                                        </div>
                                    </h1>
                                    <div slot="content">

                                        <p>{{ item.content }}</p>
                                    </div>
                                    <div slot="bottom">
                                        <p>{{ item.ctime }}</p>
                                    </div>
                                </yd-lightbox-txt>
                            </yd-lightbox>
                        <!--</div>-->
                    </li>
                    <li style="text-align: center">
                    <yd-button size="small" type="hollow" color="#F00" shape="circle" v-if="load" @click.native="loadMore">加载更多评论</yd-button>
                    <yd-button size="small" type="hollow" color="#AAA" shape="circle" v-else>没有更多评论了</yd-button>
                    </li>
                </ul>
            </yd-tab-panel>
        </yd-tab>
        <div class="retailBuyBtn" @click="buyNow">立即购买</div>
        <!-- <goodsdetailfooter
            :is_fav="is_fav"
            :cart_nums="cart_nums"
            @collection="collection"
            @addCart="add"
            @buyNow="buyNow"
        ></goodsdetailfooter> -->
    </div>
</template>

<script>
import slider from '../../components/Slider.vue'
import goodstitle from '../../components/GoodsTitle.vue'
import goodsservice from '../../components/GoodsService.vue'
import goodsstandard from '../../components/GoodsStandard.vue'
import goodsnum from '../../components/GoodsNum.vue'
import goodsdetailfooter from '../../components/GoodsDetailFooter.vue'
export default {
    data () {
        return {
            page: 1, // 商品评论分页参数
            pageSize: 5, // 商品评论分页数量
            goodsId: this.$route.query.goods_id ? this.$route.query.goods_id : '', // vueRouter传过来的商品id
            goodsData: [], // 商品数据
            productSpes: [], // 商品全部规格
            promotion: [], // 促销信息
            stock: '', // 选中规格的库存数量
            params: [], // 商品参数信息
            comment: [], // 商品的评论
            load: true, // 是否显示更多
            is_fav: false, // 是否收藏
            num: 1, // 购买的商品数量 默认为1
            cart_nums: 0 // 购物车数量
        }
    },
    components: {
        slider, goodstitle, goodsservice, goodsstandard, goodsnum, goodsdetailfooter
    },
    created () {
        this.goodsDetail()
        // this.goodsParams()
        this.goodsComment()
        // this.getCartNums()
    },
    computed: {
        // 促销信息重新计算满足的条件 如果存在不满足的条件 就不显示促销信息
        checkPromotion () {
            if (this.promotion) {
                let arr = []
                for (let k in this.promotion) {
                    if (this.promotion[k].type === 2 || this.promotion[k].type === 1) {
                        arr.push(this.promotion[k])
                    }
                }
                return arr
            }
        }
    },
    
    methods: {
        // 获取商品详情
        goodsDetail () {
            this.$api.selfSupportGoodsDetail({goods_id: this.goodsId}, res => {
                this.goodsData = res.data
                if (res.status && res.data.length !== 0) {
                    this.goodsData = res.data
                    // 获取用户是否收藏
                    if (res.data.isfav === 'false') {
                        this.is_fav = false
                    } else {
                        this.is_fav = true
                    }
                    // 商品规格信息
                    this.productSpes = {name:res.data.name,price:res.data.price,mktprice:res.data.mktprice}
                    this.promotion = res.data.product.promotion_list
                    // 添加用户浏览足迹
                    if (this.GLOBAL.getStorage('user_token')) {
                        this.goodsBrowsing()
                    }
                    // 微信分享
                    this.weixinConfig()
                } else {
                    this.$dialog.alert({
                        mes: '该商品不存在',
                        callback: () => {
                            this.$router.go(-1)
                        }
                    })
                }
            })
        },
        // 获取商品参数信息
        goodsParams () {
            this.$api.goodsParams({id: this.goodsId}, res => {
                if (res.status) {
                    this.params = res.data
                }
            })
        },
        // 获取商品评论信息
        goodsComment () {
            this.$api.goodsComment({
                page: this.page,
                limit: this.pageSize,
                goods_id: this.goodsId
            }, res => {
                if (res.status) {
                    const _list = res.data.list
                    let commentCount = res.data.count
                    for (let k in _list) {
                        _list[k].ctime = this.GLOBAL.timeToDate(_list[k].ctime)
                    }
                    if (_list.length >= commentCount) {
                        this.load = false
                    }
                    this.comment = [..._list]
                }
            })
        },
        loadMore () {
            this.$api.goodsComment({
                page: ++this.page,
                limit: this.pageSize,
                goods_id: this.goodsId
            }, res => {
                if (res.status) {
                    const _list = res.data.list
                    let commentCount = res.data.count
                    for (let k in _list) {
                        _list[k].ctime = this.GLOBAL.timeToDate(_list[k].ctime)
                    }
                    this.comment = [...this.comment, ..._list]
                    if (this.comment.length >= commentCount) {
                        this.load = false
                    }
                }
            })
        },
        // 获取微信分享配置参数
        weixinConfig () {
            let isWeiXinBrowser = this.GLOBAL.isWeiXinBrowser()
            if (isWeiXinBrowser) {
                this.$api.weixinShare(this.goodsData.name, this.goodsData.image_url, this.goodsData.brief)
            }
        },
        // 更改默认货品
        changeSpes (id) {
            this.$api.getProductInfo({id: id}, res => {
                if (res.status) {
                    this.productSpes = res.data
                }
            })
        },
        // 子组件传过来的商品数量
        goodsNum (num) {
            this.num = num
        },
        // 添加商品浏览足迹
        goodsBrowsing () {
            this.$api.addGoodsBrowsing({goods_id: this.goodsData.id}, res => {})
        },
        // 立即购买
        buyNow () {
            this.$router.push({path: '/MerchantFirmOrder', query: {id:this.goodsId,num:this.num}})
            
        },
        goBack () {
            if (window.history.length <= 1) {
                this.$router.push({path: '/'})
                return false
            } else {
                this.$router.go(-1)
            }
            // 上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
            // 如果上面都执行了 页面都跳走了，这个也就不用管了
            // setTimeout(() => {
            //     this.$router.push({path:'/'})
            // },500)
        }
    }
}
</script>

<style scoped>
    .comment{
        text-align: left;
    }
    .comment-info{
        height: 30px;
        /*position: relative;*/
    }
    .comment p{
        float: none !important;
    }
    .comment-info p{
        float: left !important;
    }
    .comment-info .yd-rate{
        float: left;
        position: relative;
        top: 50%;
        /*left: 10px;*/
        
        transform: translateY(-50%);
    }
    .comment ul{
        padding: 10px;
    }
    .comment li{
        padding: 10px 0;
    }
    .comment .user-img{
        width: 30px !important;
        height: 30px !important;
        border-radius: 50% !important;
    }
    .comment .user-name{
        display: inline-block;
        position: relative;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        color: #a0a0a0;
        margin-right: 15px;
    }
    .goodsdetail-back {
        position: absolute;
        top: .3rem;
        left: .3rem;
        color: #fff;
        z-index: 999;
        width: .7rem;
        height: .7rem;
        line-height: .7rem;
        text-align: center;
        background-color: rgba(0,0,0,.3);
        border-radius: 50%;
    }
    .goodsdetail-back i {
        font-size: .3rem;
    }
    .goodsdetail .comment-imgs{
        width: 100%;
        overflow: hidden;
        margin-top: .15rem;
    }
    .goodsdetail .comment-imgs .comment-img{
        width: 25%;
        height: 2rem;
        margin-right: 3%;
        background-color: #fff;
        float: left;
        position: relative;
    }
    .goodsdetail .comment-imgs .comment-img:nth-child(3n){
        margin-right: 0;
    }
    .goodsdetail .comment-imgs .comment-img img{
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 100%;
        max-width: 100%;
        transform: translate(-50%, -50%);
    }
    .goodsdetail .retailBuyBtn {
        position: fixed;
        bottom: 0px;
        left: 0;
        width: 100%;
        padding: 15px 0;
        text-align: center;
        background-color: #ef4f4f;
        font-size: 16px;
    }
    .goodsdetail .imgs {
        width: 100%;
        height: 414px;
    }
    .goodsdetail .imgs img {
        width: 100%;
        height: 100%;
    }
</style>
