/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
// export let ws="ws://192.168.31.110:9099"
// export let im="http://192.168.31.110:9099"
// export let Url = 'http://192.168.31.110:9099'     //朋杰接口
// const BASE_URL = 'http://192.168.31.110:9099'     //朋杰接口
export let ws = 'ws://' + process.env.GO_API
export let im = 'http://' + process.env.GO_API
export let Url = 'http://' + process.env.GO_API
const BASE_URL = 'http://' + process.env.PJ_API
const KK_URL = 'http://' + process.env.PJ_API

const BASE_API = '/api'
//手机号密码登录方式
export const reqPwdLogin = ({phone, pwd}) => ajax(`${BASE_URL}/unauth/login`, {phone, pwd}, 'POST')
export const reqSmsLogin = ({phone, smsCode}) => ajax(`${BASE_URL}/unauth/login`, {phone, smsCode}, 'POST')
export const reqUserAllInfo = () => ajax(`${BASE_URL}/index/index`, {}, 'POST')
export const reqAddBank = () => ajax(`${BASE_URL}/o2c/bankList`)                                               //获取银行卡分类
export const reqDoAddBank = ({uid, payNum, payType, payImg, username,bank,branch}) => {
    return ajax(`${BASE_URL}/o2c/addPayMethod`, {uid, payNum, payType, payImg, username,bank,branch}, 'POST')
}              //添加支付方式

export const reqUpdatePaytype = ({uid, payNum, payType, payImg, username,bank,branch}) => {
    return ajax(`${BASE_URL}/o2c/payMethod/update`, {uid, payNum, payType, payImg, username,bank,branch}, 'POST')
}              // 修改支付方式

export const reqDoBuy = ({id, points}) => ajax(`${BASE_URL}index/buy`, {id, points}, 'POST')                      //创建买入订单
export const reqDoSell = ({points, trade_price, trade_min, trade_max}) => ajax(`${BASE_URL}index/sell`, {
    points,
    trade_price,
    trade_min,
    trade_max
}, 'POST')                    //创建卖出订单
export const reqGetSell = () => ajax(`${BASE_URL}index/sell`, {}, 'GET')
export const reqEditUserBank = ({id}) => ajax(`${BASE_URL}index/edituserbank`, {id}, 'GET')                     //获取银行卡信息
export const reqDoEditUserBank = ({id, name, card, addr, cid, is_default}) => {
    return ajax(`${BASE_URL}index/edituserbank?id=${id}`, {id, name, card, addr, cid, is_default}, 'POST')      //执行修改银行卡
}
export const reqBuyOrderLog = ({status}) => ajax(`${BASE_URL}/index/buyorderlog`, {status}, 'GET')              //拿到买入订单数据
export const reqSellOrderLog = ({status}) => ajax(`${BASE_URL}/index/sellorderlog`, {status}, 'GET')            //拿到卖出订单数据

