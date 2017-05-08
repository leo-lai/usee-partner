import index          from './pages/index'
import orderList      from './pages/order-list'
import orderInfo      from './pages/order-info'
import me             from './pages/me'
import meSetting      from './pages/me-setting'
import meInfo         from './pages/me-info'
import login          from './pages/login'
import pwd            from './pages/pwd'
import addressInfo    from './pages/address-info'
import rebate         from './pages/rebate'
import account        from './pages/account'
import customer       from './pages/customer'
import qrcode         from './pages/qrcode'
import withdrawals    from './pages/withdrawals'
import antifake       from './pages/antifake'
import income         from './pages/income'
import incomeDetails  from './pages/income-details'
import stock          from './pages/stock'
import about          from './pages/about'

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
    path: '/me',
    meta: { title: '个人中心', mainPage: true },
    component: me
  },
  {
    path: '/me/setting',
    meta: { title: '系统设置'},
    component: meSetting
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
    path: '/forgot',
    meta: { title: '找回密码', auth: false},
    component: pwd
  },
  {
    path: '/about',
    meta: { title: '关于U视一号', auth: false},
    component: about
  },
  {
    path: '/me/pwd',
    meta: { title: '更改密码'},
    component: pwd
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