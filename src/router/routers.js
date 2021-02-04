/**
 *      path         页面路由地址
 *      navShow      是否显示页面头部
 *      tabShow      是否显示页面底部导航
 *      title        页面标题
 *      keepAlive    是否缓存页面
 *      @type {*[]}
 */

import i18n from '../i18n'

const routers = [{
    path: '/',
      redirect: '/msiteb'
    //redirect: '/msite'
},
{
    path: '/authbind',
    component: resolve => require(['../pages/AuthBind'], resolve),
    name: 'AuthBind',
    meta: {
        navShow: false,
        tabShow: true,
        title: '用户绑定',
        keepAlive: false
    }
},
{
    path: '/KKline',
    component: resolve => require(['../pages/KKline/KKline'], resolve),
    meta: {
        navShow: false,
        tabShow: true,
        title: 'K线',
        keepAlive: false
    }
},
{
    path: '/author',
    component: resolve => require(['../pages/Author'], resolve),
    name: 'author',
    meta: {
        navShow: false,
        tabShow: false,
        title: '登录授权中',
        keepAlive: false
    }
},
{
    path: '/index',
    component: resolve => require(['../pages/Index'], resolve),
    name: 'Index',
    meta: {
        navShow: false,
        tabShow: true,
        keepAlive: true
    }
},
{
    path: '/classify',
    component: resolve => require(['../pages/Classify'], resolve),
    name: 'Classify',
    meta: {
        navShow: true,
        tabShow: true,
        title: '全部分类',
        keepAlive: true
    }
},
{
    path: '/cart',
    component: resolve => require(['../pages/cart/Cart'], resolve),
    name: 'Cart',
    meta: {
        navShow: true,
        tabShow: true,
        title: '购物车',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/finance',
    component: resolve => require(['../pages/Finance/Finance'], resolve),
    meta: {
        // navShow: true,
        tabShow: true,
        title: '财务',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/user',
    component: resolve => require(['../pages/User'], resolve),
    name: 'user',
    meta: {
        navShow: true,
        tabShow: true,
        title: '商城中心',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/login',
    component: resolve => require(['../pages/login/Login'], resolve),
    name: 'Login',
    meta: {
        // navShow: true,
        tabShow: false,
        title: '用户登录',
        keepAlive: false
    }
},
{
    path: '/goodslist',
    component: resolve => require(['../pages/goods/GoodsList'], resolve),
    name: 'GoodsList',
    meta: {
        navShow: true,
        tabShow: false,
        title: '商品列表',
        keepAlive: false
    }
},
{
    path: '/goodsdetail',
    component: resolve => require(['../pages/goods/GoodsDetail'], resolve),
    name: 'GoodsDetail',
    meta: {
        navShow: false,
        tabShow: false,
        title: '商品详情',
        keepAlive: false
    }
},
{
    path: '/firmorder',
    component: resolve => require(['../pages/order/FirmOrder'], resolve),
    name: 'FirmOrder',
    meta: {
        tabShow: false,
        navShow: true,
        title: '订单确认',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/cashierdesk',
    component: resolve => require(['../pages/order/CashierDesk'], resolve),
    name: 'CashierDesk',
    meta: {
        tabShow: false,
        navShow: true,
        title: '订单支付',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/payresult',
    component: resolve => require(['../pages/order/PayResult'], resolve),
    name: 'PayResult',
    meta: {
        tabShow: false,
        navShow: true,
        title: '支付结果',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/allorder',
    component: resolve => require(['../pages/order/AllOrder'], resolve),
    name: 'AllOrder',
    meta: {
        navShow: true,
        tabShow: false,
        title: '订单列表',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/orderdetail',
    component: resolve => require(['../pages/order/OrderDetail'], resolve),
    name: 'OrderDetail',
    meta: {
        navShow: true,
        tabShow: false,
        title: '订单详情',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/express',
    component: resolve => require(['../pages/order/Express'], resolve),
    name: 'Express',
    meta: {
        navShow: true,
        tabShow: false,
        title: '物流信息',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/afterservice',
    component: resolve => require(['../pages/order/AfterService'], resolve),
    name: 'AfterService',
    meta: {
        navShow: true,
        tabShow: false,
        title: '申请售后',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/allafterservice',
    component: resolve => require(['../pages/order/AllAfterService'], resolve),
    name: 'AllAfterService',
    meta: {
        navShow: true,
        tabShow: false,
        title: '售后单列表',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/collect',
    component: resolve => require(['../pages/other/Collect'], resolve),
    name: 'Collect',
    meta: {
        navShow: true,
        tabShow: false,
        title: '我的收藏',
        keepAlive: false,
        isLogin: true

    }
},
{
    path: '/history',
    component: resolve => require(['../pages/other/History'], resolve),
    name: 'History',
    meta: {
        navShow: true,
        tabShow: false,
        title: '我的足迹',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/notice',
    component: resolve => require(['../pages/other/Notice'], resolve),
    name: 'Notice',
    meta: {
        navShow: true,
        tabShow: false,
        title: '公告详情',
        keepAlive: false
    }
},
{
    path: '/article',
    component: resolve => require(['../pages/article/Article'], resolve),
    name: 'Article',
    meta: {
        navShow: true,
        tabShow: false,
        title: '文章详情',
        keepAlive: false
    }
},
{
    path: '/coupon',
    component: resolve => require(['../pages/Coupon'], resolve),
    name: 'Coupon',
    meta: {
        navShow: true,
        tabShow: false,
        title: '我的优惠券',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/evaluate',
    component: resolve => require(['../pages/order/Evaluate'], resolve),
    name: 'Evaluate',
    meta: {
        tabShow: false,
        navShow: true,
        title: '订单评价',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/datasetting',
    component: resolve => require(['../pages/setting/DataSetting'], resolve),
    name: 'DataSetting',
    meta: {
        navShow: true,
        tabShow: false,
        title: '资料设置',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/aftersalesdetail',
    component: resolve => require(['../pages/order/AfterSalesDetail'], resolve),
    name: 'AfterSalesDetail',
    meta: {
        tabShow: false,
        navShow: true,
        title: '售后单详情',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/searchpage',
    component: resolve => require(['../pages/search/SearchPage'], resolve),
    name: 'SearchPage',
    meta: {
        tabShow: true,
        title: '商品搜索',
        keepAlive: false
    }
},
{
    path: '/address',
    component: resolve => require(['../pages/address/Address'], resolve),
    name: 'Address',
    meta: {
        navShow: true,
        tabshow: false,
        title: '地址详情',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/addresslist',
    component: resolve => require(['../pages/address/AddressList'], resolve),
    name: 'AddressList',
    meta: {
        navShow: true,
        tabshow: false,
        title: '地址管理',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/balance',
    component: resolve => require(['../pages/balance/Balance'], resolve),
    name: 'Balance',
    meta: {
        navShow: true,
        tabshow: false,
        title: '我的余额',
        keepAlive: false
    }
},
{
    path: '/balancelist',
    component: resolve => require(['../pages/balance/BalanceList'], resolve),
    name: 'BalanceList',
    meta: {
        navShow: true,
        tabShow: false,
        title: '余额明细',
        keepAlive: false
    }
},
{
    path: '/withdrawcash',
    component: resolve => require(['../pages/balance/WithDrawCash'], resolve),
    name: 'WithDrawCash',
    meta: {
        navShow: true,
        tabshow: false,
        title: '余额提现',
        keepAlive: false
    }
},
{
    path: '/bankcard',
    component: resolve => require(['../pages/balance/BankCard'], resolve),
    name: 'BankCard',
    meta: {
        navShow: true,
        tabShow: false,
        title: '添加银行卡',
        keepAlive: false
    }
},
{
    path: '/mybankcardlist',
    component: resolve => require(['../pages/balance/MyBankCardList'], resolve),
    name: 'MyBankCardList',
    meta: {
        navShow: true,
        tabShow: false,
        title: '我的银行卡',
        keepAlive: false
    }
},
{
    path: '/rewardlist',
    component: resolve => require(['../pages/RewardList'], resolve),
    name: 'RewardList',
    meta: {
        navShow: true,
        tabShow: false,
        title: '我的奖励金',
        keepAlive: false
    }
},
{
    path: '/recommendlist',
    component: resolve => require(['../pages/share/RecommendList'], resolve),
    name: 'RecommendList',
    meta: {
        navShow: true,
        tabShow: false,
        title: '推荐记录',
        keepAlive: false
    }
},
{
    path: '/share',
    component: resolve => require(['../pages/share/Share'], resolve),
    name: 'Share',
    meta: {
        navShow: true,
        tabShow: false,
        title: '推荐好友',
        keepAlive: false
    }
},
{
    path: '/shareb',
    component: resolve => require(['../pages/share/Shareb'], resolve),
    name: 'Shareb',
    meta: {
        navShow: true,
        tabShow: false,
        title: '推荐好友',
        keepAlive: false
    }
},
{
    path: '/cashlist',
    component: resolve => require(['../pages/balance/CashList'], resolve),
    name: 'CashList',
    meta: {
        navShow: true,
        tabShow: false,
        title: '提现记录',
        keepAlive: false
    }
},
{
    path: '/setting',
    component: resolve => require(['../pages/setting/Setting'], resolve),
    name: 'Setting',
    meta: {
        navShow: true,
        tabShow: false,
        title: '更多设置',
        keepAlive: false
    }
},
{
    path: '/register/:id',
    component: resolve => require(['../pages/register/Register'], resolve),
    name: 'Register',
    meta: {
        navShow: true,
        tabShow: false,
        title: 'Register',
        keepAlive: false
    }
},
{
    path: '/articlelist',
    component: resolve => require(['../pages/article/ArticleList'], resolve),
    name: 'ArticleList',
    meta: {
        navShow: true,
        tabShow: false,
        title: '文章列表',
        keepAlive: false
    }
},
{
    path: '/storeorder',
    component: resolve => require(['../pages/store/Order'], resolve),
    name: 'StoreOrder',
    meta: {
        navShow: true,
        tabShow: false,
        title: '店铺提货订单',
        keepAlive: false
    }
},
{
    path: '/orderverification',
    component: resolve => require(['../pages/store/OrderVerification'], resolve),
    name: 'OrderVerification',
    meta: {
        navShow: true,
        tabShow: false,
        title: '提货单核销',
        keepAlive: false
    }
},
{
    path: '/seckilldetail',
    component: resolve => require(['../pages/activity/SecKilldetail'], resolve),
    name: 'SecKillDetail',
    meta: {
        navShow: false,
        tabShow: false,
        title: '秒杀活动',
        keepAlive: false
    }
},
{
    path: '/groupbuying',
    component: resolve => require(['../pages/activity/GroupBuying'], resolve),
    name: 'GroupBuying',
    meta: {
        navShow: false,
        tabShow: false,
        title: '团购活动',
        keepAlive: false
    }
},
{
    path: '/invoice',
    component: resolve => require(['../pages/order/Invoice'], resolve),
    name: 'GroupBuying',
    meta: {
        navShow: true,
        tabShow: false,
        title: '发票',
        keepAlive: false
    }
},
{
    path: '/recharge',
    component: resolve => require(['../pages/balance/Recharge'], resolve),
    name: 'Recharge',
    meta: {
        navShow: true,
        tabShow: false,
        title: '余额充值',
        keepAlive: false
    }
},
    // 整合添加页面财务
{
    path: '/Msite',
    component: resolve => require(['../pages/Msite/Msite'], resolve),
    meta: {
        // showFooter: true,
        title: '首页',
        // navShow: true,
        tabShow: true
    }
},
{
    path: '/Msiteb',
    component: resolve => require(['../pages/Msite/Msiteb'], resolve),
    meta: {
        // showFooter: true,
        title: '首页',
        // navShow: true,
        tabShow: true
    }
},

{
    path: '/BuyNew',
    component: resolve => require(['../pages/BuyNew/BuyNew'], resolve),
    meta: {
        // showFooter: true,
        navShow: true,
        tabShow: true,
        title: 'CTC'
    },
    children: [
        {
            path: '',
            redirect: '/BuyNew/SellTTC'
        },
        {
            path: '/BuyNew/SellTTC',
            component: resolve => require(['../pages/BuyNew/SellTTC/SellTTC'], resolve),
            meta: {
                // showFooter: true,
                navShow: true,
                tabShow: true,
                title: 'CTC'
            }
        }
    ]
},
    // {
    //     path:'/Finance',
    //     component: resolve => require(['../pages/Finance/Finance'], resolve),
    //     meta: {
    //         showFooter: true,
    //         title:'财务'
    //     },
    // },
{
    path: '/CashAssets',
    component: resolve => require(['../pages/CashAssets/CashAssets'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        tabShow: true,
        title: '现货资产'
    }
},
{
    path: '/investK',
    component: resolve => require(['../pages/InvestK/InvestK'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '矿池'
    }
},
    // {
    //     path:'/investC',
    //     component: resolve => require(['../pages/InvestC/InvestC'], resolve),
    //     meta: {
    //         // showFooter: false,
    //         navShow: true,
    //         tabShow: true,
    //         title:'持币生息'
    //     },
    // },
{
    path: '/out',
    component: resolve => require(['../pages/Out/Out'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '转账'
    }
},
{
    path: '/transfer',
    component: resolve => require(['../pages/Transfer/Transfer'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '资金转换'
    }
},
{
    path: '/TransferBill',
    component: resolve => require(['../pages/TransferBill/TransferBill'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        // tabShow: true,
        title: '流水账单'
    }
},
{
    path: '/BiBiC',
    component: resolve => require(['../pages/BiBiC/BiBiC'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        // tabShow: true,
        title: '充币'
    }
},
{
    path: '/BiBiT',
    component: resolve => require(['../pages/BiBiT/BiBiT'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        // tabShow: true,
        title: '提币'
    }
},
{
    path: '/BiBiH',
    component: resolve => require(['../pages/BiBiH/BiBiH'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        // tabShow: true,
        title: '划转'
    }
},
{
    path: '/Bill',
    component: resolve => require(['../pages/Bill/Bill'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        // tabShow: true,
        title: '充提记录'
    }
},
{
    path: '/BillDetail',
    component: resolve => require(['../pages/BillDetail/BillDetail'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        // tabShow: true,
        title: '充提记录详情'
    }
},
{
    path: '/Profile',
    component: resolve => require(['../pages/Profile/Profile'], resolve),
    meta: {
        // showFooter: true,
        // navShow: true,
        tabShow: true,
        title: '我的'
    }
},
{
    path: '/Security',
    component: resolve => require(['../pages/Security/Security'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        tabShow: true,
        title: '安全中心'
    }
},
{
    path: '/OrderCenter',
    component: resolve => require(['../pages/OrderCenter/OrderCenter'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: 'CTC订单中心'
    },
    children: [
        {
            path: '',
            redirect: '/OrderCenter/buy'
        },
        {
            path: '/OrderCenter/buy',
            component: resolve => require(['../pages/OrderCenter/MountOrderBuy/MountOrderBuy'], resolve),
            meta: {
                // showFooter: false,
                navShow: true,
                tabShow: true,
                title: 'CTC订单中心'
            }
        },
        {
            path: '/OrderCenter/sell',
            component: resolve => require(['../pages/OrderCenter/MountOrderSell/MountOrderSell'], resolve),
            meta: {
                // showFooter: false,
                navShow: true,
                tabShow: true,
                title: 'CTC订单中心'
            }
        },
        {
            path: '/OrderCenter/buyordercenter',
            component: resolve => require(['../pages/OrderCenter/BuyOrderCenter/BuyOrderCenter'], resolve),
            meta: {
                // showFooter: false,
                navShow: true,
                tabShow: true,
                title: 'CTC订单中心'
            }
        },
        {
            path: '/OrderCenter/payordermanage',
            component: resolve => require(['../pages/OrderCenter/PayOrderManage/PayOrderManage'], resolve),
            meta: {
                // showFooter: false,
                navShow: true,
                tabShow: true,
                title: 'CTC订单中心'
            }
        }
    ]
},

{
    path: '/regnotes',
    component: resolve => require(['../pages/RegNotes/RegNotes'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '节点关系'
    },
    children: [
        {
            path: '',
            redirect: '/regnotes/one'
        },
        {
            path: '/regnotes/one',
            component: resolve => require(['../pages/RegNotes/One/One'], resolve),
            meta: {
                // showFooter: false,
                navShow: true,
                tabShow: true,
                title: '节点关系'
            }
        },
        {
            path: '/regnotes/two',
            component: resolve => require(['../pages/RegNotes/Two/Two'], resolve),
            meta: {
                // showFooter: false,
                navShow: true,
                tabShow: true,
                title: '节点关系'
            }
        }
    ]
},
{
    path: '/ShareCode',
    component: resolve => require(['../pages/ShareCode/ShareCode'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '推广链接'
    }
},
{
    path: '/Service',
    component: resolve => require(['../pages/Service/Service'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        // tabShow: true,
        title: '客服'
    }
},
{
    path: '/Settings',
    component: resolve => require(['../pages/Settings/Settings'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '更多设置'
    }
},
{
    path: '/SettingsUser',
    component: resolve => require(['../pages/SettingsUser/SettingsUser'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: i18n.t('moresetting')
    }
},
{
    path: '/bank',
    component: resolve => require(['../pages/Bank/Bank'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        // tabShow: true,
        title: '更多设置'
    }
},
  {
    path: '/identityauth',
    component: resolve => require(['../pages/Bank/IdentityAuth.vue'], resolve),
    meta: {
      // showFooter: false,
      // navShow: true,
      // tabShow: true,
      title: '实名认证'
    }
  },
{
    path: '/editpay/:type',
    component: resolve => require(['../pages/EditPay/EditPay'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '修改'
    }
},
{
    path: '/editbank/:type',
    component: resolve => require(['../pages/EditBank/EditBank'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '修改银行卡'
    }
},
{
    path: '/addbank',
    component: resolve => require(['../pages/AddBank/AddBank'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '添加银行卡'
    }
},
{
    path: '/addaipay',
    component: resolve => require(['../pages/AddAiPay/AddAiPay'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '添加支付宝'
    }
},
{
    path: '/addwechat',
    component: resolve => require(['../pages/AddWeChat/AddWeChat'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '添加微信'
    }
},
{
    path: '/loginpassword',
    component: resolve => require(['../pages/LoginPassword/LoginPassword'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '修改登录密码'
    }
},
{
    path: '/paypassword',
    component: resolve => require(['../pages/PayPassword/PayPassword'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '修改支付密码'
    }
},
{
    path: '/systemnotice',
    component: resolve => require(['../pages/SystemNotice/SystemNotice'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        tabShow: true,
        title: i18n.t('notice')
    }
},
{
    path: '/VoiceTip',
    component: resolve => require(['../pages/VoiceTip/VoiceTip'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '声音提示'
    }
},

    // 矿机
{
    path: '/MillCenter',
    component: resolve => require(['../pages/MillCenter/MillCenter'], resolve),
    meta: {
        // showFooter: false,
        // navShow: true,
        tabShow: true,
        title: '矿池'
    }
},
{
    path: '/Mill',
    component: resolve => require(['../pages/Mill/Mill'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '矿机管理'
    }
},
    // 充电费
{
    path: '/PayElectricity',
    component: resolve => require(['../pages/PayElectricity/PayElectricity'], resolve),
    meta: {
        // showFooter: false,
        navShow: true,
        tabShow: true,
        title: '电费充值'
    }
},
    // 矿机详情
    // {
    //     path:'/MillDetail',
    //     component: resolve => require(['../pages/MillCenter/MillDetail'], resolve),
    //     meta:{
    //         navShow: true,
    //         tabShow: true,
    //         title:'矿机详情'
    //     }
    // },
{
    path: '/MillDetail',
    component: resolve => require(['../pages/MillDetail/MillDetail'], resolve),
    meta: {
        navShow: true,
        tabShow: false,
        title: '矿机详情'
    }
},
{
    path: '/Operation',
    component: resolve => require(['../pages/Operation/Operation'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: '查看详情'
    }
},
{
    path: '/Upgrade',
    component: resolve => require(['../pages/Upgrade/Upgrade'], resolve),
    meta: {
        navShow: true,
        tabShow: false,
        title: '矿机升级'
    }
},
    // {
    //     path:'/BuyMill',
    //     component: resolve => require(['../pages/BuyMill/BuyMill'], resolve),
    //     meta:{
    //         navShow: true,
    //         tabShow: false,
    //         title:'购买矿机'
    //     }
    // },
    // 矿机收益转出
{
    path: '/EarningsLog',
    component: resolve => require(['../pages/EarningsLog/EarningsLog'], resolve),
    meta: {
        // navShow: true,
        tabShow: true,
        title: '矿机详情'
    }
},
    // siyao
{
    path: '/Key',
    component: resolve => require(['../pages/Key/Key'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: 'SIYAO'
    }
},
    // ExamineBank查看
{
    path: '/ExamineBank/:type',
    component: resolve => require(['../pages/ExamineBank/ExamineBank'], resolve),
    meta: {
        navShow: true,
        // tabShow: true,
        title: '查看支付方式'
    }
},
    // 查看微信支付宝  ExaminePaytype
{
    path: '/ExaminePaytype/:type',
    component: resolve => require(['../pages/ExaminePaytype/ExaminePaytype'], resolve),
    meta: {
        navShow: true,
        // tabShow: true,
        title: '查看支付方式'
    }
},

    // InvestEasy
{
    path: '/InvestEasy',
    component: resolve => require(['../pages/InvestEasy/InvestEasy'], resolve),
    meta: {
        navShow: true,
        // tabShow: true,
        title: '助记词'
    }
},
    // InvestCtwo
{
    path: '/InvestCtwo',
    component: resolve => require(['../pages/InvestCtwo/InvestCtwo'], resolve),
    meta: {
        navShow: true,
        // tabShow: true,
        title: '助记词'
    }
},

    // 市场
{
    path: '/Treaty',
    component: resolve => require(['../pages/Treaty/Treaty'], resolve),
    meta: {
        // navShow: true,
        tabShow: true,
        title: '行情'
    }
},
    // 币币交易
{
    path: '/Bili',
    component: resolve => require(['../pages/Bili/Bili'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '币币'
    }
},
{
    path: '/Kline',
    component: resolve => require(['../pages/Kline/Kline'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: 'k线图'
    }
},
{
    path: '/KlineWeb',
    component: resolve => require(['../pages/Kline/KlineWeb'], resolve),
    meta: {
        navShow: false,
        // tabShow: true,
        title: 'k线图'
    }
},

    // HistoryList
{
    path: '/HistoryList',
    component: resolve => require(['../pages/HistoryList/HistoryList'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '历史委托'
    }
},
{
    path: '/ExportHelpWord',
    component: resolve => require(['../pages/ExportHelpWord/ExportHelpWord'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '历史委托'
    }
},
{
    path: '/coinSearch',
    component: resolve => require(['../pages/coinSearch/coinSearch'], resolve),
    meta: {
        // navShow: true,
        tabShow: true,
        title: '搜索'
    }
},
    // 客服
{
    path: '/SBchart',
    component: resolve => require(['../pages/SBchart/SBchart'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '聊天'
    }
},
{
    path: '/Dapp',
    component: resolve => require(['../pages/Dapp/Dapp'], resolve),
    meta: {
        // navShow: true,
        tabShow: true,
        title: '生态'
    }
},
{
    path: '/EOSV',
    component: resolve => require(['../pages/EOSV/EOSV'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: 'EOSV'
    }
},
{
    path: '/BuyEOSV',
    component: resolve => require(['../pages/BuyEOSV/BuyEOSV'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: '节点布置'
    }
},
{
    path: '/EOSVDetail',
    component: resolve => require(['../pages/EOSVDetail/EOSVDetail'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: 'EOSV详情'
    }
},
{
    path: '/BiBiPage',
    component: resolve => require(['../pages/BiBiPage/BiBiPage'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: '币币交易'
    }
},
{
    path: '/AboutDapp',
    component: resolve => require(['../pages/AboutDapp/AboutDapp'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: '关于DAPP'
    }
},
{
    path: '/Help',
    component: resolve => require(['../pages/Help/Help'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: '帮助中心'
    }
},
{
    path: '/ForgetPwd',
    component: resolve => require(['../pages/ForgetPwd/ForgetPwd'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '忘记密码'
    }
},
{
    path: '/ForgetPayPwd',
    component: resolve => require(['../pages/ForgetPayPwd/ForgetPayPwd'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '忘记密码'
    }
},
{
    path: '/gride',
    component: resolve => require(['../pages/gride/gride'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '引导页'
    }
},
{
    path: '/RecentList',
    component: resolve => require(['../pages/RecentList/RecentList'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: '最近委托'
    }
},
{
    path: '/RobBuy',
    component: resolve => require(['../pages/RobBuy/RobBuy'], resolve),
    meta: {
        navShow: true,
        isLogin: true,
        title: '抢购'
    }
},
{
    path: '/RobLog',
    component: resolve => require(['../pages/RobLog/RobLog'], resolve),
    meta: {
        navShow: true,
        isLogin: true,
        title: '抢购记录'
    }
},
{
    path: '/ApplyMerchant',
    component: resolve => require(['../pages/ApplyMerchant/ApplyMerchant'], resolve),
    meta: {
        title: '填写商户信息',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MerchantManage',
    component: resolve => require(['../pages/MerchantManage/MerchantManage'], resolve),
    meta: {
        title: '商户管理中心',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/UploadProduct',
    component: resolve => require(['../pages/UploadProduct/UploadProduct'], resolve),
    meta: {
        title: '上架产品',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MyCommodity',
    component: resolve => require(['../pages/MyCommodity/MyCommodity'], resolve),
    meta: {
        title: '我的商品',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MyCommodityOrder',
    component: resolve => require(['../pages/MyCommodityOrder/MyCommodityOrder'], resolve),
    meta: {
        title: '订单管理',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/breed',
    component: resolve => require(['../pages/breed/breed'], resolve),
    name: 'breed',
    meta: {
        navShow: false,
        tabShow: true,
        title: '精品',
        keepAlive: false,
        isLogin: true
    }
},
{
    path: '/breedlist',
    component: resolve => require(['../pages/breedlist/breedlist'], resolve),
    name: 'breedlist',
    meta: {
        navShow: false,
        tabShow: false,
        title: '消费记录',
        keepAlive: false
    }
},
{
    path: '/breedlistdetail',
    component: resolve => require(['../pages/breedlistdetail/breedlistdetail'], resolve),
    name: 'breedlistdetail',
    meta: {
        navShow: true,
        // tabShow: false,
        title: '消费详情',
        keepAlive: false
    }
},
{
    path: '/MyCommodityDetail',
    component: resolve => require(['../pages/MyCommodityDetail/MyCommodityDetail'], resolve),
    meta: {
        title: '商品详情',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/EditProduct',
    component: resolve => require(['../pages/EditProduct/EditProduct'], resolve),
    meta: {
        title: '编辑商品',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MerchantUnion',
    component: resolve => require(['../pages/MerchantUnion/MerchantUnion'], resolve),
    meta: {
        title: '联盟商家区',
        navShow: true
        // isLogin:false
    }
},
{
    path: '/MerchantGoodsDetail',
    component: resolve => require(['../pages/MerchantGoodsDetail/MerchantGoodsDetail'], resolve),
    meta: {
        title: '产品详情',
        navShow: false,
        isLogin: false
    }
},
{
    path: '/MerchantFirmOrder',
    component: resolve => require(['../pages/MerchantFirmOrder/MerchantFirmOrder'], resolve),
    meta: {
        title: '创建订单',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MerchantPayOrder',
    component: resolve => require(['../pages/MerchantPayOrder/MerchantPayOrder'], resolve),
    meta: {
        title: '订单支付',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MerchantAllOrder',
    component: resolve => require(['../pages/MerchantAllOrder/MerchantAllOrder'], resolve),
    meta: {
        title: '商铺区订单',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MyMerchantOrderInfo',
    component: resolve => require(['../pages/MyMerchantOrderInfo/MyMerchantOrderInfo'], resolve),
    meta: {
        title: '订单详情',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/MerchantOrderInfo',
    component: resolve => require(['../pages/MerchantOrderInfo/MerchantOrderInfo'], resolve),
    meta: {
        title: '订单详情',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/DeliverGoods',
    component: resolve => require(['../pages/DeliverGoods/DeliverGoods'], resolve),
    meta: {
        title: '发货',
        navShow: true,
        isLogin: true
    }
},
{
    path: '/ekline',
    component: resolve => require(['../pages/Kline/ekline'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: 'ekline'
    }
},
{
    path: '/kline/eth',
    component: resolve => require(['../pages/Kline/eth'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: 'eth-kline'
    }
},
{
    path: '/kline/eos',
    component: resolve => require(['../pages/Kline/eos'], resolve),
    meta: {
        // navShow: true,
        // tabShow: true,
        title: 'eth-kline'
    }
},
{
    path: '/Scan',
    component: resolve => require(['../pages/Scan/Scan'], resolve),
    meta: {
        // navShow: true,
        tabShow: false,
        title: '扫一扫'
    }
},
    // otcRouter
{
    path: '/OTCDeal',
    component: resolve => require(['../pages/OTC/OTCDeal/OTCDeal'], resolve),
    meta: {
        // showFooter: true,
        title: 'OTC',
        navShow: false,
        tabShow: false,
        showFooter: false
    },
    children: [
        {
            path: '',
            redirect: '/OTCDeal/OTCBuy'

        },
        {
            path: '/OTCDeal/OTCBuy',
            component: resolve => require(['../pages/OTC/OTCDeal/OTCBuy/OTCBuy'], resolve),
            meta: {
                // showFooter: true,
                navShow: false,
                tabShow: false,
                title: 'OTC',
                showFooter: false
            }
        },
        {
            path: '/OTCDeal/OTCSell',
            component: resolve => require(['../pages/OTC/OTCDeal/OTCSell/OTCSell'], resolve),
            meta: {
                // showFooter: true,
                navShow: false,
                tabShow: false,
                title: 'OTC',
                showFooter: false
            }
        }
    ]
},
{
    path: '/OTCRelease',
    component: resolve => require(['../pages/OTC/OTCRelease/OTCRelease'], resolve),
    meta: {
        // showFooter: false,
        navShow: false,
        // tabShow: false,
        title: 'OTC挂单中心',
        showFooter: false
    },
    children: [
        {
            path: '',
            redirect: '/OTCRelease/OTCReleaseBuy'
            // redirect:'/OTCRelease/OTCReleaseSell'

        },
        {
            path: '/OTCRelease/OTCReleaseBuy',
            component: resolve => require(['../pages/OTC/OTCRelease/Buy/Buy'], resolve),
            meta: {
                // showFooter: false,
                navShow: false,
                // tabShow: false,
                title: 'OTC挂单中心',
                showFooter: false
            }
        },
        {
            path: '/OTCRelease/OTCReleaseSell',
            component: resolve => require(['../pages/OTC/OTCRelease/Sell/Sell'], resolve),
            meta: {
                // showFooter: false,
                navShow: false,
                // tabShow: false,
                title: 'OTC挂单中心',
                showFooter: false
            }
        }
    ]
},
{
    path: '/OTCOrder',
    component: resolve => require(['../pages/OTC/OTCOrder/OTCOrder'], resolve),
    meta: {
        // showFooter: false,
        navShow: false,
        tabShow: false,
        title: 'OTC订单中心',
        showFooter: false
    },
    children: [
        {
            path: '',
            redirect: '/OTCOrder/OTCBuyOrder'
        },
        {
            path: '/OTCOrder/OTCBuyOrder',
            component: resolve => require(['../pages/OTC/OTCOrder/BuyOrder/BuyOrder'], resolve),
            meta: {
                // showFooter: false,
                navShow: false,
                tabShow: false,
                title: 'OTC订单中心',
                showFooter: false
            }
        },
        {
            path: '/OTCOrder/OTCSellOrder',
            component: resolve => require(['../pages/OTC/OTCOrder/SellOrder/SellOrder'], resolve),
            meta: {
                // showFooter: false,
                navShow: false,
                tabShow: false,
                title: 'OTC订单中心',
                showFooter: false
            }
        }
    ]
},
{
    path: '/MyRelease',
    component: resolve => require(['../pages/OTC/MyRelease/MyRelease'], resolve),
    meta: {
        // showFooter: false,
        navShow: false,
        tabShow: false,
        title: 'OTC我的挂单',
        showFooter: false
    },
    children: [
        {
            path: '',
            redirect: '/MyRelease/MyReleaseBuy'
        },
        {
            path: '/MyRelease/MyReleaseBuy',
            component: resolve => require(['../pages/OTC/MyRelease/MyReleaseBuy/MyReleaseBuy'], resolve),
            meta: {
                // showFooter: false,
                navShow: false,
                tabShow: false,
                title: 'OTC我的挂单'
            }
        },
        {
            path: '/MyRelease/MyReleaseSell',
            component: resolve => require(['../pages/OTC/MyRelease/MyReleaseSell/MyReleaseSell'], resolve),
            meta: {
                // showFooter: false,
                navShow: false,
                tabShow: false,
                title: 'OTC我的挂单'
            }
        }
    ]
},

{
    path: '/bindingMobile',
    component: resolve => require(['../pages/OTC/bindingMobile/bindingMobile'], resolve),
    name: 'bindingMobile',
    meta: {
        navShow: false,
        // tabShow: true,
        title: '绑定手机号',
        keepAlive: false,
        showFooter: false
    }
},
{
    path: '/Servicebs',
    component: resolve => require(['../pages/OTC/Servicebs/Servicebs'], resolve),
    name: 'Servicebs',
    meta: {
        navShow: false,
        // tabShow: true,
        title: '聊天',
        keepAlive: false,
        showFooter: false
    }
},
{
    path: '/OTCBuyOrderDetail/:id',
    component: resolve => require(['../pages/OTC/OTCBuyOrderDetail/OTCBuyOrderDetail'], resolve),
    meta: {
        navShow: false,
        // tabShow: false,
        title: '查看支付方式',
        showFooter: false
    }
},
{
    path: '/OTCSellOrderDetail/:id',
    component: resolve => require(['../pages/OTC/OTCSellOrderDetail/OTCSellOrderDetail'], resolve),
    meta: {
        navShow: false,
        // tabShow: false,
        title: '查看支付方式',
        showFooter: false
    }
},
{
    path: '/OTCOrderPay/:id',
    component: resolve => require(['../pages/OTC/OTCOrderPay/OTCOrderPay'], resolve),
    meta: {
        navShow: false,
        // tabShow: false,
        title: '查看支付方式',
        showFooter: false
    }
},

{
    path: '/kjpage',
    component: resolve => require(['../pages/kjpage/kjpage'], resolve),
    meta: {
        navShow: false,
        // tabShow: false,
        title: '算力',
        showFooter: false
    }
},
{
    path: '/Borrowing',
    component: resolve => require(['../pages/Borrowing/Borrowing'], resolve),
    meta: {
        navShow: false,
        // tabShow: false,
        title: '借贷',
        showFooter: false
    }
},
{
    path: '/BorrowingFlow',
    component: resolve => require(['../pages/Borrowing/BorrowingFlow'], resolve),
    meta: {
        navShow: false,
        // tabShow: false,
        title: '借款记录',
        showFooter: false
    }
},
{
    path: '/Language',
    component: resolve => require(['../pages/Language/Language'], resolve),
    meta: {
        navShow: false,
        isLogin: true,
        title: i18n.t('language')
    }
},
{
    path: '/BiBizzz',
    component: resolve => require(['../pages/BiBizzz/BiBizzz'], resolve),
    meta: {
        navShow: false,
        isLogin: true,
        title: '互转'
    }
},
{
    path: '/ShopList',
    component: resolve => require(['../pages/ShopList/ShopList'], resolve),
    name: 'EntityStore',
    meta: {
        title: '实体店铺',
        navShow: true,
        tabShow: true
    }
},
{
    path: '/register/:id',
    component: resolve => require(['../pages/register/Register'], resolve),
    name: 'Register',
    meta: {
        navShow: false,
        tabShow: false,
        title: i18n.t('reg'),
        keepAlive: false
    }
},
{
    path: '/BiBiPageList',
    component: resolve => require(['../pages/BiBiPageList/BiBiPageList'], resolve),
    name: 'BiBiPageList',
    meta: {
        title: '外汇',
        navShow: true,
        tabShow: false
    }
},
{
    path: '/tokKline',
    component: resolve => require(['../pages/tokKline/tokKline'], resolve),
    name: 'tokKline',
    meta: {
        title: '预测',
        navShow: true,
        tabShow: false
    }
},

{
    path: '/financenew',
    component: resolve => require(['../pages/Finance/FinanceNew'], resolve),
    name: 'financenew',
    meta: {
        title: '我的',
        navShow: false,
        tabShow: true
    }
},
{
    path: '/NetworkDiagram',
    name: 'NetworkDiagram',
    component: resolve => require(['../pages/Finance/NetworkDiagram'], resolve),
    meta: {
        navShow: true,
        tabShow: true,
        title: i18n.t('NetworkDiagram')
    }
},

]

export default routers