export const reqTransfer = ({ethaddress, phone, transfernum}) => ajax(`${BASE_URL}/index/transfer`, {
    ethaddress,
    phone,
    transfernum
}, 'POST')           //发起转账
export const reqTransferLog = () => ajax(`${BASE_URL}/index/transferlog`, {}, 'GET')                                        //获取转账记录
export const reqRegister = ({phone, username, realname, pwd, payPwd, inviteUid,smsCode}) => ajax(`${BASE_URL}/unauth/register`, {
    phone,
    username,
    realname,
    pwd,
    payPwd,
    inviteUid,
    smsCode
}, 'POST')
export const reqEditErJiPassword = ({uid,oldPayPwd, newPayPwd}) => ajax(`${BASE_URL}/user/updatePayPwd`, {
    uid,
    oldPayPwd,
    newPayPwd
}, 'POST')                  // 修改二级密码
export const reqUserServer = () => ajax(`${BASE_URL}index/userserver`, {}, 'GET')
export const reqDelMill = ({mac}) => ajax(`${BASE_URL}index/deluserver`, {mac}, 'GET')
export const reqTotincome = () => ajax(`${BASE_URL}index/totincome`, {}, 'GET')
export const reqNodeincome = ({sid}) => {
    return ajax(`${BASE_URL}index/nodeincome`, {sid}, 'GET')
}
export const reqTenincome = ({sid}) => ajax(`${BASE_URL}index/tenincome`, {sid}, 'GET')
export const reqIncomedetail = ({detailid}) => ajax(`${BASE_URL}index/incomedetail`, {detailid}, 'GET')
export const reqTiXian = () => ajax(`${BASE_URL}index/tixian`, {}, 'GET')
export const reqDoTiXian = ({account, money}) => ajax(`${BASE_URL}index/tixian`, {account, money}, 'POST')
export const reqAddserver = ({mac1}) => ajax(`${BASE_URL}index/uaddserver`, {mac1}, 'POST')
export const reqGetChibi = () => ajax(`${BASE_URL}index/chibi`, {}, 'GET')
export const reqChibi = ({fmoney, ftypes}) => ajax(`${BASE_URL}index/chibi`, {fmoney, ftypes}, 'POST')
export const reqChibiLog = () => ajax(`${BASE_URL}index/chibilog`, {}, 'GET')             //投资历史
export const reqRename = () => ajax(`${BASE_URL}index/renickname`, {}, 'POST')                //修改昵称
export const reqReavatar = () => ajax(`${BASE_URL}index/reavatar`, {}, 'POST')                //修改头像
export const reqKline = ({market, size, type}) => ajax(`${BASE_API}/data/v1/kline`, {market, size, type}, 'GET')
export const reqGetPay = ({uid,type,oid}) => ajax(`${BASE_URL}/o2c/userOrder/one`, {uid,type,oid}, 'GET')

export const reqPostPay = ({order_id, image}) => ajax(`${BASE_URL}ctwoc/gopay`, {order_id,image}, 'POST')
export const reqBuyBiBi = ({mid, trade_num, trade_price}) => ajax(`${BASE_URL}/bitrade/buybibi`, {mid,trade_num,trade_price}, 'POST')
export const reqSellBiBi = ({mid, trade_num, trade_price}) => ajax(`${BASE_URL}/bitrade/sellbibi`, {mid,trade_num,trade_price}, 'POST')

export const reqPayType = () => ajax(`${BASE_URL}index/getpaytype`, {}, 'GET')
export const reqCloseBuyOrder = ({uid,oid}) => ajax(`${BASE_URL}/o2c/buyer/cancel`, {uid,oid}, 'POST')

export const reqCtcOrder = () => ajax(`${BASE_URL}ctwoc/ccorder`, {}, 'GET')           //获取需要打款的订单
export const reqBiBiOrderLog = ({tradetype}) => ajax(`${BASE_URL}bitrade/bibitradelog`, {tradetype}, 'GET')               //get logs of bibi
export const reqShareCode = () => ajax(`${BASE_URL}index/myspreadcode`, {}, 'GET')
export const reqEditPayType = ({paynum, payimg, id}) => ajax(`${BASE_URL}index/editpaytype`, {paynum,payimg,id}, 'POST')
export const reqGetEditPayType = ({id}) => ajax(`${BASE_URL}index/editpaytype`, {id}, 'GET')
export const reqTranMoney = () => ajax(`${BASE_URL}bitrade/alltomoney`, {}, 'GET')              //Get all the benefits
export const reqTree = ({num}) => ajax(`${BASE_URL}index/tree`, {num}, 'GET')
export const reqExtractlog = () => ajax(`${BASE_URL}index/tixianlog`, {}, 'GET')               //提现记录
export const reqSysNotices = () => ajax(`${BASE_URL}index/notices`, {}, 'GET')
export const reqCoinlist = ({type}) => ajax(`${BASE_URL}index/coinlist`, {type}, 'GET')                                  //获取币种
export const reqBitradeBuy = ({type, price, num}) => ajax(`${BASE_URL}bitrade/tradebuy`, {type, price, num}, 'POST')        //币币买入                               //获取币种
export const reqBitradeSell = ({type, price, num}) => ajax(`${BASE_URL}bitrade/tradesell`, {type, price, num}, 'POST')             //币币卖出                    //获取币种
export const reqUsercion = ({type, m}) => ajax(`${BASE_URL}bitrade/usercoin`, {type, m}, 'GET')             //币币卖出          // 获取币种

