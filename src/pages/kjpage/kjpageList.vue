<template>
  <div class="kjpageList">
    <header-top title="矿机释放">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont icon-fanhui"></i>
      </a>
    </header-top>
    <div class="content-wrap">
      <div class="orders">
        <ul class="tit">
          <!-- <li>账号</li> -->
          <li>金额</li>
          <li>状态</li>
          <li style="width:20%">等级</li>
          <li style="width:30%">时间</li>
        </ul>
        <div class="con" v-for="(item,index) in allOrders" @click="elasticFrame(index)">
          <!-- <p style="overflow: auto;">{{item.username}}</p> -->
          <p>{{item.num}}</p>
          <p
            :class="item.status==2 ||item.status==3 ||item.status==5?'colorRed':''"
          >{{star(item.status)}}</p>
          <p style="width:20%">{{item.level}}</p>
          <p style="width:30%">
            <span v-show="item.status!=2">{{item.ctime.substr(5,11)}}</span>
            <van-count-down
              v-show="item.status==2"
              :time="countDownfuc(item.dtime)"
              format="mm 分 ss 秒"
              @finish="getOver"
            />
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="elasticFrame" v-show="elasticFrameShow">
      <p>
        <span>账号</span>
        <span>{{clickMsg.username}}</span>
      </p>
      <p>
        <span>手机号</span>
        <span>{{clickMsg.mobile==0?'暂无':clickMsg.mobile}}</span>
      </p>
      <p>
        <span>金额</span>
        <span>{{clickMsg.num}}</span>
      </p>
      <p>
        <span>状态</span>
        <span :class="clickMsg.status==2?'colorRed':''">{{star(clickMsg.status)}}</span>
      </p>
      <p>
        <span>最低等级</span>
        <span>{{clickMsg.level}}</span>
      </p>
      <p>
        <span>时间</span>
        <span v-show="clickMsg.status!=2">{{clickMsg.ctime}}</span>
        <van-count-down
          v-show="clickMsg.status==2"
          :time="countDownfuc(clickMsg.dtime)"
          format="mm 分 ss 秒"
          @finish="getOver"
        />
      </p>
      <p>
        <span>微信</span>
        <span>暂无</span>
      </p>
      <button class="elasticBtn" @click="elasticFrameHide">确定</button>
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import { reqTransaction } from "../../common/apigo";
import { Cell, CellGroup } from "vant";
import HeaderTop from "../../components/HeaderTop/HeaderTop";

Vue.use(Cell).use(CellGroup);

import { Toast } from "vant";

Vue.use(Toast);
import { CountDown } from "vant";

Vue.use(CountDown);
export default {
  name: "moneyList",
  components: { HeaderTop },
  data() {
    return {
      types: "",
      orders: [],
      uid: null,
      allOrders: [],
      start: -50,
      moreShow: true,
      ftime: "",
    //   elasticFrameShow: false,
      clickMsg: {}
    };
  },

  mounted() {
      console.log(this.$route.query.id)
    this.userOnline();
  },

  methods: {
    userOnline() {
      this.$api.userGradeList({}, res => {
        if (res.status) {
          this.allOrders = res.data;
          this.ftime = res.date;
        }
      });
    },
    countDownfuc(dtime) {
      if (dtime) {
        let ggg;
        ggg = dtime.replace(/-/g, "/");
        var date = new Date(ggg);
        var endTime = Date.parse(date);
        let fTime = this.ftime.replace(/-/g, "/");
        let startTime = Date.parse(new Date(fTime));
        let differ = Number(endTime) - Number(startTime);
        // differ = 12000;
        if (differ < 2) {
          // this.userGradeList()
          return 0;
        }
        return differ;
      }
    },
    star(value) {
      switch (value) {
        case 1:
          return "直接到账";
          break;
        case 2:
          return "待升级";
          break;
        case 3:
          return "错过";
          break;
        case 4:
          return "升级到账";
          break;
        case 5:
          return "下级错过";
          break;
      }
    },
    getOver() {
      this.userOnline();
    },
    // elasticFrame(idx) {
    //   this.elasticFrameShow = true;
    //   this.clickMsg = this.allOrders[idx];
    // },
    // elasticFrameHide() {
    //   this.elasticFrameShow = false;
    //   this.clickMsg = {};
    // }
  },
  beforeDestroy() {
    clearInterval(this.countDowntime);
    this.countDowntime = null;
  }
};
</script>

<style scoped lang="less">
.kjpageList {
  font-size: 14px;
  height: 100%;
  padding-top: 50px;
  overflow: auto;
  padding-bottom: 50px;
  .back {
    padding: 0 10px;

    i {
      font-size: 15px;
      color: #fff;
      line-height: 50px;
    }
  }
  .more {
    text-align: center;
    padding: 5px;
  }
  .tit {
    font-size: 16px;
    li {
      width: 25%;
      text-align: center;
    }
  }
  .tit,
  .con {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ebedf0;
    align-items: center;
  }
  .con {
    p {
      width: 25%;
      text-align: center;
    }
  }
  .orders {
    .order-item {
      position: relative;

      p {
        padding: 5px 0;
      }

      padding: 10px;

      .left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .img-box {
        margin-left: 10px;
        width: 35px;
        height: 35px;

        img {
          width: 35px;
          height: 35px;
        }
      }

      .date {
        margin-left: 10px;
      }

      .icon-youjiantou {
        position: absolute;
        top: 15px;
        right: 6px;
      }
    }
  }
  .colorRed {
    color: #f00;
  }
  .elasticFrame {
    width: 300px;
    height: 400px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -200px;
    margin-left: -150px;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px 10px;
    border-radius: 10px;
    p {
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
    }
    .elasticBtn {
      position: absolute;
      bottom: 30px;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-left: -30px;
      left: 50%;
      border: none;
    }
  }
  /deep/ .van-count-down {
    color: #f00;
  }
}
</style>
