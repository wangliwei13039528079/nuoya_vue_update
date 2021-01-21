<template>
    <div id="millcenter">
        <HeaderTop title="矿机">
        </HeaderTop>
        <!-- <div style="width: 100%;height: 100px; background-color: #37434f" class="top">
            <div class="left-icon">
                <a class="iconfont" @click="goChi()"><img style="width:30px;height:30px;background:#fff;border-radius: 50%" src="../../common/images/icon_kuangchiguanli.png"></a>
                <a class="iconfont" @click="goTo(`/Operation`)"><img style="width:30px;height:30px;background:#fff;border-radius: 50%" src="../../common/images/chakan.png"></a>
                <a class="iconfont icon-jindutiaoshouyidaozhang1" @click="goTo('/EarningsLog')"></a>
                <a class="iconfont icon-tianjia1" @click="goTo('/addmill')"></a>
                
            </div>
        </div> -->
        <div>矿池等级：<span>0</span></div>
        <div class="oreMoney">
        <div>EOC数量：<span>0</span></div>
        <div>电费数量：<span>0</span></div>
        <button>电费充值</button>
        </div>
        
        <div class="millListCon">
            <div>矿机列表</div>
            <div class="millList">
                <div @click="goMillDetail()">1号矿机</div>
                <div>矿机级别</div>
                <button @click="goPayElectricity()">交电费</button>
                <button>一键升级</button>
            </div>
        </div>
        <!-- <van-tabs type="card" color="#37434f" class="tab">
            <van-tab title="在线">
                <div class="mills">
                    <template v-if="mills.length < 1">
                        <div class="none">
                            暂无矿机运行
                        </div>
                    </template>
                   
                    <template v-else>
                        <div class="list" v-for="(item,index) in mills" :key="index">
                            <div class="imgs">
                                <img src="../../common/images/wa.png" alt="">
                            </div>
                            <div class="con">
                                <h5>{{item.server_name}}</h5>
                                <p>矿机编号： {{item.server_mac}} </p>
                                <div style="font-size:12px;line-height:20px">矿机状态：{{item.online_status |status}} <div style="font-size:12px;line-height:20px" @click="godetail(item.id)">解绑矿机</div></div>

                            </div>
                            <div style="width:60px;display:flex;flex-direction: column;justify-content: center;align-items: center;">
                                <div class="addItc" @click="goTo(`/Operation`)">查看</div>
                                <div class="addItc" v-show="item.nid != 0">{{item.name}}</div>
                                <div class="addItc" v-show="item.nid == 0"  @click="goTo(`/itcboxt/${item.id}/${item.server_name}`)">添加矿池</div>
                                <div class="addItc" v-show="item.nid != 0" @click="goback2(item.id)">解绑矿池</div>
                            </div>
                        </div>
                    </template>
                    
                </div>
            </van-tab>
            <van-tab title="全部">
                <div class="mills">
                           <template v-if="allOrder.length < 1">
                                <div class="none">
                                    暂无矿机
                                </div>
                             </template>
                           <template >
                                <div class="list" v-for="(item,index) in allOrder" :key="index">
                                    <div class="imgs">
                                        <img src="../../common/images/wa.png" alt="">
                                    </div>
                                    <div class="con">
                                        <h5>{{item.server_name}}</h5>
                                        <p>矿机编号： {{item.server_mac}} </p>
                                        <div style="font-size:12px;line-height:20px">矿机状态：{{item.online_status |status}} <div style="font-size:12px;line-height:20px" @click="godetail(item.id)">解绑矿机</div></div>
                                    </div>
                                    <div style="width:60px;display:flex;flex-direction: column;justify-content: center;align-items: center;">
                                        <div class="addItc" @click="goTo(`/Operation`)">查看</div>
                                        <div class="addItc" v-show="item.nid != 0">{{item.name}}</div>
                                        <div class="addItc" v-show="item.nid == 0"  @click="goTo(`/itcboxt/${item.id}/${item.server_name}`)">添加矿池</div>
                                        <div class="addItc" v-show="item.nid != 0" @click="goback2(item.id)">解绑矿池</div>
                                    </div>
                                </div>
                            </template>
                            
                        </div>
                
            </van-tab>
        </van-tabs> -->

        
    </div>
</template>

<script>
    import Vue from "vue";
    import { Panel } from "vant";
    import { Row, Col } from "vant";
    import { Tab, Tabs } from "vant";

    // 确认对话框
    import { Dialog } from "vant";
    Vue.use(Dialog);

    //提示框
    import { Toast } from 'vant';
    Vue.use(Toast);

    Vue.use(Row).use(Col);
    Vue.use(Panel);
    Vue.use(Tab).use(Tabs);


    import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);


    import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";

    // import { reqUserServer, reqDelMill,reqorders ,reqItc,requnBlinkServer,requnBlindPool,reqUserAllInfo} from "../../api";
    import { setTimeout } from 'timers';