// token接口

export const req2Coinlist = ({uid,mid}) => ajax(`${BASE_URL}/wallet/coin/balance`, {uid,mid}, 'POST')    // 总资产净资产

export const reqRecord = () => ajax(`${BASE_URL}bitrade/record`, {}, 'GET')

export const reqMineral = () => ajax(`${BASE_URL}User/mining`, {}, 'POST')                   // 交易挖矿

export const reqWritePwd = () => ajax(`${BASE_URL}login/modifyPwd`,{},'POST')          // 修改登录密码

export const reqSpread = ({uid}) => ajax(`${BASE_URL}/user/inviteLink`,{uid},'GET')          // 推广二维码

export const reqCashAssets = () => ajax(`${BASE_URL}Finance/wallet`,{},'POST')          // 现货资产

// export const reqSettingsUser = ({uid}) => ajax(`${BASE_URL}/user/userinfo`,{uid},'GET')     // 我的信息

export const reqUpdateName = ({uid,nickname,avatar}) => ajax(`${BASE_URL}/user/updateUser`,{
    uid,
    nickname,
    avatar}, 'POST')    // 修改昵称

export const reqUserWallet = () => ajax(`${BASE_URL}index/mywallet`, {}, 'GET')                 //获取钱包

// export const reqMessage = () => ajax(`${BASE_URL}affect/indexNotice`,{},'POST')                  // 获取首页公告
export const reqMessage = ({uid}) => ajax(`${BASE_URL}/article/notice`,{uid},'GET')                  //

export const reqMarket = ({utype}) => ajax(`${BASE_URL}/energy/rank`, {utype}, 'POST')
export const reqMarket2 = ({start,limit}) => ajax(`${BASE_URL}/energy/rank2`, {start,limit}, 'GET')



export const reqEditPassword = ({uid,oldPwd, newPwd}) => ajax(`${BASE_URL}/user/updatePwd`, {
    uid,
    oldPwd,
    newPwd
}, 'POST')


export const reqSignin = ({uid}) => ajax(`${BASE_URL}/energy/checkad`, {uid}, 'POST')
export const reqGoldnum = ({uid}) => ajax(`${BASE_URL}/energy/generate`, {uid}, 'POST')

export const reqPowernum = ({uid,index}) => ajax(`${BASE_URL}/energy/receive`, {uid,index}, 'POST')
export const reqConvert = ({uid,amount}) => ajax(`${BASE_URL}/finance/exchange`, {uid,amount}, 'POST')
export const reqGoldTKnum = ({uid}) => ajax(`${BASE_URL}/finance/goldAmount`, {uid}, 'GET')
export const reqETHTKnum = ({uid}) => ajax(`${BASE_URL}/finance/eth/TurnTkAmount`, {uid}, 'GET')
export const reqTKGoldnum = ({uid}) => ajax(`${BASE_URL}/finance/tk/TurnGoldAmount`, {uid}, 'GET')
export const reqTKEthnum = ({uid}) => ajax(`${BASE_URL}/finance/tk/TurnEthAmount`, {uid}, 'GET')
export const reqEthTK = ({uid,amount}) => ajax(`${BASE_URL}/finance/eth/TurnTk`, {uid,amount}, 'POST')
export const reqGoldTK = ({uid,amount}) => ajax(`${BASE_URL}/finance/exchange`, {uid,amount}, 'POST')
export const reqTKGold = ({uid,amount}) => ajax(`${BASE_URL}/finance/tk/turnGold`, {uid,amount}, 'POST')
export const reqTKEth = ({uid,amount}) => ajax(`${BASE_URL}/finance/tk/TurnEth`, {uid,amount}, 'POST')
export const reqrefer = ({uid,amount,address,smsCode}) => ajax(`${BASE_URL}/finance/withdraw`, {uid,amount,address,smsCode}, 'POST')


export const reqBuyInfo = ({limit,offset}) => ajax(`${BASE_URL}/o2c/orders`, {limit,offset}, 'GET')


