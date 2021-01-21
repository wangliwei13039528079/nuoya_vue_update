<template>
    <div>
        <div id="bcid">
            <div style="height:40%"></div>
            <p class="tip">...载入中...</p>
        </div>
        <footer>
            <div class="fbt" onclick="back()">取　 消</div>
            <div class="fbt" onclick="scanPicture()">从相册选择二维码</div>
        </footer>
    </div>
</template>

<script>
        // var ws=null,wo=null;
        // var scan=null,domready=false;
        // H5 plus事件处理
        // function plusReady(){
        //     console.log(123456)
        //     if(ws||!window.plus||!domready){
        //         return;
        //     }
        //     // 获取窗口对象
        //     ws=plus.webview.currentWebview();
        //     wo=ws.opener();
        //     // 开始扫描
        //     ws.addEventListener('show', function(){
        //         scan=new plus.barcode.Barcode('bcid');
        //         scan.onmarked=onmarked;
        //         scan.start({conserve:true,filename:'_doc/barcode/'});
        //     }, false);
        //     // 显示页面并关闭等待框
        //     ws.show('pop-in');
        //     wo.evalJS('closeWaiting()');
        // }
        // if(window.plus){
        //     plusReady();
        //     console.log(123456+'lalala')
        // }else{
        //     document.addEventListener('plusready', plusReady, false);
        //     console.log(987654)
        // }
        // 监听DOMContentLoaded事件
        // document.addEventListener('DOMContentLoaded', function(){
        //     domready=true;
        //     plusReady();
        // }, false);
        // 二维码扫描成功
        // function onmarked(type, result, file){
        //     switch(type){
        //         case plus.barcode.QR:
        //         type = 'QR';
        //         break;
        //         case plus.barcode.EAN13:
        //         type = 'EAN13';
        //         break;
        //         case plus.barcode.EAN8:
        //         type = 'EAN8';
        //         break;
        //         default:
        //         type = '其它'+type;
        //         break;
        //     }
        //     result = result.replace(/\r\n/g, '');
        //     console.log('扫描成功')
        //     this.$router.replace({path:'/msiteb'})
        //     wo.evalJS("scaned('"+ type +"','"+ result +"','"+ file +"');");
        //     back();
        // }
        // 从相册中选择二维码图片 
        // function scanPicture(){
        // plus.gallery.pick(function(path){
        //     plus.barcode.scan(path,onmarked,function(error){
        //         plus.nativeUI.alert('无法识别此图片');
        //     });
        // }, function(err){
        //     console.log('Failed: '+err.message);
        // })
        // }
export default {
    data() {
        return {
            ws:null,
            wo:null,
            scan:null,
            domready:false
        };
    },
    created() {

    },
    mounted() {
        if(window.plus){
            plusReady();
            console.log(123456+'lalala')
        }else{
            document.addEventListener('plusready', this.plusReady(), false);
            console.log(987654)
        }
    },
    methods: {
        plusReady(){
            console.log(123456)
            // if(this.ws||!window.plus||!this.domready){
            //     return;
            // }
            console.log(11111111)
            // 获取窗口对象
            this.ws=plus.webview.currentWebview();
            this.wo=this.ws.opener();
            // 开始扫描
            this.ws.addEventListener('show', ()=>{
                this.scan=new plus.barcode.Barcode('bcid');
                this.scan.onmarked=this.onmarked();
                this.scan.start({conserve:true,filename:'_doc/barcode/'});
            }, false);
            // 显示页面并关闭等待框
            this.ws.show('pop-in');
            this.wo.evalJS('closeWaiting()');
        },
        // 二维码扫描成功
         onmarked(type, result, file){
            switch(type){
                case plus.barcode.QR:
                type = 'QR';
                break;
                case plus.barcode.EAN13:
                type = 'EAN13';
                break;
                case plus.barcode.EAN8:
                type = 'EAN8';
                break;
                default:
                type = '其它'+type;
                break;
            }
            result = result.replace(/\r\n/g, '');
            console.log('扫描成功')
            this.$router.replace({path:'/msiteb'})
            wo.evalJS("scaned('"+ type +"','"+ result +"','"+ file +"');");
            back();
        }
    }
};
</script>

<style lang="less" scoped>
    #bcid {
            width: 100%;
            position: absolute;
            top: 0px;
            bottom: 44px;
            text-align: center;
        }
        .tip {
            color: #FFFFFF;
            font-weight: bold;
            text-shadow: 0px -1px #103E5C;
        }
        footer {
            width: 100%;
            height: 44px;
            position: absolute;
            bottom: 0px;
            line-height: 44px;
            text-align: center;
            color: #FFF;
        }
        .fbt {
            width: 50%;
            height: 100%;
            background-color: #FFCC33;
            float: left;
        }
        .fbt:active {
            -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
        }
</style>
