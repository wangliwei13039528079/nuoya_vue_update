<template>
  <div class="catch">
    <div class="hhead">
      <div class="iconfont iconfanhui left" @click="$router.back();"></div>
      <div class="center">{{orderList.length==0?'购买记录':'消费记录'}}</div>
      <!-- <div class="right" @click="goTo('/breedlist');">记录</div> -->
    </div>
    <div class="catchOne"  v-if="orderList.length>0">
      <div class="nomalBox" v-for="item in orderList">
        <p>
          消费记录:
          <span class="colorYell">{{item.money*1}}</span>
        </p>
        <!-- <p>
          购买金额:
          <span class="colorYell">{{item.money*1}}</span>
        </p> -->
        
        <!-- <p>
          赠送积分:
          <span class="colorYell">{{item.point*1}}</span>
        </p> -->
        <!-- <p>
          积分收益:
          <span class="colorYell">${{item.usdt*1}}</span>
        </p> -->
        <!-- <p>
         消费方式:
          <span class="colorYell">{{item.one}}</span>
        </p> -->
        <!-- <p>
          活跃状态:
          <span class="colorYell">{{sta(item.status)}}</span>
        </p> -->
         <!--
         <p>
          剩余天数:
          <span class="colorYell">{{item.day}}天</span>
        </p>
        <!-- <p> -->
          购买时间:
          <span class="colorYell">{{item.ctime}}</span>
        </p>
        <!-- <p>
          到期时间:
          <span class="colorYell">{{item.dtime}}</span>
        </p> -->
         <p>
          <button   v-if="item.status<=0"   style="padding:10px; background-color:#1a6bdd;width:100px;margin: 10px auto;border-radius:5px;color:#fff" @click="applyOutb">激活(0.3U)</button>
       </p>
        <!-- <p v-show="item.day==0 && item.status==2">
          <span class="btn" @click="over()">收割</span>
        </p> -->
      </div>
           


    </div>
    <div  class="noneOne" v-else>
      您还未购买
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(Toast)
export default {
    data () {
        return {
            orderList: []
        }
    },
    components: {},
    created () {},
    mounted () {
        let that = this
        that.getOrderList()
    },
    methods: {
       applyOutb () {
      this.$dialog.confirm({
        mes: '确认后申请信息将提交给后台，是否继续?',
        opts: [
          {
            txt: '确定',
            color: true,
            callback: () => {
              this.$api.applyOutb({}, res => {
                if (res.status) {
                  this.$dialog.toast({
                    mes: res.msg,
                     timeout: 1000,
                    icon: 'success',
                   
                      callback: () => {
                               //  this.GLOBAL.removeStorage('uuid')
                                this.$router.replace('/breed')
                      }
                  })
                } else {
                  this.$dialog.toast({
                    mes: res.msg,
                    icon: 'error',
                    timeout: 1000
                  })
                }
              })
            }
          },
          {
            txt: '取消',
            color: false
          }
        ]
      })
    },
        getOrderList () {
            this.$api.reqOceanlicailist({}, res => {
                if (res.status) {
                    this.orderList = res.data
                }
            })
        },
        // goDetail() {
        //   this.$router.push("/breedlistdetail");
        // },
        sta (sta) {
            switch (sta) {
            case 1:
                return '活跃'
                break
            case 2:
                return '待收割'
                break
            case 3:
                return '已收割'
                break
            }
        },
        over () {
            let oid = this.orderList[0].id
            this.$api.reqOceanharvest({oid}, res => {
                if (res) {
                    Toast(res.msg)
                    if (res.status) {
                        this.getOrderList()
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.catch {

  color: #fff;
  font-size: 14px;
}
.catch .hhead{
  height: 50px;
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  background: #474953;
  padding: 0 20px;
}
.catch .hhead>div{
  width: 33.3%;
  color: #fff;
  line-height: 50px;
}
.catch .hhead .left{
  text-align: left;
  font-size: 15px;
}
.catch .hhead .center{
  text-align: center;
  font-size: 18px;
}
.catch .hhead .right{
  text-align: right;
  font-size: 15px;
}
.catch .catchOne {
  padding: 10px;
}
.catch .nomalBox {
  /* display: flex; */
  align-items: left;
  margin: 10px 0;
  background: rgb(61, 62, 70);
  padding: 10px;
      -webkit-box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    box-shadow: 0 -0.05rem 0.05rem rgba(0,0,0,.3);
    border-radius: 0.2rem;
}
.catch .nomalBox span {
  height: 30px;
  line-height: 30px;
}
.catch .nomalBox .colorYell {
  color: #fc1;
  margin-left: 5px;
}
.catch .nomalBox .btn {
  background: #406089;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 25px;
  padding: 5px 20px;
}
.catch .nomalBox .goBtn {
  background: #fff;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 25px;
  border: 1px solid #fc1;
  color: #fc1;
  float: right;
}
.catch .noneOne{
  color: #000;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
/deep/ .van-tabs__nav {
  background: rgb(0, 27, 51);
}
/deep/ .van-tabs__line {
  background: #fc1;
}
/deep/ .van-hairline--top-bottom::after {
  border-width: 0;
}
/deep/ .van-tab--active {
  color: #fc1;
}
/deep/.van-icon {
  top: -9px;
  left: 7px;
}
</style>