export const reqSaleorder = ({uid,paypwd,pid,tradeMin,tradeMax,amount,payType}) => ajax(`${BASE_URL}/o2c/seller/createOrder `, {
    uid,
    paypwd,
    pid,
    tradeMin,
    tradeMax,
    amount,
    payType,
}, 'POST')   // 卖家下单

export const reqBuyInfoDetail = ({uid,type,oid}) => ajax(`${BASE_URL}/o2c/userOrder/one`, {uid,type,oid}, 'GET')  // 订单信息


export const reqGoBuy = ({uid,oid,amount,paypwd}) => ajax(`${BASE_URL}/o2c/buyer/book`, {uid,oid,amount,paypwd}, 'POST')  // 买家拍下

export const reqCheckScPassword = ({uid,paypwd}) => ajax(`${BASE_URL}/o2c/paypwd`, {uid,paypwd}, 'GET')      //检测二级密码

export const reqUploader = ({uid,oid}) => ajax(`${BASE_URL}/o2c/buyer/proof`, {uid,oid}, 'POST')            //上传图片

export const reqDelUserBank = ({id}) => ajax(`${BASE_URL}index/deluserbank`, {id}, 'GET')

export const regAllPayType = ({uid,type}) => ajax(`${BASE_URL}/o2c/payType`, {uid,type}, 'GET')    // 获取支付方式


export const reqMerchantSell = ({points, trade_min, trade_max}) => ajax(`${BASE_URL}ctwoc/sell`, {
    points,
    trade_min,
    trade_max
}, 'POST')                   //商家卖出


//添加微信支付或者支付宝支付
export const reqAddPayType = ({uid,payNum, payType, payImg,username,bank,branch}) => ajax(`${BASE_URL}/o2c/seller/addPayMethod`, {
    uid,
    payNum,
    payType,
    payImg,
    username,
    bank,
    branch
}, 'POST')

export const requOrderGua = ({uid,type,limit,offset}) => ajax(`${BASE_URL}/o2c/userOrder`, {uid,type,limit,offset}, 'GET')       //挂单中心数据
export const reqHistoryOrder = ({uid,type,limit,offset}) => ajax(`${BASE_URL}/o2c/history`, {uid,type,limit,offset}, 'GET')        // 获取用户已完成订单
export const requOrder = () => ajax(`${BASE_URL}/Ctwoc/uorder`, {}, 'GET')                      //买入订单
export const reqCloseOrder = ({uid,oid}) => ajax(`${BASE_URL}/o2c/seller/cancel`, {uid,oid}, 'POST')    //撤销卖出订单
export const reqTKtransaction = ({uid,amount,phone,pwd}) => ajax(`${BASE_URL}/finance/tk/transaction`, {uid,amount,phone,pwd}, 'POST')    //余额转出
export const reqLeaveMsg = ({uid,msg}) => ajax(`${BASE_URL}/msg/leaveMsg`, {uid,msg}, 'POST')    //用户留言
export const reqNewMsg = ({uid,after}) => ajax(`${BASE_URL}/msg/newMsg`, {uid,after}, 'GET')    //获取最新回复的留言
export const reqtransactions = ({uid,name}) => ajax(`${BASE_URL}/finance/transactions`, {uid,name}, 'GET')    //获取用户交易记录
export const reqexchangeNum = ({uid,name}) => ajax(`${BASE_URL}/finance/exchangeNum`, {uid,name}, 'GET')    //可兑换数量
export const reqexchange = ({uid,amount,name}) => ajax(`${BASE_URL}/finance/exchange`, {uid,amount,name}, 'POST')    //兑换（划转）
export const reqtransferInfo = ({uid}) => ajax(`${BASE_URL}/finance/tk/transferInfo`, {uid}, 'GET')    //余额转出用户信息
export const reqethAddress = ({uid}) => ajax(`${BASE_URL}/user/ethAddress`, {uid}, 'GET')    //获取钱包地址（获取用户以太坊地址）
export const reqSellertrue = ({uid}) => ajax(`${BASE_URL}/o2c/seller/unConfirmOrders`, {uid}, 'GET')     //卖家确认打款
export const reqSellConfirm = ({uid,oid,smsCode}) => ajax(`${BASE_URL}/o2c/seller/confirm`, {uid,oid,smsCode}, 'POST')     //卖家确认打款
export const reqMineDetail = ({uid}) => ajax(`${BASE_URL}/finance/mine/detail`, {uid}, 'GET')     //挖矿用户信息
export const reqMineTeam = ({uid,type}) => ajax(`${BASE_URL}/finance/mine/team`, {uid,type}, 'GET')     //团队挖矿明细
export const reqMineMoney = ({uid}) => ajax(`${BASE_URL}/finance/mine/income`,{uid},'GET')       // 挖矿收益