Vue.filter("status",function(value){
        if(value==1){
            return "在线"
        }else if(value==2){
            return "不在线"
        }else if(value==3){
            return "故障"
        }
    })
    export default {
        components: {
            HeaderTop
        },
        data() {
            return {
                // isItc:null,
                // mills: [],
                // refresh: "",
                // timer: null,
                // flag: true,
                // mac : '',
                // order:[],
                // allOrder:[],
                // id:null,
                // tid:null,
                // itc_show:"",
                // apiauth:null
            };
        },

        mounted() {
            // this.getMill();
            // this.timer = setInterval(() => {
            //     this.getMill();
            // }, 3000);
            // this.reqUserAllInfo()
            // this.apiauth = localStorage.getItem('apiauth')
            
        },
        methods: {
            // goTo(path) {
            //     this.$router.push({ path: path });
            // },
            goPayElectricity(){
                this.$router.replace('/PayElectricity');
            },
            goMillDetail(){
                this.$router.replace('/MillDetail');
            }

            //是否显示矿池
            //reqUserAllInfo
            // async reqUserAllInfo() {
            //     const result = await reqUserAllInfo()
            //     //console.log(result.userInfo.phone)
            //     this.itc_show=result.servers;
            // },
            //点击矿池是否跳转
            // goChi(){
                
            //     if(this.itc_show!=0){
            //          this.$router.replace('/itcs') 
            //     }else{
            //         Toast('您无权访问矿池');
            //     }
            // },

            //解绑矿池

            // goback2(id){
            //     this.id=id;
            //     Dialog.confirm({
            //         title: "提示",
            //         message: "确定要解绑矿池吗？"
            //     })
            //         .then(() => {
                         
            //             this.requnBlindPool()
            //             //Toast('解绑矿池成功');
            //         })
            //         .catch(() => {

            //         });
            // },
            //解绑矿机
            // godetail(tid){
            //     this.tid=tid;
            //     Dialog.confirm({
            //         title: "提示",
            //         message: "确定要解绑矿机吗？"
            //     })
            //         .then(() => {
                         
            //             this.requnBlinkServer()
                        
            //         })
            //         .catch(() => {

            //         });
            // },

            // //get mills
            // async getMill() {
            //     this.refresh = "refresh";
            //     let result = await reqUserServer();
            //     this.refresh = "";
            //     if (result) {
            //         let arr=result.filter((item)=>{
            //            return item.online_status==1
            //         })
            //         this.mills = arr;
            //         this.allOrder = result
            //         if (this.flag) {
            //             Toast("矿机加载成功");
            //             this.flag = false;
            //         }
            //     }
            // },

            // //refresh mills
            // async doRefresh() {
            //     const result = await reqUserServer();
            //     if (result) {
            //         Toast.success("刷新成功");
            //         this.mills = result;
            //     }
            // },

            // //解绑矿池

            // async requnBlindPool(){
            //    let id= this.id;
            //     const result = await requnBlindPool({ id });
            //     if(result.code=="1"){
            //         Toast('解绑矿机成功');
            //         this.getMill();

            //     }else if(result.code=="-999"){
            //         Toast('请先解绑矿池，再解绑矿机');
            //     }else{
            //         Toast(result.msg);
            //     }

            // },
            // //requnBlinkServer解绑矿机

            // async requnBlinkServer(){
            //     let id= this.tid;
            //     const result = await requnBlinkServer({ id });
            //     if(result.code=="1"){
            //         Toast('矿机解绑成功');
            //         this.getMill();

            //     }else if(result.code=="-999"){
            //         Toast('请先解绑矿池，再解绑矿机');
            //     }else{
            //         Toast('解绑矿机失败');
            //     }

            // },
        },

        beforeDestroy() {
            clearInterval(this.timer);
            this.timer = null;
        },
    };
</script>

<style lang="less">
#millcenter::-webkit-scrollbar {
display:none
}
    #millcenter {        
    height: 100%;
    background-color: #000;
    overflow: auto;
    padding: 10px;
    padding-top: 50px;
    .top {
        .left-icon {
            position: absolute;
            display: flex;
            right: 10px;

            > a {
                padding: 10px;
                display: block;
                font-size: 28px;
                color: #fff;
                
            }
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
    .oreMoney{
        display: flex;
        padding: 10px 0;
    }
    .oreMoney>div{
        padding-right: 20px;
    }
    .millListCon{

        .millList{
            display: flex;
            height: 30px;
            align-items: center;
            justify-content: space-around;
        }
    }
        @keyframes myfirst {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
</style>
