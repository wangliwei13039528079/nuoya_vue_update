<template>
  <div class="breedlistdetail">
        <div class="catchOne">
          <div class="nomalBox" v-for="item in orderList">
            <p>
              区块植物:
              <span class="colorYell">{{item.name}}</span>
            </p>
            <p>
              购买金额:
              <span class="colorYell">{{item.money}}</span>
            </p>
            <p>
              到期时间:
              <span class="colorYell">{{item.dtime}}</span>
            </p>
          </div>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            orderList: []

        }
    },
    components: {},
    created () {
    },
    mounted () {
        let that = this
        that.getOrderList()
    },
    methods: {
        getOrderList () {
            this.$api.reqOceanlicailist({}, res => {
                if (res.status) {
                    this.orderList = res.data
                }
            })
        }
    }
}
</script>

<style scoped>
.breedlistdetail {
  padding: 0 10px;
  color: #fff;
  font-size: 14px;
}
.breedlistdetail .catchOne {
  padding: 10px;
}
.breedlistdetail .nomalBox {
  /* display: flex; */
  align-items: left;
  margin: 10px 0;
  background: #2a2d4c;
  padding: 10px;
}
.breedlistdetail .nomalBox span {
  height: 30px;
  line-height: 30px;
}
.breedlistdetail .nomalBox .colorYell {
  color: #fc1;
  margin-left: 5px;
}
.breedlistdetail .nomalBox .btn {
  background: #406089;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 25px;
  padding: 5px 20px;
}
.breedlistdetail .nomalBox .goBtn {
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