export const reqJournalAccount = ({uid,name}) => ajax(`${BASE_URL}/finance/transactions`,{uid,name},'GET')       // 挖矿收益

export const reqMsgCode = ({uid,oid}) => ajax(`${BASE_URL}/user/sendSMS`, {uid,oid}, 'POST')                //确认收款发送验证码

export const reqResetPaypwd = ({uid,smsCode,payPwd}) => ajax(`${BASE_URL}/user/resetPayPwd`, {uid,smsCode,payPwd}, 'POST')          //

export const reqResetPwd = ({phone,smsCode,pwd}) => ajax(`${BASE_URL}/unauth/resetPwd`, {phone,smsCode,pwd}, 'POST')       // 重置登录密码

export const reqbookmaking = ({uid}) => ajax(`${BASE_URL}/game/prizeWheel/pick`, {uid}, 'POST')                //幸运大转盘

export const reqlotterylist = ({uid,offset,limit}) => ajax(`${BASE_URL}/game/prizeWheel/records`, {uid,offset,limit}, 'GET')  //抽奖流水

// export const reqyetDelivery = ({limit,offset}) => ajax(`${BASE_URL}/finance/delivery/logs`,{limit,offset},'GET')       // 挖矿收益

export const reqExamine = ({uid,type}) => ajax(`${BASE_URL}/o2c/seller/payDetail`,{uid,type},'GET')       // 支付方式

export const reqSeedOrder = ({uid,oid}) => ajax(`${BASE_URL}/o2c/BuyOrdersBySellOid`,{uid,oid},'GET')

export const reqResetCode = ({phone}) => ajax(`${BASE_URL}/unauth/sendSMS`,{phone},'POST')

// export const reqUnfreeze = ({uid}) => ajax(`${BASE_URL}/finance/recoveryLimit`,{uid},'POST')   // 解除限制
export const reqRenewal = () => ajax(`${BASE_URL}/unauth/appVersion`,{},'GET')  // 检查更新

// export const reqMnemonic = ({uid,pwd}) => ajax(`${BASE_URL}/user/wallet`,{uid,pwd},'POST')  //  用户私钥、助记词

///user/walletPrivateKey  私要验证

export const reqwalletPrivateKey = ({uid,payPwd}) => ajax(`${BASE_URL}/user/walletPrivateKey`,{uid,payPwd},'POST')  //  用户私钥、助记词

// o2c
export const reqCoin = () => ajax(`${BASE_URL}/o2c/coinList`,{},'GET')  // 货币价格

export const applyDealer = ({uid}) => ajax(`${BASE_URL}/o2c/applyDealer`,{uid},'POST')  // 申请商户
export const reqO2cPayType = ({uid}) => ajax(`${BASE_URL}/o2c/payType`, {uid}, 'GET')   // 获取支付方式
export const OtcCreateOrder = ({uid,mid,tradeMin,tradeMax,amount,payType,types,unitPrice,payPwd,totalPrice}) => ajax(`${BASE_URL}/o2c/createOrder`,
    {
        uid,
        mid,
        tradeMin,
        tradeMax,
        amount,
        payType,
        types,
        unitPrice,
        payPwd,
        totalPrice
    }, 'POST')  // otc挂单
