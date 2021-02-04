<template>
    <div id="kjpage">
        <HeaderTop title="算力节点">
            <a class="back" @click="$router.back()" slot="left">
                <i class="iconfont iconfanhui"></i>
            </a>
        </HeaderTop>
        <div class="imgs">
            <iframe
                    align="center"
                    width="100%"
                    height="200"
                    src="http://htx1.pyplb.com/web/static/dong.html"
                    frameborder="no"
                    border="0"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
            ></iframe>
        </div>
        <div>
            <div class="list">
                <!-- <div>
                  <span>全网算力：</span>
                  <span class="classRed">{{info.zong_sl}}</span>
                </div>-->
                <div>
                    <span>个人算力：</span>
                    <span class="classRed">{{investalleot}}</span>
                </div>
                <div>
                    <span>共享算力：</span>
                    <span class="classRed">{{teamalleot}}</span>
                </div>
                <!-- <div> -->
                <!-- <span>我的收益：</span> -->
                <!-- <span class="classRed">{{bonus1+bonus2+bonus3}}</span> -->
                <!-- <span class="classRed">{{all_bonus}}</span> -->
                <!-- </div> -->
                <!-- <div> -->
                <!-- <span>共享收益：</span> -->
                <!-- <span class="classRed">{{bonus1+bonus2+bonus3}}</span> -->
                <!-- <span class="classRed">{{share_power}}</span> -->
                <!-- </div> -->
                <!-- <div>
                  <span>分享算力：</span>
                  <span class="classRed">{{info.fx_sl}}</span>
                </div>
                <div>
                  <span>节点算力：</span>
                  <span class="classRed">{{info.jd_sl}}</span>
                </div>
                <div>
                  <span>累计算力：</span>
                  <span class="classRed">{{info.my_shouyi}}</span>
                </div>
                <div>
                  <span>预计收益：</span>
                  <span class="classRed">{{info.yuji_shouyi}}</span>
                </div>-->
            </div>
        </div>
        <div class="listBuy">
            <!-- <h4>
              <span>可申请额度剩余</span>
              <span class="classRed">{{info.number}}</span>
            </h4> -->
            <div>
                <div class="jsqi">
                    <span @click="reduce()">-</span>
                    <input type="text" v-model="todayNum" style="    width: 60px;
    text-align: center;
    border: none;"/>
                    <!-- <span>{{todayNum}}</span> -->
                    <span @click="add()">+</span>
                </div>
                <!-- <div> -->
                <div class="buyBtn" @click="gobuy()">确认申请</div>
                <div class="buyBtn" @click="releaseOrder()">解约质押</div>
                <!-- </div> -->
                <!-- <div> -->
                <!-- <div class="buyBtn" @click="gobuyDetail()">查看详情</div> -->
                <!-- </div> -->
            </div>
        </div>
        <div class="listList">
            <!-- <div v-for="(item,index) in infoList" @click="goRelease(item.id)"> -->
            <div v-for="(item,index) in infoList">

                <div>
                    <span class="listListTime">认购时间</span>
                    <span class="listListrode">算力</span>
                    <!-- <span class="listListde">累计获得</span>
                    <span class="listListStatus">状态</span> -->
                </div>
                <div>
                    <span class="listListTime">{{item.ctime.substr(5,11)}}</span>
                    <span class="listListrode">{{item.money}}</span>
                    <!-- <span class="listListde">{{item.point}}</span>
                    <span class="listListStatus">{{item.status==1?'挖矿中':"已结束"}}</span> -->
                </div>
            </div>
        </div>
        <van-password-input
                :value="value"
                @focus="showKeyboard = false,isshow=false,cengFlag=false"
                v-if="isshow"
        />
        <van-number-keyboard
                :show="showKeyboard"
                @input="onInput"
                @delete="onDelete"
                @blur="showKeyboard=false,isshow=false,cengFlag=false"
        />
        <van-dialog v-model="show" title show-cancel-button @confirm="confirm">
            <!-- <p>
              <span>购买价值:</span>
              <input type="text" v-model="minNum" disabled  style="border:1px solid #1989fa;padding:0 5px;"/>
            </p>-->
            <p style="display: flex;">
                <span>使用币种:</span>
                <van-radio-group v-model="radiotype">
                    <van-radio name="1">NEBC</van-radio>
                    <!-- <van-radio name="2">EOT</van-radio> -->
                    <!-- <van-radio name="3">MED</van-radio> -->
                </van-radio-group>
            </p>

            <p>
                <span>二级密码:</span>
                <input
                        v-number-only
                        type="password"
                        v-model="pad"
                        style="border:1px solid #fff;padding:0 5px;border-radius: 5px;"
                />
            </p>
        </van-dialog>
    </div>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
    import {Dialog, Toast} from "vant";
    import Vue from "vue";
    import {mapState} from "vuex";

    Vue.use(Dialog);
    Vue.use(Toast);

    export default {
        components: {
            HeaderTop
        },

        data() {
            return {
                num: "",
                value: "",
                showKeyboard: false,
                isshow: false,
                info: {},
                infoList: [],
                flag: true,
                type: "",

                kjnum: "",
                typeMinId: "",
                cengFlag: false,
                todayNum: 10,
                todayNumFixed: 0,
                show: false,
                pad: "",
                radiotype: "1",
                appointmentFlag: false,
                releaseFlag: false,
                bonus1: '',
                bonus2: '',
                bonus3: '',
                my_power: 0,
                user_power: 0,
                all_bonus: 0,
                teamalleot: 0,
                investalleot: 0,
                share_power: 0

            };
        },
        directives: {
            numberOnly: {
                bind(el) {
                    el.handler = function () {
                        el.value = el.value.replace(/\D+/, '');
                    };
                    el.addEventListener('input', el.handler);
                },
                unbind(el) {
                    el.removeEventListener('input', el.handler);
                }
            }
        },
        created() {
            if (this.GLOBAL.getStorage("user_token")) {
                this.getUsdt();
                this.userOnline()
            } else {
                this.$router.push('/login')
            }
        },
        // mounted() {
        //   this.getUsdt();
        //   this.userOnline()
        // },
        methods: {
            userOnline() {
                this.$api.userInfo({}, res => {
                    this.my_share = res.data.my_share;
                    this.bonus1 = Number(res.data.bonus1);
                    this.bonus2 = Number(res.data.bonus2);
                    this.bonus3 = Number(res.data.bonus3);
                    // console.log(this.bonus1+this.bonus2+this.bonus3)
                });
            },
            reduce() {
                if (this.todayNum > this.todayNumFixed) {
                    if (this.todayNum - this.todayNumFixed > 0) {
                        this.todayNum = this.todayNum - this.todayNumFixed;
                    }
                }
            },
            add() {
                this.todayNum = Number(this.todayNum) + Number(this.todayNumFixed);
            },
            releaseOrder() {
                this.$dialog.confirm({
                    mes: '您确认解除质押吗?',
                    opts: [
                        {
                            txt: '确定',
                            color: true,
                            callback: () => {
                                if (this.releaseFlag) {
                                    Toast("解约中")
                                    return false
                                }
                                this.releaseFlag = true
                                this.$api.userPpaReleaseOrder({}, res => {
                                    this.releaseFlag = false

                                    this.$dialog.toast({mes: res.msg, timeout: 1000})
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
            financing () {
                let coinName
                if (this.radiotype == 1) {
                    coinName = 'eot'
                } else if (this.radiotype == 2) {
                    coinName = 'pud'
                }
                this.$api.userPpaAddOrder({num: this.todayNum, coin_name: coinName}, res => {
                    if (res) {
                        this.appointmentFlag = false;
                    }

                    if (res.status) {
                        this.radiotype = '1'
                        this.kjnum = "";
                        this.typeMinId = "";
                        this.$dialog.toast({mes: res.msg, timeout: 1000});
                        this.getUsdt();
                        this.userOnline();
                    }
                });
            },
            getUsdt() {
                this.$api.userPpaList({}, res => {
                    this.info = res.data;
                    this.infoList = res.data.ppa_list;
                    this.todayNum = res.data.num;
                    this.todayNumFixed = res.data.num;
                    this.my_power = res.data.my_power
                    this.user_power = res.data.user_power
                    this.all_bonus = res.data.all_bonus
                    this.teamalleot = res.data.teamalleot

                    this.investalleot = res.data.investalleot

                    this.share_power = res.data.share_power
                });
            },
            onInput(key) {
                this.value = (this.value + key).slice(0, 6);
                if (this.value.length == 6) {
                    this.showKeyboard = false;
                    this.isshow = false;
                    this.cengFlag = false;
                    this.$api.payPwd({pay_pwd: this.value}, res => {
                        this.value = "";
                        if (res.status) {
                            this.financing();
                        }
                    });
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
            goTo(path) {
                this.$router.push({path});
            },
            goRelease(id) {
                this.$router.push({path: "/kjpageList", query: {id: id}});
            },
            gobuy(type) {
                if (this.appointmentFlag) {
                    Toast("购买中");
                    return;
                }
                // (this.showKeyboard = true), (this.isshow = true);
                this.show = true;
            },
            gobuyDetail() {
                this.$router.push('/Operation')
            },
            async confirm() {
                if (!this.pad) {
                    Toast("请输入二级密码");
                    return;
                }
                this.appointmentFlag = true;
                this.$api.payPwd({pay_pwd: this.pad}, res => {
                    this.pad = "";
                    if (res.status) {
                        this.financing();
                    } else {
                        this.appointmentFlag = false;
                    }
                });
                //       this.appointmentFlag = true;
                //       let coin_name
                //       if(this.radiotype==1){
                // coin_name='gm'
                //       }else if(this.radiotype==2){
                //         coin_name='ppa'
                //       }
                //       let oid = this.oid;
                //       let num = this.minNum;
                //       let pay_pwd = this.pad;
                //       this.$api.reqOceanlicai({ oid, num,exchange_type, pay_pwd }, res => {
                //         if (res) {
                //           Toast(res.msg);
                //           this.appointmentFlag = false;
                //           this.pad=""
                //           this.radiotype='1'
                //           if (res.status) {
                //             this.$router.push({ path: "/breedlist" });
                //           }
                //         }
                //       });
            }
        }
    };
</script>

<style scoped lang="less">
    #kjpage {
        padding: 50px 10px 10px;
        overflow: auto;
        color: #e9a44e;

        .back {
            padding: 0 10px;

            i {
                font-size: 15px;
                color: #fff;
                line-height: 50px;
            }
        }

        .content {
            display: flex;
            justify-content: space-between;
            font-size: 0.3rem;
            align-items: center;
            margin: auto;
            margin-bottom: 15px;
            padding: 0 20px;
            text-align: center;
            width: 70%;
            position: relative;

            .tit {
                // min-width: 25%;
            }

            .num {
                flex: 1;
                text-align: left;
                border: none;
                min-width: 55%;
            }
        }

        .btn {
            padding: 5px 10px;
            background-color: #3366cc;
            color: #fff;
            border-radius: 10px;
            text-align: center;
            font-size: 14px;
        }

        .box {
            background-color: #f4f8f8;
            padding-bottom: 20px;
            margin-bottom: 20px;

            .rate {
                font-size: 1rem;
                text-align: center;
                color: #e33f3f;
                padding: 15px 0;
            }

            .tip {
                font-size: 0.3rem;
                text-align: center;
                color: #838383;
                margin-bottom: 15px;
            }
        }

        .log {
            display: inline-block;
            padding: 10px;
            // float: right;
            color: #10aeff;
            text-align: right;
            width: 100%;
        }

        .list {
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 20px 10px;
            border-radius: 5px;
            margin: 10px 0 0;

            div {
                width: 50%;
                height: 20px;
                line-height: 20px;
            }
        }

        .listBuy {
            background: rgba(0, 0, 0, 0.6);

            h4 {
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 20px;
            }

            > div {
                display: flex;
                height: 50px;
                align-items: center;

                div {
                    width: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                }

                .buyBtn {
                    width: 20%; // background: #e9a44e;
                    background: rgb(22, 163, 138);
                    height: 24px;
                    line-height: 24px;
                    padding: 5px;
                    border-radius: 5px;
                    color: #fff;
                    margin-left: 10px;
                }

                .jsqi {
                    font-size: 20px;

                    > span {
                        margin-right: 5px;
                    }
                }
            }
        }

        .listList {
            > div {
                // height: 40px;
                padding: 5px;
                line-height: 20px;
                background: rgba(0, 0, 0, 0.6);

                > div {
                    display: flex;
                    width: 100%;

                    > span {
                        text-align: center;
                    }

                    .listListStatus {
                        width: 12.5%;
                    }

                    .listListde {
                        width: 35.7%;
                    }

                    .listListrode {
                        width: 50%;
                    }

                    .listListTime {
                        width: 50%;
                    }
                }
            }
        }

        .van-password-input {
            position: fixed;
            top: 30%;
            left: 0;
            width: 100%;
            z-index: 100;
            margin: 0;
            padding: 0 10px;
        }

        .van-number-keyboard {
            color: #213c4d;
        }

        /deep/ .van-number-keyboard {
            // bottom: 60px;
        }

        .ceng {
            background: rgba(0, 0, 0, 0.6);
            height: 100%;
            width: 100%;
            position: fixed;
            left: 0;
            top: 0;
        }

        .classRed {
            color: #f00;
        }

        /deep/ .van-dialog {
            border: 1px solid rgb(25, 137, 250) !important;
            background: rgba(0, 0, 0, 0) !important;
        }

        /deep/ .van-dialog__content {
            padding: 10px;
            line-height: 30px;
            color: #ffffff;
            justify-content: space-between;
        }

        /deep/ .van-dialog__content p {
            margin: 10px 0;
        }

        /deep/ .van-radio__label {
            color: #ffffff;
        }
    }
</style>
