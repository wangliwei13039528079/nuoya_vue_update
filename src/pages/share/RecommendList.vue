<template>
    <div class="recommendlist">
        <!-- <div style="padding: 0 15px;color:#fff;font-size:14px">
            <p >分享人数：{{share}}</p>
            <p>社区人数：{{total}}</p>
            <p >A区业绩：{{aleft}}</p>
            <p>B区业绩：{{bleft}}</p>
           <p>市场统计：{{Number(statistics).toFixed(2)}}</p> 
        </div> -->
        <ul class="my_assets clearfix">
        <li>
        <h3>{{share}}</h3>
        <p>分享人数</p>
        </li>
        <li>
        <h3>{{total}}</h3>
        <p>社区人数</p>
        </li>
        </ul>
        <ul class="my_assets clearfix">
        <!-- <li>
        <h3>{{aleft}}</h3>
        <p>A业绩</p>
        </li>
        <li>
        <h3>{{bleft}}</h3>
        <p>B业绩</p>
        </li> -->
        </ul>
       
        <yd-infinitescroll :callback="loadMore" ref="infinitescrollDemo">
            <ul class="recommend" slot="list">
                <div class="jilvzi">记录</div>
                  <!-- <li class="recommenddetail" v-for="(item, index) in list" :key="index">
                    <img class="user-img" :src="item.avatar"/>
                    <div class="recommendcontent">
                        <h4>用户：{{ item.nickname ? item.nickname : '暂无'}}</h4>
                        <p> <span>时间：{{ item.ctime }}</span></p>
                        <p><span>区域：{{ item.location === 1 ? 'A区' : ''  }} {{ item.location === 2 ? 'B区' : ''  }}</span></p>
                        <p><span>A业绩：{{ item.aleft }} </span></p>
                        <p><span>B业绩：{{ item.bleft }} </span></p>
                    </div>
                </li>   -->
                 <div class="coin-content">
                    <div class="coin-item" v-for="(item,index) in list" :key="index">
                        <div class="coin">
                            <div class="icon">
                                <div style="display: flex;align-items: center;"><img class="imgh1" :src="item.avatar" alt />
                                          <p style="font-weight:500;font-size: 0.32rem;">{{ item.nickname ? item.nickname : '暂无'}} </p>
                                </div>
                                <div class="qustyle">{{ item.location === 1 ? 'A区' : ''  }} {{ item.location === 2 ? 'B区' : ''  }}</div>
                            </div>
                            <!-- <div class="content_box">
                                <div class="total">
                                    <p>A业绩</p>
                                    <p class="classRed p1">{{item.aleft}}</p>
                                </div>                           
                                <div class="lock">
                                    <p>B业绩</p>
                                    <p class="classRed p1">{{item.bleft}}</p>
                                </div>
                            </div> -->
                        </div>
                        <div class="menu-box">
                           <a>{{item.ctime}}</a>
                          <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </ul>
        </yd-infinitescroll>
    </div>
</template>

<script>
export default {
    data () {
        return {
            page: 1,
            pageSize: 10,
            list: [], // 用户推荐列表
            share:'',
            total:'',
            statistics:'',
            aleft:'',
            bleft:'',
        }
    },
    mounted () {
        this.recommend()
    },
    methods: {
        // 获取推荐记录列表
        recommend () {
            this.$api.recommendList({
                page: this.page,
                limit: this.pageSize
            }, res => {
                const _list = res.data
                this.list = [..._list]
                this.share = res.valid1
                this.total = res.valid2
                this.aleft = res.aleft
                this.bleft = res.bleft
                this.statistics = res.teamall
                if (_list.length < this.pageSize) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                }
            })
        },
        loadMore () {
            this.$api.recommendList({
                page: ++this.page,
                limit: this.pageSize
            }, res => {
                const _list = res.data
                this.list = [...this.list, ..._list]
                if (_list.length < this.pageSize) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                }
                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
            })
        }
    }
}
</script>