export const reqOTCOrder = ({mid,types,limit,start}) => ajax(`${BASE_URL}/o2c/orders`, {mid,types,limit,start}, 'GET')  // 获取所有买卖单
export const reqOTCUserOrder = ({uid,types,limit,start}) => ajax(`${BASE_URL}/o2c/userOrders`, {uid,types,limit,start}, 'GET')  // 获取所有买卖单
export const reqmatchInfo = ({uid,matchId}) => ajax(`${BASE_URL}/o2c/matchInfo`, {uid,matchId}, 'GET')  // 获取用户单个交易订单
export const reqChatLists = ({uid,types,limit,start}) => ajax(`${BASE_URL}/o2c/userMatchs`, {uid,types,limit,start}, 'GET')
export const cancelOrder = ({uid,oid,types}) => ajax(`${BASE_URL}/o2c/orderCancel`, {uid,oid,types}, 'POST')
export const reqOTCConfirm = ({uid,matchId,payPwd}) => ajax(`${BASE_URL}/o2c/confirmPay`, {uid,matchId,payPwd}, 'POST')
export const reqChatRecord = ({uid,matchId,limit,start}) => ajax(`${BASE_URL}/o2c/chitchatRecord`, {uid,matchId,limit,start}, 'GET')
export const reqSendMsg = ({uid,msg,matchId}) => ajax(`${BASE_URL}/o2c/chitchat`, {uid,msg,matchId}, 'POST')
export const cancelCount = ({uid,types}) => ajax(`${BASE_URL}/o2c/cancelCount`, {uid,types}, 'GET')
export const matchCancelCount = ({uid,types}) => ajax(`${BASE_URL}/o2c/matchCancelCount`, {uid,types}, 'GET')
export const matchCancel = ({uid,matchId,types}) => ajax(`${BASE_URL}/o2c/matchCancel`, {uid,matchId,types}, 'POST')

// /o2c/addPayMethod
export const reqPayList = ({uid,matchId,types}) => ajax(`${BASE_URL}/o2c/matchCancel`, {uid,matchId,types}, 'POST')

//SIYAO /wallet/privatekey
export const reqKey = ({uid,coin,payPwd}) => ajax(`${BASE_URL}/wallet/privatekey`, {uid,coin,payPwd}, 'POST')

///wallet/coin/address  充币地址
export const reqAddress = ({uid,coin}) => ajax(`${BASE_URL}/wallet/coin/address`, {uid,coin}, 'GET')

//Host/wallet/coin/withdraw 提币申请
export const reqWithdraw= ({uid,address,payPwd,amount,coin}) => ajax(`${BASE_URL}/wallet/coin/withdraw`, {uid,address,payPwd,amount,coin}, 'POST')

///wallet/coin/transfer 划转
export const reqRransfer= ({uid,coinAdd,coinSub,amount,payPwd}) => ajax(`${BASE_URL}/wallet/coin/transfer`, {uid,coinAdd,coinSub,amount,payPwd}, 'POST')


///wallet/coin/transaction 流水
export const reqTransaction= ({uid,offset,limit,coin}) => ajax(`${BASE_URL}/wallet/coin/transaction`, {uid,offset,limit,coin}, 'POST')

//充币刷新  /wallet/refreshBalance
export const reqRefreshBalance= ({uid}) => ajax(`${BASE_URL}/wallet/refreshBalance`, {uid}, 'GET')

//助记词 /wallet/mnemonic
export const reqMnemonic= ({uid,payPwd}) => ajax(`${BASE_URL}/wallet/mnemonic`, {uid,payPwd}, 'POST')

//无助记词，选择语言
export const reqMaddress= ({uid,language}) => ajax(`${BASE_URL}/wallet/address`, {uid,language}, 'GET')

// 撤销匹配单
export const reqOTCmcancel= ({uid,matchId}) => ajax(`${BASE_URL}/o2c/matchCancel`, {uid,matchId}, 'POST')

// 助记词确认
export const reqConfirmMnemonic= ({uid}) => ajax(`${BASE_URL}/wallet/confirmMnemonic`, {uid}, 'POST')

