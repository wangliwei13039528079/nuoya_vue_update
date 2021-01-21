<template>
  <div id="Bili">
    <HeaderTop title="币币">
      <a class="back" @click="$router.back()" slot="left">
        <i class="iconfont iconfanhui"></i>
      </a>
    </HeaderTop>
    <div class="con">
      <div class="conTit">
        <div class="conTitLeft">
          <span>{{coinPa}}</span>
          <!-- <van-icon
            name="arrow-down"
            style="color:#6e94e5;font-size:16px;height:60px;line-height:60px;width:20px;"
          />-->
        </div>
        <div class="conTitRight">
          <div class="conTitRightL">
            <div class="conTitRightSize" :class="colorType">{{timePrice2}}</div>
            <!-- <div style="color:#97b4c4">≈≈5825</div> -->
          </div>
          <!-- <van-icon name="bar-chart-o" class="conTitRightR" @click="goKline()"/> -->
        </div>
      </div>
      <div class="changeStyle">
        <div class="conCenter">
          <div class="conCenterLeft">
            <van-tabs v-model="active">
              <van-tab title="买入">
                <div class="tabOne">
                  <p>价格</p>
                  <div>
                    <input
                      style="color:#fff;font-size:14px;width:70px;border:none;background:none;text-align:center;"
                      v-model="priceBuy"
                      type="number"
                      @keyup="toFixedtwo()"
                    >
                  </div>
                  <span
                    @click="priceMinusBuy()"
                    style="display:block;width:30px;border-right:1px solid #575f765e;"
                  >-</span>
                  <span @click="priceAddBuy()">+</span>
                </div>
                <div class="tabTwo">
                  <!-- <span></span>     -->
                  <p>
                    <span>数量</span>
                    <input type="number" @keyup="toFixedfour()" v-model="numBuy">
                    <span style="text-align:right">{{coinNameB}}</span>
                  </p>
                </div>
                <div class="tabThree">
                  <p>
                    <span>交易额</span>
                    <input type="number" v-model="totalBuy" disabled>
                    <span style="text-align:right">{{coinNameB}}</span>
                  </p>
                </div>
                <div class="tabThree" style="border:none;margin:0;font-size:10px;">
                  <p>
                    <span>可用</span>
                    <input style="border:none;background:none" type="number" v-model="yue" disabled>
                    <span style="text-align:right">{{coinNameS}}</span>
                  </p>
                </div>
                <span v-if="!lockLoading"
                  @click="createOrder(1)"
                  style="background:#4bbd82;margin:0 auto 0;display:block;height:40px;line-height:40px;font-size:16px;color:#fff;text-align:center;border-radius:5px;"
                >确定买入</span>
                  <van-button v-if="lockLoading"
                              loading
                              disabled
                              style="background:#4bbd82;margin:0 auto 0;display:block;height:40px;line-height:40px;font-size:16px;color:#fff;text-align:center;border-radius:5px;width: 100%;"
                  >确定买入</van-button>
              </van-tab>
              <van-tab title="卖出">
                <div class="tabOne">
                  <p>价格</p>
                  <div>
                    <input
                      style="color:#fff;font-size:14px;width:70px;border:none;background:none;text-align:center;"
                      v-model="priceSell"
                      type="number"
                      @keyup="toFixedtwoS()"
                    >
                  </div>
                  <span
                    @click="priceMinusSell()"
                    style="display:block;width:30px;border-right:1px solid #575f765e;"
                  >-</span>
                  <span @click="priceAddSell()">+</span>
                </div>
                <div class="tabTwo">
                  <p>
                    <span>数量</span>
                    <input type="number" v-model="numSell" @keyup="toFixedfourS()">
                    <span style="text-align:right">{{coinNameB}}</span>
                  </p>
                </div>
                <div class="tabThree">
                  <p>
                    <span>交易额</span>
                    <input type="number" v-model="totalSell" disabled>
                    <span style="text-align:right">{{coinNameB}}</span>
                  </p>
                </div>
                <div class="tabThree" style="border:none;margin:0;font-size:10px;">
                  <p>
                    <span>可用</span>
                    <input
                      style="border:none;background:none"
                      type="number"
                      v-model="yueS"
                      disabled
                    >
                    <span style="text-align:right">{{coinNameB}}</span>
                  </p>
                </div>
                <span
                  v-if="!lockLoading"
                  @click="createOrder(2)"
                  style="background:#cc6954;margin:0 auto 0;display:block;height:40px;line-height:40px;font-size:16px;color:#fff;text-align:center;border-radius: 5px;"
                >确定卖出</span>
                  <van-button v-if="lockLoading"
                              loading
                              disabled
                              style="background:#cc6954;margin:0 auto 0;display:block;height:40px;line-height:40px;font-size:16px;color:#fff;text-align:center;border-radius: 5px;width: 100%;"
                  >确定卖出</van-button>
              </van-tab>
            </van-tabs>
          </div>
        </div>
        <div class="conCon" style>
          <div class="conConList" style="color:#a7aebe;height:100%;">
            <div class="conConListCon" style="height:50px;">
              <div class="conConListConL rightHeader" style="height:50px;padding-top:20px;">
                <span>价格</span>
                <span>数量</span>
              </div>
            </div>
            <div class="conConListCon">
              <div class="conConListConL" v-for="(item,index) in webListSell">
                <span
                  class="conConListColG sell priceSet"
                  @click="getPriceSet(item.price)"
                >{{Number(item.price).toFixed(2)}}</span>
                <span class="conConListColR">{{ Number(item.amount_remain).toFixed(4) }}</span>
              </div>
            </div>
            <div class="conConListCon">
              <div class="conConListConL" v-for="(item,index) in webListBuy">
                <span
                  class="conConListColG buy priceSet"
                  @click="getPriceSet(item.price)"
                >{{Number(item.price).toFixed(2)}}</span>
                <span class="conConListColR">{{ Number(item.amount_remain).toFixed(4) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="HistoryList">
      <div class="HistoryListCon" v-for="(item,index) in coinHistory">
          <p style="display:flex;justify-content: space-between;">
            <span
              style="font-size:16px;width:200px;text-align:left"
              :class="item.type===2?'sell':'buy'"
            >{{item.type===2?"卖出":"买入"}}</span>
            <span v-if="item.status < 2 && !backOrderLoading && item.amount_remain !== '0.00000000'" class="cancelBtn" @click="goCancel(item.order_id)">撤单</span>
            <van-button v-if="item.status < 2 && backOrderLoading && item.amount_remain !== '0.00000000'" class="cancelBtn" style="font-size:12px;height: 26px;" disabled> 撤单 </van-button>
            <span v-if="item.status === 2">已撤销</span>
          </p>
          <div style="display:flex;justify-content: space-between;">
            <p style="display: flex;flex-direction: column;">
              <span>价格</span>
              <span>{{item.price}}</span>
            </p>
            <p style="display: flex;flex-direction: column;">
              <span>数量</span>
              <span>{{item.amount}}</span>
            </p>
            <p style="display: flex;flex-direction: column;">
              <span>实际成交</span>
              <span>{{(item.amount-item.amount_remain).toFixed(4)}}</span>
            </p>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import {
    ws,
    req2Coinlist
} from '../../common/apigo'
import Vue from 'vue'
import { Icon, Toast, Switch } from 'vant'

import { biliCreateOrder, biliGetBiliInfo, getOrderLists, getLastEntrust, backOrder } from '../../common/api'

import { watch } from 'fs'
import { setInterval, clearInterval } from 'timers'
Vue.use(Icon)
Vue.use(Switch)
export default {
    components: {
        HeaderTop
    },

    data () {
        return {
            active: '0',
            checked: true,
            percentage: ['25%', '50%', '100%'],

            priceSell: '',
            numSell: 0,
            // totalSell:0,
            priceBuy: '',
            numBuy: 0,
            // totalBuy:0,
            aboutPrice: '',
            path: ws + '/coinTrade/realTimeTrade',
            socket: '',
            mmsg: 'btc/usdt',
            params: 'btc/usdt',
            uid: null,
            coinHistory: [],
            webList: null,
            webListBuy: null,
            webListSell: null,
            webFlag: true,
            timePrice2: null,
            timePrice3: null,
            timePrice: null,
            yue: '',
            yueS: '',
            coinPa: null,
            coinNameB: null,
            coinNameS: null,
            pctIndex: null,
            offset: 0,
            lockReconnect: false, // 是否真正建立连接
            timeoutnum: null, // 断开 重连倒计时
            upDownFlag: true,
            colorTypeFlag: '',
            timing: null,
            lockLoading: false,
            backOrderLoading: false,
            orderId: ''
        }
    },

    mounted () {
        this.userInfo()
        this.biliGetBiliInfo()
        this.getOrderLists()
        this.getLastEntrust()
        this.coinPa = this.$route.query.coinPa.toUpperCase()
        this.active = this.$route.query.active
        this.coinNameB = this.coinPa.split('/')[0]
        this.coinNameS = this.coinPa.split('/')[1]
    },
    computed: {
        totalBuy: function () {
            let num = parseInt(this.numBuy * 10000 * this.priceBuy * 100) / 1000000
            let str = String(num)
            let index = str.indexOf('.')
            let str1 = str.substring(0, index + 7)
            str1 = Number(str1)
            return str1
        },
        totalSell: function () {
            let num = parseInt(this.numSell * 10000 * this.priceSell * 100) / 1000000
            let str = String(num)
            let index = str.indexOf('.')
            let str1 = str.substring(0, index + 7)
            str1 = Number(str1)
            return str1
        },
        realOrderIds: function () {
            return this.orderId
        },
        colorType: function () {
            if (this.timePrice2 > this.timePrice3) {
                this.colorTypeFlag = 'buy'
                this.GLOBAL.setStorage('colorTypeFlag', this.colorTypeFlag)
                return this.colorTypeFlag
            } else if (this.timePrice2 < this.timePrice3) {
                this.colorTypeFlag = 'sell'
                this.GLOBAL.setStorage('colorTypeFlag', this.colorTypeFlag)
                return this.colorTypeFlag
            } else if (this.timePrice2 == this.timePrice3) {
                this.colorTypeFlag = this.GLOBAL.getStorage('colorTypeFlag')
                return this.colorTypeFlag
            }
        }
    },
    methods: {
        // 创建订单
        createOrder (type) {
            this.$dialog.confirm({
                mes: '确定挂单?',
                opts: [
                    {
                        txt: '确定',
                        color: true,
                        callback: () => {
                            this.lockLoading = true
                            let coinPair = this.$route.query.coinPa
                            let amount = Number(this.numBuy).toFixed(4)
                            let price = Number(this.priceBuy).toFixed(2)
                            if (type !== 1) {
                                amount = Number(this.numSell).toFixed(4)
                                price = Number(this.priceSell).toFixed(2)
                            }
                            biliCreateOrder({ coinPair, amount, price, type }, res => {
                                this.lockLoading = false
                                if (res.status) {
                                    Toast(res.msg)
                                    this.biliGetBiliInfo()
                                    this.getLastEntrust()
                                } else {
                                    Toast(res.msg)
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
        // 获取基础信息
        biliGetBiliInfo () {
            let coinPair = this.$route.query.coinPa
            biliGetBiliInfo({ coinPair }, res => {
                if (res.status) {
                    this.yueS = Number(res.data['aNum']).toFixed(4)
                    this.yue = Number(res.data['bNum']).toFixed(4)
                } else {
                    Toast(res.msg)
                }
            })
        },
        // 获取订单列表
        getOrderLists () {
            let coinPair = this.$route.query.coinPa
            getOrderLists({ coinPair }, res => {
                if (res.status) {
                    this.webListSell = res.data['sells']
                    this.webListBuy = res.data['buys']
                } else {
                    Toast(res.msg)
                }
                this.timing = setTimeout(this.getOrderLists, 1000)
            })
        },
        // 最近的列表
        getLastEntrust () {
            let coinPair = this.$route.query.coinPa
            getLastEntrust({ coinPair }, res => {
                if (res.status) {
                    this.coinHistory = res.data
                } else {
                    Toast(res.msg)
                }
            })
        },
        // 撤销订单
        goCancel (orderId) {
            this.$dialog.confirm({
                mes: '确定取消挂单?',
                opts: [
                    {
                        txt: '确定',
                        color: true,
                        callback: () => {
                            this.orderId = orderId
                            this.backOrderLoading = true
                            backOrder({ orderId }, res => {
                                this.backOrderLoading = false
                                this.orderId = ''
                                if (res.status) {
                                    this.biliGetBiliInfo()
                                    this.getOrderLists()
                                    this.getLastEntrust()
                                } else {
                                    Toast(res.msg)
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
        goTo (path) {
            this.$router.replace('/Treaty')
        },
        toFixedfour () {
            if (this.numBuy) {
            // 整数
                let strint = this.numBuy.toString().split('.')[0]
                // 小数位
                let strfloat = this.numBuy.toString().split('.')[1]
                // 如果小数位大于两位取值前4位
                // console.log("strfloat", strfloat);
                if (strfloat && strfloat.length > 4) {
                    strfloat = strfloat.substr(0, 4)
                    this.numBuy = strint + '.' + strfloat
                }
            }
        },
        toFixedfourS () {
            if (this.numSell) {
            // 整数
                let strint = this.numSell.toString().split('.')[0]
                // 小数位
                let strfloat = this.numSell.toString().split('.')[1]
                // 如果小数位大于两位取值前4位
                // console.log("strfloat", strfloat);
                if (strfloat && strfloat.length > 4) {
                    strfloat = strfloat.substr(0, 4)
                    this.numSell = strint + '.' + strfloat
                }
            }
        },
        toFixedtwoS () {
            if (this.priceSell) {
            // 整数
                let strint = this.priceSell.toString().split('.')[0]
                // 小数位
                let strfloat = this.priceSell.toString().split('.')[1]
                // 如果小数位大于两位取值前两位
                if (strfloat && strfloat.length > 2) {
                    strfloat = strfloat.substr(0, 2)
                    this.priceSell = strint + '.' + strfloat
                }
            }
        },
        toFixedtwo () {
            if (this.priceBuy) {
            // 整数
                let strint = this.priceBuy.toString().split('.')[0]
                // 小数位
                let strfloat = this.priceBuy.toString().split('.')[1]
                // 如果小数位大于两位取值前两位
                if (strfloat && strfloat.length > 2) {
                    strfloat = strfloat.substr(0, 2)
                    this.priceBuy = strint + '.' + strfloat
                }
            }
        },
        userInfo () {
            this.$api.userInfo({}, res => {
                this.uid = res.data.id
                this.getCoinlistB()
                this.getCoinlistS()
            })
        },
        // 获取价格设置
        getPriceSet (conPrice) {
            this.priceBuy = conPrice
            this.priceSell = conPrice
        },

        // 获取币的余额
        async getCoinlistB () {
            let uid = this.uid
            let mid = ''
            let res = await req2Coinlist({ uid, mid })
            this.yue = res.Balance.filter(item => {
                return item.CoinName == this.coinPa.split('/')[1].toLowerCase()
            })[0].Num
        },
        async getCoinlistS () {
            let uid = this.uid
            let mid = ''
            let res = await req2Coinlist({ uid, mid })
            console.log(res)
            this.yueS = res.Balance.filter(item => {
                return item.CoinName == this.coinPa.split('/')[0].toLowerCase()
            })[0].Num
        },
        priceMinusBuy () {
            if (this.priceBuy <= 0) {
                this.priceBuy = 0
            } else {
                this.priceBuy = (Number(this.priceBuy) - 0.01).toFixed(2)
            }
        },
        priceAddBuy () {
            this.priceBuy = (Number(this.priceBuy) + 0.01).toFixed(2)
        },
        priceMinusSell () {
            if (this.priceSell <= 0) {
                this.priceSell = 0
            } else {
                this.priceSell = (Number(this.priceSell) - 0.01).toFixed(2)
            }
        },
        priceAddSell () {
            this.priceSell = (Number(this.priceSell) + 0.01).toFixed(2)
        },
        goHistoryList () {
            this.$router.push({
                path: '/HistoryList',
                query: { coinPa: this.coinPa }
            })
        },
        goKline () {
            this.$router.push({ path: '/Kline', query: { coinPa: this.coinPa } })
        },
        goActivePercentage (item, index) {
            let that = this
            let arrBtn = document.getElementsByClassName('tabPercentage')
            let arrBtnLen = arrBtn.length
            for (var j = 0; j < arrBtnLen; j++) {
                arrBtn[j].style.color = '#737f8d'
            }
            if (index > -1) {
                arrBtn[index].style.color = '#5993ff'
                if (index == 0) {
                    this.numBuy = this.yue * 0.25
                } else if (index == 1) {
                    this.numBuy = this.yue * 0.5
                } else if (index == 2) {
                    this.numBuy = this.yue * 1
                }
            }
        },
        goTwoActivePercentage (item, index) {
            let that = this
            let arrBtn = document.getElementsByClassName('tabTwoPercentage')
            let arrBtnLen = arrBtn.length
            for (var j = 0; j < arrBtnLen; j++) {
                arrBtn[j].style.color = '#737f8d'
            }
            if (index > -1) {
                arrBtn[index].style.color = '#5993ff'
                that.pctIndex = index
                if (index == 0) {
                    this.numSell = this.yueS * 0.25
                } else if (index == 1) {
                    this.numSell = this.yueS * 0.5
                } else if (index == 2) {
                    this.numSell = this.yueS * 1
                }
            }
        }
    },
    destroyed () {
    // 销毁监听
        clearTimeout(this.timing)
    },

    watch: {
        active (newVal, oldVal) {
            this.active = newVal
            if (this.active == 1) {
                // document.getElementsByClassName("van-tab--active").style.background="#cc6954"
            }
        }
    }
}
</script>

<style lang="less">
#Bili {
  padding-bottom: 70px;
//   background-color: #000;
  height: 100%;
  padding-top: 50px;
  // overflow: auto;
  .back {
    padding: 0 10px;
    i {
      font-size: 15px;
      color: #bdc1cc;
      line-height: 50px;
    }
  }
  .BiliRight {
    position: absolute;
    top: 10px;
    right: 15px;
  }
  .con {
    padding: 10px 15px;
    color: #eee;
    .conTit {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #242831;
    }
    .conSelect {
      // color: #fff;
      height: 60px;
      width: 120px;
      line-height: 60px;
      font-size: 20px;
      position: relative;
      border: none;
      option {
        display: flex;
        background: #000;
        border: none;
        outline: none;
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .conTitLeft {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 18px;
    }
    .conTitRight {
      // width: 300px;
      display: flex;
    }
    .conTitRightL {
      text-align: right;
    }
    .conTitRightR {
      width: 40px;
      height: 40px;
      border-left: 1px solid #eee;
      text-align: center;
      line-height: 40px;
      margin-left: 20px;
      font-size: 20px;
    }
    .conTitRightSize {
      font-size: 18px;
    }
    .conConListCon {
      // width: 48%;
      line-height: 20px;
      height: 130px;
      padding-top: 5px;
      border-bottom: 1px #575f765e solid;
    }
    .conConListConL {

      // height: 130px;
    }
    .conConListConL,
    .conConListConR {
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        text-align: center;
      }
      :nth-child(1) {
        width: 50%;
      }
      :nth-child(2) {
        width: 50%;
      }
      // :nth-child(3) {
      //   width: 45%;
      // }
    }
    .van-tabs__nav,
    .van-tabs__nav--card {
      border: none;
      background: #242831;
      // width: 220px;
      margin: auto;
    }
    .van-tab {
      border: none;
      color: #fff;
      width: 100px;
      font-size: 16px;
    }
    .van-tab--active {
      background: #4bbd82;
    }
    .conCenter {
      // display: flex;
      position: relative;
      padding-top: 20px;
      .conCenterLeft {
        .van-tabs__wrap {
          // width: 220px;
          background: #000;
        }
        .van-tabs__content {
          padding-top: 20px;
        }
      }
      .conCenterRight {
        position: absolute;
        right: 20px;
        top: 20px;
      }
      .van-tabs__content {
        color: #a7aebe;
      }
      .tabOne {
        display: flex;
        align-items: center;
        height: 40px;
        border: 1px #575f765e solid;
        padding: 0 5px;
        border-radius: 5px;
        > span {
          width: 30px;
          text-align: center;
          font-size: 30px;
          height: 20px;
          line-height: 20px;
          // padding:  0 3px;
        }
        p {
          width: 40px;
        }
        > div {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-right: 1px solid #575f765e;
          height: 40px;
        }
      }
      .tabTwo {
        display: flex;
        align-items: center;
        height: 40px;
        border: 1px #575f765e solid;
        padding: 5px 5px 0 5px;
        border-radius: 5px;
        justify-content: space-between;
        margin-top: 10px;
        // background: #242831;
        // width: 100%;
        > p {
          display: flex;
          flex: 1;
          justify-content: space-between;
          input {
            border: none;
            background: none;
            padding-left: 5px;
            width: 70px;
            // flex: 1;
          }
          span {
            width: 40px;
          }
        }
        > div {
          display: flex;
          span:nth-child(1) {
            color: #5993ff;
          }
        }
      }
      .tabThree {
        display: flex;
        align-items: center;
        height: 40px;
        border: 1px #575f765e solid;
        padding: 5px 5px 0 5px;
        border-radius: 5px;
        justify-content: space-between;
        margin-top: 10px;
        // background: #242831;
        > p {
          display: flex;
          flex: 1;
          justify-content: space-between;
          > input {
            border: none;
            background: none;
            padding-left: 5px;
            width: 70px;
          }
          span {
            width: 40px;
          }
        }
      }
    }
    .conBottom {
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      color: #a7aebe;
      .conBottomLeft {
        display: flex;
        align-items: center;
        span {
          padding-left: 10px;
        }
      }
    }
    .tabPercentage {
      display: block;
      width: 30px;
    }
    .tabTwoPercentage {
      display: block;
      width: 30px;
    }
    // .van-ellipsis{
    //   background: #cc6954;
    // }
    .HistoryList {
      margin-top: 10px;
      line-height: 20px;
      color: #6d879e;
    }
    .HistoryListTit {
      display: flex;
      justify-content: space-around;
    }
    .HistoryListCon {
      padding: 5px;
      border-bottom: 1px solid #333;
      line-height: 30px;
      p {
        text-align: center;
        span {
          width: 60px;
          height: 26px;
          text-align: center;
          line-height: 26px;
        }
      }
    }
  }
  .sell {
    color: #cc6954;
  }
  .buy {
    color: #4bbd82;
  }
  .cancelBtn {
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    border: 1px #333 solid;
  }
  .van-tabs__wrap,
  .van-hairline--top-bottom {
    // width: 222px;
    margin: 0 auto;
  }
  .van-tabs__line {
    background-color: rgba(0, 0, 0, 0);
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .changeStyle {
    display: flex;
    height: 320px;
    // padding-bottom: 20px;
    // border-bottom:1px solid #242831
    justify-content: space-between;
    > div:nth-child(1) {
      width: 58%;
    }
    > div:nth-child(2) {
      width: 40%;
    }
  }
  .rightHeader {
    height: 20px;
    border: none;
  }
  .van-tabs--line, .van-tabs__wrap{
    height: 30px;
    line-height: 30px;
  }
  .van-tab{
line-height: 30px;
  }
}
</style>
