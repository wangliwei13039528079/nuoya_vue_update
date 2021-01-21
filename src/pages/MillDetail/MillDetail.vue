<template>
  <div class="millDetail">
        <div class="imgs">
            <img src="../../common/images/millInfo.png" alt="">
        </div>
        <van-cell-group>
            <van-cell title="名称" value="矿机" />
            <van-cell title="等级" :value="millLevel" />
            <van-cell title="芯片等级" :value="chipLevel" />
            <van-cell title="芯片数量" :value="chipNum" />
            <van-cell title="算力" :value="power" />
            <van-cell title="状态" :value="status==0?'运行中':'已结束'" />
        </van-cell-group>
        <div class="btn">
        <div @click="goTo('/Operation?id='+id + '&status='+status)">查看收益</div>
        <div @click="goTo('/Upgrade?id='+id)">升级</div>
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
export default {
  data() {
    return {
        id:this.$route.query.id,
        millLevel:'',
        power:'',
        status:'',
        chipNum:'',
        chipLevel:''

    };
  },
  created() {

  },
  mounted() {
    this.getMillDetail()
  },
  methods: {
      goTo(path){
          this.$router.push({path:path})
      },
      getMillDetail(){
          this.$api.single({mid:this.id},res=>{
            if(res.status) {
                this.millLevel = res.data.level
                this.chipLevel = res.data.chip_level
                this.chipNum = res.data.chip_num
                this.power = res.data.power
                this.status = res.data.status
            }
          })
      }
  },
};
</script>

<style lang="less" scoped>
    .millDetail {
        /deep/.van-cell {
            background-color: #000;
            color: #fff;
            border-bottom: 1px solid #1A202E;
            .van-cell__value {
                color: #fff;
            }
        }
        /deep/.van-hairline--top-bottom::after {
            width: 0;
        }
        .van-cell:not(:last-child)::after {
            width: 0;
        }
        .imgs {
            width: 100%;
            height: 40%;
            // margin-bottom: 20px;
            background: url('../../common/images/line.png');
            background-size: contain;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .btn {
            padding: 0 20px;
            display: flex;
            justify-content: space-around;
            margin-top:20px;
            width: 100%;
            height: 67px;
            background: url('../../common/images/line.png');
            background-size: cover;

            div {
                border: none;
                width: 150px;
                height: 67px;
                line-height: 67px;
                text-align: center;
                background: url('../../common/images/millInfoBtn.png');
                background-size: contain;
                background-position: center;
            }
        }

    }
</style>
