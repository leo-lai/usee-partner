import index          from './pages/index'
import shop           from './pages/shop'
import shopCar        from './pages/shop-car'
import goodsInfo      from './pages/goods-info'
import orderCreate    from './pages/order-create'
import orderList      from './pages/order-list'
import orderInfo      from './pages/order-info'
import orderEvaluate  from './pages/order-evaluate'
import me             from './pages/me'
import meInfo         from './pages/me-info'
import login          from './pages/login'
import register       from './pages/register'
import pwd            from './pages/pwd'
import addressInfo    from './pages/address-info'
import pay            from './pages/pay'
import rebate         from './pages/rebate'
import account        from './pages/account'
import customer       from './pages/customer'
import qrcode         from './pages/qrcode'
import withdrawals    from './pages/withdrawals'
import payResult      from './pages/pay-result'
import antifake       from './pages/antifake'
import income         from './pages/income'
import incomeDetails  from './pages/income-details'
import stock          from './pages/stock'

const routes = [
  { 
    path: '/', 
    redirect: '/index'
  },
  { 
    path: '/index.html', 
    redirect: '/index'
  },
  {
    path: '/index',
    meta: { title: '首页', mainPage: true },
    component: index
  },
  {
    path: '/shop',
    meta: { title: '商城', mainPage: true },
    component: shop
  },
  {
    path: '/me',
    meta: { title: '个人中心', mainPage: true },
    component: me
  },
  {
    path: '/me/info',
    meta: { title: '个人信息'},
    component: meInfo
  },
  {
    path: '/login',
    meta: { title: '登录', auth: false},
    component: login
  },
  {
    path: '/register',
    meta: { title: '注册', auth: false},
    component: register
  },
  {
    path: '/forgot',
    meta: { title: '找回密码', auth: false},
    component: pwd
  },
  {
    path: '/me/pwd',
    meta: { title: '更改密码'},
    component: pwd
  },
  {
    path: '/shop/car',
    meta: { title: '购物车'},
    component: shopCar
  },
  {
    path: '/shopcar',
    meta: { title: '购物车', mainPage: true},
    component: shopCar
  },
  {
    path: '/shop/goods/info/:id',
    meta: { title: '商品详情'},
    component: goodsInfo
  },
  {
    path: '/shop/order/create',
    meta: { title: '确认订单'},
    component: orderCreate
  },
  {
    path: '/order/list',
    meta: { title: '我的订单'},
    component: orderList
  },
  {
    path: '/order/info/:id',
    meta: { title: '订单详情'},
    component: orderInfo
  },
  {
    path: '/order/evaluate',
    meta: { title: '订单评价'},
    component: orderEvaluate
  },
  {
    path: '/address/add',
    meta: { title: '新增收货地址'},
    component: addressInfo
  },
  {
    path: '/address/edit/:id',
    meta: { title: '编辑收货地址'},
    component: addressInfo
  },
  {
    path: '/pay',
    meta: { title: '支付信息'},
    component: pay
  },
  {
    path: '/pay/result',
    meta: { title: '支付结果'},
    component: payResult
  },
  {
    path: '/me/account',
    meta: { title: '我的账户'},
    component: account
  },
  {
    path: '/me/account/withdrawals',
    meta: { title: '提现申请'},
    component: withdrawals
  },
  {
    path: '/me/rebate',
    meta: { title: '我的返利'},
    component: rebate
  },
  {
    path: '/me/customer',
    meta: { title: '我的客户'},
    component: customer
  },
  {
    path: '/me/qrcode',
    meta: { title: '我的二维码'},
    component: qrcode
  },
  {
    path: '/antifake',
    meta: { title: '防伪查询'},
    component: antifake
  },
  {
    path: '/income',
    meta: { title: '累计收益'},
    component: income
  },
  {
    path: '/income/details',
    meta: { title: '累计收益'},
    component: incomeDetails
  },
  {
    path: '/stock',
    meta: { title: '我的库存'},
    component: stock
  },

]

export default routes