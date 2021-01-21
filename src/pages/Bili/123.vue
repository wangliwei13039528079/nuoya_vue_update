<template>
    <div>
         <canvas style="width: 80%!important;height: auto!important;" id="canvas"></canvas>
         <br/>{{charId}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            websock: null,//建立的连接
            charId: s.uuid(),//随机生成的UUID
            lockReconnect: false,//是否真正建立连接
            timeout: 28*1000,//30秒一次心跳
            timeoutObj: null,//心跳心跳倒计时
            serverTimeoutObj: null,//心跳倒计时
            timeoutnum: null,//断开 重连倒计时
            lastRunTime: Date.now(),//上次播放声音的时间
        };
    },
    created() {
        //页面刚进入时开启长连接
        this.initWebSocket();
    },
    destroyed: function() {
        //页面销毁时关闭长连接
        this.websocketclose();
    },
    methods: {
        initWebSocket(){//建立连接
            //初始化weosocket
            //const wsuri = "ws://sms.填写您的地址.com/websocket/" + this.charId; //ws地址
           const wsuri = "" 
           //建立连接
            this.websock = new WebSocket(wsuri);
            //连接成功
            this.websock.onopen = this.websocketonopen;
            //连接错误
            this.websock.onerror = this.websocketonerror;
            //接收信息
            this.websock.onmessage = this.websocketonmessage;
            //连接关闭
            this.websock.onclose = this.websocketclose;
        },
        reconnect() {//重新连接
            var that = this;
            if(that.lockReconnect) {
                return;
            };
            that.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum);
            that.timeoutnum = setTimeout(function () {
                //新连接
                that.initWebSocket();
                that.lockReconnect = false;
            },5000);
        },
        reset(){//重置心跳
            var that = this;
            //清除时间
            clearTimeout(that.timeoutObj);
            clearTimeout(that.serverTimeoutObj);
            //重启心跳
            that.start();
        },
        start(){//开启心跳
            var self = this;
            self.timeoutObj && clearTimeout(self.timeoutObj);
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
            self.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                if (self.websock.readyState == 1) {//如果连接正常
                    self.websock.send("heartCheck");
                }else{//否则重连
                    self.reconnect();
                }
                self.serverTimeoutObj = setTimeout(function() {
                    //超时关闭
                    self.websock.close();
                }, self.timeout);

            }, self.timeout)
        },
        playSound(){//播放声音
            var borswer = window.navigator.userAgent.toLowerCase();
            if (borswer.indexOf("ie") >= 0) {
                //IE内核浏览器
                var strEmbed = '<embed name="embedPlay" src="/static/assets/mp3/dingdong.wav" autostart="true" hidden="true" loop="false"></embed>';
                if ($("body").find("embed").length <= 0)
                    $("body").append(strEmbed);
                var embed = document.embedPlay;
                //浏览器不支持 audion，则使用 embed 播放
                embed.volume = 100;
                //embed.play();这个不需要
            } else {
                //非IE内核浏览器
                var strAudio = "<audio id='audioPlay' type='audio/mpeg' src='/static/assets/mp3/dingdong.wav' hidden='true'>";
                if ($("body").find("audio").length <= 0)
                    $("body").append(strAudio);
                var audio = document.getElementById("audioPlay");

                var currentTime = Date.now();
                var protectTime = 500;//设置保护性延时 单位毫秒，不要小于50 建议100以上
                if((currentTime - this.lastRunTime) < protectTime){
                        return;//两次执行太过频繁，直接退出
                }
                if(audio.paused){
                    audio.play();
                }else{
                    audio.pause();
                }
                this.lastRunTime = Date.now();

                //浏览器支持 audion
                // if (audio.paused){
                //     audio.play();
                // }
            }
        },
        websocketonopen() {//连接成功事件
            //生成二维码(参数内容，canvas的id)
            s.qrcode(this.charId,"canvas")
            //提示成功
            s.success("连接成功",3)
            //开启心跳
            this.start();
        },
        
        websocketonerror(e) {//连接失败事件
            //错误
            console.log("WebSocket连接发生错误");
            //错误提示
            s.error("Websocket error, Check you internet!")
            //重连
            this.reconnect();
        },
        websocketclose(e) {//连接关闭事件
            //关闭
            console.log("connection closed (" + e.code + ")");
            //提示关闭
            s.error("连接已关闭",3);
            //重连
            this.reconnect();
        },
        websocketonmessage(event) {//接收服务器推送的信息
            //打印收到服务器的内容
            console.log(event.data);
            //收到服务器信息，心跳重置
            this.reset();
            //播放声音
            this.playSound();
        },
        websocketsend(msg) {//向服务器发送信息
            //数据发送
            this.websock.send(msg);
        },
    }
};

</script>