<style scoped lang="less">
   .content_box {
            display: flex;
            justify-content: space-between;
            .total,
            .num,
            .lock {
               .p2{
          font-size: 0.28rem;
        }
                p {
                  font-size: 0.22rem;
                    padding:0 0 8px 0;
                    margin:3px 0 0 0;
                }
                 .p1 {
                  font-size: 0.35rem;
                      color: #eec67f;
                }
                .span3{
                  margin-left: 0.1rem;
                      font-size: 0.2rem;
    color: #7b8085;
                }
            }
            .lock {
              
                text-align: right;
            }
        }
        .coin {
            font-size: 0.28rem;
            padding: 0 20px;
            .icon {
                display: flex;
                align-items: center;
                padding: 8px 0 8px;
                justify-content: space-between;
                .imgh1 {
                  width: 0.4rem;
                   height: 0.4rem;
                    margin-right: 10px;
                    border-radius:50%;
                }
                .qustyle{
                    border:1px solid #eec67f;
                color: #eec67f;
                padding: 0 .3rem;
                margin:.1rem 0 0 0;
                border-radius: 4px;
                font-size: 12px;
                background:rgb(53,54,61);
                }
            }

        }

        .coin-item {
            margin: 10px 18px;;
            justify-content: space-between;
            border-radius: 5px;
            background-color: #3d3e46;
            box-shadow: 0px 0px 0.1rem rgba(0,0,0,.2);

            .content-box {
                padding: 10px;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                //   color: #14364b;
                flex: 1;

                .type {
                    padding: 10px;
                    display: flex;
                    font-size: 16px;
                    font-weight: bold;
                    justify-content: space-between;
                }

                .info-box {
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                }
            }

            .menu-box {
                font-size: 12px;
                padding: 10px;
                margin:0 .3rem .3rem .3rem;
               // display: flex;
              // float: right;
                text-align: center;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                border-top: 1px solid #35363e;
               
                // 
                //   color: #9ba9b1;
                //   background-color: #f5f5f5;

                > a {
                 
                    // flex: 1;
                    // width: 60px;
                    // border-right: 1px solid #232121;
                    // background: url(../../../static/image/cashBtn.png);
        
                    float: right!important;
                  
                }
                :last-child{
                    margin-right:0;
                }
                .clear{
                  clear: both
                }
               
            }
        }
        </style>
        <style>
.jilvzi{
 margin: 0.2rem 0 0 0.4rem;
 font-size: .34rem;
}
.clearfix::after {
	content: "";
	display: block;
	clear: both;
}
.my_assets {
	padding:0.1rem 0.35rem;
}
.my_assets li {
	float:left;
	width:3.2rem;
	height:1.2rem;
	border-radius:0.1rem;
	box-shadow: 0rem 0.04rem 0.04rem rgba(0,0,0,.2);
	border:1px solid #b7967f;
	text-align:center;
}
.my_assets li:nth-child(2) {
	float:right;
}
.my_assets li h3 {
	padding-top:0.15rem;
	color:#fff;
	font-size:0.34rem;
}
.my_assets li p {
	font-size:0.22rem;
	color:#9fa7b3;
	margin-top:0.1rem;
}
    .recommendlist{
        height: 100%;
        /* background: #fff; */
    }
    .recommenddetail{
        text-align: left;
        padding: .3rem .2rem 0;
        width: 100%;
        box-sizing: border-box;
        position: relative;
    }
    .recommenddetail .user-img{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .recommendcontent{
        display: inline-block;
        border-bottom: 1px solid #161616;
        padding-bottom: .3rem;
        overflow: hidden;
        width: calc(100% - 1.3rem);
        margin-left: 1.2rem;
    }
    .recommendcontent h4{
        font-size: .3rem;
        margin-bottom: .1rem;
    }
    .recommendcontent p{
        color: #fff;
        margin-bottom: .15rem;
    }
    .recommendcontent span{
        color: #fff;
    }
    .recommendcontent .yd-list-donetip {
        color: #fff;
        background-color: transparent !important;
    }

</style>