//获取交易对列表
export const reqCoinPairs= ({}) => ajax(`${BASE_URL}/coinTrade/coinPairs`, {}, 'GET')
//创建交易
export const reqCreateTrade= ({uid,coinPair,amount,price,type}) => ajax(`${BASE_URL}/coinTrade/createTrade`,{uid,coinPair,amount,price,type}, 'POST')
//获取交易历史
export const reqCoinTradeHistory= ({uid,offset,limit,coinPair,type,status}) => ajax(`${BASE_URL}/coinTrade/history`, {uid,offset,limit,coinPair,type,status}, 'GET')

//取消匹配
export const reqCancelTrade= ({uid,orderId}) => ajax(`${BASE_URL}/coinTrade/cancelTrade`,{uid,orderId}, 'POST')


//未匹配完成订单 的已匹配订单详情/coinTrade/matchHistory
// export const reqCoinPairs= ({uid,offset,limit,orderId}) => ajax(`${BASE_URL}/coinTrade/matchHistory`, {uid,offset,limit,orderId}, 'GET')

// 可划转币种
export const reqTransferCoin= ({coinname}) => ajax(`${BASE_URL}/wallet/coin/transferName`,{coinname}, 'GET')
export const reqOtcChitchatM = ({msg,matchId}) => ajax(`${BASE_URL}/o2c/chitchat`, {msg,matchId}, 'POST')
export const reqOtcchitchatRecord = ({uid,matchId,limit,start}) => ajax(`${BASE_URL}/o2c/chitchatRecord`, {uid,matchId,limit,start}, 'GET')
export const createMatch = ({
    uid,
    payPwd,
    amount,
    oid,
    usdtType
}) => ajax(`${BASE_URL}/o2c/createMatch`, {
    uid,
    payPwd,
    amount,
    oid,
    usdtType
}, 'POST')
export const reqhutransferCoin= ({account,num,coinname,payPwd}) => ajax(`${BASE_URL}/wallet/coin/transferCoin`,{account,num,coinname,payPwd}, 'POST')


// const urlf='http://goline.my.com'
const urlf='http://' + process.env.GO_API
export const reqKlinetok = ({market, size, type}) => ajax(`${urlf}/data/v1/kline`, {market, size, type}, 'GET')
export const reqBiBiKline = ({pid, limit, interval}) => ajax(`${urlf}/finance/getKline`, {pid, limit, interval}, 'GET')    // k线
export const reqAllorder = ({uid}) => ajax(`${urlf}/finance/getAllOrders`, {uid}, 'GET')   // 全部预测历史订单
export const reqCoinprice = ({pid}) => ajax(`${urlf}/finance/getMarket`, {pid}, 'GET')                         // 币种行情
export const reqOrdernum = ({uid,pid,ptitle,amount,wish,interval,buyprice,winratio}) => ajax(`${urlf}/finance/createOrders`, {
    uid,
    pid,
    ptitle,
    amount,
    wish,
    interval,
    buyprice,
    // buytime,
    winratio}, 'POST')  // 预测下单
export const reqOrderconfig = ({uid,pid}) => ajax(`${urlf}/finance/orderConfig`, {uid,pid}, 'GET')   // 下单配置
export const reqPresentorder = ({uid}) => ajax(`${urlf}/finance/getOrders`, {uid}, 'GET')   // 正在进行预测订单
// export const req2Coinlist = ({uid}) => ajax(`${BASE_URL}/user/userMoneyInfo`, {uid}, 'GET')    // 总资产净资产
export const reqyetDelivery = ({limit,offset}) => ajax(`${urlf}/finance/delivery/logs`,{limit,offset},'GET')       // 挖矿收益
export const reqBiBiCategory = ({coinname}) => ajax(`${urlf}/finance/getCoin`, {coinname}, 'GET')         //获取币种
export const reqUnfreeze = ({uid}) => ajax(`${urlf}/finance/recoveryLimit`,{uid},'POST')   // 解除限制
export const reqCoincoinName = ({}) => ajax(`${urlf}/finance/getCoinName`, {}, 'GET')   // 下单配置

// 获取K线数据
export const reqKData = ({method,pid,num}) => ajax(`${BASE_URL}/api.html?lang=zh-cn`,{method,pid,num},'POST');
