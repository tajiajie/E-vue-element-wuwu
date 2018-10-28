/* 登录 */
const login = r => require.ensure([], () => r(require('./login/login')), 'login')
const index = r => require.ensure([], () => r(require('./components/index/index')), 'index')
/* 订单 */
const order = r => require.ensure([], () => r(require('./components/order/order')), 'order')
const orderDetail = r => require.ensure([], () => r(require('./components/order/orderDetail')), 'orderDetail')
const jiesuan = r => require.ensure([], () => r(require('./components/order/jiesuan')), 'jiesuan')
/* 财务 */
const unchecked = r => require.ensure([], () => r(require('./components/finance/unchecked')), 'unchecked')
const checked = r => require.ensure([], () => r(require('./components/finance/checked')), 'checked')
/* 供应商 */
const supplier = r => require.ensure([], () => r(require('./components/supplier/supplier')), 'supplier')
const supplierDetail = r => require.ensure([], () => r(require('./components/supplier/supplierDetail')), 'supplierDetail')
/* 库存 */
const stock = r => require.ensure([], () => r(require('./components/stock/stock')), 'stock')
const stockDetail = r => require.ensure([], () => r(require('./components/stock/stockDetail')), 'stockDetail')
/* 申请 */
const record = r => require.ensure([], () => r(require('./components/record/record')), 'record')
const stockRecord = r => require.ensure([], () => r(require('./components/stockRecord/stockRecord')), 'stockRecord')
/* H5 */
const message = r => require.ensure([], () => r(require('./view/message')), 'message')
/* chrome */
const chrome = r => require.ensure([], () => r(require('./chrome/chrome')), 'chrome')
/* 404 */
const error = r => require.ensure([], () => r(require('./error/error')), 'error')
const evidence = r => require.ensure([], () => r(require('./components/finance/evidence')), 'evidence')

export default [
  {path: '/login', component: login},
  {path: '/', redirect: '/login'},
  {path: '/index',
    redirect: '/index/order',
    component: index,
    children: [
      {path: 'order',
        component: order,
        children: [
          {path: 'jiesuan/:id', component: jiesuan},
          {path: 'orderDetail/:id', component: orderDetail}
        ]},
      {path: 'unchecked', component: unchecked},
      {path: 'checked', component: checked},
      {path: 'supplier',
        component: supplier,
        children: [
          {path: 'supplierDetail/:id',
            component: supplierDetail
          }
        ]
      },
      {path: 'stock',
        component: stock,
        children: [
          {path: 'stockDetail/:id',
            component: stockDetail
          }
        ]
      },
      {path: 'record', component: record},
      {path: 'stockRecord', component: stockRecord},
      {path: 'chrome', component: chrome}
    ]
  },
  {path: '/message', name: 'message', component: message},
  {path: '/404', name: '404', component: error},
  {path: '/evidence', component: evidence}
]
